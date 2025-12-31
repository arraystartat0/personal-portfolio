export interface Project {
  title: string;
  description: string;
  shortDescription?: string;
  technologies: string[];
  link: string;
  github?: string;
  icon?: string;
  slug: string;
  associatedWith?: string;
  ready?: boolean; // Set to true when project detail page is ready
}

export const projects: Project[] = [
  {
    title: "Sales Management System",
    slug: "sales-management-system",
    description: "Modern sales management system with great UI/UX designed to replace outdated business systems in Africa. Features include an automated events system that themes the webapp according to celebrations in Uganda, analytical page with revenue insights, motivational pop-ups based on analytics, and a dynamic recap system inspired by Spotify Wrapped.",
    shortDescription: "Modern sales management system with great UI/UX, automated event theming, analytics, and a Spotify Wrapped-inspired recap system.",
    technologies: ["PHP", "MySQL", "JavaScript", "REST API", "Bootstrap 5"],
    link: "#",
    icon: "fa-chart-line",
    associatedWith: "Blitz Packaging Limited Uganda",
    ready: false
  },
  {
    title: "Low-pass Noise Filtering Library",
    slug: "low-pass-filtering-library",
    description: "A library containing EMA (Exponential Moving Average), 1st order IIR Butterworth, and 2nd order Biquad IIR filter low-pass functions for noise filtering. Implemented using bilinear transform method with pre-warping for accurate frequency response. Used throughout the UBC Formula Electric codebase for sensor data filtering.",
    shortDescription: "Library with EMA, 1st order IIR Butterworth, and 2nd order Biquad IIR filter functions for noise filtering in embedded systems.",
    technologies: ["C", "Embedded Systems", "DFT", "Digital Filters", "GTest"],
    link: "#",
    github: "https://github.com/UBCFormulaElectric/Consolidated-Firmware/blob/master/firmware/shared/src/app/app_sensor_filter.c",
    icon: "fa-filter",
    associatedWith: "UBC Formula Electric",
    ready: false
  },
  {
    title: "HireFlow",
    slug: "hireflow",
    description: "A SaaS platform that centralizes internship management. Companies can register and create listings, simplifying development and reducing overhead. Applicants get a centralized portal to manage all their applications with live status updates. Features include company admin portal, HR portal, applicant portal with transparency, and a verification system for future employees.",
    shortDescription: "SaaS platform that centralizes internship management with company portals and a unified applicant dashboard with live status updates.",
    technologies: ["Django", "React", "Vite", "SWC", "Bootstrap"],
    link: "#",
    github: "https://github.com/me50/arraystartat0/tree/web50/projects/2020/x/capstone",
    icon: "fa-briefcase",
    associatedWith: "CS50W",
    ready: false
  },
];

