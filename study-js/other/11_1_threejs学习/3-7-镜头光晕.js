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

    var stats = initStats();
    var scene = new THREE.Scene();
     scene.fog = new THREE.Fog(0xaaaaaa,0.010,200);

    var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
    var randerer = new THREE.WebGLRenderer({antialias:true,alpha:true});
    randerer.setClearColor(new THREE.Color(0xaaaaff,1.0));
    randerer.setSize(window.innerWidth,window.innerHeight);
    randerer.shadowMapEnabled = true;
    // 加载纹理
    var textureGrass = THREE.ImageUtils.loadTexture("assets/textures/ground/grasslight-big.jpg");
    textureGrass.wrapS = THREE.RepeatWrapping;
    textureGrass.wrapT = THREE.RepeatWrapping;
    textureGrass.repeat.set(4, 4);

    var planGeometry = new  THREE.PlaneGeometry(1000,200,20,20);
    var planMaterial = new THREE.MeshLambertMaterial({map:textureGrass});
    var plane = new THREE.Mesh(planGeometry,planMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff3333});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(4, 25, 25);
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 10;
    sphere.position.y = 5;
    sphere.position.z = 10;
    sphere.castShadow = true;
    scene.add(sphere);


    camera.position.x = -20;
    camera.position.y = 15;
    camera.position.z = 45;
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    var ambiColor = "#1c1c1c";
    var ambientLight = new THREE.AmbientLight(ambiColor);
    scene.add(ambientLight);

    var spotLight0 = new THREE.SpotLight(0xcccccc);
    spotLight0.position.set(-40, 60, -10);
    spotLight0.lookAt(plane);
    scene.add(spotLight0);


    var target = new THREE.Object3D();
    target.position = new THREE.Vector3(5, 0, 0);

    var directionalLightColor = "#ffffff";
//    var spotLight = new THREE.SpotLight( pointColor);
    var directionalLight = new THREE.DirectionalLight(directionalLightColor);
    directionalLight.position.set(30, 10, -50);
    directionalLight.castShadow = true;
    directionalLight.shadowCameraNear = 0.1;
    directionalLight.shadowCameraFar = 100;
    directionalLight.shadowCameraFov = 50;
    directionalLight.target = plane;
    directionalLight.distance = 0;
    directionalLight.shadowCameraNear = 2;
    directionalLight.shadowCameraFar = 200;
    directionalLight.shadowCameraLeft = -100;
    directionalLight.shadowCameraRight = 100;
    directionalLight.shadowCameraTop = 100;
    directionalLight.shadowCameraBottom = -100;
    directionalLight.shadowMapWidth = 2048;
    directionalLight.shadowMapHeight = 2048;


    // scene.add(directionalLight);



    document.getElementById('WebGL-output').appendChild(randerer.domElement);

    var step = 0;
    var controls = new function () {
        this.rotationSpeed = 0.03;
        this.bouncingSpeed = 0.03;
        this.ambientColor = ambiColor;
        this.directionalLightColor = directionalLightColor;
        this.intensity = 0.1;
        this.distance = 0;
        this.exponent = 30;
        this.angle = 0.1;
        this.debug = false;
        this.castShadow = true;
        this.onlyShadow = false;
        this.target = "Plane";
    };

    var gui = new dat.GUI();
    gui.addColor(controls, 'ambientColor').onChange(function (e) {
        ambientLight.color = new THREE.Color(e);
    });

    gui.addColor(controls, 'directionalLightColor').onChange(function (e) {
        directionalLight.color = new THREE.Color(e);
    });

    gui.add(controls, 'intensity', 0, 5).onChange(function (e) {
        directionalLight.intensity = e;
    });
    // 增加镜头光晕
    var textureFlare0 = THREE.ImageUtils.loadTexture("assets/textures/lensflare/lensflare0.png");
    var textureFlare3 = THREE.ImageUtils.loadTexture("assets/textures/lensflare/lensflare3.png");

    var flareColor = new THREE.Color(0xffaacc);
    var lensFlare = new THREE.LensFlare(textureFlare0, 350, 0.0, THREE.AdditiveBlending, flareColor);

    lensFlare.add(textureFlare3, 60, 0.6, THREE.AdditiveBlending);
    lensFlare.add(textureFlare3, 70, 0.7, THREE.AdditiveBlending);
    lensFlare.add(textureFlare3, 120, 0.9, THREE.AdditiveBlending);
    lensFlare.add(textureFlare3, 70, 1.0, THREE.AdditiveBlending);

    lensFlare.position.copy(directionalLight.position);
    scene.add(lensFlare);

    render();

    function render() {
        stats.update();
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;
        step += controls.bouncingSpeed;
        sphere.position.x = 20 + ( 10 * (Math.cos(step)));
        sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));
        requestAnimationFrame(render);
        randerer.render(scene, camera);
    }

}