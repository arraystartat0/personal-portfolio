import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "../../data/projects";
import TechBadge from "../../components/TechBadge";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all projects
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Check if project detail page is ready
  const isReady = project.ready ?? false;

  if (!isReady) {
    return (
      <div>
        <div className="mb-4">
          <Link 
            href="/projects" 
            className="text-decoration-none text-light"
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back to Projects
          </Link>
        </div>

        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
          <div className="mb-4" style={{ position: "relative" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              {/* Steam lines */}
              <div className="steam-line steam-1"></div>
              <div className="steam-line steam-2"></div>
              <div className="steam-line steam-3"></div>
              <i className="fas fa-coffee fa-4x" style={{ color: "#667eea", position: "relative", zIndex: 1 }}></i>
            </div>
          </div>
          <h2 className="display-6 fw-bold mb-3" style={{ color: "#667eea" }}>Currently Brewing</h2>
          <p className="text-muted text-center" style={{ maxWidth: "400px" }}>
            This project page is under construction. Check back soon for more details!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <Link 
          href="/projects" 
          className="text-decoration-none text-light"
        >
          <i className="fas fa-arrow-left me-2"></i>
          Back to Projects
        </Link>
      </div>

      <div className="mb-4">
        {project.icon && (
          <div className="mb-3">
            <i className={`fas ${project.icon} fa-3x`} style={{ color: "#667eea" }}></i>
          </div>
        )}
        <h1 className="display-5 fw-bold mb-2">{project.title}</h1>
        {project.associatedWith && (
          <p className="text-muted mb-3">
            <i className="fas fa-link me-2" style={{ color: "#667eea" }}></i>
            Associated with: <span style={{ color: "#667eea" }}>{project.associatedWith}</span>
          </p>
        )}
      </div>

      <div className="mb-4">
        <p className="lead text-muted" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          {project.description}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="h5 fw-bold mb-3">Technologies Used</h3>
        <div className="d-flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <TechBadge 
              key={index} 
              tech={tech}
              variant="project"
            />
          ))}
        </div>
      </div>

      <div className="d-flex gap-3 flex-wrap">
        {project.link && project.link !== "#" && (
          <a 
            href={project.link} 
            className="btn btn-outline-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-external-link-alt me-2"></i>
            View Live Project
          </a>
        )}
        {project.github && (
          <a 
            href={project.github} 
            className="btn btn-outline-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github me-2"></i>
            View on GitHub
          </a>
        )}
      </div>
    </div>
  );
}

