"""Serve the frozen site for local QA, with the project's UTF-8 MIME for text packs."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, '.txt': 'text/plain; charset=utf-8'}


root = Path(__file__).resolve().parents[2]
ThreadingHTTPServer(('127.0.0.1', 4330), partial(Handler, directory=str(root))).serve_forever()
