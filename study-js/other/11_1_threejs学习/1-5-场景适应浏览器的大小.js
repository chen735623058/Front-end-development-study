var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
var renderer = new THREE.WebGLRenderer();
var cube;
var sphere;
var globstats;
var plane;
function init() {
    globstats = initStats();
    initgui();
    renderer.setClearColorHex(0xEEEEEE);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMapEnabled = true;
    var axes = new THREE.AxisHelper(10);
    scene.add(axes);

    var planeGemetry = new THREE.PlaneGeometry(60,20,1,1);
    var planeMaterial = new THREE.MeshLambertMaterial({color:0xcccccc});
    plane = new THREE.Mesh(planeGemetry,planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = controls.planeX;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow =  true;
    scene.add(plane);

    var cubeGeometry = new THREE.BoxGeometry(4,4,4);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:0xff0000});
    cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    cube.castShadow = true;
    scene.add(cube);

    var sphereGeomtry = new THREE.SphereGeometry(4,20,20);
    var sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
    sphere = new THREE.Mesh(sphereGeomtry,sphereMaterial);
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;
    scene.add(sphere);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40,60,-10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    window.addEventListener('resize',onResize,false)
    renderScene();

}

var step = 0;
function renderScene() {
    plane.position.x = controls.planeX;
    plane.position.y = controls.planeY;
    plane.position.z = controls.planeZ;
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    step += controls.bouncingSpeed;
    sphere.position.x = 20+(10*(Math.cos(step)));
    sphere.position.y = 2+(10*Math.abs(Math.sin(step)));
    globstats.update();
    requestAnimationFrame(renderScene);
    renderer.render(scene,camera);
}

// 初始化帧检测器
function initStats() {
    var stats = new Stats();
    // 这个参数为0  检测的是画面每秒传入帧数（fps） 如果是1 检测的是画面渲染时间
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById("Stats-output").appendChild(stats.domElement);
    return stats
}

// 初始化控制器
var controls = new function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
    this.planeX = 0;
    this.planeY = 0;
    this.planeZ = 0;
}


function initgui() {
    var gui = new dat.GUI();
    gui.add(controls,'rotationSpeed',0,0.5);
    gui.add(controls,'bouncingSpeed',0,0.5);
    gui.add(controls,'planeX',0,100);
    gui.add(controls,'planeY',0,100);
    gui.add(controls,'planeZ',0,100);

}

function onResize() {
    // 这个属性是表示屏幕的长宽比
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}
