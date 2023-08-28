"""
# server.py
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import subprocess

#from llama_completion import get_completions


def get_completions(code):
    return_text = code + "\n Hello you have done well."
    return return_text

class RequestHandler(BaseHTTPRequestHandler):
    def _set_response(self, content_type='text/html'):
        self.send_response(200)
        self.send_header('Content-type', content_type)
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data)
            code = data.get('code', '')

            completions = get_completions(code)

            self._set_response('application/json')
            self.wfile.write(json.dumps({'completions': completions}).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(str(e).encode())

def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting server on port {port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import subprocess

#from llama_completion import get_completions


def get_completions(code):
    return_text = "\n Hello you have done well."
    return return_text


# Import statements and get_completions function remain the same

class RequestHandler(BaseHTTPRequestHandler):
    def _set_response(self, content_type='text/html'):
        self.send_response(200)
        self.send_header('Content-type', content_type)
        self.send_header('Access-Control-Allow-Origin', 'http://localhost:8789')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, x-xsrftoken, authorization')
        self.send_header('Access-Control-Max-Age', '3600')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_response()  # Set the headers for CORS

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data)
            code = data.get('code', '')

            completions = get_completions(code)

            self._set_response('application/json')
            self.wfile.write(json.dumps({'completions': completions}).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(str(e).encode())

    def do_GET(self):
        try:
            # Extract token from the URL
            path_parts = self.path.split('?')
            token = path_parts[1] if len(path_parts) > 1 else ''

            # Process the token as needed
            # For example, you can pass it to your get_completions function
            completions = get_completions(token)

            self._set_response('application/json')
            self.wfile.write(json.dumps({'completions': completions}).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(str(e).encode())

# Rest of the code remains the same
def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting server on port {port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run()