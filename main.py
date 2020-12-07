import tornado.httpserver
import tornado.ioloop
import tornado.web
 
class MainHandler(tornado.web.RequestHandler):     
    def get(self):         
        items = ["Item 1", "Item 2", "Item 3"]                  
        self.render("index.html", title="My title", items=items, sayHello=self.sayHello) 
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)
    def sayHello(self, name):
        return 'Hello, '+name + '!!!'
 
application = tornado.web.Application([     
     (r"/", MainHandler),   
]) 
 
if __name__ == "__main__":     
     http_server = tornado.httpserver.HTTPServer(application)     
     http_server.listen(60010)     
     tornado.ioloop.IOLoop.instance().start()