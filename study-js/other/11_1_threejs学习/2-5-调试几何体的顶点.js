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

    camera.position.x = -20;
    camera.position.y = 25;
    camera.position.z = 20;
    camera.lookAt(new THREE.Vector3(5,0,0));

    // 聚光灯
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40,60,10);
    spotLight.castShadow = true;
    scene.add(spotLight);


    document.getElementById('WebGL-output').appendChild(renderer.domElement);
    var step = 0;
    // 定义顶点
    var vertices = [
        new THREE.Vector3(1, 3, 1),
        new THREE.Vector3(1, 3, -1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 3, -1),
        new THREE.Vector3(-1, 3, 1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-1, -1, 1)
    ];
    // 定义面 面中参数是顶点的序号
    var faces = [
        new THREE.Face3(0, 2, 1),
        new THREE.Face3(2, 3, 1),
        new THREE.Face3(4, 6, 5),
        new THREE.Face3(6, 7, 5),
        new THREE.Face3(4, 5, 1),
        new THREE.Face3(5, 0, 1),
        new THREE.Face3(7, 6, 2),
        new THREE.Face3(6, 3, 2),
        new THREE.Face3(5, 7, 0),
        new THREE.Face3(7, 2, 0),
        new THREE.Face3(1, 3, 4),
        new THREE.Face3(3, 6, 4),
    ];

    var geom = new THREE.Geometry();
    geom.vertices= vertices;
    geom.faces = faces;
    // 计算法向量（使得相应光照和阴影）
    geom.computeFaceNormals();
    var materials = [
        new THREE.MeshLambertMaterial({opacity:0.6,color:0x44ff44,transparent:true}),
        new THREE.MeshBasicMaterial({color:0x000000,wireframe:true})
    ]
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom,materials);
    mesh.children.forEach(
        function (e) {
            e.castShadow = true;
        }
    );
    scene.add(mesh);

    function addControl(x,y,z) {
        var controls = new function () {
            this.x = x;
            this.y = y;
            this.z = z;
        };
        return controls;
    }

    var controlPoints = [];
    controlPoints.push(addControl(3,5,3));
    controlPoints.push(addControl(3,5,0));
    controlPoints.push(addControl(3,0,3));
    controlPoints.push(addControl(3,0,0));
    controlPoints.push(addControl(0,5,0));
    controlPoints.push(addControl(0,5,3));
    controlPoints.push(addControl(0,0,0));
    controlPoints.push(addControl(0,0,3));

    
    var gui = new dat.GUI();
    gui.add(new function () {
        this.clone = function () {
            var clonedGeometry = mesh.children[0].geometry.clone();
            var materials = [
                new THREE.MeshLambertMaterial({opacity:0.6,color:0x44ff44,transparent:true}),
                new THREE.MeshBasicMaterial({color:0x000000,wireframe:true})
            ];
            var mesh2 = THREE.SceneUtils.createMultiMaterialObject(clonedGeometry,materials);
            mesh2.children.forEach(function (e) {
                e.castShadow = true
            });

            mesh2.translateX(5);
            mesh2.translateZ(5);
            mesh2.name = "clone";
            scene.remove(scene.getChildByName("clone"));
            scene.add(mesh2);
        }
    },'clone');
    for(var i=0;i<8;i++){
        f1 = gui.addFolder('Vertices ' + (i + 1));
        f1.add(controlPoints[i], 'x', -10, 10);
        f1.add(controlPoints[i], 'y', -10, 10);
        f1.add(controlPoints[i], 'z', -10, 10);
    }

    render();

    function render() {
        stats.update();
        var vertices = [];
        for(var i=0;i<8;i++){
            vertices.push(new THREE.Vector3(controlPoints[i].x,controlPoints[i].y,controlPoints[i].z))
        }
        mesh.children.forEach(
            function (e) {
                e.geometry.vertices = vertices;
                e.geometry.verticesNeedUpdate = true;
                e.geometry.computeFaceNormals();
            }
        )
        requestAnimationFrame(render);
        renderer.render(scene,camera);
    }
    
}