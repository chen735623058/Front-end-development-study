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


    var planGeometry = new  THREE.PlaneGeometry(60,20,1,1);
    var planMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
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
    var sphereGeomtry = new THREE.SphereGeometry(4,20,20);
    var sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
    var sphere = new THREE.Mesh(sphereGeomtry,sphereMaterial);
    sphere.position.x = 20;
    sphere.position.y = 0;
    sphere.position.z = 2;
    sphere.castShadow = true;
    scene.add(sphere);
    camera.position.x = -35;
    camera.position.y = 30;
    camera.position.z = 25;
    camera.lookAt(new THREE.Vector3(10,0,0));

    var ambiColor = "#1c1c1c";
    var ambientLight = new THREE.AmbientLight(ambiColor);
    scene.add(ambientLight);

    // 创建聚光灯
    var sportLight0 = new THREE.SpotLight(0xcccccc);
    sportLight0.position.set(-40,30,-10);
    sportLight0.lookAt(plane);
    scene.add(sportLight0);

    var target = new THREE.Object3D();
    target.position  = new THREE.Vector3(5,0,0);


    var spotColor = "#FFFFFF";
    var spotLight = new THREE.SpotLight(spotColor);
    spotLight.position.set(-40,60,-10);
    spotLight.castShadow = true;
    spotLight.shadowCameraNear = 2;
    spotLight.shadowCameraFar = 200;
    spotLight.shadowCameraFov = 30;
    spotLight.target = plane;
    spotLight.distance = 0;
    spotLight.angle = 0.4
    scene.add(spotLight);
    // 模拟一个发光顶的小球


    var sphereLight = new THREE.SphereGeometry(0.2);
    var sphereLightMaterial = new THREE.MeshBasicMaterial({color:0xac6c25});
    var sphereLightMesh = new THREE.Mesh(sphereLight,sphereLightMaterial);
    sphereLightMesh.castShadow = true;
    sphereLightMesh.position = new THREE.Vector3(3,20,3);
    scene.add(sphereLightMesh);
    document.getElementById('WebGL-output').appendChild(renderer.domElement);


    var step = 0;
    // 用户确定灯光动画的切换点
    var invert = 1;
    var phase = 0;

    var controls = new function () {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
        this.ambientColor = ambiColor;
        this.pointColor = spotColor;
        this.intensity = 1;
        this.distance = 100;
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

    gui.addColor(controls, 'pointColor').onChange(function (e) {
        spotLight.color = new THREE.Color(e);
    });

    gui.add(controls, 'angle', 0, Math.PI * 2).onChange(function (e) {
        spotLight.angle = e;
    });

    gui.add(controls, 'intensity', 0, 5).onChange(function (e) {
        spotLight.intensity = e;
    });

    gui.add(controls, 'distance', 0, 200).onChange(function (e) {
        spotLight.distance = e;
    });

    gui.add(controls, 'exponent', 0, 100).onChange(function (e) {
        spotLight.exponent = e;
    });

    gui.add(controls, 'debug').onChange(function (e) {
        spotLight.shadowCameraVisible = e;
    });

    gui.add(controls, 'castShadow').onChange(function (e) {
        spotLight.castShadow = e;
    });

    gui.add(controls, 'onlyShadow').onChange(function (e) {
        spotLight.onlyShadow = e;
    });
    gui.add(controls,'target',['Plane','Sphere','Cube']).onChange(function (e) {
        console.log(e);
        switch (e){
            case "Plane":
                spotLight.target = plane;
                break;
            case "Sphere":
                spotLight.target = sphere;
                break;
            case "Cube":
                spotLight.target = cube;
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
            if(phase >2 * Math.PI){
                invert = invert * -1;
                phase -= 2 * Math.PI;
            }else {
                phase += controls.rotationSpeed;
            }
            sphereLightMesh.position.z = +(7 * (Math.sin(phase)));
            sphereLightMesh.position.x = +(14 * (Math.cos(phase)));
            sphereLightMesh.position.y = 5;
            if (invert < 0) {
                var pivot = 14;
                sphereLightMesh.position.x = (invert * (sphereLightMesh.position.x - pivot)) + pivot;
            }
            spotLight.position.copy(sphereLightMesh.position);
        }

        requestAnimationFrame(render);
        renderer.render(scene,camera);
    }

}