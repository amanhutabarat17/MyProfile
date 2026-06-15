const projectData = [
  {
    title: "E-Commerce Platform",
    desc: "A full-stack e-commerce app built with React, Node.js, and MongoDB.",
    tech: ["React", "Tailwind", "Node.js"],
    link: "#",
  },
  {
    title: "Data Dashboard",
    desc: "Interactive analytics dashboard utilizing predictive modeling tools.",
    tech: ["React", "Python", "Tailwind"],
    link: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-slate-800 text-white px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 border-b-2 border-cyan-500 w-fit mx-auto pb-2">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projectData.map((project, index) => (
            <div
              key={index}
              className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg hover:border-cyan-400 transition"
            >
              <h3 className="text-xl font-bold mb-2 text-cyan-400">{project.title}</h3>
              <p className="text-slate-400 mb-4 text-sm">{project.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-800 text-cyan-400 text-xs px-3 py-1 rounded-full border border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a href={project.link} className="text-sm font-semibold text-cyan-400 hover:underline">
                View Project &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}