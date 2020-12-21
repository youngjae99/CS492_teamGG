document.addEventListener("DOMContentLoaded", function(event) { 
// $(document).ready(function () {


var firebaseConfig = 
{  apiKey: "AIzaSyCg2H_5AnifrBDQZ-gY82UtZYVwkfVLZPg",
    authDomain: "hai-gg-f140f.firebaseapp.com",
    databaseURL: "https://hai-gg-f140f.firebaseio.com",
    projectId: "hai-gg-f140f",
    storageBucket: "hai-gg-f140f.appspot.com",
    messagingSenderId: "108882535634",
    appId: "1:108882535634:web:4a8200edf49c777a8eb90b",
    measurementId: "G-20V6VJBDGD" }; // Initialize 


firebase.initializeApp(firebaseConfig); 
firebase.analytics(); 
var database=firebase.database()

current_page=window.location.href

function getParam(sname) {
var params = location.search.substr(location.search.indexOf("?") + 1);
var sval = "";
params = params.split("&");
for (var i = 0; i < params.length; i++) {

    temp = params[i].split("=");

    if ([temp[0]] == sname) { sval = temp[1]; }
}
return sval;
}

targetname=getParam('name')
date=getParam('date')
firebase.database().ref('/'+targetname+'/'+date).once('value', function(snapshot) {
    mySnapshot=snapshot.val()
    
    var AI=''
    if(mySnapshot.posneg.toLowerCase()=='positive'){AI='1'}
    else if (mySnapshot.posneg.toLowerCase()=='neutral'){AI='0'}
    else if (mySnapshot.posneg.toLowerCase()=='negative'){AI='-1'}
    var human=''
    if(mySnapshot.human_posneg.toLowerCase()=='positive'){human='1'}
    else if (mySnapshot.human_posneg.toLowerCase()=='neutral'){human='0'}
    else if (mySnapshot.human_posneg.toLowerCase()=='negative'){human='-1'}
    var pre_human=''
    if(mySnapshot.pre_human_posneg.toLowerCase()=='positive'){pre_human='1'}
    else if (mySnapshot.pre_human_posneg.toLowerCase()=='neutral'){pre_human='0'}
    else if (mySnapshot.pre_human_posneg.toLowerCase()=='negative'){pre_human='-1'}
   
    document.getElementById('AI '+AI).innerHTML="<center><img src='../pictures/AI.png' width=\"100px\"/></center>"
    document.getElementById('human '+human).innerHTML="<center><img src='../pictures/user.png' width=\"100px\"/></center>"
    
    var selection=human+' '+AI
    var pre_selection=pre_human+' '+AI
    console.log(pre_selection)
    if (human==pre_human){
    document.getElementById(selection).style.backgroundColor='#be93d4'}
    else{
        document.getElementById(selection).style.backgroundColor='#be93d4'
        document.getElementById(pre_selection).style.backgroundColor='#da70d6'
    }
    
    
})
})