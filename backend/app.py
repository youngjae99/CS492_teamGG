from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin
from google.cloud import language
# import requests as request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# from http.server import HTTPServer, SimpleHTTPRequestHandler, test
# import sys

# class CORSRequestHandler (SimpleHTTPRequestHandler):
#     def end_headers (self):
#         self.send_header('Access-Control-Allow-Origin', '*')
#         SimpleHTTPRequestHandler.end_headers(self)

app = Flask(__name__)
CORS(app)
app.config['CORS_ALLOW_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin
def index(): 
    print('index')
    # my_res = flask.Response("차단?")
 
    # http_method = flask.request.method
    # my_res.headers.add("Access-Control-Allow-Origin", "*")
    # my_res.headers.add('Access-Control-Allow-Headers', "*")
    # my_res.headers.add('Access-Control-Allow-Methods', "POST,GET")
 
    # if http_method == "OPTIONS": # 사전요청
    #     print("--사전 요청(Preflight Request)--")
    #     my_res.headers.add("Access-Control-Allow-Origin", "*")
    #     my_res.headers.add('Access-Control-Allow-Headers', "*")
    #     my_res.headers.add('Access-Control-Allow-Methods', "GET,DELETE")
    # elif http_method == "GET": # 실제요청
    #     print("--실제 요청--")
    #     my_res.headers.add("Access-Control-Allow-Origin", "*")
    #     my_res.set_data("가져왔지롱")
    # elif http_method == "DELETE": # 실제요청
    #     print("--실제 요청--")
    #     my_res.headers.add("Access-Control-Allow-Origin", "*")
    #     my_res.set_data("삭제했지롱")
    # else: 
    #     print("요구하지 않은 HTTP METHOD(" + http_method + ")입니다.")       
    # return render_template('s1upload.html')
    
    return render_template('s1upload.html')

# @app.route("/login")
# def login():
#   return jsonify({'success': 'ok'})

@app.route("/gg_backend", methods = ['POST'])
def ajax():
    global i 
    print('ajax', i)
    
    try:
        # preprocess data from front-end
        print('testsgo')
        print(request.data)
        data = request.get_json()
        # print('test', data, flush=True)
    except Exception as e:
        print(e)
        raise e
    name = data['name']
    date = data['date']
    user_input = data['user_input']
    textData = data['text']

    # load google language api
    client = language.LanguageServiceClient.from_service_account_json("./gg_certif.json")
    
    type_ = language.Document.Type.PLAIN_TEXT
    document = {"content": textData, "type_": type_, "language": "en"}
    # encoding_type = language.encoding_type.UTF8

    # output from google api
    response = client.analyze_sentiment(request = {'document': document})

    # overall document score
    doc_score = response.document_sentiment.score
    doc_magnitude = response.document_sentiment.magnitude

    posneg = "Neutral"
    if doc_score > 0.4:
        posneg = "Positive"
    elif doc_score < -0.4:
        posneg = "Negative"

    # content and score for each sentences
    sent_conts = []
    sent_scores = []
    
    for sentence in response.sentences:
        sent_conts.append(sentence.text.content)
        sent_scores.append(sentence.sentiment.score)
        # sent_mag = sentence.sentiment.magnitude

    results = {'humand_posneg': user_input, 'point': doc_score, 'posneg': posneg, 'sentences': sent_conts, 'scores': sent_scores}
    
    # upadte to firebase
    cred = credentials.Certificate('./firebase_key.json')
    if i == 1:
        firebase_admin.initialize_app(cred, {'databaseURL': 'https://hai-gg-f140f.firebaseio.com/'})
    dir = db.reference(f'{name}/{date}')
    dir.update(results)

    print('done', i)
    i+=1
    return 'OK'


if __name__ == "__main__":
    i = 1
    app.run(host='0.0.0.0', port=60009)
  
    
