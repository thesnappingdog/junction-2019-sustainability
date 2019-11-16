#!/usr/bin/env python3
import os
import subprocess
import argparse
import docker

client = docker.from_env()

# Shell output styling
_r = '\033[91m' # Red
_g = '\033[92m' # Green
_b = '\033[94m' # Blue
_y = '\033[93m' # Yellow
_p = '\033[95m' # Purple
_E = '\033[0m'  # End style
_O = '\033[2m'  # Opaque
_B = '\033[1m'  # Bold
_I = '\033[3m'  # Italic
_U = '\033[4m'  # Underline

PROJECT_ROOT_DIR = os.path.dirname(os.path.realpath(__file__))

ACTIONS = [
    'build',
    'compose',
    'deploy',
    'cleanup'
]

SERVICES = [
    'webapp'
]

def get_service_names_arr(args):
    if not args.services \
        or args.services == 'all':
        return SERVICES
    services = []
    for service in args.services.split():
        service = service.strip()
        if service in SERVICES:
            services.append(service)
        else:
            raise Exception(f'{_r + service + _e} is not valid service')
    return services

def build(args):
    for service_name in get_service_names_arr(args):
        service_dir = PROJECT_ROOT_DIR + '/' + service_name
        service_tag = 'junkkari/' + service_name
        print(f"Building {service_name} ...")
        params = ['docker', 'build', '--tag', service_tag, service_dir]
        subprocess.call(params)

def compose(args):
    os.system('docker-compose up')

def deploy(args):
    # TODO: Ensure docker-machine is set to prod machine
    # TODO: Pull latest from github
    os.system('git checkout master')  # Change to master branch
    build('all')
    # TODO: P
    raise NotImplementedError('Deploy not implemented')

def cleanup(args):
    running_containers = client.containers.list()
    for running_cont in running_containers:
        running_cont.remove(force=True)
    client.containers.prune()  # Clean stopped containers

def call_action(action_name, args):
    possibles = globals().copy()
    possibles.update(locals())
    action_func = possibles.get(action_name)
    if not action_func:
        raise NotImplementedError(f"Action {_y + action_name + _E} not implemented yet")
    action_func(args)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('action', type=str, help='action to run')
    parser.add_argument('-s', '--services', type=str, help=f'comma-separated list of services, default {_y}all{_E}')
    args = parser.parse_args()
    if args.action not in ACTIONS:
        joiner = _E + ', ' + _y
        print(f"{_r + args.action + _E} is not valid action. Valid actions are: {_y + joiner.join(ACTIONS) + _E}")
        parser.print_help()
    else: 
        call_action(args.action, args)





