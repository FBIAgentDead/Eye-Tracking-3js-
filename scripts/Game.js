
let camera;
let width = window.innerWidth;
let height = window.innerHeight;
function Setup() {
    console.log("oof");
    // camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 10);
    camera = new THREE.OrthographicCamera(width/-2, width/2, height/2, height/-2, 1, 1000);
    console.log(camera);

}

Setup();