import TechBadge from "../components/TechBadge";

export default function Skills() {
  const skills = {
    languages: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
    frameworks: ["React", "Next.js", "Node.js", "Express", "Django"],
    tools: ["Git", "Docker", "AWS", "PostgreSQL", "MongoDB"],
  };

  const experience = [
    {
      title: "Senior Fullstack Developer",
      company: "Company Name",
      period: "2020 - Present",
      description: "Lead development of web applications using modern technologies. Collaborate with cross-functional teams to deliver high-quality software solutions.",
    },
    {
      title: "Fullstack Developer",
      company: "Previous Company",
      period: "2018 - 2020",
      description: "Developed and maintained multiple web applications. Improved application performance and user experience.",
    },
    {
      title: "Junior Developer",
      company: "Another Company",
      period: "2016 - 2018",
      description: "Started my career here, learning the fundamentals of web development and software engineering best practices.",
    },
  ];

  return (
    <div>
      <h1 className="display-5 fw-bold mb-5">Skills & Experience</h1>

      <section className="mb-5">
        <h2 className="h4 fw-bold mb-4">Skills</h2>
        
        <div className="mb-4">
          <h5 className="fw-semibold mb-3">Programming Languages</h5>
          <div className="d-flex flex-wrap gap-2">
            {skills.languages.map((skill, index) => (
              <TechBadge 
                key={index} 
                tech={skill}
                variant="skill"
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h5 className="fw-semibold mb-3">Frameworks & Libraries</h5>
          <div className="d-flex flex-wrap gap-2">
            {skills.frameworks.map((skill, index) => (
              <TechBadge 
                key={index} 
                tech={skill}
                variant="skill"
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h5 className="fw-semibold mb-3">Tools & Technologies</h5>
          <div className="d-flex flex-wrap gap-2">
            {skills.tools.map((skill, index) => (
              <TechBadge 
                key={index} 
                tech={skill}
                variant="skill"
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="h4 fw-bold mb-4">Experience</h2>
        
        <div className="timeline">
          {experience.map((exp, index) => (
            <div key={index} className="mb-4 pb-4 border-bottom">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h5 className="fw-bold mb-1">{exp.title}</h5>
                  <p className="text-muted mb-0">{exp.company}</p>
                </div>
                <span className="badge bg-secondary">{exp.period}</span>
              </div>
              <p className="text-muted mt-2 mb-0">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

