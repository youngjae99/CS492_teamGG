from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin
from google.cloud import language
# import requests as request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

app = Flask(__name__)
CORS(app)
#app.config['CORS_ALLOW_HEADERS'] = 'Content-Type'

@app.route('/')
#@cross_origin()
def index(): 
    # my_res = flask.Response()
    # http_method = flask.request.method
    # print(http_method)
    # if http_method == "OPTIONS":
    #     my_res.headers.add("Access-Control-Allow-Origin", "*.html")
    #     my_res.headers.add('Access-Control-Allow-Headers', "*.html")
    return render_template('index.html')

# @app.route("/login")
# def login():
#   return jsonify({'success': 'ok'})

@app.route("/gg_backend", methods=['POST'])
def ajax():
    try:
        # preprocess data from front-end
        print('testsgo')
        print(request.data)
        data = request.get_json()
        print('test', data, flush=True)
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
    firebase_admin.initialize_app(cred, {'databaseURL': 'https://hai-gg-f140f.firebaseio.com/'})
    dir = db.reference(f'{name}/{date}')
    dir.update(results)

    print('done')
    return 'OK'


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=60008, debug=True)
  
    
