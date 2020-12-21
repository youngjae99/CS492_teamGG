$(document).ready(function () {
  var uploadbtn = document.getElementById("upbtn");
});

negative_thresholds={}
negative_thresholds_sequence=['-0.1','-0.2','-0.3','-0.4','-0.5','-0.6','-0.7','-0.8','-0.89']
negative_thresholds['-0.89']=["I don't like you", "I hate you", "Move your ass","Son of a bitch"]
negative_thresholds['-0.8']=["What the hell","I don't want to talk to you anymore","You smell bad"]
negative_thresholds['-0.7']=["I can't understand everything you did."]
negative_thresholds['-0.6']=["Fuck off","I don't care what you think","You've got no second chance","You're being recalled"]
negative_thresholds['-0.5']=["Honestly, I don't know where this is going.","There's no second chance."]
negative_thresholds['-0.4']=["Can't you understand such small thing?","You think you could do that."]
negative_thresholds['-0.3']=['Bitch,shut up.']
negative_thresholds['-0.2']=['And then what.']
negative_thresholds['-0.1']=['I will hunt you.','I mean do this work according to the situations.']
// the content needs to be changed!


function downarrow(){
  current=document.getElementById('threshold').innerHTML
  function findcurrent(element)  {
    if(element === current) return true;
  }
  index_of_current=negative_thresholds_sequence.findIndex(findcurrent)
  if (index_of_current!=negative_thresholds_sequence.length-1){
    document.getElementById('threshold').innerHTML=negative_thresholds_sequence[index_of_current+1]
    document.getElementById('sample_texts').innerHTML=negative_thresholds[negative_thresholds_sequence[index_of_current+1]][0]
  }
  
}

function uparrow(){
  current=document.getElementById('threshold').innerHTML
  function findcurrent(element)  {
    if(element === current) return true;
  }
  index_of_current=negative_thresholds_sequence.findIndex(findcurrent)
  if (index_of_current!=0){
    document.getElementById('threshold').innerHTML=negative_thresholds_sequence[index_of_current-1]
    document.getElementById('sample_texts').innerHTML=negative_thresholds[negative_thresholds_sequence[index_of_current-1]][0]
  }
  
}

function randomize(){
  current_thres=document.getElementById('threshold').innerHTML
  current_message= document.getElementById('sample_texts').innerHTML
  function findcurrent(element)  {
    if(element === current_message) return true;
  }
  index_of_current=negative_thresholds[current_thres].findIndex(findcurrent)
  console.log(index_of_current)
  if(index_of_current!=negative_thresholds[current_thres].length-1){

    document.getElementById('sample_texts').innerHTML=negative_thresholds[current_thres][index_of_current+1]}
  else {
    document.getElementById('sample_texts').innerHTML=negative_thresholds[current_thres][0]
  }
  

}

function next(){
  console.log("btn clicked");
  location.href="./s0customize_1_pos.html?neg=" +document.getElementById('threshold').innerHTML.split('.')[1]
 
};

