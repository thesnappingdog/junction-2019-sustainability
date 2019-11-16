import os
import torch
from torch.nn.utils.rnn import pack_padded_sequence, pad_packed_sequence
import torch.nn as nn
from config import Config

class Classifier(nn.Module):
    def __init__(self, embedding_size=20000, hidden_size=128, output_size=7443):
        super(Classifier, self).__init__()
        self.hidden_size = hidden_size
        self.embedding = nn.Embedding(embedding_size, hidden_size)
        self.lstm = nn.LSTM(hidden_size, hidden_size)
        self.linear = nn.Linear(hidden_size,output_size)
        self.device = 'cpu'

    def mangle_list_of_items_to_tensor(self, items):
        list_ = []
        for item in items:
            list_.append([int(item)])
        return torch.tensor(list_)

    def forward(self, pad_seqs, seq_lengths):
        embedded = self.embedding(pad_seqs).view(pad_seqs.shape[0], pad_seqs.shape[1], -1)
        packed = pack_padded_sequence(embedded, seq_lengths, batch_first = False)
        self.lstm.flatten_parameters()
        _,hidden = self.lstm(packed)
        fc = self.linear(hidden[0])

        return fc

    def load_trained(self):
        inference_filename = 'app/inference/model.pth'
        inference_filepath = os.path.join(Config.BASE_DIR, inference_filename)
        device = 'cpu'
        self.load_state_dict(torch.load(inference_filepath, map_location=lambda storage, loc: storage))
        print('Classifier loaded from %s.' % inference_filepath)
        self = self.to(device)
        self.eval()

    def init_hidden(self, batch_size=1):
        return torch.zeros(1, batch_size, self.hidden_size, device=self.device)