 
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, 1. , 0.1, 1000 );

container = document.createElement( 'div' );
container.setAttribute('id', 'canvas_container');
var plot_container = document.getElementById( 'plot_container' );
// document.body.appendChild( container );
plot_container.appendChild( container );

var winSize = 0.4 * window.innerWidth;
console.log('winsize', winSize);


//var renderer = new THREE.WebGLRenderer();
var renderer = new THREE.WebGLRenderer( { antialias: true } );
// var renderer = new THREE.CanvasRenderer( { antialias: true } );
renderer.setSize( winSize, winSize );
renderer.setClearColor( 0xeeeeee );
container.appendChild( renderer.domElement );

stats = new Stats();
stats.domElement.style.position = 'absolute'
stats.domElement.style.top = '0px';
stats.domElement.style.right = '0px';
document.body.appendChild( stats.domElement )

var material = new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0.5, ambient: 0xffffff, shading: THREE.SmoothShading } )

scene.add( new THREE.AmbientLight( 0x333333 ) );

var pointLight = new THREE.PointLight( 0xff0000, 0.7);
pointLight.position.x = 40;
pointLight.position.y = 40;
pointLight.position.z = 0;
scene.add(pointLight);

var pointLight2 = new THREE.PointLight( 0x00ff00, 0.7);
pointLight2.position.x = -40; 
pointLight2.position.y = 40;
pointLight2.position.z = 0;
scene.add(pointLight2);

var pointLight2 = new THREE.PointLight( 0x0000ff, 0.7);
pointLight2.position.x = 0; 
pointLight2.position.y = -40;
pointLight2.position.z = -0;
scene.add(pointLight2);

var pointLight4 = new THREE.PointLight( 0xffffff, 0.5);
pointLight4.position.x = 0; 
pointLight4.position.y = 0;
pointLight4.position.z = 0;
scene.add(pointLight4);

camera.near = 0;
camera.far = 4;

controls = new THREE.OrbitControls( camera, renderer.domElement );
console.log( 'domelement', renderer.domElement );

LinearInterpolationCurve = THREE.Curve.create(
    function ( points ) {
        this.points = points;
    },
    function ( t ) {
        var index = Math.floor( t * this.points.length );
        var v1 = this.points[index % this.points.length].clone();
        var v2 = this.points[(index + 1) % this.points.length].clone();
        
        var diff = new THREE.Vector3().subVectors( v2, v1 );
        
        return v1.add( diff.multiplyScalar( (t * this.points.length) - index ) );

    }
)


function render() { 
    requestAnimationFrame( render ); 
    stats.begin();
    renderer.render( scene, camera ); 
    stats.end();
} 
render();
