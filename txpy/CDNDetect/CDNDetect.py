# -*- coding: utf-8 -*-

import dns.resolver
import json
from urllib.parse import urlparse
from service.txpy.utils import txlog

dnslist = ["8.8.8.8", "114.114.114.114", "202.181.224.2", "202.106.0.20", "223.5.5.5", "180.76.76.76",
           "123.123.123.123"]
# cdntype={"百度加速乐":["yunjiasu-cdn"],"腾讯云":["cdn.dnsv1.com","cdntip.com"],"阿里云":["alikunlun.com","aliyuncs.com","aliyun-inc.com"],"网宿CDN":["wscloudcdn"],"七牛CDN":["qiniudns.com"]}
cdntype = {"yunjiasu-cdn.net": u"百度加速乐", "cdn.dnsv1.com": u"腾讯云", "qq.com": u"腾讯云", "cdntip.com": u"腾讯云",
           "alikunlun.com": u"阿里云",
           "aliyuncs.com": u"阿里云", "aliyun-inc.com": u"阿里云", "wscloudcdn": u"网宿CDN", "cdn20.com": "网宿CDN",
           "lxdns.com": "网宿CDN", "qiniudns.com": u"七牛CDN", "cloudfront.net": "Amazon Cloudfront",
           "amazonaws.com": "Amazon Cloudfront"}


# 从指定dns服务器获取指定域名对应的IP地址list
def getip(pub_socket, tmp_filter, domain, dnsserver, iplist, cnamelist):
    result = {"CNAME": "", "vendor": "", "ip": ""}

    my_resolver = dns.resolver.Resolver()
    my_resolver.nameservers = [dnsserver]
    answer = my_resolver.query(domain, "A")
    for i in answer.response.answer:
        for j in i.items:
            if isinstance(j, dns.rdtypes.IN.A.A):
                if j.address not in iplist:
                    iplist.append(j.address)
                    result['ip'] = j.address
                    pub_socket.send_string(tmp_filter + json.dumps(result))
            elif isinstance(j, dns.rdtypes.ANY.CNAME.CNAME):
                cname = j.to_text()
                if cname not in cnamelist:
                    cnamelist.append(cname)
                    domain_split = cname.split('.')
                    cdn_domain = '.'.join(domain_split[-3:])[:-1]
                    cdn = cdntype.get(cdn_domain, '')
                    result["CNAME"] = cname
                    result["vendor"] = cdn
                    pub_socket.send_string(tmp_filter + json.dumps(result))


# 获取对应的CDN列表
def get_cdn_vendor(cname):
    domain_split = cname.split('.')
    cdn_domain = '.'.join(domain_split[-3:])[:-1]
    cdn = cdntype.get(cdn_domain, '')
    return cdn.encode('utf8')


# 获取对应的CDN列表
def getCDNType(cname_list):
    vendor = []
    for cname in cname_list:
        domain_split = cname.split('.')
        cdn_domain = '.'.join(domain_split[-3:])[:-1]
        cdn = cdntype.get(cdn_domain, '')
        if cdn == '':
            continue
        vendor.append(cname[:-1] + "_" + cdn.encode('utf8'))

    return vendor


# 循环获取所有的ip地址列表
def main(pub_socket, task):
    try:
        tmp_filter = task.get('id', '') + ','
        param = task.get('parameters', {})
        domain = param.get('url', '')
        if domain == "":
            pub_socket.send_string(tmp_filter + "error_" + "domain miss")
            return
        iplist = []
        cnamelist = []

        if domain.find('://') <= 0:
            domain = "http://" + domain
        hostname = urlparse(domain).hostname
        for dnsserver in dnslist:
            getip(pub_socket, tmp_filter, hostname,
                  dnsserver, iplist, cnamelist)
    except Exception as e:
        txlog.get_loger.error(e)
        pub_socket.send_string(tmp_filter + "error_" + str(e))
    finally:
        txlog.get_loger.debug("cdn_check end")
        pub_socket.send_string(tmp_filter + "end!!!")


if __name__ == '__main__':
    # cdn_check('', '', 'chinaz.com')
    # class PUBSOCK:
    #     def send_string(self, info):
    #         print(info)
    #
    #
    # pub_socket = PUBSOCK()
    #
    # param = {
    #     'url': 'http://www.4dogs.cn',
    #     'script_type': 'php'
    # }
    # start_time = time.time()
    # main(pub_socket, '', param)
    # print(time.time() - start_time)
    pass
