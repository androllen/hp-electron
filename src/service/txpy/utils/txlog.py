#!/usr/bin/python
# -*- coding:utf-8 -*-
import logging
# from concurrent_log_handler import ConcurrentRotatingFileHandler
from logging.handlers import RotatingFileHandler

class TXloger:
    def __init__(self):
        self.LOGGER = logging.getLogger(__name__)
        self.level = logging.INFO
        # logging.basicConfig(level=logging.DEBUG)

    def set_debug(self):
        self.level = logging.DEBUG

    def get_logger(self, name='TX'):
        self.LOGGER = logging.getLogger(name)
        _log_handler = logging.StreamHandler()
        _fmt = '%(message)s'
        _formatter = logging.Formatter(fmt=_fmt)
        _log_handler.setFormatter(_formatter)
        _log_handler.setLevel(self.level)
        self.LOGGER.addHandler(_log_handler)

        _file_handler = RotatingFileHandler(
            filename=f'tx.log',
            maxBytes=1024*1024*5,
            backupCount=2,
            encoding='utf8'
        )
        _file_fmt = '[%(asctime)s](%(levelname)s)%(name)s: %(message)s'
        _file_formatter = logging.Formatter(_file_fmt)
        _file_handler.setFormatter(_file_formatter)
        _file_handler.setLevel(logging.DEBUG)
        self.LOGGER.addHandler(_file_handler)
        self.LOGGER.propagate = False
        self.LOGGER.setLevel(logging.DEBUG)
        return self.LOGGER

txlogger = TXloger()
LOGGER = txlogger.get_logger()
# txlogger.set_debug()
# txlogger.get_logger('11111').debug("666")