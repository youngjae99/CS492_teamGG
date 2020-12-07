from __future__ import print_function
from __future__ import unicode_literals
import os.path
import json

import tornado.auth
import tornado.escape
import tornado.ioloop
from tornado.options import define, options
import tornado.web
 
class MainHandler(tornado.web.RequestHandler):     
    def get(self):                          
        self.render("index.html", title="My title")

class AjaxHandler(tornado.web.RequestHandler):
    """Simple, ajax handler"""
    def get(self, *args, **kwargs):
        """get unlikely to be used for ajax"""
        self.write("Not allowed")
        self.finish()

    def post(self, *args):
        """Example handle ajax post"""
        dic = tornado.escape.json_decode(self.request.body)
        print(dic)
        # useful code goes here
        self.write(json.dumps({'status': 'ok', 'sent': dic}))
        self.finish()

# application = tornado.web.Application([     
#      (r"/", MainHandler),
#      (r"/(ajax)$", AjaxHandler),
#      (r"/(.*)", tornado.web.StaticFileHandler, {'path': '../gg_project_master'})
# ]) 

class Application(tornado.web.Application):
    """Simple example App"""
    def __init__(self):
        handlers = [
            (r"/", MainHandler),
            (r"/(ajax)$", AjaxHandler),
            (r"/(.*)", tornado.web.StaticFileHandler, {'path': '../gg_project_master'})
        ]
        settings = dict(
            debug=True,
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "tornado_static")
        )
        tornado.web.Application.__init__(self, handlers, **settings)

def main():
    """start server"""
    tornado.options.parse_command_line()
    app = Application()
    app.listen(60010)
    print('serving...')
    tornado.ioloop.IOLoop.instance().start()
 
if __name__ == "__main__":
     main()

# from flask import Flask, render_template

# app = Flask(__name__)
# @app.route('/')
# def start_page():
#     return render_template('index.html')

# @app.route("/gg_backend", methods = ['POST'])
# def ajax():
#     print('ajax')
#     try:
#         # preprocess data from front-end
#         print('testsgo')
#         print(request.data)
#         data = request.get_json()
#         print('test', data, flush=True)
#     except Exception as e:
#         print(e)
#         raise e
#     name = data['name']
#     date = data['date']
#     user_input = data['user_input']
#     textData = data['text']

#     # load google language api
#     client = language.LanguageServiceClient.from_service_account_json("./gg_certif.json")
    
#     type_ = language.Document.Type.PLAIN_TEXT
#     document = {"content": textData, "type_": type_, "language": "en"}
#     # encoding_type = language.encoding_type.UTF8

#     # output from google api
#     response = client.analyze_sentiment(request = {'document': document})

#     # overall document score
#     doc_score = response.document_sentiment.score
#     doc_magnitude = response.document_sentiment.magnitude

#     posneg = "Neutral"
#     if doc_score > 0.4:
#         posneg = "Positive"
#     elif doc_score < -0.4:
#         posneg = "Negative"

#     # content and score for each sentences
#     sent_conts = []
#     sent_scores = []
    
#     for sentence in response.sentences:
#         sent_conts.append(sentence.text.content)
#         sent_scores.append(sentence.sentiment.score)
#         # sent_mag = sentence.sentiment.magnitude

#     results = {'humand_posneg': user_input, 'point': doc_score, 'posneg': posneg, 'sentences': sent_conts, 'scores': sent_scores}
    
#     # upadte to firebase
#     cred = credentials.Certificate('./firebase_key.json')
#     firebase_admin.initialize_app(cred, {'databaseURL': 'https://hai-gg-f140f.firebaseio.com/'})
#     dir = db.reference(f'{name}/{date}')
#     dir.update(results)

#     print('done')
#     return 'OK'


# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=60001)