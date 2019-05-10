
let camera;

function Setup() {
    console.log("oof");

    camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 10);
    console.log(camera);
}

Setup();