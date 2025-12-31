"use client";

import Link from "next/link";
import TechBadge from "../components/TechBadge";
import { projects } from "../data/projects";

export default function Projects() {

  return (
    <div>
      <h1 className="display-5 fw-bold mb-5">Projects</h1>
      
      <div className="row g-4">
        {projects.map((project, index) => (
          <div key={index} className="col-12 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="card-title fw-bold mb-3" style={{ color: "var(--foreground)", opacity: 0.9 }}>{project.title}</h3>
                {project.associatedWith && (
                  <p className="text-muted mb-2 small">
                    <i className="fas fa-link me-1" style={{ color: "#667eea" }}></i>
                    Associated with: <span style={{ color: "#667eea" }}>{project.associatedWith}</span>
                  </p>
                )}
                <p className="card-text text-muted mb-3">{project.description}</p>
                <div className="mb-3">
                  {project.technologies.map((tech, techIndex) => (
                    <TechBadge 
                      key={techIndex} 
                      tech={tech}
                      variant="project"
                    />
                  ))}
                </div>
                <div className="d-flex justify-content-end gap-2 align-items-center">
                  {project.github && (
                    <a 
                      href={project.github} 
                      className="btn btn-outline-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        width: "auto", 
                        height: "auto", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        padding: 0
                      }}
                    >
                      <i className={`fa-brands fa-github m-2`}></i>
                    </a>
                  )}
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="btn btn-outline-primary btn-sm"
                    style={{ 
                      height: "fit-content",
                      transition: "all 0.3s ease",
                      overflow: "hidden",
                      position: "relative"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.paddingRight = "1.5rem";
                      const arrow = e.currentTarget.querySelector("i");
                      if (arrow) {
                        arrow.style.transform = "translateX(10px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.paddingRight = "";
                      const arrow = e.currentTarget.querySelector("i");
                      if (arrow) {
                        arrow.style.transform = "translateX(0)";
                      }
                    }}
                  >
                    Learn more <i className={`fa-solid fa-arrow-right-long ms-1`} style={{ transition: "transform 0.3s ease", display: "inline-block" }}></i>
                  </Link>
                  {project.link && project.link !== "#" && (
                    <a 
                      href={project.link} 
                      className="btn btn-outline-secondary btn-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  )}
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

