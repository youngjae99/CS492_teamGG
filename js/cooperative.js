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

document.getElementById('name1').innerHTML=targetname
document.getElementById('name2').innerHTML=targetname

function nextpage(choice){

var mySnapshot;
// firebase.database().ref('/'+targetname).once('value', function(snapshot) {
//     mySnapshot=snapshot.val()
// })
// console.log(mySnapshot)
// //console.log(choice)
// firebase.database().ref('/'+targetname+'/'+date).set({
//     mySnapshot,  
//     'human_posneg':choice

// })

// location.href='Result_page_first.html?name='+targetname+'&date='+date
}