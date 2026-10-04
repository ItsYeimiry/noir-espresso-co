import http.server, os, socketserver, sys, threading, webbrowser

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = 8080


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def translate_path(self, path):
        p = super().translate_path(path)
        missing = not os.path.exists(p)
        bare_dir = os.path.isdir(p) and not os.path.exists(os.path.join(p, "index.html"))
        if (missing or bare_dir) and os.path.exists(p + ".html"):
            return p + ".html"
        return p

    def log_message(self, *args):
        pass


socketserver.TCPServer.allow_reuse_address = True
try:
    server = socketserver.TCPServer(("127.0.0.1", PORT), Handler)
except OSError:
    print(f"El puerto {PORT} esta ocupado. Cierra otras ventanas de esta web e intentalo de nuevo.")
    sys.exit(1)

url = f"http://localhost:{PORT}/"
print(f"Web abierta en {url}")
print("Para verla en ingles anade /en al final. Cierra esta ventana para detenerla.")
threading.Timer(0.8, lambda: webbrowser.open(url)).start()
server.serve_forever()
