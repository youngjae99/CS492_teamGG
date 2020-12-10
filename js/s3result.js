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
        
        if(mySnapshot.posneg.toUpperCase()=='POSITIVE'){AI='1'}
        else if (mySnapshot.posneg.toUpperCase()=='NEUTRAL'){AI='0'}
        else if (mySnapshot.posneg.toUpperCase()=='NEGATIVE'){AI='-1'}
        var human=''
        if(mySnapshot.human_posneg.toUpperCase()=='POSITIVE'){human='1'}
        else if (mySnapshot.human_posneg.toUpperCase()=='NEUTRAL'){human='0'}
        else if (mySnapshot.human_posneg.toUpperCase()=='NEGATIVE'){human='-1'}
        console.log('AI',AI,'human',human)
        document.getElementById('AI '+AI).innerHTML="<center><img src='../pictures/AI.png' width=\"100px\"/></center>"
        document.getElementById('human '+human).innerHTML="<center><img src='../pictures/user.png' width=\"100px\"/></center>"
        
        var selection=human+' '+AI
    
        document.getElementById(selection).style.backgroundColor='#be93d4'
        
    })
    })