"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  OrbitControls,
  Float,
} from "@react-three/drei";
import { motion } from "framer-motion";
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
      className="relative w-full overflow-hidden bg-gradient-to-b from-black via-[#0a0510] to-black"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 mx-auto max-w-4xl px-6 pt-16 text-center"
      >
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-purple-400/70">
          Interactive Computer
        </span>

        <h2 className="mt-3 font-mono text-2xl font-semibold tracking-wider text-white md:text-3xl">
          Como utilizar
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
          Arraste o computador para rotacioná-lo, use o scroll do mouse
          para aproximar ou afastar e interaja com os elementos da tela
          para explorar o portfólio.
        </p>

        <div className="mx-auto mt-6 flex w-fit flex-wrap items-center justify-center gap-3">
          <span className="rounded-full border border-purple-400/20 bg-purple-500/5 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-purple-300">
            ↔ Arrastar
          </span>

          <span className="rounded-full border border-purple-400/20 bg-purple-500/5 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-purple-300">
            ↑↓ Scroll
          </span>

          <span className="rounded-full border border-purple-400/20 bg-purple-500/5 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-purple-300">
            🖱 Interagir
          </span>
        </div>
      </motion.div>

      <div className="relative h-[80vh] min-h-[600px] w-full">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true }}
          camera={{ position: [0, 1.1, 3.8], fov: 40 }}
          className="absolute inset-0"
        >
          <ambientLight intensity={0.5} />

          <directionalLight
            position={[3, 5, 4]}
            intensity={2.8}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />

          <pointLight
            position={[-3, 2, 1]}
            intensity={15}
            color="#c084fc"
            distance={10}
          />

          <spotLight
            position={[0, 4, -3]}
            angle={0.8}
            penumbra={1}
            intensity={25}
            color="#9333ea"
          />

          <Suspense fallback={null}>
            <Float
              speed={1.2}
              rotationIntensity={0.05}
              floatIntensity={0.15}
            >
              <Computer debug={true} />
            </Float>

            <Environment
              preset="city"
              environmentIntensity={0.5}
            />
          </Suspense>

          <ContactShadows
            position={[0, -1.05, 0]}
            opacity={0.6}
            scale={12}
            blur={2.5}
            far={4}
          />

          <OrbitControls
            makeDefault
            enableZoom
            minDistance={1}
            maxDistance={6}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            enablePan={false}
            target={[0.2, 0.8, 0]}
          />
        </Canvas>
      </div>
    </section>
  );
}
