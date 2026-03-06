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
    image: "/images/projects/bwiz.png",
    tags: ["#game", "#trivia", "#multiplayer"],
  },
  {
    name: "Yearout",
    description:
      "Plan, track, and relive recurring group adventure trips. Handles expenses, daily logs, awards, and a hall of fame.",
    status: "live",
    emoji: "🏔️",
    url: "https://yearout.zkhowes.fun",
    image: "/images/projects/yearout.png",
    tags: ["#travel", "#groups", "#planning"],
  },
  {
    name: "JustB",
    description:
      "A location-based daily feed powered by AI. Pick your city, browse curated content by category, and discover what's happening around you.",
    status: "in-development",
    emoji: "📍",
    url: "https://justb.zkhowes.fun",
    tags: ["#ai", "#local", "#feed"],
  },
  {
    name: "SickDay",
    description:
      "Ski condition alerts via SMS. Monitors weather and snow data so you know exactly when to call in sick and hit the slopes.",
    status: "concept",
    emoji: "🎿",
    tags: ["#alerts", "#skiing", "#sms"],
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
