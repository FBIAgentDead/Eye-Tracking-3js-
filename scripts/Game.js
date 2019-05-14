var controller;
var hand;
var cube

function setup() {
    //leap setup
    controller = new Leap.Controller()
    controller.connect();
    controller.setBackground(true);
    controller.on('frame', update);
    controller.on('connect', onConnect);
    controller.on('disconnect', onDisconnect);
    controller.on('streamingStarted', onDeviceConnected);
    controller.on('streamingStopped', onDeviceDisconnected);

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    update();
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
    if(hand != null){
        cube.rotation.x += hand.palmNormal[0] / 20;
        cube.rotation.y += hand.palmNormal[1] / 20;
        cube.rotation.z += hand.palmNormal[2] / 20;
    }
    // insert stupid code joke here
});

setup();