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
  var sentenceList, scoreList;
  // firebase.database().ref().set({Sam:{1129:{'point':0.75,'posneg':'positive','posment':{1:'pos1',2:'pos2'},'negment':{1:'neg1',2:'neg2'}}}})

  console.log("targetname:", targetname);
  console.log("date:", date);
  firebase
    .database()
    .ref("/" + targetname + "/" + date)
    .once("value", function (snapshot) {
      mySnapshot = snapshot.val();
      scoreList = mySnapshot.scores;
      sentenceList = mySnapshot.sentences;
      point=mySnapshot.point;
      // document.getElementById("neg_chat").innerHTML=negment[1]+"<br><br>"+negment[2];
      // document.getElementById("pos_chat").innerHTML=posment[1]+"<br><br>"+posment[2];
      document.getElementById("arrow-result").style.left=40+point*40+"%";
      document.getElementById("point").innerHTML=point;
    }).then(apply);
  
  function removeItemOnce(arr, value) {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    }

  function apply() {
    console.log("in apply", sentenceList);
    console.log(Math.max(...scoreList))
    
    max1=Math.max(...scoreList)
    pos1=sentenceList[scoreList.indexOf(max1)]
    scoreListcopy=[...scoreList]
    removeItemOnce(scoreListcopy,max1)
    max2=Math.max(...scoreListcopy)
    pos2=sentenceList[scoreList.indexOf(max2)]
    
    document.getElementById("pos_chat").innerHTML=pos1+'<br><br>'+pos2  
    var chatbox = document.getElementById("chatbox");

    min1=Math.min(...scoreList)
    neg1=sentenceList[scoreList.indexOf(min1)]
    scoreListcopy_forneg=[...scoreList]
    removeItemOnce(scoreListcopy_forneg,min1)
    min2=Math.min(...scoreListcopy_forneg)
    neg2=sentenceList[scoreList.indexOf(min2)]
    
    document.getElementById("neg_chat").innerHTML=neg1+'<br><br>'+neg2  
    var chatbox = document.getElementById("chatbox");
    
    for (i = 0; i < sentenceList.length; i++){
      $('<mark id="m'+i+'">'+sentenceList[i]+'</mark>'+'<br>').appendTo("#chatbox");
    }
    // changeColor();
  }

  function nextpage() {
    location.href =
      "Result_page_first.html?name=" + targetname + "&date=" + date;
  }

  var neg_part=0.5;
  var pos_part=-0.5;


  function changeColor(){
    var p_slider = document.getElementById("p_slider");
    var p_threshold = (parseInt(p_slider.value)-50); // 긍정 threshold
    var n_slider = document.getElementById("n_slider");
    var n_threshold = (parseInt(n_slider.value)-50); // 부정 threshold

    //partition change
    neg_part = -0.5 - n_threshold*0.01;    
    pos_part = 0.5 + p_threshold*0.01;

    for (i = 0; i < scoreList.length; i++) {
        var elem_id = "m" + i;
        var token = document.getElementById(elem_id);
        if(scoreList[i]>pos_part){
          token.style.color = "green";
        }
        else if(scoreList[i]<neg_part){
          token.style.color = "red";
        }
        else{
          token.style.color = "silver";
        }
    } 
  }

  // firebase.database().ref().set({Sam:{1129:{'posneg':'positive','posment':{1:'pos1',2:'pos2'},'negment':{1:'neg1',2:'neg2'}}}})

  var p_slider = document.getElementById("p_slider");
  var p_threshold = document.getElementById("p_threshold");
  p_threshold.innerHTML = (parseInt(p_slider.value)-50); // Display the default slider value
  // Update the current slider value (each time you drag the slider handle)
  p_slider.oninput = function () {
    p_threshold.innerHTML = (parseInt(this.value)-50);
    p_threshold2.innerHTML = 0.5 + (parseInt(this.value)-50)*0.01;
    changeColor();
    //console.log("after firebase get :", scoreList, sentenceList );
  };

  var n_slider = document.getElementById("n_slider");
  var n_threshold = document.getElementById("n_threshold");
  n_threshold.innerHTML = (parseInt(n_slider.value)-50); // Display the default slider value
  // Update the current slider value (each time you drag the slider handle)
  n_slider.oninput = function () {
    n_threshold.innerHTML = (parseInt(this.value)-50);
    n_threshold2.innerHTML = -0.5 - (parseInt(this.value)-50)*0.01;
    changeColor();
    //console.log("after firebase get :", scoreList, sentenceList );
  };
});
