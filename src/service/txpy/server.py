#!/usr/bin/python
# -*-coding:utf-8-*-
import importlib
import json
import os
import time
from argparse import ArgumentParser
from concurrent.futures import ThreadPoolExecutor

import zmq

from utils import txconfig,txlog


def arg_parse():
    argparse = ArgumentParser()
    argparse.add_argument('-r', dest='rep', type=str, default='tcp://*:5555')
    argparse.add_argument('-s', dest='pub', type=str, default='tcp://*:50505')
    argparse.add_argument('--debug', dest='debug', action='store_true')
    return argparse.parse_args()

def __init_env(_update):
    result = False
    try:
        if _update:
            poc_dic = {}
            dir_path = os.path.join(os.path.dirname(__file__), "Framework")
            cfg_filepath = os.path.join(dir_path, 'poc_maneger.txt')
            for root, dirs, files in os.walk(dir_path):
                if root == dir_path:
                    continue
                if root.find('__pycache__') > 0:
                    continue
                for file_name in files:
                    if file_name in ['__init__.py', 'parser.py', 'test.py', 'index']:
                        continue
                    if file_name.find('.py') < 0:
                        continue
                    file_name = file_name.split('.')[0]
                    pkg_name = 'Framework' + root.replace(dir_path, '').replace(os.sep, '.') + '.'
                    poc_dic[file_name] = pkg_name
                    # try:
                    #     _ = importlib.import_module(pkg_name + file_name)
                    # except Exception as e:
                    #     print(e, pkg_name, file_name)
            with open(cfg_filepath, 'w') as f:
                f.write(json.dumps(poc_dic))
            result = True
    except Exception as e:
        print("server.py-->is_same_task error:" + str(e))
    finally:
        return result


def start():
    # __init_env(True)
    args = arg_parse()
    if args.debug:
        txlog.txlogger.set_debug()
    rep_context = zmq.Context()
    rep_socket = rep_context.socket(zmq.REP)
    rep_socket.bind(args.rep)

    pub_context = zmq.Context()
    pub_socket = pub_context.socket(zmq.PUB)
    pub_socket.bind(args.pub)

    pool = ThreadPoolExecutor(max_workers=20)
    print("start success")
    while True:
        task = rep_socket.recv_string()
        try:
            task = json.loads(task)
            txlog.LOGGER.debug(task)
            script_id = task.get('scriptid', '')

            script = txconfig.ScriptID.map_form[script_id]
            func = importlib.import_module(script)

            rep_socket.send_string("True")
            time.sleep(0.1)
            pool.submit(func.main, pub_socket, task)

        except Exception as e:
            rep_socket.send_string("False")
            continue


if __name__ == '__main__':
    start()
