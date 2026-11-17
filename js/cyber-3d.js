/**
 * CYBER-3D.JS
 * Futuristic 3D Cyber Core & Security Sphere Visualization
 * Powered by Three.js with graceful high-performance Canvas fallback
 * Developed for Rijwal VP - Cybersecurity & Cloud Portfolio
 */

(function () {
  'use strict';

  const container = document.getElementById('cyber-3d-canvas-container');
  if (!container) return;

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Check if THREE is available
  if (typeof THREE !== 'undefined') {
    initThreeScene();
  } else {
    // Attempt fallback or retry after CDN load
    window.addEventListener('load', () => {
      if (typeof THREE !== 'undefined') {
        initThreeScene();
      } else {
        initCanvasFallback();
      }
    });
  }

  function initThreeScene() {
    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 28;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Cyber Group
    const cyberGroup = new THREE.Group();
    scene.add(cyberGroup);

    // --- Object A: Inner Core Sphere (Glowing Emissive Energy) ---
    const coreGeo = new THREE.SphereGeometry(3.2, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    cyberGroup.add(coreMesh);

    // Solid inner core
    const innerSolidGeo = new THREE.IcosahedronGeometry(2.2, 2);
    const innerSolidMat = new THREE.MeshPhongMaterial({
      color: 0x071b2d,
      emissive: 0x005577,
      specular: 0x00f0ff,
      shininess: 90,
      flatShading: true,
      transparent: true,
      opacity: 0.85
    });
    const innerSolidMesh = new THREE.Mesh(innerSolidGeo, innerSolidMat);
    cyberGroup.add(innerSolidMesh);

    // --- Object B: Outer Cryptographic Wireframe Icosahedron ---
    const icoGeo = new THREE.IcosahedronGeometry(5.2, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    cyberGroup.add(icoMesh);

    // Vertices Nodes on Icosahedron
    const icoVertices = icoGeo.attributes.position;
    const nodeGeo = new THREE.SphereGeometry(0.16, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    for (let i = 0; i < icoVertices.count; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(icoVertices.getX(i), icoVertices.getY(i), icoVertices.getZ(i));
      cyberGroup.add(node);
    }

    // --- Object C: Orbiting Security Ring Alpha ---
    const ringAlphaGeo = new THREE.TorusGeometry(7.2, 0.05, 16, 100);
    const ringAlphaMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.7
    });
    const ringAlpha = new THREE.Mesh(ringAlphaGeo, ringAlphaMat);
    ringAlpha.rotation.x = Math.PI / 3;
    ringAlpha.rotation.y = Math.PI / 6;
    cyberGroup.add(ringAlpha);

    // Satellite Data Node on Ring Alpha
    const satGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const satMat = new THREE.MeshPhongMaterial({ color: 0xa855f7, emissive: 0x7e22ce });
    const satMesh = new THREE.Mesh(satGeo, satMat);
    cyberGroup.add(satMesh);

    // --- Object D: Orbiting Security Ring Beta ---
    const ringBetaGeo = new THREE.TorusGeometry(8.4, 0.04, 16, 100);
    const ringBetaMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.5
    });
    const ringBeta = new THREE.Mesh(ringBetaGeo, ringBetaMat);
    ringBeta.rotation.x = -Math.PI / 4;
    ringBeta.rotation.z = Math.PI / 3;
    cyberGroup.add(ringBeta);

    // Satellite 2 on Ring Beta
    const sat2Geo = new THREE.OctahedronGeometry(0.4);
    const sat2Mat = new THREE.MeshPhongMaterial({ color: 0x00f0ff, emissive: 0x0284c7 });
    const sat2Mesh = new THREE.Mesh(sat2Geo, sat2Mat);
    cyberGroup.add(sat2Mesh);

    // --- Object E: Floating Security Particle Cloud ---
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00f0ff);
    const color2 = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      const radius = 6.5 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.4 ? color1 : color2;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    cyberGroup.add(particlePoints);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0x0a192f, 2.5);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 3, 50);
    cyanPointLight.position.set(12, 10, 15);
    scene.add(cyanPointLight);

    const purplePointLight = new THREE.PointLight(0xa855f7, 2.5, 50);
    purplePointLight.position.set(-12, -10, -10);
    scene.add(purplePointLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isHovered = false;
    let pulseScale = 1;

    function onPointerMove(e) {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.8;
    }

    container.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mousemove', (e) => {
      // Global slight parallax
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = x * 0.4;
      targetY = y * 0.4;
    });

    // Interactive Pulse on Click
    container.addEventListener('click', triggerScanPulse);

    function triggerScanPulse() {
      pulseScale = 1.25;
      if (window.AudioFX) {
        window.AudioFX.playPulse();
      }
      const scanStatus = document.getElementById('cyber-status-text');
      if (scanStatus) {
        scanStatus.textContent = 'SECURITY CORE: SCANNING...';
        scanStatus.style.color = '#00f0ff';
        setTimeout(() => {
          scanStatus.textContent = 'THREAT DEFENSE: ACTIVE [NOMINAL]';
          scanStatus.style.color = '#34d399';
        }, 1200);
      }
    }

    // Expose pulse trigger to buttons
    window.triggerCyberPulse = triggerScanPulse;

    // Resize handling
    function onResize() {
      if (!container) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', onResize);

    // Animation Loop
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const deltaSpeed = prefersReducedMotion ? 0.2 : 1.0;

      // Smooth mouse lerping
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      cyberGroup.rotation.y += 0.006 * deltaSpeed;
      cyberGroup.rotation.x = mouseY * 0.6;
      cyberGroup.rotation.y += mouseX * 0.02;

      // Counter-rotations
      coreMesh.rotation.y -= 0.008 * deltaSpeed;
      icoMesh.rotation.x += 0.005 * deltaSpeed;
      icoMesh.rotation.z += 0.004 * deltaSpeed;

      ringAlpha.rotation.z = elapsedTime * 0.4 * deltaSpeed;
      ringBeta.rotation.y = -elapsedTime * 0.35 * deltaSpeed;

      // Satellite orbital positions
      const satAngle1 = elapsedTime * 0.8 * deltaSpeed;
      satMesh.position.x = Math.cos(satAngle1) * 7.2;
      satMesh.position.y = Math.sin(satAngle1) * 7.2 * Math.cos(Math.PI / 3);
      satMesh.position.z = Math.sin(satAngle1) * 7.2 * Math.sin(Math.PI / 3);
      satMesh.rotation.x += 0.02;
      satMesh.rotation.y += 0.03;

      const satAngle2 = -elapsedTime * 0.7 * deltaSpeed;
      sat2Mesh.position.x = Math.cos(satAngle2) * 8.4;
      sat2Mesh.position.z = Math.sin(satAngle2) * 8.4 * Math.cos(Math.PI / 4);
      sat2Mesh.position.y = Math.sin(satAngle2) * 8.4 * Math.sin(-Math.PI / 4);
      sat2Mesh.rotation.x -= 0.02;
      sat2Mesh.rotation.z += 0.02;

      // Particle rotation
      particlePoints.rotation.y = elapsedTime * 0.05 * deltaSpeed;
      particlePoints.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

      // Pulse damping
      if (pulseScale > 1) {
        pulseScale += (1 - pulseScale) * 0.08;
      }
      cyberGroup.scale.set(pulseScale, pulseScale, pulseScale);

      renderer.render(scene, camera);
    }

    animate();
  }

  // --- Graceful Fallback Canvas (Zero-dependency WebGL/2D) ---
  function initCanvasFallback() {
    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth || 500;
    canvas.height = container.clientHeight || 500;
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      angle += 0.015;

      // Outer Ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.ellipse(0, 0, 140, 70, Math.PI / 4, 0, Math.PI * 2);
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner Ring
      ctx.beginPath();
      ctx.ellipse(0, 0, 160, 80, -Math.PI / 4, 0, Math.PI * 2);
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Glowing Center Core
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 90);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.8)');
      grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.4)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.fill();

      // Shield Core Poly
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3 + angle * 0.5;
        const x = Math.cos(a) * 45;
        const y = Math.sin(a) * 45;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();

      requestAnimationFrame(draw);
    }
    draw();
  }
})();
