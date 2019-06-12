/**
 * create by sxf on 2019/6/5.
 * 功能:
 */

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

function init() {
    var stopMovingLight = false;
    var stats = initStats();
    var scene = new THREE.Scene();
    // 增加场景雾化
    scene.fog = new THREE.Fog(0xaaaaaa,0.010,200);

    var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xeeeeee,1.0));
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMapEnabled = true;

    var textureGrass = THREE.ImageUtils.loadTexture("assets/textures/ground/grasslight-big.jpg")
    textureGrass.wrapS = THREE.RepeatWrapping;
    textureGrass.wrapT = THREE.RepeatWrapping;
    textureGrass.repeat.set(10,10);

    var planGeometry = new  THREE.PlaneGeometry(1000,200,20,20);
    var planMaterial = new THREE.MeshLambertMaterial({map:textureGrass});
    var plane = new THREE.Mesh(planGeometry,planMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    var cubeGeometry = new THREE.BoxGeometry(4,4,4);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:0xff3333});
    var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    cube.castShadow = true;
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    scene.add(cube);
    var sphereGeomtry = new THREE.SphereGeometry(4,25,25);
    var sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
    var sphere = new THREE.Mesh(sphereGeomtry,sphereMaterial);
    sphere.position.x = 10;
    sphere.position.y = 5;
    sphere.position.z = 10;
    sphere.castShadow = true;
    scene.add(sphere);
    camera.position.x = -20;
    camera.position.y = 15;
    camera.position.z = 45;
    camera.lookAt(new THREE.Vector3(10,0,0));


    var spotLight0 = new THREE.SpotLight(0xcccccc);
    spotLight0.position.set(-40,60,-10);
    spotLight0.lookAt(plane);
    scene.add(spotLight0);


    var target = new THREE.Object3D();
    target.position  = new THREE.Vector3(5,0,0);


    // 半球光源
    var hemiLight = new THREE.HemisphereLight(0x0000ff,0x00ff00,0.6);
    hemiLight.position.set(0,500,0);
    scene.add(hemiLight);


    var pointColor = "#ffffff";
    var dirLight = new THREE.DirectionalLight(pointColor);
    dirLight.position.set(30, 10, -50);
    dirLight.castShadow = true;
    dirLight.target = plane;
    dirLight.shadowCameraNear = 0.1;
    dirLight.shadowCameraFar = 200;
    dirLight.shadowCameraLeft = -50;
    dirLight.shadowCameraRight = 50;
    dirLight.shadowCameraTop = 50;
    dirLight.shadowCameraBottom = -50;
    dirLight.shadowMapWidth = 2048;
    dirLight.shadowMapHeight = 2048;

    scene.add(dirLight);
    document.getElementById('WebGL-output').appendChild(renderer.domElement);


    var step = 0;
    var controls = new function () {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
        this.hemisphere = true;
        this.color = 0x00ff00;
        this.skyColor = 0x0000ff;
        this.intensity = 0.6;
    };


    var gui = new dat.GUI();

    gui.add(controls, 'hemisphere').onChange(function (e) {

        if (!e) {
            hemiLight.intensity = 0;
        } else {
            hemiLight.intensity = controls.intensity;
        }
    });
    gui.addColor(controls, 'color').onChange(function (e) {
        hemiLight.groundColor = new THREE.Color(e);
    });
    gui.addColor(controls, 'skyColor').onChange(function (e) {
        hemiLight.color = new THREE.Color(e);
    });
    gui.add(controls, 'intensity', 0, 5).onChange(function (e) {
        hemiLight.intensity = e;
    });
    render();

    function render() {
        stats.update();
        // rotate the cube around its axes
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        // bounce the sphere up and down
        step += controls.bouncingSpeed;
        sphere.position.x = 20 + ( 10 * (Math.cos(step)));
        sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));

        requestAnimationFrame(render);
        renderer.render(scene,camera);
    }

}