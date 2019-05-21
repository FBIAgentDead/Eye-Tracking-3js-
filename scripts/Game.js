var controller;
var hand;
var cube;
var pivot = [];

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
    pivot[0] = cube.position.x;
    pivot[1] = cube.position.y;
    pivot[2] = cube.position.z;
    scene.add( cube );

    GenerateSkybox();

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
    if(hand != null){
        cube.rotation.x = hand.palmNormal[0];
        cube.rotation.y = hand.palmNormal[1];
        cube.rotation.z = hand.palmNormal[2];
        var offsetVector = new THREE.Vector3(hand.palmPosition[0],0,0);
        cube.position.x =  pivot[0] + hand.palmPosition[0]/10;
        cube.position.y =  pivot[1] + (hand.palmPosition[1]/10) - 15;
    }
    else{
        cube.rotation.x = 0;
        cube.rotation.y = 0;
        cube.rotation.z = 0;
        cube.position.x = 0;
        cube.position.y = 0;
    }
});

setup();