"use client";

import { Canvas } from "@react-three/fiber";
import { Computer } from "../computer/Computer";

export function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 1, 6], fov: 45 }}
      style={{ background: "transparent" }}
    >
      {/* Luz ambiente forte para iluminar tudo */}
      <ambientLight intensity={0.8} />

      {/* Luz principal direcional vinda de cima/direita */}
      <directionalLight position={[5, 8, 4]} intensity={1.5} />
      <directionalLight position={[-3, 5, -2]} intensity={0.6} />

      {/* Luz de preenchimento traseira */}
      <directionalLight position={[0, -2, -5]} intensity={0.4} />

      {/* Ponto de luz perto do computador para destacar */}
      <pointLight position={[2, 3, 4]} intensity={0.8} color="#8B5CF6" />
      <pointLight position={[-2, 1, 5]} intensity={0.5} color="#CB30E0" />

      <Computer />
    </Canvas>
  );
}