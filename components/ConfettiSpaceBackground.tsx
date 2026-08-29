"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const SOLID_COLORS = [
  0x2563eb, // Solid Blue
  0xfacc15, // Solid Yellow
  0xdc2626, // Solid Red
  0x16a34a, // Solid Green
  0xffffff, // Solid White
];

export default function ConfettiSpaceBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    // Deep dark classroom space background
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 200;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting for 3D depth
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(100, 100, 100);
    scene.add(dirLight);

    // 3. 3D Confetti & Paper Particle Objects
    const particleCount = 450;
    const confettiGroup = new THREE.Group();
    scene.add(confettiGroup);

    const geometries = [
      new THREE.PlaneGeometry(3.5, 2.2), // Rectangular paper sheet
      new THREE.BoxGeometry(2.5, 2.5, 0.4), // 3D square tile
      new THREE.ConeGeometry(2, 4, 3), // Low-poly 3D paper plane
      new THREE.OctahedronGeometry(1.8), // Gem/Chalk fragment
    ];

    const materials = SOLID_COLORS.map(
      (color) =>
        new THREE.MeshStandardMaterial({
          color,
          roughness: 0.3,
          metalness: 0.1,
          side: THREE.DoubleSide,
        })
    );

    interface ConfettiItem {
      mesh: THREE.Mesh;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      driftSpeedY: number;
      driftSpeedX: number;
      initialZ: number;
    }

    const confettiItems: ConfettiItem[] = [];

    for (let i = 0; i < particleCount; i++) {
      const geo = geometries[Math.floor(Math.random() * geometries.length)];
      const mat = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geo, mat);

      // Random distribution in 3D space (-300 to +300)
      mesh.position.x = (Math.random() - 0.5) * 450;
      mesh.position.y = (Math.random() - 0.5) * 450;
      mesh.position.z = (Math.random() - 0.5) * 400;

      mesh.rotation.x = Math.random() * Math.PI * 2;
      mesh.rotation.y = Math.random() * Math.PI * 2;

      const scale = Math.random() * 0.8 + 0.6;
      mesh.scale.set(scale, scale, scale);

      confettiGroup.add(mesh);

      confettiItems.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.03,
        rotSpeedY: (Math.random() - 0.5) * 0.03,
        rotSpeedZ: (Math.random() - 0.5) * 0.03,
        driftSpeedY: Math.random() * 0.15 + 0.05,
        driftSpeedX: (Math.random() - 0.5) * 0.08,
        initialZ: mesh.position.z,
      });
    }

    // 4. Subtle 3D Chalk Starfield Points in Background
    const starCount = 600;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 600;
    }

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.2,
      transparent: true,
      opacity: 0.8,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 5. Mouse Parallax Motion
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 40;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 40;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 6. Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 7. Animation Loop
    const animate = () => {
      // Smooth camera interpolation for mouse parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX;
      camera.position.y = -mouseY;
      camera.lookAt(scene.position);

      // Rotate starfield slowly
      starField.rotation.y += 0.0005;

      // Animate each 3D confetti piece floating through 3D space
      confettiItems.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
        item.mesh.rotation.z += item.rotSpeedZ;

        item.mesh.position.y -= item.driftSpeedY;
        item.mesh.position.x += item.driftSpeedX;

        // Wrap around when falling off bottom
        if (item.mesh.position.y < -220) {
          item.mesh.position.y = 220;
          item.mesh.position.x = (Math.random() - 0.5) * 450;
        }
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      starGeometry.dispose();
      starMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
    />
  );
}
