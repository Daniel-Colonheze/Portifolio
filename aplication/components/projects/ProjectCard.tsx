import { projects } from "@/data/projects";

type Project = (typeof projects)[number];

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border-t border-purple-900/30 pt-6 group hover:border-purple-400 transition-colors">
      <span className="text-gray-500 text-sm font-mono">{project.year}</span>
      <h3 className="text-2xl font-serif text-white mt-2 mb-3 group-hover:text-purple-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono border border-purple-900/50 text-purple-400 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm text-purple-400 underline"
        >
          Ver projeto →
        </a>
      )}
    </div>
  );
}