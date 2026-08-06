"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";

type Project = (typeof projects)[number];

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useLanguage(); // NOVO

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
      className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-purple-500/10 bg-gradient-to-b from-purple-500/[0.045] to-transparent p-6 transition-colors duration-300 hover:border-purple-400/30"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-600/[0.08] blur-[70px] transition-all duration-500 group-hover:bg-purple-500/[0.16]" />

      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_40px_rgba(168,85,247,0.04)]" />
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-purple-400/60">
          {t.projects.projectLabel} {String(index + 1).padStart(2, "0")} {/* trocado */}
        </span>

        <span className="font-mono text-xs text-gray-600">{project.year}</span>
      </div>

      <div className="relative z-10 mt-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-400/15 bg-purple-500/[0.05] text-purple-400 transition-all duration-300 group-hover:border-purple-400/30 group-hover:bg-purple-500/10 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.12)]">
          <span className="font-mono text-lg">{String(index + 1).padStart(2, "0")}</span>
        </div>

        <h3 className="font-serif text-3xl text-white transition-colors duration-300 group-hover:text-purple-300">
          {project.title}
          <span className="text-purple-400">.</span>
        </h3>

        <p className="mt-4 text-sm leading-7 text-gray-400">{project.description}</p>
      </div>

      <div className="relative z-10 mt-7">
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.25em] text-gray-100">
          {t.projects.technologies} {/* trocado */}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-purple-500/15 bg-purple-500/[0.03] px-3 py-1.5 font-mono text-[10px] text-purple-300/80 transition-colors duration-300 group-hover:border-purple-400/25 group-hover:text-purple-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-auto pt-8">
        {project.link ? (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-purple-400 transition-colors hover:text-purple-300"
          >
            {t.projects.viewProject} {/* trocado */}
            <span className="text-base">→</span>
          </motion.a>
        ) : (
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-gray-300">
            {t.projects.privateProject} {/* trocado */}
          </span>
        )}
      </div>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-purple-500 to-transparent transition-all duration-500 group-hover:w-full" />
    </motion.article>
  );
}