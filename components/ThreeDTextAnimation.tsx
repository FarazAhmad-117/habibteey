// components/ThreeDTextAnimation.tsx

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three-stdlib";
import { TextGeometry } from "three-stdlib";

const ThreeDTextAnimation: React.FC = () => {
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

    // Set background color
    scene.background = new THREE.Color(0x1c1c1c);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(5, 5, 5); // Position the point light
    scene.add(pointLight);

    // Load the font and create 3D text for each letter
    const loader = new FontLoader();
    const text = "HELLO";
    const letters: THREE.Mesh[] = [];

    loader.load(
      "https://three.js.org/examples/fonts/helvetiker_regular.typeface.json", // Temporary font
      (font) => {
        text.split("").forEach((char, index) => {
          const textGeometry = new TextGeometry(char, {
            font: font,
            size: 1,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.05,
            bevelSegments: 5,
          });

          const textMaterial = new THREE.MeshStandardMaterial({
            color: 0xf6ff6b,
          });

          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          textMesh.position.set(index * 1.5 - (text.length - 1), 0, 0); // Space letters apart
          scene.add(textMesh);
          letters.push(textMesh);
        });

        // Create the animation
        const animate = () => {
          requestAnimationFrame(animate);
          letters.forEach((letter, index) => {
            letter.rotation.y += 0.01 + index * 0.01; // Rotate each letter with a slight delay
            letter.position.y = Math.sin(Date.now() * 0.005 + index) * 0.5; // Bobbing effect
          });
          renderer.render(scene, camera);
        };
        animate();
      }
    );

    camera.position.z = 5;

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

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full" />;
};

export default ThreeDTextAnimation;
