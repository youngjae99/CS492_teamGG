// async function analyzeSentimentInText(name, date, user_input, text) {
//   process.env['GOOGLE_APPLICATION_CREDENTIALS'] = './gg_certif.json'
  
//   // [START language_sentiment_gcs]
//   // Imports the Google Cloud client library
//   console.log("entered_function");
//   const language = require('@google-cloud/language');

//   // Creates a client
//   const client = new language.LanguageServiceClient();

//   // Prepares a document, representing a text file in Cloud Storage
//   const document = {
//     content: text,
//     type: 'PLAIN_TEXT',
//   }; 

//   // Detects the sentiment of the document
//   console.log("log2");
//   const [result] = await client.analyzeSentiment({document});

//   const sentiment = result.documentSentiment;

//   // update to Firebase
//   console.log("log4");
//   var firebase = require("firebase/app");
//   require('firebase/database');

//   var firebaseConfig = 
//   {apiKey: "AIzaSyCg2H_5AnifrBDQZ-gY82UtZYVwkfVLZPg",
//     authDomain: "hai-gg-f140f.firebaseapp.com",
//     databaseURL: "https://hai-gg-f140f.firebaseio.com",
//     projectId: "hai-gg-f140f",
//     storageBucket: "hai-gg-f140f.appspot.com",
//     messagingSenderId: "108882535634",
//     appId: "1:108882535634:web:4a8200edf49c777a8eb90b",
//     measurementId: "G-20V6VJBDGD" }; // Initialize 

//   firebase.initializeApp(firebaseConfig); 
//   var database=firebase.database();

//   database.ref(`${name}/${date}`).update({
//     "human_posneg": user_input,
//     "negment": negment,
//     "point": doc_score,
//     "posment": posment,
//     "posneg":posneg
//   });

//   // [END language_sentiment_gcs]
// }


$(document).ready(function () {
  var uploadbtn = document.getElementById("upbtn");
  uploadbtn.onkeypress = function () {
    console.log("btn clicked");
  };
});

function getParam(sname) {
  var params = location.search.substr(location.search.indexOf("?") + 1);
  var sval = "";
  params = params.split("&");
  for (var i = 0; i < params.length; i++) {
    temp = params[i].split("=");

    if ([temp[0]] == sname) {
      sval = temp[1];
    }
  }
  return sval;
}

pos=getParam('pos')
neg=getParam('neg')

var pre_human_posneg=""
function apply(decision){
  document.getElementById("upbtn").disabled=false
  if(decision=="positive"){
    document.getElementById("btn_1").style.backgroundColor="red";
    document.getElementById("btn_2").style.backgroundColor="lightcoral";
    document.getElementById("btn_3").style.backgroundColor="lightcoral";
  }
  else if(decision=="neutral"){
    document.getElementById("btn_1").style.backgroundColor="lightcoral";
    document.getElementById("btn_2").style.backgroundColor="red";
    document.getElementById("btn_3").style.backgroundColor="lightcoral";
  }
  else if(decision=="negative"){
    document.getElementById("btn_1").style.backgroundColor="lightcoral";
    document.getElementById("btn_2").style.backgroundColor="lightcoral";
    document.getElementById("btn_3").style.backgroundColor="red";
  }
  pre_human_posneg=decision
}

function upbtnclicked(){
  console.log("btn clicked");

  var f_name=document.getElementById("f_name").value
  var f_date=document.getElementById("f_date").value
  var chat_log=document.getElementById("message").value
  f_name=f_name.replaceAll(/%20/g, "_");

  if(f_name.length>1 && chat_log.length>5){
    console.log(f_name, chat_log);
    var postdata = {
      name: f_name, 
      date: f_date, 
      user_input: 'Neutral', 
      text: chat_log,
      pre_human_posneg : pre_human_posneg
    };
    $.ajax({
      type: 'POST',
      url: "http://143.248.159.124:60009/gg_backend",
      data: JSON.stringify(postdata),
      dataType: 'JSON',
      contentType: "application/json",
      success: function(data){
        console.log("SUCCESS! The process data is sent to firebase");
      },
      error: function(request, status, error){
        console.log('ajax error...', request, status, error);
        //alert("no!");
      }
    })

    //페이지 이동
    location.href = "./s2control.html?name=" + f_name+"&date="+f_date+"&pos="+pos+"&neg="+neg;
  }
  else{
    alert("Your input is too short!");
  }
  
};

