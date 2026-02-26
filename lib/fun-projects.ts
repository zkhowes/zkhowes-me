export type ProjectStatus = "live" | "in-development" | "concept";

export interface FunProject {
  name: string;
  description: string;
  status: ProjectStatus;
  emoji: string;
  tags: string[];
  url?: string;
  image?: string; // path relative to /public, e.g. "/images/projects/bwiz.png"
  collaborator?: string;
}

export const funProjects: FunProject[] = [
  {
    name: "Bwiz",
    description:
      "A trivia game where you battle friends across random topic categories. Think pub quiz meets group chat.",
    status: "in-development",
    emoji: "🧠",
    url: "https://bwiz.zkhowes.fun",
    tags: ["#game", "#trivia", "#multiplayer"],
  },
  {
    name: "5Foot",
    description:
      "Originates from Ryan Holiday's concept of maintaining a 5-foot bookshelf — a curated collection of your favorite books you loan to people. Digital books have made this harder than it should be, so we're starting to wade into it.",
    status: "concept",
    emoji: "📚",
    tags: ["#tool", "#books", "#reading"],
  },
];

export const statusLabel: Record<ProjectStatus, string> = {
  live: "✅ Live",
  "in-development": "🔧 In Development",
  concept: "💡 Concept",
};
