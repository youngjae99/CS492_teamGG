$(document).ready(function () {
  var uploadbtn = document.getElementById("upbtn");
});

positive_thresholds={}
positive_thresholds_sequence=['0.1','0.2','0.3','0.4','0.5','0.6','0.7','0.8','0.89']
positive_thresholds['0.89']=["What a lovely day!", "That coffee was the best one ever.", "Keep going.", "I\'ll meet my lovely boyfriend.", "I like warm hug.", "Oh, well done you!"]
positive_thresholds['0.8']=["It was a cozy day.", "I\'m good.", "She read the sentence without any hesitation at all.", "I\'m glad it\'s happened.", "I\'m willing."]
positive_thresholds['0.7']=["I play the playlist all day.", "It\'s coming, treasure.", "She must be a brilliant teacher.", "Go ahead."]
positive_thresholds['0.6']=["I saw you in my dreams.", "Rock n roll", "But others were lovely.", "You can take more than one if you wish.", "It is easy.", "It\'s a famous one."] 
positive_thresholds['0.5']=["It\'s up to you.", "I\'m not missing that plane!", "I think so, yes.", "Life is a music."]
positive_thresholds['0.4']=["Well, I guess that was true.",]
positive_thresholds['0.3']=["It\'s like music.", "I\'m sure I can manage.", "Come here.", "That\'s quite enough from you.", "How right you are."]
positive_thresholds['0.2']=['How right you are.', 'You can help me make the tea.', 'I was free at last.', 'Why, thank you', "But there is some kind of magic in you somewhere."]
positive_thresholds['0.1']=['You can do it.', 'Let\'s have another cup of tea.', 'Of course you may try it.', 'I\'ve got it.']

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

