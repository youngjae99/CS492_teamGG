$(document).ready(function () {
  var uploadbtn = document.getElementById("upbtn");
  uploadbtn.onkeypress = function () {
    console.log("btn clicked");
  };
});

function upbtnclicked(){
    console.log("btn clicked");
    var f_name=document.getElementById("f_name").value
    var chat_log=document.getElementById("message").value

    if(f_name.length>4 && chat_log.length>5){
      console.log(f_name, chat_log);
      location.href = "./s2control.html?name=" + f_name+"&date="+1111;
    }
    else{
      alert("Your input is too short!");
    }
}