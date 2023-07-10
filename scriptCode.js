import * as THREE from './src/three.module.js';           
import TWEEN from './src/tween.module.js';
import { ArcballControls } from './src/ArcballControls.js';
import { GLTFLoader } from './src/GLTFLoader.js';

var camera, scene, renderer, object, controls, importObj;

init();
animate();

function init(){
    
  //Scene
    scene = new THREE.Scene();

  //Camera
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0,5,10);

  //Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('container').appendChild( renderer.domElement );

 //Control
    controls = new ArcballControls( camera, renderer.domElement ); //add scene to visible Gizmo
    controls.addEventListener( 'change', render );
    controls.minDistance = 1;
    controls.maxDistance = 10;

  
 //window reset
    window.addEventListener( 'resize', onWindowResize );

  //Adding Element
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
    object = new THREE.Mesh( geometry, material );
    object.position.set(0,0,0);
    
    // scene.add(object);

  //Import GLB
    const loader = new GLTFLoader();
    importObj = new THREE.Object3D();


    loader.load('./media/Ring_stick.glb' , function (glb) { 
      importObj.add(glb.scene);
     },
     function (xhr){
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
     },
     function( error) {
      console.log( 'An error happened' );
     }
    );
     
    scene.add(importObj) ;
    scene.add(object);
    render();
    
  //Adding Light
    const lightAmb = new THREE.AmbientLight( 0x404040 );
    const lightDir = new THREE.DirectionalLight (0xfffffff, 0.75)
    lightDir.position.set(10,10,10);

    scene.add(lightAmb);
    scene.add(lightDir);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();
}

function animate(){
    requestAnimationFrame( animate );
    object.rotation.x += 0.01;
    object.rotation.y +=0.01;
    importObj.rotation.y +=-0.01;

    controls.update();

    render();
}

function render(){
    renderer.render( scene, camera);
}
