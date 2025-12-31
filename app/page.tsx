"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { projects } from "./data/projects";
import type { Project } from "./data/projects";

export default function About() {
  const [randomProjects, setRandomProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Randomly select 3 projects
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    setRandomProjects(shuffled.slice(0, 3));
  }, []);

  const experience = [
    {
      title: "Junior Controls Engineer",
      company: "UBC Formula Electric",
      period: "Sep 2025 - Present",
      description: "Wrote, tested, and implemented a low-pass filter library (Exponential, Butterworth 1st order IIR, Biquad 2nd order DF1 IIR) to be used in by the software team.",
      location: "Vancouver, BC, Canada (Hybrid)",
      skills: ["Git", "Vehicle Dynamics", "Embedded C", "ARM Cortex-M", "Embedded software", "C (programming language)", "STM32", "Digital Filters", "Debugging", "JTAG"]
    },
    {
      title: "Technical Lead",
      company: "Blitz Packaging Limited Uganda",
      period: "Jul 2024 - Present",
      description: "Lead IT operations and develop digital solutions that drive business efficiency. Advise on digital transformation and maintain innovative systems.",
      location: "Central Region, Uganda (Remote)",
      skills: ["Web Development", "Front-End Development", "Back-end Web Development", "User Interface Design", "Project Management", "Selenium Testing", "Data Analysis"]
    },
    {
      title: "Webmaster",
      company: "Blitz Packaging Limited Uganda",
      period: "Mar 2024 - Jul 2024",
      description: "Curated and implemented IT and web operations. Oversaw performance, security, and efficiency of web-based systems. Enhanced digital presence through market-leading website.",
      location: "Central Region, Uganda (Remote)",
      skills: ["SEO", "Webmaster Services", "Security Management", "Network Administration", "IT Support"]
    },
    /*{
      title: "President",
      company: "Bless a Child Foundation at RISU",
      period: "Apr 2023 - Jul 2024",
      description: "Pioneered in-school charity collaboration. Led team of 6 Board Members to raise funds through bake sales and drink sales, maximizing profits for underprivileged children.",
      location: "Uganda (Hybrid)",
      skills: ["Charity Work", "Charity Events", "Charity Management", "Team Management", "Project Planning"]
    },*/
    /*{
      title: "Intern Junior Developer",
      company: "Impiger Technologies Inc.",
      period: "Jun 2023 - Jul 2023",
      description: "Gained experience in systems development documentation (Terms of Reference, Inception Reports, SRS, URD, Business Analysis). Developed small-scale prototype of internship management system.",
      location: "Uganda (Hybrid)",
      skills: ["Proposal Writing", "Technical Reports", "Laravel", "MySQL", "Web Development"]
    }*/
  ];

  const certifications = [
    {
      title: "DELF B2",
      issuer: "Ministère de l'Éducation nationale",
      issueDate: "Jul 2025",
      skills: ["French"],
      credentialId: null,
      credentialUrl: null
    },
    {
      title: "CS50W",
      issuer: "HarvardX",
      issueDate: "Jun 2025",
      skills: ["Django", "Django REST Framework", "JavaScript", "Python", "SQL", "Git", "HTML", "CSS"],
      credentialId: "149f9dd7-6e23-4cc0-aac8-50babe7cb916",
      credentialUrl: "https://certificates.cs50.io/149f9dd7-6e23-4cc0-aac8-50babe7cb916.pdf?size=letter"
    },
    {
      title: "DELF B1",
      issuer: "Ministère de l'Éducation nationale",
      issueDate: "Jan 2025",
      skills: ["French"],
      credentialId: null,
      credentialUrl: null
    }
  ];

  const education = [
    {
      degree: "Bachelors of Applied Science",
      institution: "University of British Columbia",
      period: "Sep 2025 - April 2030",
      field: "First Year Engineering",
      location: "Vancouver, BC"
    }
  ];

  return (
    <div>
      <div className="mb-5">
        <Image
          src="/profile.jpg"
          alt="Profile picture"
          width={100}
          height={100}
          className="rounded mb-3"
          style={{ objectFit: "cover" }}
        />
        <h1 className="display-6 fw-bold mb-2">Maneet Bhatt</h1>
        <p className="lead text-muted mb-0 fs-6"><i className="fas fa-school me-1"></i> Bachlors of Applied Science @ UBC</p>
        <p className="lead text-muted mb-0 fs-6"><i className="fas fa-people-group me-1"></i> Junior Vehicle Controls Engineer @ <a href="https://www.ubcformulaelectric.com/" target="_blank" rel="noopener noreferrer">UBC Formula Electric</a><i className="fa-solid fa-arrow-up-right-from-square fs-6 ms-1"></i></p>
      </div>

      <div className="mb-5">
        <p className="mb-3">
          Hi, I'm Maneet and I am persuing my <span className="fst-italic">Bachlors of Applied Science at the University of 
          British Columbia</span>. I am currently also a member of the <a href="https://www.ubcformulaelectric.com/" target="_blank" rel="noopener noreferrer">UBC Formula Electric</a> design team where I am part of the <a href="/projects/UBC-FE" target="_blank" rel="noopener noreferrer">vehicle controls subteam</a> whose objective is to design propietrary vehicle controls software. Alongside, I supply <a href="/projects/blitz-packaging" target="_blank" rel="noopener noreferrer">ICT services </a>
          to <a href="https://www.blitzpackaging.co.ug/" target="_blank" rel="noopener noreferrer">Blitz Packaging Ltd</a>.
        </p>
      </div>

      {/* Experience Section */}
      <section className="mb-5">
        <h2 className="h4 fw-light mb-4 d-flex align-items-center">
          Experience
        </h2>
        <div>
          {(() => {
            // Group experiences by company
            const groupedByCompany = experience.reduce((acc, exp) => {
              if (!acc[exp.company]) {
                acc[exp.company] = [];
              }
              acc[exp.company].push(exp);
              return acc;
            }, {} as Record<string, typeof experience>);

            // Helper function to parse date from period string
            const parseDate = (period: string): number => {
              // Extract the start date (first part before " - ")
              const startDate = period.split(" - ")[0];
              const [month, year] = startDate.split(" ");
              const monthMap: Record<string, number> = {
                "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
                "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
              };
              const monthNum = monthMap[month] || 0;
              const yearNum = parseInt(year) || 0;
              return yearNum * 12 + monthNum; // Convert to sortable number
            };

            // Sort companies by most recent experience date (newest first)
            const companies = Object.keys(groupedByCompany).sort((a, b) => {
              const aLatest = groupedByCompany[a][0];
              const bLatest = groupedByCompany[b][0];
              return parseDate(bLatest.period) - parseDate(aLatest.period);
            });

            return companies.map((company, companyIndex) => {
              // Sort experiences within company by date (newest first)
              const companyExperiences = groupedByCompany[company].sort((a, b) => {
                return parseDate(b.period) - parseDate(a.period);
              });
              const firstExp = companyExperiences[0];
              const isLastCompany = companyIndex === companies.length - 1;

              return (
                <div key={company} className="mb-5">
                  {/* Company Header */}
                  <div className="d-flex align-items-start mb-3">
                    <div className="flex-grow-1">
                      <h5 className="fw-bold mb-1">{company}</h5>
                      <p className="text-muted mb-0 small">
                        <i className="fas fa-map-marker-alt me-1"></i>
                        {firstExp.location}
                      </p>
                    </div>
                  </div>

                  {/* Roles */}
                  {companyExperiences.length > 1 ? (
                    <div className="ms-4" style={{ borderLeft: "1px solid rgba(255, 255, 255, 0.2)", paddingLeft: "1.5rem" }}>
                      {companyExperiences.map((exp, roleIndex) => {
                        const isLastRole = roleIndex === companyExperiences.length - 1;
                        const isLastItem = isLastCompany && isLastRole;

                        return (
                          <div key={roleIndex} className="mb-4 pb-4" style={{ borderBottom: !isLastItem ? "1px solid rgba(255, 255, 255, 0.1)" : "none" }}>
                            <div className="d-flex align-items-start mb-2">
                              <div 
                                className="rounded-circle me-3"
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                                  marginTop: "8px",
                                  flexShrink: 0,
                                  marginLeft: "-1.75rem"
                                }}
                              ></div>
                              <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap">
                                  <div className="flex-grow-1">
                                    <h5 className="fw-bold mb-1">{exp.title}</h5>
                                  </div>
                                  <span className="badge" style={{ backgroundColor: "rgba(102, 126, 234, 0.2)", color: "#667eea", border: "1px solid rgba(102, 126, 234, 0.3)" }}>
                                    {exp.period}
                                  </span>
                                </div>
                                <p className="text-muted mt-2 mb-2" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>{exp.description}</p>
                                {exp.skills && exp.skills.length > 0 && (
                                  <div className="d-flex flex-wrap gap-2 mt-2">
                                    {exp.skills.map((skill: string, skillIndex: number) => {
                                      const colors = [
                                        { bg: "rgba(102, 126, 234, 0.2)", text: "#667eea", border: "rgba(102, 126, 234, 0.3)" }, // Purple
                                        { bg: "rgba(236, 72, 153, 0.2)", text: "#ec4899", border: "rgba(236, 72, 153, 0.3)" }, // Pink
                                        { bg: "rgba(59, 130, 246, 0.2)", text: "#3b82f6", border: "rgba(59, 130, 246, 0.3)" }, // Blue
                                        { bg: "rgba(34, 197, 94, 0.2)", text: "#22c55e", border: "rgba(34, 197, 94, 0.3)" }, // Green
                                        { bg: "rgba(251, 146, 60, 0.2)", text: "#fb923c", border: "rgba(251, 146, 60, 0.3)" }, // Orange
                                        { bg: "rgba(168, 85, 247, 0.2)", text: "#a855f7", border: "rgba(168, 85, 247, 0.3)" }, // Violet
                                      ];
                                      const color = colors[skillIndex % colors.length];
                                      return (
                                        <span 
                                          key={skillIndex}
                                          className="badge"
                                          style={{ 
                                            backgroundColor: color.bg,
                                            color: color.text,
                                            border: `1px solid ${color.border}`,
                                            fontSize: "0.75rem",
                                            fontWeight: "normal"
                                          }}
                                        >
                                          {skill}
                                        </span>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="ms-4">
                      {companyExperiences.map((exp, roleIndex) => {
                        const isLastItem = isLastCompany && roleIndex === companyExperiences.length - 1;

                        return (
                          <div key={roleIndex} className="mb-4 pb-4" style={{ borderBottom: !isLastItem ? "1px solid rgba(255, 255, 255, 0.1)" : "none" }}>
                            <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap">
                              <div className="flex-grow-1">
                                <h5 className="fw-bold mb-1">{exp.title}</h5>
                              </div>
                              <span className="badge" style={{ backgroundColor: "rgba(102, 126, 234, 0.2)", color: "#667eea", border: "1px solid rgba(102, 126, 234, 0.3)" }}>
                                {exp.period}
                              </span>
                            </div>
                            <p className="text-muted mt-2 mb-2" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>{exp.description}</p>
                            {exp.skills && exp.skills.length > 0 && (
                              <div className="d-flex flex-wrap gap-2 mt-2">
                                {exp.skills.map((skill: string, skillIndex: number) => {
                                  const colors = [
                                    { bg: "rgba(102, 126, 234, 0.2)", text: "#667eea", border: "rgba(102, 126, 234, 0.3)" }, // Purple
                                    { bg: "rgba(236, 72, 153, 0.2)", text: "#ec4899", border: "rgba(236, 72, 153, 0.3)" }, // Pink
                                    { bg: "rgba(59, 130, 246, 0.2)", text: "#3b82f6", border: "rgba(59, 130, 246, 0.3)" }, // Blue
                                    { bg: "rgba(34, 197, 94, 0.2)", text: "#22c55e", border: "rgba(34, 197, 94, 0.3)" }, // Green
                                    { bg: "rgba(251, 146, 60, 0.2)", text: "#fb923c", border: "rgba(251, 146, 60, 0.3)" }, // Orange
                                    { bg: "rgba(168, 85, 247, 0.2)", text: "#a855f7", border: "rgba(168, 85, 247, 0.3)" }, // Violet
                                  ];
                                  const color = colors[skillIndex % colors.length];
                                  return (
                                    <span 
                                      key={skillIndex}
                                      className="badge"
                                      style={{ 
                                        backgroundColor: color.bg,
                                        color: color.text,
                                        border: `1px solid ${color.border}`,
                                        fontSize: "0.75rem",
                                        fontWeight: "normal"
                                      }}
                                    >
                                      {skill}
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            });
          })()}
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-5">
        <h2 className="h4 fw-light mb-4 d-flex align-items-center">
          Recommended Projects
        </h2>
        <div className="row g-3">
          {randomProjects.map((study, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <Link href={`/projects/${study.slug}`} className="text-decoration-none">
                <div 
                  className="card h-100 border-0"
                  style={{ 
                    backgroundColor: "#1a1a1a",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.2)";
                    e.currentTarget.style.borderColor = "rgba(102, 126, 234, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  <div className="card-body p-4">
                    {study.icon && (
                      <div className="mb-3">
                        <i className={`fas ${study.icon} fa-2x`} style={{ color: "#667eea" }}></i>
                      </div>
                    )}
                    <h5 className="card-title fw-bold mb-2" style={{ color: "var(--foreground)", opacity: 0.9 }}>
                      {study.title}
                    </h5>
                    {study.associatedWith && (
                      <p className="text-muted mb-2 small">
                        <i className="fas fa-link me-1" style={{ color: "#667eea" }}></i>
                        <span style={{ color: "#667eea" }}>{study.associatedWith}</span>
                      </p>
                    )}
                    <p className="card-text text-muted mb-3 small">{study.shortDescription || study.description}</p>
                    <div className="d-flex flex-wrap gap-1">
                      {study.technologies.slice(0, 2).map((tech: string, techIndex: number) => (
                        <span 
                          key={techIndex}
                          className="badge"
                          style={{ 
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            color: "var(--foreground)",
                            fontSize: "0.7rem"
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {study.technologies.length > 2 && (
                        <span 
                          className="badge"
                          style={{ 
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            color: "var(--foreground)",
                            fontSize: "0.7rem"
                          }}
                        >
                          +{study.technologies.length - 2}
                        </span>
                      )}
                    </div>
                    <div className="mt-3">
                      <span className="small" style={{ color: "#667eea" }}>
                        View Project <i className="fas fa-arrow-right ms-1"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section className="mb-5">
        <h2 className="h4 fw-light mb-4 d-flex align-items-center">
          Certifications
        </h2>
        <div>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-4 pb-4" style={{ borderBottom: index < certifications.length - 1 ? "1px solid rgba(255, 255, 255, 0.1)" : "none" }}>
              <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap">
                <div className="flex-grow-1">
                  <h5 className="fw-bold mb-1">{cert.title}</h5>
                  <p className="text-muted mb-1">{cert.issuer}</p>
                  {cert.credentialId && (
                    <p className="text-muted mb-0 small">
                      Credential ID: <span className="font-monospace">{cert.credentialId}</span>
                    </p>
                  )}
                </div>
                <span className="badge" style={{ backgroundColor: "rgba(102, 126, 234, 0.2)", color: "#667eea", border: "1px solid rgba(102, 126, 234, 0.3)" }}>
                  Issued {cert.issueDate}
                </span>
              </div>
              {cert.credentialUrl && (
                <div className="mb-2">
                  <a 
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                    style={{ 
                      backgroundColor: "rgba(102, 126, 234, 0.1)",
                      borderColor: "#667eea",
                      color: "#667eea"
                    }}
                  >
                    <i className="fas fa-external-link-alt me-2"></i>
                    Show credential
                  </a>
                </div>
              )}
              {cert.skills && cert.skills.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <span className="text-muted small me-2">Skills:</span>
                  {cert.skills.map((skill: string, skillIndex: number) => {
                    const colors = [
                      { bg: "rgba(102, 126, 234, 0.2)", text: "#667eea", border: "rgba(102, 126, 234, 0.3)" },
                      { bg: "rgba(236, 72, 153, 0.2)", text: "#ec4899", border: "rgba(236, 72, 153, 0.3)" },
                      { bg: "rgba(59, 130, 246, 0.2)", text: "#3b82f6", border: "rgba(59, 130, 246, 0.3)" },
                      { bg: "rgba(34, 197, 94, 0.2)", text: "#22c55e", border: "rgba(34, 197, 94, 0.3)" },
                      { bg: "rgba(251, 146, 60, 0.2)", text: "#fb923c", border: "rgba(251, 146, 60, 0.3)" },
                      { bg: "rgba(168, 85, 247, 0.2)", text: "#a855f7", border: "rgba(168, 85, 247, 0.3)" },
                    ];
                    const color = colors[skillIndex % colors.length];
                    return (
                      <span 
                        key={skillIndex}
                        className="badge"
                        style={{ 
                          backgroundColor: color.bg,
                          color: color.text,
                          border: `1px solid ${color.border}`,
                          fontSize: "0.75rem",
                          fontWeight: "normal"
                        }}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-5">
        <h2 className="h4 fw-light mb-4 d-flex align-items-center">
          Education
        </h2>
        <div>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 pb-4" style={{ borderBottom: index < education.length - 1 ? "1px solid rgba(255, 255, 255, 0.1)" : "none" }}>
              <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap">
                <div className="flex-grow-1">
                  <h5 className="fw-bold mb-1">{edu.degree}</h5>
                  <p className="text-muted mb-1">
                    <i className="fas fa-university me-1"></i>
                    {edu.institution}
                  </p>
                  <p className="text-muted mb-1 small">
                    <i className="fas fa-book me-1"></i>
                    {edu.field}
                  </p>
                  <p className="text-muted mb-0 small">
                    <i className="fas fa-map-marker-alt me-1"></i>
                    {edu.location}
                  </p>
                </div>
                <span className="badge" style={{ backgroundColor: "rgba(102, 126, 234, 0.2)", color: "#667eea", border: "1px solid rgba(102, 126, 234, 0.3)" }}>
                  {edu.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
