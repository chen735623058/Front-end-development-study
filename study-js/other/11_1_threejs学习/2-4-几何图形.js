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
    scene.overrideMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
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

    camera.position.x = -50;
    camera.position.y = 30;
    camera.position.z = 20;
    camera.lookAt(new THREE.Vector3(-10,0,0));

    // 环境光
    var ambientLight = new THREE.AmbientLight(0x090909);
    scene.add(ambientLight);

    // 聚光灯
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40,40,50);
    spotLight.castShadow = true;
    scene.add(spotLight);

    addGeometries(scene);
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
    
    
    function addGeometries(scene) {
        var geoms = [];
        geoms.push(new THREE.CircleGeometry(1,4,4));
        geoms.push(new THREE.BoxGeometry(2,2,2));
        geoms.push(new THREE.SphereGeometry(2));
        geoms.push(new THREE.IcosahedronGeometry(4));
        var points = [
          new THREE.Vector3(2,2,2),
          new THREE.Vector3(2,2,-2),
          new THREE.Vector3(-2,2,-2),
          new THREE.Vector3(-2,2,2),
          new THREE.Vector3(2,-2,2),
          new THREE.Vector3(2,-2,-2),
          new THREE.Vector3(-2,-2,-2),
          new THREE.Vector3(-2,-2,2)
        ];
        geoms.push(new THREE.ConvexGeometry(points));

        var pts = [];//points array - the path profile points will be stored here
        var detail = .1;//half-circle detail - how many angle increments will be used to generate points
        var radius = 3;//radius for half_sphere
        for (var angle = 0.0; angle < Math.PI; angle += detail)//loop from 0.0 radians to PI (0 - 180 degrees)
            pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));//angle/radius to x,z
        geoms.push(new THREE.LatheGeometry(pts, 12));

        // create a OctahedronGeometry
        geoms.push(new THREE.OctahedronGeometry(3));

        // create a geometry based on a function
        geoms.push(new THREE.ParametricGeometry(THREE.ParametricGeometries.mobius3d, 20, 10));

        //
        geoms.push(new THREE.TetrahedronGeometry(3));

        geoms.push(new THREE.TorusGeometry(3, 1, 10, 10));

        geoms.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20));

        var j = 0;
        for (var i = 0; i < geoms.length; i++) {
            var cubeMaterial = new THREE.MeshLambertMaterial({wireframe: true, color: Math.random() * 0xffffff});

            var materials = [

                new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff, shading: THREE.FlatShading}),
                new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})

            ];

            var mesh = THREE.SceneUtils.createMultiMaterialObject(geoms[i], materials);
            mesh.traverse(function (e) {
                e.castShadow = true
            });

            //var mesh = new THREE.Mesh(geoms[i],materials[i]);
            //mesh.castShadow=true;
            mesh.position.x = -24 + ((i % 4) * 12);
            mesh.position.y = 4;
            mesh.position.z = -8 + (j * 12);

            if ((i + 1) % 4 == 0) j++;
            scene.add(mesh);
        }
    }
    
}