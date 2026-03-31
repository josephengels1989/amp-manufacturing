#!/usr/bin/env python3
"""Local dev server with clean URL support (mimics Vercel's cleanUrls)."""
import http.server
import os
import sys

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        path = self.path.split('?')[0]

        # Trailing slash: try index.html
        if path.endswith('/'):
            test_path = '.' + path + 'index.html'
            if os.path.isfile(test_path):
                self.path = path + 'index.html'
                return super().do_GET()

        # Exact file exists: serve it
        if os.path.isfile('.' + path):
            return super().do_GET()

        # Try appending .html (clean URL support)
        if os.path.isfile('.' + path + '.html'):
            self.path = path + '.html'
            return super().do_GET()

        # Directory with index.html
        if os.path.isdir('.' + path) and os.path.isfile('.' + path + '/index.html'):
            self.path = path + '/index.html'
            return super().do_GET()

        return super().do_GET()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    server = http.server.HTTPServer(('', port), CleanURLHandler)
    print(f'Serving at http://localhost:{port} (clean URLs enabled)')
    server.serve_forever()
