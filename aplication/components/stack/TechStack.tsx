"use client";

import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiDocker,
  SiGit,
} from "react-icons/si";

export const stack = [
  { name: "JavaScript", level: 90, icon: SiJavascript, color: "#f7df1e" },
  { name: "TypeScript", level: 85, icon: SiTypescript, color: "#3178c6" },
  { name: "React", level: 88, icon: SiReact, color: "#61dafb" },
  { name: "Next.js", level: 82, icon: SiNextdotjs, color: "#ffffff" },
  { name: "Node.js", level: 75, icon: SiNodedotjs, color: "#339933" },
  { name: "Tailwind", level: 80, icon: SiTailwindcss, color: "#06b6d4" },
  { name: "PostgreSQL", level: 70, icon: SiPostgresql, color: "#4169e1" },
  { name: "Docker", level: 65, icon: SiDocker, color: "#2496f3" },
  { name: "Git", level: 85, icon: SiGit, color: "#f05032" },
];

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function TechStack() {
  return (
    <section className="relative overflow-hidden border-y border-purple-500/10 bg-black py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/[0.06] blur-[140px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.2,
        }}
        className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12"
      >
        <motion.div variants={itemVariants} className="mb-14 text-center md:mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-purple-400/80">
            Technical Stack
          </span>

          <h2 className="mt-3 font-mono text-3xl font-semibold tracking-wider text-white md:text-4xl">
            Tecnologias & Conhecimento
          </h2>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-5 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mx-auto w-full max-w-6xl"
        >
          <div className="mb-8 flex items-end justify-between px-1">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-purple-400/70">
                Development
              </p>

              <p className="mt-1 font-mono text-sm text-gray-400">
                Nível de familiaridade
              </p>
            </div>

            <div className="hidden items-center gap-2 font-mono text-[10px] text-gray-500 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,1)]" />
              2026
            </div>
          </div>

          <div className="relative h-[440px] w-full overflow-x-auto overflow-y-hidden pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-500/30">
            <div className="relative mx-auto h-full min-w-[760px] w-full">
              <div className="absolute inset-0 flex flex-col justify-between pb-[88px] pl-11">
                {[100, 75, 50, 25, 0].map((value) => (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15 + (100 - value) * 0.002,
                    }}
                    className="flex origin-left items-center gap-5"
                  >
                    <span className="w-7 text-right font-mono text-[10px] text-gray-500">
                      {value}
                    </span>

                    <div className="h-px flex-1 bg-purple-400/[0.12]" />
                  </motion.div>
                ))}
              </div>

              <div className="absolute inset-0 flex items-end gap-5 pl-[76px] pr-5 pb-[88px] sm:gap-7">
                {stack.map((tech, index) => {
                  const Icon = tech.icon;

                  return (
                    <motion.div
                      key={tech.name}
                      variants={itemVariants}
                      className="group flex h-full min-w-[58px] flex-1 flex-col items-center justify-end"
                    >
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{
                          duration: 0.5,
                          delay: 0.45 + index * 0.08,
                        }}
                        className="mb-3 font-mono text-sm font-semibold"
                        style={{
                          color: tech.color,
                          textShadow: `0 0 12px ${tech.color}80`,
                        }}
                      >
                        {tech.level}%
                      </motion.span>

                      <div className="relative h-[320px] w-full max-w-[52px]">
                        <div className="absolute inset-0 rounded-t-xl bg-white/[0.025]" />

                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${tech.level}%` }}
                          viewport={{ once: false }}
                          transition={{
                            duration: 1.1,
                            delay: index * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="absolute bottom-0 w-full overflow-hidden rounded-t-xl"
                          style={{
                            background: `linear-gradient(
                              to top,
                              ${tech.color}55,
                              ${tech.color}90
                            )`,
                            border: `1px solid ${tech.color}80`,
                            boxShadow: `
                              0 0 18px ${tech.color}30,
                              inset 0 0 18px ${tech.color}20
                            `,
                          }}
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: false }}
                            transition={{
                              duration: 0.5,
                              delay: 0.8 + index * 0.08,
                            }}
                            className="absolute left-0 right-0 top-0 h-[2px]"
                            style={{
                              background: tech.color,
                              boxShadow: `0 0 14px ${tech.color}`,
                            }}
                          />

                          <div
                            className="absolute inset-x-0 bottom-0 h-1/2"
                            style={{
                              background: `linear-gradient(
                                to top,
                                ${tech.color}60,
                                transparent
                              )`,
                            }}
                          />

                          <motion.div
                            animate={{
                              opacity: [0.15, 0.35, 0.15],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-x-0 bottom-0 h-1/2"
                            style={{
                              background: `linear-gradient(
                                to top,
                                ${tech.color},
                                transparent
                              )`,
                            }}
                          />
                        </motion.div>
                      </div>

                      <motion.div
                        whileHover={{
                          scale: 1.2,
                          y: -3,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        }}
                        className="mt-4 flex h-8 items-center justify-center"
                      >
                        <Icon
                          className="text-2xl transition-all duration-300"
                          style={{
                            color: tech.color,
                            filter: `drop-shadow(0 0 6px ${tech.color}40)`,
                          }}
                        />
                      </motion.div>

                      <span className="mt-2 whitespace-nowrap font-mono text-[10px] text-gray-400 transition-colors duration-300 group-hover:text-white">
                        {tech.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-4 flex justify-center sm:hidden"
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-gray-600">
              ← deslize para explorar →
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

