
import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

// Initialize Scene
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x030a1a);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 20);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Lights
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

const light1 = new THREE.PointLight(0x3366ff, 1);
light1.position.set(5, 5, 10);
scene.add(light1);

const light2 = new THREE.PointLight(0xaa00ff, 0.8);
light2.position.set(-5, -5, 10);
scene.add(light2);

// Create floating geometric shapes
const shapes = [];

// Central sphere
const sphereGeo = new THREE.SphereGeometry(2, 64, 64);
const sphereMat = new THREE.MeshPhongMaterial({
  color: 0x3366ff,
  emissive: 0x112244,
  wireframe: true,
  transparent: true,
  opacity: 0.15
});
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
sphere.position.set(0, 0, -5);
scene.add(sphere);
shapes.push(sphere);

// Torus knots
const knotGeo = new THREE.TorusKnotGeometry(1.5, 0.4, 128, 16);
const knotMat = new THREE.MeshPhongMaterial({
  color: 0xaa00ff,
  emissive: 0x220044,
  wireframe: true,
  transparent: true,
  opacity: 0.1
});
const knot = new THREE.Mesh(knotGeo, knotMat);
knot.position.set(3, 2, -8);
knot.rotation.x = 0.5;
knot.rotation.y = 0.8;
scene.add(knot);
shapes.push(knot);

// Second knot
const knot2 = knot.clone();
knot2.material = knotMat.clone();
knot2.material.color.setHex(0x00ccff);
knot2.position.set(-3, -1, -10);
knot2.rotation.x = -0.3;
knot2.rotation.y = 0.5;
scene.add(knot2);
shapes.push(knot2);

// Rings
const ringGeo = new THREE.TorusGeometry(2.5, 0.1, 32, 100);
const ringMat = new THREE.MeshPhongMaterial({
  color: 0x3366ff,
  emissive: 0x112244,
  transparent: true,
  opacity: 0.08,
  side: THREE.DoubleSide
});
const ring = new THREE.Mesh(ringGeo, ringMat);
ring.rotation.x = Math.PI / 2;
ring.position.set(0, 0, -2);
scene.add(ring);
shapes.push(ring);

// Particles
const particleCount = 2000;
const particleGeo = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
const particleColors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  const r = 15 + Math.random() * 30;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.random() * Math.PI * 2;
  
  particlePositions[i*3] = Math.sin(theta) * Math.cos(phi) * r;
  particlePositions[i*3+1] = Math.sin(theta) * Math.sin(phi) * r;
  particlePositions[i*3+2] = Math.cos(theta) * r - 10;
  
  const color = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.5);
  particleColors[i*3] = color.r;
  particleColors[i*3+1] = color.g;
  particleColors[i*3+2] = color.b;
}

particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

const particleMat = new THREE.PointsMaterial({
  size: 0.1,
  vertexColors: true,
  transparent: true,
  blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);
shapes.push(particles);

// Animation
let time = 0;

function animate() {
  requestAnimationFrame(animate);
  
  time += 0.001;
  
  shapes.forEach((shape, index) => {
    if (shape !== particles) {
      shape.rotation.x += 0.0005 * (index % 2 === 0 ? 1 : -1);
      shape.rotation.y += 0.001 * (index % 3 === 0 ? 1 : -1);
      shape.rotation.z += 0.0003 * (index % 4 === 0 ? 1 : -1);
    }
  });
  
  particles.rotation.y += 0.0001;
  
  renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Mouse interaction
document.addEventListener('mousemove', (e) => {
  const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  
  camera.position.x += (mouseX * 2 - camera.position.x) * 0.01;
  camera.position.y += (-mouseY * 2 - camera.position.y) * 0.01;
  camera.lookAt(0, 0, -5);
});
