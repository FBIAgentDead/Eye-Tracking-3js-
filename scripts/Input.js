let xMag;
let sensitivity = 4;
let adjustablePitch;
let coroutine = false;
var executed1 = false;
var executed2 = false;

var controller = Leap.loop(function (frame) {
    document.getElementById("sens").innerHTML = "Sensitivity: " + sensitivity;

    if (frame.hands.length > 0) {
        var hand = frame.hands[0];
        xMag = hand.palmPosition[0];
        yMag = hand.palmPosition[1];
        var rollPitch = hand.roll();
        if(rollPitch < -1.5 && gameOver){
            restart();
        }
        else{
            player.x = xMag * sensitivity;
        }
        if (yMag > 250 && gameOver) {
            executed1 = false;
            increaseSensitivity();
        }
        else if(yMag < 120 && gameOver){
            executed2 = false;
            lowerSensitivity();
        }
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var isRunning2 = false;

async function lowerSensitivity() {

   if (!isRunning2) {
      isRunning2 = true;
      await sleep(500);
      if (sensitivity > 1) {
        sensitivity--;
      }
      isRunning2 = false;
   }
}

var isRunning1 = false;

async function increaseSensitivity() {

   if (!isRunning1) {
      isRunning1 = true;
      await sleep(500);
      if (sensitivity < 10) {
        sensitivity++;
      }
      isRunning1 = false;
   }
}

