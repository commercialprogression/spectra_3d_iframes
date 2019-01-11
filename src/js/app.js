/**
 * @file
 * The main application.
 */

import * as THREE from 'three';
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader';
import * as OrbitControls from 'three-orbitcontrols';

// Set globals for 3d rendering.
let threeDObjects = document.querySelectorAll(".threed-object[data-mtl]");
let renderers = {};

/**
 * Main loop to instantiate models.
 */
threeDObjects.forEach(function(tDObject, index){
  let threes = {};

  // Camera.
  threes.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 300);
  threes.camera.position.z = 3;

  // Scene.
  threes.scene = new THREE.Scene();
  threes.lighting = false;
  threes.ambient = new THREE.AmbientLight(0xffffff, 1.0);
  threes.scene.add(threes.ambient);
  threes.keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
  threes.keyLight.position.set(-100, 0, 100);
  threes.fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
  threes.fillLight.position.set(100, 0, 100);
  threes.backLight = new THREE.DirectionalLight(0xffffff, 1.0);
  threes.backLight.position.set(100, 0, -100).normalize();

  // Load the model and objects.
  var mtlLoader = new MTLLoader();
  mtlLoader.setPath('3d/');
  mtlLoader.load(tDObject.dataset.mtl, function (materials) {
    materials.preload();
    console.log(materials);
    //materials.materials.default.map.magFilter = THREE.NearestFilter;
    //materials.materials.default.map.minFilter = THREE.LinearFilter;

    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('3d/');
    objLoader.load(tDObject.dataset.obj, function (object) {
      threes.scene.add(object);
    });
  });

  // Create a renderer.
  threes.renderer = new THREE.WebGLRenderer();
  threes.renderer.setPixelRatio(window.devicePixelRatio);
  threes.renderer.setSize(window.innerWidth, window.innerHeight);
  threes.renderer.setClearColor(new THREE.Color("#000000"));

  // Controls.
  threes.controls = new THREE.OrbitControls(threes.camera, threes.renderer.domElement);
  threes.controls.enableDamping = true;
  threes.controls.dampingFactor = 0.25;
  threes.controls.enableZoom = true;

  // Event
  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('keydown', onKeyboardEvent, false);

  // Store the three.js generator in the DOM Node for later if needed.
  tDObject.three = threes;
  renderers[index] = threes;

  // Replace the text with the rendering.
  tDObject.innerHTML = '';
  tDObject.appendChild(tDObject.three.renderer.domElement);
  tDObject.three.controls.update();
  tDObject.three.renderer.render(tDObject.three.scene, tDObject.three.camera);
});

function onWindowResize() {
  Object.keys(renderers).forEach(function(key) {
    var thisRend = renderers[key];
    thisRend.camera.aspect = window.innerWidth / window.innerHeight;
    thisRend.camera.updateProjectionMatrix();
    thisRend.renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function onKeyboardEvent(e) {
  if (e.code === 'KeyL') {
    // Mess with lighting.
    Object.keys(renderers).forEach(function(key) {
      var thisRend = renderers[key];
      if (thisRend.lighting) {
        thisRend.ambient.intensity = 0.25;
        thisRend.scene.add(thisRend.keyLight);
        thisRend.scene.add(thisRend.fillLight);
        thisRend.scene.add(thisRend.backLight);
      }
      else {
        thisRend.ambient.intensity = 1.0;
        thisRend.scene.remove(thisRend.keyLight);
        thisRend.scene.remove(thisRend.fillLight);
        thisRend.scene.remove(thisRend.backLight);
      }
    });
  }
}

function animate() {
  requestAnimationFrame(animate);

  Object.keys(renderers).forEach(function(key) {
    var thisRend = renderers[key];
    thisRend.renderer.render(thisRend.scene, thisRend.camera);
  });
}
animate();
