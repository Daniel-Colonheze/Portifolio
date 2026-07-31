"use client";

import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Computer() {
  const { scene, nodes } = useGLTF("/models/desktop.glb");
  const groupRef = useRef<THREE.Group>(null);
  const mouseNodeRef = useRef<THREE.Object3D | null>(null);
  const keyNodesRef = useRef<THREE.Object3D[]>([]);
  const activeKeys = useRef<Map<THREE.Object3D, number>>(new Map());

  useEffect(() => {
    // pega o node do mouse 3D
    mouseNodeRef.current = nodes["g_Mouse"] || null;

    // junta todas as teclas do teclado numa lista
    const keys: THREE.Object3D[] = [];
    const teclado = nodes["g_Teclado"];
    teclado?.traverse((child) => {
      if (child.name.startsWith("pCube") && child.type === "Mesh") {
        keys.push(child);
      }
    });
    keyNodesRef.current = keys;
  }, [nodes]);

  // Mouse real → mouse 3D
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseNodeRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 4;
      const z = (e.clientY / window.innerHeight - 0.5) * 4;

      mouseNodeRef.current.position.x = THREE.MathUtils.lerp(
        mouseNodeRef.current.position.x,
        x,
        0.1
      );
      mouseNodeRef.current.position.z = THREE.MathUtils.lerp(
        mouseNodeRef.current.position.z,
        z,
        0.1
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Teclado real → tecla 3D afunda
  useEffect(() => {
    const handleKeyDown = () => {
      const keys = keyNodesRef.current;
      if (keys.length === 0) return;

      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      activeKeys.current.set(randomKey, performance.now());
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Anima o "afundar" a cada frame
  useFrame(() => {
    const now = performance.now();
    activeKeys.current.forEach((startTime, key) => {
      const elapsed = now - startTime;
      const duration = 150;

      if (elapsed < duration) {
        const progress = elapsed / duration;
        const depress = Math.sin(progress * Math.PI) * 0.5; // desce e volta
        key.position.y = -depress;
      } else {
        key.position.y = 0;
        activeKeys.current.delete(key);
      }
    });
  });

  return (
    <group ref={groupRef} scale={0.01} position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/desktop.glb");