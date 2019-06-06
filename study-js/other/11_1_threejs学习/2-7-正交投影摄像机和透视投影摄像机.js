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
    var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.x = 120;
    camera.position.y = 60;
    camera.position.z = 180;


    scene.add(camera);
    var axes = new THREE.AxisHelper(20);
    scene.add(axes);
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xeeeeee,1.0));
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMapEnabled = true;

    var planGeometry = new  THREE.PlaneGeometry(180,180);
    var planMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
    var plane = new THREE.Mesh(planGeometry,planMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    var cubeGeometry = new THREE.BoxGeometry(4,4,4);
    for (var j = 0; j <(planGeometry.parameters.height/5); j++) {
        for (var i = 0; i < planGeometry.parameters.width/5; i++) {
            var rnd = Math.random() * 0.75 + 0.25;
            var cubeMaterial = new THREE.MeshLambertMaterial();
            cubeMaterial.color = new THREE.Color(rnd,0,0);
            var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
            cube.position.z = -((planGeometry.parameters.height)/2) + 2 +(j*5);
            cube.position.x = -((planGeometry.parameters.width)/2) + 2 +(i*5);
            cube.position.y = 2;
            scene.add(cube);
        }
    }
    var directionalLight = new THREE.DirectionalLight(0xffffff,0.7);
    directionalLight.position.set(-20,40,60);
    scene.add(directionalLight);
    var ambientLight = new THREE.AmbientLight(0x292929);
    scene.add(ambientLight);
    document.getElementById('WebGL-output').appendChild(renderer.domElement);
    var controls = new function () {
        this.perspective = "Perspective";
        this.switchCamera = function () {
            if(camera instanceof THREE.PerspectiveCamera){
                camera = new THREE.OrthographicCamera(window.innerWidth/-16,window.innerWidth/16,window.innerHeight/16,window.innerHeight/-16,-200,500);
                camera.position.x = 120;
                camera.position.y = 60;
                camera.position.z = 180;
                camera.lookAt(scene.position);
                this.perspective = "Orthographic";
            }else{
                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.x = 120;
                camera.position.y = 60;
                camera.position.z = 180;
                camera.lookAt(scene.position);
                this.perspective = "Perspective";
            }
        }
    };


    var gui = new dat.GUI();
    gui.add(controls, 'switchCamera');
    gui.add(controls, 'perspective').listen();

    // make sure that for the first time, the
    // camera is looking at the scene
    camera.lookAt(scene.position);

    render();

    function render() {
        stats.update();
        cube.visible = controls.visible;
        cube.rotation.x = controls.rotationX;
        cube.rotation.y = controls.rotationY;
        cube.rotation.z = controls.rotationZ;
        cube.scale.set(controls.scaleX,controls.scaleY,controls.scaleZ);
        requestAnimationFrame(render);
        renderer.render(scene,camera);
    }
    
}