import type { Metadata } from "next";
import { funProjects } from "@/lib/fun-projects";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fun",
  description: "Things Zach Howes is building just for fun — games, tools, experiments.",
};

export default function Fun() {
  return (
    <>
      <section className="panel-border p-6 flex-1">
        <p className="text-lg leading-relaxed mb-8 opacity-70">
          Stuff I&#39;m building just for fun. No roadmap, no stakeholders — just
          curiosity and free time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {funProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
