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
import { useLanguage } from "@/i18n/LanguageContext";

export function ComputerSection() {
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  if (isMobile) return null;

  return (
    <section
      id="computador"
      className="relative w-full overflow-hidden bg-gradient-to-b from-black via-[#09050f] to-black"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-20 mx-auto max-w-4xl px-6 pt-20 text-center md:pt-24"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-purple-400/70 md:text-xs">
          {t.computer.label}
        </span>

        <h2 className="mt-3 font-mono text-2xl font-semibold tracking-wider text-white md:text-4xl">
          {t.computer.title}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
          {t.computer.description}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
          <div className="flex items-center gap-2 rounded-full border border-purple-400/15 bg-purple-500/[0.04] px-4 py-2">
            <span className="text-sm text-purple-400">↔</span>

            <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
              {t.computer.drag}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-purple-400/15 bg-purple-500/[0.04] px-4 py-2">
            <span className="text-sm text-purple-400">↕</span>

            <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
              {t.computer.scroll}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-purple-400/15 bg-purple-500/[0.04] px-4 py-2">
            <span className="text-sm text-purple-400">⌁</span>

            <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
              {t.computer.interact}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          duration: 1,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        // ANTES: "h-[72vh] min-h-[560px]" — a altura dependia só da
        // viewport height, então em monitores com proporção de tela
        // diferente o Canvas mudava de aspect ratio. Como a câmera
        // (fov=40) é fixa, isso deslocava a projeção do monitor virtual
        // (Html) verticalmente — era a causa real do "descer" no
        // monitor secundário.
        //
        // AGORA: aspect ratio fixo (16/9), com max-h/min-h como limites
        // de segurança. Isso mantém a proporção do Canvas estável entre
        // monitores diferentes, então a câmera projeta a cena sempre do
        // mesmo jeito, independente da altura real da tela do usuário.
        className="relative mx-auto mt-10 aspect-[16/9] max-h-[72vh] min-h-[560px] w-full max-w-[1500px] px-4 md:mt-12 md:px-8"
      >
        <div className="pointer-events-none absolute inset-x-4 inset-y-0 rounded-2xl border border-purple-500/20 shadow-[0_0_60px_rgba(168,85,247,0.05)] md:inset-x-8" />

        <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-full border border-purple-500/20 bg-black px-4 py-1.5 shadow-[0_0_20px_rgba(168,85,247,0.08)]">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-purple-400/70">
              {t.computer.interactiveArea}
            </span>
          </div>
        </div>

        <div
          data-lenis-prevent
          className="relative h-full overflow-hidden rounded-2xl"
        >
          <Canvas
            shadows
            dpr={[1, 2]}
            gl={{ antialias: true }}
            camera={{
              position: [0, 1.1, 3.8],
              fov: 40,
            }}
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
              enableZoom={true}
              enableRotate={true}
              enablePan={false}
              minDistance={1}
              maxDistance={6}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2}
              target={[0.2, 0.8, 0]}
            />
          </Canvas>
        </div>

        <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2">
          <div className="rounded-full border border-purple-400/10 bg-black/70 px-4 py-2 backdrop-blur-md">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500">
              {t.computer.dragToExplore}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          duration: 0.7,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto max-w-xl px-6 pb-20 pt-6 text-center"
      >
        <div className="mx-auto mb-5 h-px w-12 bg-purple-500/30" />

        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-purple-400/50">
          {t.computer.explore}
        </p>

        <p className="mt-3 text-xs leading-6 text-gray-600">
          {t.computer.footer}
        </p>
      </motion.div>
    </section>
  );
}