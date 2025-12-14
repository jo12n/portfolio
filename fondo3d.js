// fondo3d.js

// 1. CREAR EL CONTENEDOR AUTOMÁTICAMENTE
// Esto evita que tengas que tocar mucho el HTML
const container = document.createElement('div');
container.id = 'canvas-container';
container.style.position = 'fixed';
container.style.top = '0';
container.style.left = '0';
container.style.width = '100%';
container.style.height = '100%';
container.style.zIndex = '-1'; // Se pone detrás de todo

container.style.pointerEvents = 'none';

container.style.background = 'radial-gradient(circle at 50% 50%, #080a10 0%, #000000 100%)';
document.body.prepend(container);

// 2. CONFIGURACIÓN THREE.JS
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 10, 45);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 12); // Cámara frontal

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// 3. ILUMINACIÓN (Para el material sólido oscuro)
const ambientLight = new THREE.AmbientLight(0x222222, 1.0);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xaaccff, 0.4);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0x335577, 0.5, 40);
pointLight.position.set(0, 0, 8);
scene.add(pointLight);

// 4. GEOMETRÍA IRREGULAR
const geometry = new THREE.PlaneGeometry(35, 65, 25, 45);
const posAttribute = geometry.attributes.position;
const count = posAttribute.count;
const originalPositions = [];

// Aplicamos aleatoriedad en los 3 ejes para "romper" la cuadrícula
for (let i = 0; i < count; i++) {
    let x = posAttribute.getX(i);
    let y = posAttribute.getY(i);
    let z = posAttribute.getZ(i);

    x += (Math.random() - 0.5) * 1.8;
    y += (Math.random() - 0.5) * 1.8;
    z += (Math.random() - 0.5) * 3.0;

    posAttribute.setX(i, x);
    posAttribute.setY(i, y);
    posAttribute.setZ(i, z);

    originalPositions.push({ x, y, z });
}
geometry.computeVertexNormals();

// 5. MATERIALES
// Material A: Sólido oscuro (tapa lo de atrás)
const materialSolid = new THREE.MeshPhongMaterial({
    color: 0x05070a,      // Negro azulado muy profundo
    emissive: 0x000000,
    specular: 0x111111,
    shininess: 5,
    flatShading: true,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.90
});

// Material B: Alambre AZUL ELÉCTRICO
const materialWire = new THREE.MeshBasicMaterial({
    color: 0x00ccff,      // Azul Cyan Neón
    wireframe: true,
    transparent: true,
    opacity: 0.15         // Sutil
});

// Crear mallas y agrupar
const meshSolid = new THREE.Mesh(geometry, materialSolid);
const meshWire = new THREE.Mesh(geometry, materialWire);
const group = new THREE.Group();
group.add(meshSolid);
group.add(meshWire);
scene.add(group);

// 6. ANIMACIÓN Y SCROLL
let scrollPercent = 0;
const clock = new THREE.Clock();

function updateScroll() {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const totalScroll = height - window.innerHeight;
    scrollPercent = totalScroll > 0 ? window.scrollY / totalScroll : 0;
}

window.addEventListener('scroll', updateScroll);
updateScroll(); // Inicializar

function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Efecto Respiración
    for (let i = 0; i < count; i++) {
        const oldZ = originalPositions[i].z;
        const offset = Math.sin(time * 0.4 + originalPositions[i].x * 0.15) * Math.cos(time * 0.3 + originalPositions[i].y * 0.15) * 0.8;
        posAttribute.setZ(i, oldZ + offset);
    }
    posAttribute.needsUpdate = true;
    geometry.computeVertexNormals(); // Recalcular luces para el sólido

    // Desplazamiento Vertical (Scroll)
    const startY = -18; 
    const endY = 18;
    const targetY = startY + (scrollPercent * (endY - startY));
    
    group.position.y += (targetY - group.position.y) * 0.08;
    group.rotation.z = Math.sin(time * 0.05) * 0.01;

    renderer.render(scene, camera);
}

animate();

// Responsive
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});