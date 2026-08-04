"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section
      id="projetos"
      className="relative min-h-screen overflow-hidden bg-black px-6 py-24 md:px-16 md:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/[0.035] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 max-w-3xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-purple-400/70">
            02 / Trabalhos
          </p>

          <h2 className="mt-4 font-serif text-5xl text-white md:text-7xl">
            Projetos<span className="text-purple-400">.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
            Uma seleção de projetos que representam minha experiência prática
            no desenvolvimento de aplicações web, interfaces responsivas e
            soluções completas.
          </p>

          <div className="mt-7 h-px w-24 bg-gradient-to-r from-purple-500/70 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}