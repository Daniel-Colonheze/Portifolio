"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls, Float } from "@react-three/drei";
import { Computer } from "./Computer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLenisControls } from "@/hooks/useLenis";

export function ComputerSection() {
  const isMobile = useIsMobile();
  const { stop, start } = useLenisControls();

  if (isMobile) return null;

  return (
    <section
      id="computador"
      onMouseEnter={stop}
      onMouseLeave={start}
      className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-gradient-to-b from-black via-[#0a0510] to-black"
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true }}
        camera={{ position: [0, 1.1, 3.8], fov: 40 }}
        className="absolute inset-0"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 4]} intensity={2.8} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-3, 2, 1]} intensity={15} color="#c084fc" distance={10} />
        <spotLight position={[0, 4, -3]} angle={0.8} penumbra={1} intensity={25} color="#9333ea" />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.15}>
            <Computer debug={true} />
          </Float>
          <Environment preset="city" environmentIntensity={0.5} />
        </Suspense>

        <ContactShadows position={[0, -1.05, 0]} opacity={0.6} scale={12} blur={2.5} far={4} />

        <OrbitControls
          makeDefault
          enableZoom
          minDistance={1}
          maxDistance={6.0}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          enablePan={false}
          target={[0.20, 0.80, 0]}
        />
      </Canvas>
    </section>
  );
}