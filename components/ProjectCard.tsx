import Image from "next/image";
import type { FunProject } from "@/lib/fun-projects";
import { statusLabel } from "@/lib/fun-projects";

export default function ProjectCard({ project }: { project: FunProject }) {
  const card = (
    <div className="panel-border flex flex-col overflow-hidden h-full">
      {/* Screenshot */}
      {project.image && (
        <div className="border-b border-ink/20 overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            width={800}
            height={450}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Emoji + name + status */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-xl font-bold">
            {project.emoji} {project.name}
          </h2>
          <span className="text-xs whitespace-nowrap pt-1 opacity-70">
            {statusLabel[project.status]}
          </span>
        </div>

        {/* Description */}
        <p className="text-base leading-relaxed flex-1">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-sm opacity-60">
              {tag}
            </span>
          ))}
        </div>

        {/* Collaborator */}
        {project.collaborator && (
          <p className="text-sm opacity-60">
            🤝 With {project.collaborator}
          </p>
        )}
      </div>
    </div>
  );

  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full hover:opacity-90 transition-opacity"
        aria-label={project.name}
      >
        {card}
      </a>
    );
  }

  return <div className="h-full">{card}</div>;
}
