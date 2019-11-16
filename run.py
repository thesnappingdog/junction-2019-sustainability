#!/usr/bin/env python3
import os
import subprocess
import argparse
import docker

client = docker.from_env()

# Shell output styling
_r = '\033[91m' # Foreground: Red
_g = '\033[92m' # Foreground: Green
_b = '\033[94m' # Foreground: Blue
_y = '\033[93m' # Foreground: Yellow
_p = '\033[95m' # Foreground: Purple
_e = '\033[39m' # Foreground: End
_O = '\033[2m'  # Opaque
_B = '\033[1m'  # Bold
_I = '\033[3m'  # Italic
_U = '\033[4m'  # Underline
_E = '\033[0m'  # End all styling

PROJECT_ROOT_DIR = os.path.dirname(os.path.realpath(__file__))

ACTIONS = [
    'build',
    'run',
    'compose',
    'deploy',
    'cleanup'
]

SERVICES = [
    'possu',
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
        params = ['docker', 'build', '--tag', service_tag, service_dir]
        print(f"{_I+_O}Building {_p + service_name + _e} ...{_E}")
        subprocess.call(params)

def run(args):
    for service_name in get_service_names_arr(args):
        service_tag = 'junkkari/' + service_name
        params = ['docker', 'run', '-d'] 
        if service_name == 'possu':
            params += ['-p', '5432:5432']
        elif service_name == 'webapp':
            params += ['-p', '80:80']
        params.append(service_tag)
        print(f"{_I+_O}Running {_p + service_name + _e} detached ...{_E}")
        print(f"{_O+' '.join(params)+_E}")
        subprocess.call(params)

def compose(args):
    os.system('docker-compose up')

def deploy(args):
    # TODO: Ensure docker-machine is set to prod machine!
    # TODO: Pull latest from github
    # os.system('git checkout master')  # Change to master branch
    # build('all')
    # TODO: Deployment
    raise NotImplementedError('Deploy not implemented')

def cleanup(args):
    for running_cont in client.containers.list():
        running_cont.remove(force=True)
    client.containers.prune()  # Clean stopped containers
    for volume in client.volumes.list():
        volume.remove(force=True)

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





