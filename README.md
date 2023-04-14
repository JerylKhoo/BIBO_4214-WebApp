# BIBO_4214-WebApp
This is a Web Application for 14th Mono 42 SAR. It is written in HTML, CSS and Javascript, using the [davidshimjs/qrcodejs](https://github.com/davidshimjs/qrcodejs) library.

This [README](README.md) file conains the information required to get started with this simple project.

## Preqrequisites
The Web Application works in conjuncture with the [BIBO_4214-TOTP-Server](https://github.com/JerylKhoo/BIBO_4214-TOTP-Server) and the [bots_4214](https://github.com/acidMyke/bots_4214) Repositories.

Ensure that the following has been setup properly:
* [BIBO_4214-TOTP-Server](https://github.com/JerylKhoo/BIBO_4214-TOTP-Server)
* [bots_4214](https://github.com/acidMyke/bots_4214)

## Setup
Fill in the following Variables:
* [TOTP_SERVER_LINK (1st Line of ./js/script.js)](https://github.com/JerylKhoo/BIBO_4214-WebApp/blob/ad28eaa9f744a321a486e1c9bb1c9f99b536f2b5/js/script.js#L1)
* [TELEGRAM_BOT_LINK (24th Line of ./qr.html)](https://github.com/JerylKhoo/BIBO_4214-WebApp/blob/ad28eaa9f744a321a486e1c9bb1c9f99b536f2b5/qr.html#L24)

Just throw all values into a S3 Bucket, ensure the prerequisites are running and tadah it should be working!!! :D