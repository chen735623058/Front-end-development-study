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
    // scene.fog = new THREE.Fog(0XFFFFFF,0.015,100);
    scene.fog = new THREE.FogExp2(0XFFFFFF,0.01);
    var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
    scene.add(camera);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xeeeeee,1.0));
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMapEnabled = true;

    var planGeometry = new  THREE.PlaneGeometry(60,40,1,1);
    var planMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
    var plane = new THREE.Mesh(planGeometry,planMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // 环境光
    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    // 聚光灯
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40,60,-10);
    spotLight.castShadow = true;
    scene.add(spotLight);


    document.getElementById('WebGL-output').appendChild(renderer.domElement);
    var step = 0;
    var controls = new  function () {
        this.rotationSpeed = 0.02;
        this.numberofObjects = scene.children.length;
        this.removeCube = function () {
            var allChildren = scene.children;
            var lastObject = allChildren[allChildren.length-1];
            if(lastObject instanceof THREE.Mesh){
                scene.remove(lastObject);
                this.numberofObjects = scene.children.length;
            }
        };
        this.addCube = function () {
            var cubeSize = Math.ceil(Math.random()*3);
            var cubeGeometry = new THREE.BoxGeometry(cubeSize,cubeSize,cubeSize);
            var cubeMaterial = new THREE.MeshLambertMaterial({color:Math.random()*0xffffff});
            var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
            cube.castShadow = true;
            cube.name = "cube-"+scene.children.length;
            cube.position.x = -30 + Math.round((Math.random() * planGeometry.parameters.width));
            cube.position.y = Math.round((Math.random() * 5));
            cube.position.z = -20 + Math.round((Math.random() * planGeometry.parameters.height));
            scene.add(cube);
            this.numberofObjects = scene.children.length;
        };
        this.outputObjects = function () {
            console.log(scene.children);
        }
    };

    var gui = new dat.GUI();
    gui.add(controls,'rotationSpeed',0,0.5);
    gui.add(controls,'addCube');
    gui.add(controls,'removeCube');
    gui.add(controls,'outputObjects');
    gui.add(controls,'numberofObjects').listen();

    render();

    function render() {
        stats.update();
        scene.traverse(function (e) {
            if(e instanceof  THREE.Mesh && e != plane){
                e.rotation.x += controls.rotationSpeed;
                e.rotation.y += controls.rotationSpeed;
                e.rotation.z += controls.rotationSpeed;
            }
        });
        requestAnimationFrame(render);
        renderer.render(scene,camera);
    }
    
}