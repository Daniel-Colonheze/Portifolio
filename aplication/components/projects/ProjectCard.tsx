"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";

type Project = (typeof projects)[number];

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({
  project,
  index,
}: ProjectCardProps) {
  const { t, language } = useLanguage();

  const projectTitle = project.title[language];
  const projectDescription = project.description[language];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: false,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      className="group relative flex min-h-[620px] flex-col overflow-hidden rounded-2xl border border-purple-500/10 bg-gradient-to-b from-purple-500/[0.045] to-transparent p-6 transition-colors duration-300 hover:border-purple-400/30"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-600/[0.08] blur-[70px] transition-all duration-500 group-hover:bg-purple-500/[0.16]" />

      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_40px_rgba(168,85,247,0.04)]" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-purple-400/60">
          {t.projects.projectLabel}{" "}
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="font-mono text-xs text-gray-600">
          {project.year}
        </span>
      </div>

      {/* Project image */}
      <div className="relative z-10 mt-6 overflow-hidden rounded-xl border border-purple-500/10 bg-black/40">
        <div className="relative aspect-video w-full overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={projectTitle}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-purple-500/[0.03]">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600">
                {t.projects.privateProject}
              </span>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-purple-500/[0.03]" />

          <div className="pointer-events-none absolute inset-0 rounded-xl border border-purple-400/0 transition-colors duration-500 group-hover:border-purple-400/20" />
        </div>
      </div>

      {/* Project information */}
      <div className="relative z-10 mt-7">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-400/15 bg-purple-500/[0.05] text-purple-400 transition-all duration-300 group-hover:border-purple-400/30 group-hover:bg-purple-500/10 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.12)]">
          <span className="font-mono text-lg">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="font-serif text-3xl text-white transition-colors duration-300 group-hover:text-purple-300">
          {projectTitle}
          <span className="text-purple-400">.</span>
        </h3>

        <p className="mt-4 text-sm leading-7 text-gray-400">
          {projectDescription}
        </p>
      </div>

      {/* Technologies */}
      <div className="relative z-10 mt-7">
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.25em] text-gray-100">
          {t.projects.technologies}
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

      {/* Links */}
      <div className="relative z-10 mt-auto flex items-center gap-8 pt-8">
        {/* Project */}
        {project.link ? (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-purple-400 transition-colors hover:text-purple-300"
          >
            {t.projects.viewProject}

            <span className="text-base">
              →
            </span>
          </motion.a>
        ) : (
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-gray-300">
            {t.projects.privateProject}
          </span>
        )}

        {/* GitHub repository */}
        {project.repository && (
          <motion.a
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 3 }}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-gray-500 transition-colors duration-300 hover:text-white"
            aria-label="Código no GitHub"
          >
            <FaGithub className="h-4 w-4" />

            <span>
              Código
            </span>
          </motion.a>
        )}
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-purple-500 to-transparent transition-all duration-500 group-hover:w-full" />
    </motion.article>
  );
}