const backendURL = 'http://localhost:3172'; // Fill in with your TOTP Server's URL and Port

//TOTP
function indexload() {
  const subcounter = setInterval(submit, 500);
  document.getElementById('totp').focus();
}

function check(event) {
  var acode = event.which ? event.which : event.keyCode;
  if (acode > 31 && (acode < 48 || acode > 57)) {
    return false;
  }
}

function submit() {
  var totp = document.getElementById('totp').value;
  if (totp.length == 6) {
    SubmitEvent(totp);
  }
}

function SubmitEvent(totp) {
  fetch(`${backendURL}/otp`, {
    method: 'POST',
    body: JSON.stringify({
      token: totp,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(res => {
      if (res.status < 200 || res.status >= 300) throw 'Error';
      return res.json();
    })
    .then(data => {
      localStorage.setItem('key', data.key);
      if (data.res) {
        location.href = 'qr.html';
      } else {
        location.reload();
      }
    });
}

//QR CODE
function qrload() {
  const getcounter = setInterval(gettotp, 15000);
}

var oldtoken = '';

function gettotp() {
  const key = localStorage.getItem('key');
  if (key == null) {
    location.href = 'index.html';
  }

  fetch(`${backendURL}/qr`, {
    method: 'GET',
    headers: {
      'x-key': key,
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(res => {
      if (res.status < 200 || res.status >= 300) {
        location.href = 'index.html';
      }
      return res.json();
    })
    .then(data => {
      var token = data.token;
      if (token != oldtoken) {
        GenerateQRCode(token);
        oldtoken = token;
      }
    });
}

function GenerateQRCode(encrypt) {
  const QRElement = document.getElementById('qrcode');
  QRElement.innerHTML = '';
  new QRCode(QRElement, {
    text: 'TELEGRAM_BOT_LINK' + encrypt, //Fill in with your Telegram Bot's link and paramters
    width: 300,
    height: 300,
  });
}
