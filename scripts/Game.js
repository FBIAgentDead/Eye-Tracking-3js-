var controller;
var hand;

var fpsDisplay = document.getElementById('leapFPS');
var handCountDisplay = document.getElementById('handCount');
var fingerCountDisplay = document.getElementById('fingerCount');

function setup() {
    //leap setup
    controller = new Leap.Controller()
    controller.setBackground(true);
    controller.connect();
    controller.on('frame', update);
    controller.on('connect', onConnect);
    controller.on('disconnect', onDisconnect);
    controller.on('streamingStarted', onDeviceConnected);
    controller.on('streamingStopped', onDeviceDisconnected);

    // GenerateSkybox();

    //right camera angle
    camera.rotation.y += 0;
    
    update();
}

function GenerateSkybox() {

    //Skybox instantiate
    var skyGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
    var skyMaterial = [
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("./SkyBox/blood_ft.png"), side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("./SkyBox/blood_bk.png"), side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("./SkyBox/blood_up.png"), side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("./SkyBox/blood_dn.png"), side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("./SkyBox/blood_rt.png"), side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("./SkyBox/blood_lf.png"), side: THREE.DoubleSide
        }),
    ]
    skybox = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(skybox);
}

//when the leap is connected
function onConnect() {
    console.log("Connection succesfully established.");
}
//when the leap is disconnected
function onDisconnect() {
    console.log("Connection timed out.");
}
//when the cable is connected
function onDeviceConnected() {
    console.log("Device connected.");
}
//when the cable is disconnected
function onDeviceDisconnected() {
    console.log("Device has been disconnected.");
}
//this is the update that gets called every frame
function update() {
    //code here
    requestAnimationFrame(update);
}

Leap.loop(function (frame) {
    hand = frame.hands[0];
    //console.log(hand);
    var previousFrame = controller.frame(0);
    if(hand != null && rightHand != null){
        var axisY = Math.atan2(hand.palmNormal[0], -hand.palmNormal[1]) - 90;
        var axisZ = Math.atan2(hand.palmNormal[1], -hand.palmNormal[2]) - 90;

        // rightHand.rotation.x = axisZ;
        // rightHand.rotation.y = axisZ;
        rightHand.rotation.z = axisY;
        rightHand.position.x =  rightHand.pivot[0] + hand.palmPosition[0]/10;
        rightHand.position.y =  rightHand.pivot[1] + (hand.palmPosition[1]/10) - 15;
    }
    else if(rightHand != null){
        rightHand.rotation.x = 0;
        rightHand.rotation.y = 0;
        rightHand.rotation.z = 0;
        rightHand.position.x = 0;
        rightHand.position.y = 0;
    }
});

setup();