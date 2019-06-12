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
    var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xeeeeee,1.0));
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMapEnabled = true;
    // 设置生成更柔和的阴影
    renderer.shadowMapType = THREE.PCFSoftShadowMap;


    var planGeometry = new  THREE.PlaneGeometry(600,200,20,20);
    var planMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
    var plane = new THREE.Mesh(planGeometry,planMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = -5;
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
    var sphereGeomtry = new THREE.SphereGeometry(4,20,20);
    var sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
    var sphere = new THREE.Mesh(sphereGeomtry,sphereMaterial);
    sphere.position.x = 20;
    sphere.position.y = 0;
    sphere.position.z = 2;
    sphere.castShadow = true;
    scene.add(sphere);
    camera.position.x = -350;
    camera.position.y = 300;
    camera.position.z = 250;
    camera.lookAt(new THREE.Vector3(10,0,0));

    var ambiColor = "#1c1c1c";
    var ambientLight = new THREE.AmbientLight(ambiColor);
    scene.add(ambientLight);


    var target = new THREE.Object3D();
    target.position  = new THREE.Vector3(5,0,0);


    var directionColor = "#FFFFFF";
    var directionalLight = new THREE.DirectionalLight(directionColor);
    directionalLight.position.set(-40,60,-10);
    directionalLight.castShadow = true;
    directionalLight.shadowCameraNear = 2;
    directionalLight.shadowCameraFar = 200;
    directionalLight.shadowCameraLeft = -50;
    directionalLight.shadowCameraRight = 50;
    directionalLight.shadowCameraTop = 50;
    directionalLight.shadowCameraBottom = -50;
    directionalLight.distance = 0; // 光源的方向
    directionalLight.intensity = 0.5; // 光源的强度
    directionalLight.shadowMapHeight = 1024;
    directionalLight.shadowMapWidth = 1024;
    scene.add(directionalLight);
    // 模拟一个发光顶的小球


    var sphereLight = new THREE.SphereGeometry(0.2);
    var sphereLightMaterial = new THREE.MeshBasicMaterial({color:0xac6c25});
    var sphereLightMesh = new THREE.Mesh(sphereLight,sphereLightMaterial);
    sphereLightMesh.castShadow = true;
    sphereLightMesh.position = new THREE.Vector3(3,20,3);
    scene.add(sphereLightMesh);
    document.getElementById('WebGL-output').appendChild(renderer.domElement);


    var step = 0;
    var controls = new function () {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
        this.ambientColor = ambiColor;
        this.directionColor = directionColor;
        this.intensity = 0.5;
        this.distance = 0;
        this.exponent = 30;
        this.angle = 0.1;
        this.debug = false;
        this.castShadow = true;
        this.onlyShadow = false;
        this.target = "Plane";
        this.stopMovingLight = false;
    };


    var gui = new dat.GUI();
    gui.addColor(controls, 'ambientColor').onChange(function (e) {
        ambientLight.color = new THREE.Color(e);
    });

    gui.addColor(controls, 'directionColor').onChange(function (e) {
        directionalLight.color = new THREE.Color(e);
    });

    gui.add(controls, 'intensity', 0, 5).onChange(function (e) {
        directionalLight.intensity = e;
    });

    gui.add(controls, 'distance', 0, 200).onChange(function (e) {
        directionalLight.distance = e;
    });


    gui.add(controls, 'debug').onChange(function (e) {
        directionalLight.shadowCameraVisible = e;
    });

    gui.add(controls, 'castShadow').onChange(function (e) {
        directionalLight.castShadow = e;
    });

    gui.add(controls, 'onlyShadow').onChange(function (e) {
        directionalLight.onlyShadow = e;
    });
    gui.add(controls,'target',['Plane','Sphere','Cube']).onChange(function (e) {
        console.log(e);
        switch (e){
            case "Plane":
                directionalLight.target = plane;
                break;
            case "Sphere":
                directionalLight.target = sphere;
                break;
            case "Cube":
                directionalLight.target = cube;
                break;
        }
    });
    gui.add(controls, 'stopMovingLight').onChange(function (e) {
        stopMovingLight = e;
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
        if(!stopMovingLight){
            sphereLightMesh.position.z = -8;
            sphereLightMesh.position.y = +(27 * (Math.sin(step / 3)));
            sphereLightMesh.position.x = 10 + (26 * (Math.cos(step / 3)));
            directionalLight.position.copy(sphereLightMesh.position);
        }

        requestAnimationFrame(render);
        renderer.render(scene,camera);
    }

}