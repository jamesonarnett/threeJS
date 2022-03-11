import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStars() {
  const geo = new THREE.SphereGeometry(0.25, 24, 24);
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geo, mat);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(2000).fill().forEach(addStars);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const spaceTexture = new THREE.TextureLoader().load(
  "../../Assets/spaceBackground2.jpg"
);
scene.background = spaceTexture;

const meTexture = new THREE.TextureLoader().load("../../Assets/meWTF.png");
const me = new THREE.Mesh(
  new THREE.BoxGeometry(6, 6, 6),
  new THREE.MeshBasicMaterial({ map: meTexture })
);

scene.add(me);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const moonTexture = new THREE.TextureLoader().load("../../Assets/moon.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(6, 64, 64),
  new THREE.MeshBasicMaterial({ map: moonTexture })
);
moon.position.x = -10;
moon.position.z = 30;

scene.add(moon);

const moon2 = new THREE.Mesh(
  new THREE.SphereGeometry(6, 64, 64),
  new THREE.MeshBasicMaterial({ map: moonTexture })
);
moon2.position.x = 30;
moon2.position.z = 60;

scene.add(moon2);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const worldOneTexture = new THREE.TextureLoader().load(
  "../../Assets/world1.jpeg"
);
const world1 = new THREE.Mesh(
  new THREE.SphereGeometry(48, 256, 256),
  new THREE.MeshBasicMaterial({ map: worldOneTexture })
);
world1.position.x = -120;
world1.position.z = 90;

scene.add(world1);

const worldTwoTexture = new THREE.TextureLoader().load(
  "../../Assets/world2.jpg"
);
const world2 = new THREE.Mesh(
  new THREE.SphereGeometry(48, 256, 256),
  new THREE.MeshBasicMaterial({ map: worldTwoTexture })
);
world2.position.y = 40;
world2.position.z = -150;

scene.add(world2);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function animate() {
  requestAnimationFrame(animate);

  moon.rotation.y += 0.005;
  moon2.rotation.y += -0.005;
  world1.rotation.z += -0.0001;
  world2.rotation.y += -0.001;

  me.rotation.x += 0.01;
  me.rotation.y += 0.01;
  me.position.x += 0.01;
  me.position.y += 0.01;
  me.position.z += 0.02;

  controls.update();
  renderer.render(scene, camera);
}

animate();

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.1;
  camera.position.x = t * -0.0002 + 20;
  camera.position.y = t * -0.0002 + 20;
}

document.body.onscroll = moveCamera;
