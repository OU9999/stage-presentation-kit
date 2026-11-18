from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from functools import partial
import argparse
parser=argparse.ArgumentParser();parser.add_argument('--root',required=True);parser.add_argument('--port',type=int,required=True);a=parser.parse_args()
class Handler(SimpleHTTPRequestHandler):
    def guess_type(self,path):
        mime=super().guess_type(path)
        return mime+'; charset=utf-8' if mime.startswith('text/') and 'charset=' not in mime else mime
ThreadingHTTPServer(('127.0.0.1',a.port),partial(Handler,directory=a.root)).serve_forever()
