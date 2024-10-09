"use client"; // Ensure it's rendered client-side

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MoonModel = () => {
  const moonRef = useRef<THREE.Mesh>(null);

  // Load the GLB file (replace 'path_to_moon_model.glb' with your actual path)
  const { scene } = useGLTF("model/crescent_moon.glb");
  console.log(scene);

  // Use frame to animate the moon for subtle rotation
  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.001; // Add slow continuous rotation
    }
  });

  // Rotate the moon when dragging the mouse
  const rotateOnDrag = (event: any) => {
    if (moonRef.current) {
      const { movementX, movementY } = event;
      moonRef.current.rotation.y += movementX * 0.005;
      moonRef.current.rotation.x += movementY * 0.005;
    }
  };

  return (
    <mesh ref={moonRef} onPointerMove={rotateOnDrag}>
      <primitive object={scene} scale={1} />
    </mesh>
  );
};

// const Moon: React.FC = () => {
//   const moonRef = useRef<THREE.Mesh>(null);

//   // Load the GLB file (replace 'path_to_moon_model.glb' with your actual path)
//   const { scene } = useGLTF("model/crescent_moon.glb");

//   // Rotate the moon when dragging the mouse
//   const rotateOnDrag = (event: any) => {
//     if (moonRef.current) {
//       const { movementX, movementY } = event;
//       moonRef.current.rotation.y += movementX * 0.005;
//       moonRef.current.rotation.x += movementY * 0.005;
//     }
//   };

//   // Use frame to animate the moon for subtle rotation
//   useFrame(() => {
//     if (moonRef.current) {
//       moonRef.current.rotation.y += 0.001; // Add slow continuous rotation
//     }
//   });

//   return (
//     <div
//       className="fixed top-0 right-0 w-1/4 h-1/4 z-50 cursor-pointer"
//       onMouseMove={rotateOnDrag} // Handle mouse drag
//     >
//       <Canvas>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[10, 10, 5]} />
//         <mesh ref={moonRef}>
//           <primitive object={scene} scale={0.5} />
//         </mesh>
//         <OrbitControls enableZoom={false} />
//       </Canvas>
//     </div>
//   );
// };

const Moon: React.FC = () => {
  return (
    <div className=" w-1/4 h-1/4 z-[9999] cursor-pointer">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        {/* MoonModel component inside the Canvas */}
        <MoonModel />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Moon;
