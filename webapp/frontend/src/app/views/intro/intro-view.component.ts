import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro-view',
  templateUrl: './intro-view.component.html',
  styleUrls: ['./intro-view.component.scss']
})
export class IntroViewComponent implements OnInit {

  public imageUrl: string;
  public title: string;
  private cardIndex: number;
  private cards = [
    {
      'image_url': '/assets/example_action_2.png',
      'title': "At first, select food items you have remaining and would like to use."
    },
    {
      'image_url': '/assets/example_action_3.png',
      'title': "The app suggests items you've bought recently, and you can type other items."
    },
    {
      'image_url': '/assets/example_action_4.png',
      'title': "When you have list of items you want to use, its time for AI suggested recipes!"
    },
    {
      'image_url': '/assets/example_action_2.png',
      'title': "You can click recipes to see more info"
    },
    {
      'image_url': '/assets/example_action_3.png',
      'title': "When you find a delicious recipe you'd like to prepare, the app shows where you can get the missing items."
    },
    {
      'image_url': '/assets/example_action_4.png',
      'title': "Let's get started!"
    }
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.cardIndex = 0;
    this.updateCard();
  }

  prevCard() {
    if (this.cardIndex > 0) this.cardIndex++;
    this.updateCard();
  }

  nextCard() {
    if (this.cardIndex+1 >= this.cards.length) {
      this.router.navigate(['/', 'start']);
      return;
    }
    this.cardIndex++;
    this.updateCard();
  }

  updateCard() {
    this.imageUrl = this.cards[this.cardIndex]['image_url'];
    this.title = this.cards[this.cardIndex]['title'];
  }
}
