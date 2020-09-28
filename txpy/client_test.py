#!/usr/bin/python
# -*-coding:utf-8-*-

from service.txpy.utils.txconfig import ScriptID

import zmq
import json

req_context = zmq.Context()
req_socket = req_context.socket(zmq.REQ)
req_socket.connect("tcp://127.0.0.1:5555")

sub_context = zmq.Context()
sub_socket = sub_context.socket(zmq.SUB)
sub_socket.connect("tcp://127.0.0.1:50505")
sub_socket.setsockopt_string(
    zmq.SUBSCRIBE, '023feac1-4a5d-49c9-b540-8cac4241c99a')


def demo():
    task = {"id": "023feac1-4a5d-49c9-b540-8cac4241c99a", "scriptid": 'cdn_detect',
            "parameters": {
                # "pocname": "waf_check",
                # 'username': 'admin',
                # 'password': 'vulhub',
                'url': 'https://www.bejson.com/',
                # "verify": "1",
                # 'attack': '1',
                # 'cmd': 'whoami',
                # 'username': 'admin',
                # 'password': 'vulhub',
                # 'ip': '192.168.0.51',
                # 'port': '7001',
                # 'lhost': '192.168.101.9',
                # 'lport': '6668',
                # 'rhost': '192.168.101.9',
                # 'rport': '1111'
            }}
    req_socket.send_string(json.dumps(task))
    response = req_socket.recv_string()
    if response == 'True':
        while True:
            tmp = sub_socket.recv_string()
            print(tmp)
            if tmp == "023feac1-4a5d-49c9-b540-8cac4241c99a,end!!!":
                break
    else:
        print("server reject")


if __name__ == '__main__':
    demo()
