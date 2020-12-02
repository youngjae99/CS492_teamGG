document.addEventListener("DOMContentLoaded", function (event) {
  console.log("ready!");

  var firebaseConfig = {
    apiKey: "AIzaSyCg2H_5AnifrBDQZ-gY82UtZYVwkfVLZPg",
    authDomain: "hai-gg-f140f.firebaseapp.com",
    databaseURL: "https://hai-gg-f140f.firebaseio.com",
    projectId: "hai-gg-f140f",
    storageBucket: "hai-gg-f140f.appspot.com",
    messagingSenderId: "108882535634",
    appId: "1:108882535634:web:4a8200edf49c777a8eb90b",
    measurementId: "G-20V6VJBDGD",
  }; // Initialize

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var database = firebase.database();

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

  targetname = getParam("name");
  date = getParam("date");

  document.getElementById("name1").innerHTML = targetname;
  document.getElementById("name2").innerHTML = targetname;

  var choice;
  var snntenceList, scoreList;
  // firebase.database().ref().set({Sam:{1129:{'point':0.75,'posneg':'positive','posment':{1:'pos1',2:'pos2'},'negment':{1:'neg1',2:'neg2'}}}})

  firebase
    .database()
    .ref("/" + targetname + "/" + date)
    .once("value", function (snapshot) {
      mySnapshot = snapshot.val();
      var posment = mySnapshot.posment;
      var negment = mySnapshot.negment;
      var point = mySnapshot.point;
      sentenceList = mySnapshot.sentsco;
      scoreList = mySnapshot.sentscore;

      var inposment = posment[1] + "<br><br>" + posment[2];
      var innegment = negment[1] + "<br><br>" + negment[2];
      document.getElementById("neg_chat").innerHTML = innegment;
      document.getElementById("pos_chat").innerHTML = inposment;
      var num = point * 40;
      document.getElementById("arrow-result").style.left = 40 + num + "%";
      document.getElementById("point").innerHTML = point;
    });

  function apply(sel) {
    firebase
      .database()
      .ref("/" + targetname + "/" + date)
      .once("value", function (snapshot) {
        mySnapshot = snapshot.val();
        var posneg = mySnapshot.posneg;
        var posment = mySnapshot.posment;
        var negment = mySnapshot.negment;
        var point = mySnapshot.point;

        var dic = {};
        if (typeof mySnapshot.posneg !== "undefined") {
          dic["posneg"] = mySnapshot.posneg;
        }
        if (typeof mySnapshot.posment !== "undefined") {
          dic["posment"] = mySnapshot.posment;
        }
        if (typeof mySnapshot.negment !== "undefined") {
          dic["negment"] = mySnapshot.negment;
        }
        if (typeof mySnapshot.point !== "undefined") {
          dic["point"] = mySnapshot.point;
        }
        dic["human_posneg"] = sel;
        console.log(dic);

        //firebase.database().ref('/'+targetname+'/'+date).remove()
        firebase
          .database()
          .ref("/" + targetname + "/" + date)
          .set(dic);
      });
    document.getElementById("next_page").disabled = false;
  }

  function nextpage() {
    location.href =
      "Result_page_first.html?name=" + targetname + "&date=" + date;
  }

  // firebase.database().ref().set({Sam:{1129:{'posneg':'positive','posment':{1:'pos1',2:'pos2'},'negment':{1:'neg1',2:'neg2'}}}})

  var p_slider = document.getElementById("p_slider");
  var p_threshold = document.getElementById("p_threshold");
  p_threshold.innerHTML = (parseInt(p_slider.value)-50); // Display the default slider value
  // Update the current slider value (each time you drag the slider handle)
  p_slider.oninput = function () {
    p_threshold.innerHTML = (parseInt(this.value)-50);
  };

  var n_slider = document.getElementById("n_slider");
  var n_threshold = document.getElementById("n_threshold");
  n_threshold.innerHTML = (parseInt(n_slider.value)-50); // Display the default slider value
  // Update the current slider value (each time you drag the slider handle)
  n_slider.oninput = function () {
    n_threshold.innerHTML = (parseInt(this.value)-50);
  };
});
