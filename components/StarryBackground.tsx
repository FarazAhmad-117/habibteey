// components/StarryBackground.tsx
"use client"; // Enable client-side rendering
import { useEffect, useRef } from "react";
import * as THREE from "three";

const StarryBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const stars: THREE.Mesh[] = [];
    const starCount = 1000;

    // Create stars
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000; // X position
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000; // Y position
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000; // Z position
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    const starsMesh = new THREE.Points(geometry, material);
    scene.add(starsMesh);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      starsMesh.rotation.y += 0.001; // Rotate stars
      renderer.render(scene, camera);
    };
    animate();

    // Resize listener
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up on unmount
      mountRef.current?.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0" />
  );
};

export default StarryBackground;
