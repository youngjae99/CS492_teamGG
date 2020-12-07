$(document).ready(function () {
  var uploadbtn = document.getElementById("upbtn");
  uploadbtn.onkeypress = function () {
    console.log("btn clicked");
  };
});


function upbtnclicked(){
  console.log("btn clicked");

  var f_name=document.getElementById("f_name").value
  var f_date=document.getElementById("f_date").value
  var chat_log=document.getElementById("message").value
  f_name=f_name.replaceAll(/%20/g, "_");

  if(f_name.length>1 && chat_log.length>5){
    console.log(f_name, chat_log);
    postdata = {
      name: f_name, 
      date: f_date, 
      user_input: 'Neutral', 
      text: chat_log
    };
    $.ajax({
      type: 'POST',
      url: "/gg_backend",
      data: JSON.stringify(postdata),
      dataType: 'JSON',
      contentType: "application/json",
      success: function(data){
        console.log("SUCCESS! The process data is sent to firebase");
      },
      error: function(request, status, error){
        console.log('ajax error...', request, status, error);
      }
    }) 
  }
  else{
    alert("Your input is too short!");
  }
};

