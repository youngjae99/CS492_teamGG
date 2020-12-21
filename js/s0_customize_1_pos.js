$(document).ready(function () {
  var uploadbtn = document.getElementById("upbtn");
});

positive_thresholds={}
positive_thresholds_sequence=['0.1','0.2','0.3','0.4','0.5','0.6','0.7','0.8','0.89']
positive_thresholds['0.89']=["I don't like you", "I hate you", "Move your ass","Son of a bitch"]
positive_thresholds['0.8']=["What the hell","I don't want to talk to you anymore","You smell bad"]
positive_thresholds['0.7']=["I can't understand everything you did."]
positive_thresholds['0.6']=["I saw you in my dreams.","I don't care what you think","You've got no second chance","You're being recalled"] 
positive_thresholds['0.5']=["Honestly, I don't know where this is going.","There's no second chance."]
positive_thresholds['0.4']=["Can't you understand such small thing?","You think you could do that."]
positive_thresholds['0.3']=['Bitch,shut up.']
positive_thresholds['0.2']=['And then what.']
positive_thresholds['0.1']=['I will hunt you.','I mean do this work according to the situations.']

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

function downarrow(){
  current=document.getElementById('threshold').innerHTML
  function findcurrent(element)  {
    if(element === current) return true;
  }
  index_of_current=positive_thresholds_sequence.findIndex(findcurrent)
  if (index_of_current!=positive_thresholds_sequence.length-1){
    document.getElementById('threshold').innerHTML=positive_thresholds_sequence[index_of_current+1]
    document.getElementById('sample_texts').innerHTML=positive_thresholds[positive_thresholds_sequence[index_of_current+1]][0]
  }
  
}

function uparrow(){
  current=document.getElementById('threshold').innerHTML
  function findcurrent(element)  {
    if(element === current) return true;
  }
  index_of_current=positive_thresholds_sequence.findIndex(findcurrent)
  if (index_of_current!=0){
    document.getElementById('threshold').innerHTML=positive_thresholds_sequence[index_of_current-1]
    document.getElementById('sample_texts').innerHTML=positive_thresholds[positive_thresholds_sequence[index_of_current-1]][0]
  }
  
}

function randomize(){
  current_thres=document.getElementById('threshold').innerHTML
  current_message= document.getElementById('sample_texts').innerHTML
  function findcurrent(element)  {
    if(element === current_message) return true;
  }
  index_of_current=positive_thresholds[current_thres].findIndex(findcurrent)
  console.log(index_of_current)
  if(index_of_current!=positive_thresholds[current_thres].length-1){

    document.getElementById('sample_texts').innerHTML=positive_thresholds[current_thres][index_of_current+1]}
  else {
    document.getElementById('sample_texts').innerHTML=positive_thresholds[current_thres][0]
  }
  

}

neg=getParam("neg");

function upbtnclicked(){
  console.log("btn clicked");
  location.href="./s1upload.html?pos=" +document.getElementById('threshold').innerHTML.split('.')[1]+"&neg="+neg

  
  
 
};

