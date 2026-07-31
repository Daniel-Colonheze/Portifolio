"use client";

import { useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

extend(THREE);

function Shape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const { x, y } = state.pointer;

    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      x * 0.6,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      y * 0.6,
      0.05
    );
  });

  return (
    <Icosahedron ref={meshRef} args={[1.6, 0]}>
      <MeshDistortMaterial
        color="#8B5CF6"
        distort={0.35}
        speed={1.5}
        roughness={0.2}
        metalness={0.3}
        wireframe
      />
    </Icosahedron>
  );
}

export function InteractiveCube() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#CB30E0" />
        <Shape />
      </Canvas>
    </div>
  );
}