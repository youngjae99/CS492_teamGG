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

    console.log(f_name, chat_log);
    location.href = "./analyze.html?" + f_name+"/";
}