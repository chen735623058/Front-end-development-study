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
    scene.add(camera);
    var axes = new THREE.AxisHelper(20);
    scene.add(axes);
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

    var ambientLight = new THREE.AmbientLight(0X0C0C0C);
    scene.add(ambientLight);

    // 聚光灯
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40,60,10);
    spotLight.castShadow = true;
    scene.add(spotLight);


    document.getElementById('WebGL-output').appendChild(renderer.domElement);
    var controls = new function () {
        this.scaleX = 1;
        this.scaleY = 1;
        this.scaleZ = 1;

        this.positionX = 0;
        this.positionY = 4;
        this.positionZ = 0;

        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
        this.scale = 1;

        this.translateX = 0;
        this.translateY = 0;
        this.translateZ = 0;

        this.visible = true;

        this.translate = function () {

            cube.translateX(controls.translateX);
            cube.translateY(controls.translateY);
            cube.translateZ(controls.translateZ);

            controls.positionX = cube.position.x;
            controls.positionY = cube.position.y;
            controls.positionZ = cube.position.z;
        }
    };
    var material = new THREE.MeshLambertMaterial({color:0x44ff44});
    var geom = new THREE.BoxGeometry(5,8,3);
    var cube = new THREE.Mesh(geom,material);
    cube.position.y = 4;
    cube.castShadow = true;
    scene.add(cube);

    var gui = new dat.GUI();
    guiScale = gui.addFolder('SCALE');
    guiScale.add(controls,'scaleX',0,5);
    guiScale.add(controls,'scaleY',0,5);
    guiScale.add(controls,'scaleZ',0,5);
    guiPosition = gui.addFolder('position');
    var contX = guiPosition.add(controls, 'positionX', -10, 10);
    var contY = guiPosition.add(controls, 'positionY', -4, 20);
    var contZ = guiPosition.add(controls, 'positionZ', -10, 10);
    contX.listen();
    contX.onChange(function (value) {
        cube.position.x = controls.positionX;
    });

    contY.listen();
    contY.onChange(function (value) {
        cube.position.y = controls.positionY;
    });

    contZ.listen();
    contZ.onChange(function (value) {
        cube.position.z = controls.positionZ;
    });
    guiRotation = gui.addFolder('rotation');
    guiRotation.add(controls, 'rotationX', -4, 4);
    guiRotation.add(controls, 'rotationY', -4, 4);
    guiRotation.add(controls, 'rotationZ', -4, 4);

    guiTranslate = gui.addFolder('translate');

    guiTranslate.add(controls, 'translateX', -10, 10);
    guiTranslate.add(controls, 'translateY', -10, 10);
    guiTranslate.add(controls, 'translateZ', -10, 10);
    guiTranslate.add(controls, 'translate');

    gui.add(controls, 'visible');

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