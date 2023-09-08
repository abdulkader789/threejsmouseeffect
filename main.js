import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(500, 500);
document.getElementById("canvas-container").appendChild(renderer.domElement);

renderer.setClearColor(0x000000, 0);

// Load the image texture

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("profile.png");
texture.minFilter = THREE.LinearFilter; // Set the filtering mode to LinearFilter

const geometry = new THREE.BoxGeometry(30, 30, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 30;

let mouseX = 0;
let mouseY = 0;
let isMouseInside = false;

// Add mouse enter and leave event listeners
document
  .getElementById("canvas-container")
  .addEventListener("mouseenter", () => {
    isMouseInside = true;
  });

document
  .getElementById("canvas-container")
  .addEventListener("mouseleave", () => {
    isMouseInside = false;
  });

document.addEventListener("mousemove", (event) => {
  if (isMouseInside) {
    const deltaX = event.clientX - mouseX;
    const deltaY = event.clientY - mouseY;

    cube.rotation.x += deltaY * 0.1;
    cube.rotation.y += deltaX * 0.1;
  }

  mouseX = event.clientX;
  mouseY = event.clientY;
});

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
