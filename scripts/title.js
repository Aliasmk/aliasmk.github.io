var iam = ["Techno Font Enthusiast","Safety Glasses Advocate", "Pacman Cloner", "Emulator Developer", "FPV Drone Pilot", "Mini Pumpkin Farmer", "Hot Sauce Masochist", "Maya 8.0 License Holder","カナダ人です","Proud Android Owner","Virtual Reality Enthusiast","Maker", "Fan of RGB LEDs", "日本語の学生です", "Moka Pot Cappuccino Maker", "Enthusiastic Learner", "Electron Tamer", "Dabbler of Different Disciplines"]
var index = Math.floor(Math.random() * (iam.length));
var anda = " and " + iam[index];
document.getElementById("nameSubscript").innerHTML += "Mechatronics Engineering Graduate";
setTimeout(function(){typeOut();},1500);

var i = 0;
function typeOut() {
  if (i < anda.length) {
    document.getElementById("nameSubscript").innerHTML += anda.charAt(i);
    i++;
    setTimeout(typeOut, 75);
  }
}

