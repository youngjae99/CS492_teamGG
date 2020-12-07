
async function analyzeSentimentInText(name, date, user_input, text) {
  process.env['GOOGLE_APPLICATION_CREDENTIALS'] = './gg_certif.json'
  // [START language_sentiment_gcs]
  // Imports the Google Cloud client library
  console.log("entered_function");
  const language = require('@google-cloud/language');

  // Creates a client
  const client = new language.LanguageServiceClient();

  // Prepares a document, representing a text file in Cloud Storage
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  }; 

  // Detects the sentiment of the document
  console.log("log2");
  const [result] = await client.analyzeSentiment({document});

  const sentiment = result.documentSentiment;
  // console.log('Document sentiment:');
  // console.log(`  Score: ${sentiment.score}`);
  // console.log(`  Magnitude: ${sentiment.magnitude}`);

  const sentences = result.sentences;
  // sentences.forEach(sentence => {
  //   console.log(`Sentence: ${sentence.text.content}`);
  //   console.log(`  Score: ${sentence.sentiment.score}`);
  //   console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
  // });

  var doc_score = sentiment.score
  if (doc_score > 0.3){
    var posneg = "positive"
  }else if (doc_score < -0.3){
    var posneg = "negative"
  }else{
    var posneg = "neutral"
  }

  var results = []
  console.log("log3");
  for (item of sentences){
    value = item.sentiment.score
    instance = item.text.content
    results[results.length] = {'value':value, 'sentence':instance}
  };

  results.sort(function (a,b) {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    // a must be equal to b
    return 0;
  })
  
  const negment_ = results.slice(0,3);
  const negment = negment_.map(({sentence})=>sentence)
  const posment_ = results.slice(-3);
  const posment = posment_.map(({sentence})=>sentence)

  // console.log(posment)

  // update to Firebase
  console.log("log4");
  var firebase = require("firebase/app");
  require('firebase/database');

  var firebaseConfig = 
  {apiKey: "AIzaSyCg2H_5AnifrBDQZ-gY82UtZYVwkfVLZPg",
    authDomain: "hai-gg-f140f.firebaseapp.com",
    databaseURL: "https://hai-gg-f140f.firebaseio.com",
    projectId: "hai-gg-f140f",
    storageBucket: "hai-gg-f140f.appspot.com",
    messagingSenderId: "108882535634",
    appId: "1:108882535634:web:4a8200edf49c777a8eb90b",
    measurementId: "G-20V6VJBDGD" }; // Initialize 

  firebase.initializeApp(firebaseConfig); 
  var database=firebase.database();

  database.ref(`${name}/${date}`).update({
    "human_posneg": user_input,
    "negment": negment,
    "point": doc_score,
    "posment": posment,
    "posneg":posneg
  });

  // [END language_sentiment_gcs]
}

// for test
// var fs = require("fs");
// var text = fs.readFileSync("../dataset/B.txt").toString('utf-8');
// analyzeSentimentInText('inserver_821', '1130', 'neutral', text)
module.exports = analyzeSentimentInText