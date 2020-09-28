#!/usr/bin/env python
# -*- encoding: utf-8 -*-

import os
from concurrent.futures import ThreadPoolExecutor
from functools import partial
from urllib.parse import urlparse
import requests


class TX_requtsts():
    def __init__(self, TX_PARAM):
        self.TX_PARAM = TX_PARAM

    def request(self, method, url, **kwargs):
        with TX_requtsts(self.TX_PARAM).Session() as session:
            return session.request(method=method, url=url, **kwargs)

    def get(self, url, params=None, **kwargs):
        kwargs.setdefault('allow_redirects', True)
        return self.request('get', url, params=params, **kwargs)

    def options(self, url, **kwargs):
        kwargs.setdefault('allow_redirects', True)
        return self.request('options', url, **kwargs)

    def head(self, url, **kwargs):
        kwargs.setdefault('allow_redirects', False)
        return self.request('head', url, **kwargs)

    def post(self, url, data=None, json=None, **kwargs):
        return self.request('post', url, data=data, json=json, **kwargs)

    def put(self, url, data=None, **kwargs):
        return self.request('put', url, data=data, **kwargs)

    def patch(self, url, data=None, **kwargs):
        return self.request('patch', url, data=data, **kwargs)

    def delete(self, url, **kwargs):
        return self.request('delete', url, **kwargs)

    def session(self):
        return TXSession(self.TX_PARAM)

    def Session(self):
        return TXSession(self.TX_PARAM)


class TXSession(requests.Session):
    def __init__(self, TX_PARAM):
        super(TXSession, self).__init__()
        self.TX_PARAM = TX_PARAM
        self.RESULT = self.TX_PARAM.get('result', {})
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134"
        }

    def request(self, method, url, **kwargs):
        # Create the Request.
        kwargs.setdefault('headers', self.headers)
        kwargs.setdefault('verify', False)
        if self.TX_PARAM.get('cookies', ''):
            kwargs['headers'].update(
                {'cookies': self.TX_PARAM.get('cookies', '')})
        kwargs.setdefault('hooks', {'response': self.resp_hook})

        return super().request(method, url, **kwargs)

    def resp_hook(self, rep, **kwargs):
        request_str = """%s %s HTTP/%.1f
""" % (rep.request.method, rep.request.path_url, rep.raw.version * 0.1)
        request_str += f"""Host: {urlparse(rep.url).netloc}
"""
        for k, v in dict(rep.request.headers).items():
            request_str += f"""{k}: {v}
"""
        if rep.request.body:
            request_str += """
""" + str(rep.request.body)

        resp_str = """HTTP/%.1f %d %s
""" % (rep.raw.version * 0.1, rep.raw.status,
            rep.raw.reason)
        for k, v in dict(rep.headers).items():
            resp_str += f"""{k}: {v}
"""
        resp_str += """
""" + rep.text
        self.RESULT['request'].append(request_str)
        self.RESULT['response'].append(resp_str)


class ScriptID:
    map_form = {
        'port_scan': 'PortScan.port_scan',
        'web_path_scan': 'WebPathScan.async_web_scan',  # webpathscan
        'waf_check': 'WafCheck.WafCheck',
        'web_banner': 'WebBanner.web_banner',
        'who_is': 'WhoIs.WhoIs',
        'cdn_detect': 'CDNDetect.CDNDetect',
        'reverse_domain': 'ReverseDomain.reverse_domain',
        'reverse_check': 'WhoIs.ReverseCheck',
        'headless_spider': 'gRPCSpider.js_spider_client',  # HeadlessSpider.py3_spider
        'mail_spider': 'Mailspider.mail_spider',
        'brute_force': 'BruteForce.brute_force',
        'subdomain': 'SubDomainsBrute.subdomain',
        # 'cms_exp_frame': 'CmsExpFrame.auto_exploit',
        # 'service_brute': 'ServiceBrute.service_brute',
        'poc_framework': 'Framework.framework',
        'aux_tool': 'AuxiliaryTools.aux_tool',
        'web_scanner': 'AWVS.awvs_client',
        'dnsyo': 'dnsyo.dnsyo',
        'gc_spider': 'GCSpider.py3_spider',
        'shell': 'TXShell.shell_client'
    }


class Request_Param:
    # PROXY = None
    TIMEOUT = 5
    HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:57.0) Gecko/20100101 Firefox/57.0"}


class service_brute():
    '''
    爆破模块的基类
    '''

    def __init__(self, ip, port, users, passwds, thread_num=20):
        self.ip = ip
        self.port = int(port)
        self.users = users
        self.passwds = passwds
        self.crack = False
        self.pool = ThreadPoolExecutor(thread_num)

    def handle_param(self, unknown):
        if isinstance(unknown, str):
            if os.path.isfile(unknown):
                return open(unknown, 'r')
            else:
                return [unknown]
        elif isinstance(unknown, list):
            return unknown
        else:
            return []

    def generate_task(self, username, password):
        user_ = self.handle_param(username)
        for user in user_:
            pwd_ = self.handle_param(password)
            for pwd in pwd_:
                yield user.strip(), pwd.replace('%user%', user.strip()).strip()

    def brute(self, params):
        '''
        各个基类进行实现
        '''
        pass

    def run(self):
        for user, passwd in self.generate_task(self.users, self.passwds):
            self.pool.submit(self.brute, (user, passwd)).add_done_callback(
                partial(self.mycall_back, user, passwd))
        self.pool.shutdown()

    def mycall_back(self, user, passwd, output):
        if output.result() == 1:
            self.crack = (user, passwd)
            # return(user,passwd)


# if __name__ == '__main__':
#     param = {
#         "result": {'success': False, 'request': [], 'response': []}
#     }
#     t = TX_requtsts(param)
#     r = t.get("http://www.4dogs.cn")
#     print(r.status_code)
#     print(param)
