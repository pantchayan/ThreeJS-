import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

console.log(gsap);
// Scene
const scene = new THREE.Scene();

// Red cube {object}
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#ff0000" });
const cube1 = new THREE.Mesh(geometry, material);
cube1.position.x = 0;

scene.add(cube1);

// Green cube {object}
// const geometry2 = new THREE.BoxGeometry(1, 1, 1);
// const material2 = new THREE.MeshBasicMaterial({ color: "#00ff00" });
// const cube2 = new THREE.Mesh(geometry2, material2);
// cube2.position.x = 2;

// const group = new THREE.Group();
// group.add(cube1);
// group.add(cube2);
// scene.add(group)

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // updating sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // render update
  renderer.setSize(sizes.width, sizes.height);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// double click to fullscreen
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3;
camera.lookAt(cube1.position);
scene.add(camera);

// Canvas
const canvas = document.querySelector("canvas.webgl");

// ...

const controls = new OrbitControls(camera, canvas);
// controls.enabled =  false;
controls.enableDamping = true;
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// const clock = new THREE.Clock()

const tick = () => {
  // const elapsedTime = clock.getElapsedTime()

  // Update objects
  // cube1.rotation.y = elapsedTime* Math.PI *0.5;
  controls.update();
  // Render
  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
