from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from functools import partial
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--root', required=True)
parser.add_argument('--port', type=int, required=True)
args = parser.parse_args()


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Preview HTML selects versioned runtime files. Reusing an old HTML
        # document can pair current content with an incompatible old renderer.
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def guess_type(self, path):
        mime = super().guess_type(path)
        return mime + '; charset=utf-8' if mime.startswith('text/') and 'charset=' not in mime else mime


class PreviewServer(ThreadingHTTPServer):
    # The browser requests runtime files and six material previews concurrently.
    request_queue_size = 128


PreviewServer(('127.0.0.1', args.port), partial(Handler, directory=args.root)).serve_forever()
