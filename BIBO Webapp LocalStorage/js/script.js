const backendURL = 'TOTP_SERVER_LINK' // Fill in with your TOTP Server's URL and Port

//TOTP
function indexload(){
  const subcounter = setInterval(submit, 500);
  document.getElementById('totp').focus();
}


function check(event){
  var acode = event.which ? event.which : event.keyCode;
  if (acode > 31 && (acode < 48 || acode > 57)){
    return false;
  }
}


function submit(){
  var totp = document.getElementById('totp').value;
  if (totp.length == 6){
    SubmitEvent(totp);
  }
}


function SubmitEvent(totp) {
  fetch(`${backendURL}/otp`, {
    method: 'POST',
    body: JSON.stringify({
      token:totp
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(res => {
    if (res.status < 200 || res.status >= 300)
      throw "Error";
    return res.json();
  }).then(data => {
    localStorage.setItem("key", data.key);
    if (data.res){
    location.href="qr.html"
  }
    else{
      location.reload();
    }
  })
}




//QR CODE
function qrload(){
  const getcounter = setInterval(gettotp, 15000);
}


var oldtoken = "";

function gettotp(){
  fetch(`${backendURL}/qr`, {
    method: 'GET',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(res => {
    if (res.status < 200 || res.status >= 300)
      throw "Error";
    return res.json();
  }).then(data => {
    var token = data.token;
    if (token != oldtoken){
      GenerateQRCode(token);
      oldtoken = token;
    }
  })
}


function verify(){
  var key = localStorage.getItem("key");
  localStorage.clear();
  fetch(`${backendURL}/check`, {
    method: 'POST',
    body: JSON.stringify({
      key
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(res => {
    if (res.status < 200 || res.status >= 300)
      throw "Error";
    return res.json();
  }).then(data => {
    if(data){
      return
    }
    else{
      location.href="index.html"
    }
  })
}