import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section id="projetos" className="px-6 md:px-16 py-24 bg-black min-h-screen">
      <p className="text-purple-400 font-mono text-sm mb-4">02 / TRABALHOS</p>
      <h2 className="text-5xl md:text-6xl font-serif text-white mb-4">
        Projetos<span className="text-purple-400">.</span>
      </h2>
      <p className="text-gray-400 mb-16">
        Uma selecao de projetos que me orgulho de ter construido.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}