"use client";

interface TechBadgeProps {
  tech: string;
  variant?: "project" | "skill";
}

// Color palette for different technologies
const getTechColor = (tech: string): string => {
  const techLower = tech.toLowerCase();
  
  // Language colors
  if (techLower.includes("javascript") || techLower.includes("js")) return "#F7DF1E";
  if (techLower.includes("typescript") || techLower.includes("ts")) return "#3178C6";
  if (techLower.includes("python")) return "#3776AB";
  if (techLower.includes("java")) return "#ED8B00";
  if (techLower.includes("c++") || techLower.includes("cpp")) return "#00599C";
  
  // Framework colors
  if (techLower.includes("react")) return "#61DAFB";
  if (techLower.includes("next.js") || techLower.includes("nextjs")) return "#000000";
  if (techLower.includes("node.js") || techLower.includes("nodejs")) return "#339933";
  if (techLower.includes("express")) return "#000000";
  if (techLower.includes("django")) return "#44B78B";
  if (techLower.includes("tailwind")) return "#06B6D4";
  if (techLower.includes("vue")) return "#4FC08D";
  
  // Database colors
  if (techLower.includes("postgresql") || techLower.includes("postgres")) return "#336791";
  if (techLower.includes("mongodb")) return "#47A248";
  
  // Tool colors
  if (techLower.includes("docker")) return "#2496ED";
  if (techLower.includes("git")) return "#F05032";
  if (techLower.includes("aws")) return "#FF9900";
  
  // Default gradient colors
  const defaultColors = [
    "#667eea", "#764ba2", "#f093fb", "#4facfe", 
    "#43e97b", "#fa709a", "#fee140", "#30cfd0"
  ];
  return defaultColors[tech.length % defaultColors.length];
};

export default function TechBadge({ tech, variant = "project" }: TechBadgeProps) {
  const color = getTechColor(tech);
  
  return (
    <span 
      className="tech-badge"
      style={{
        backgroundColor: `${color}20`,
        color: color,
        border: `1px solid ${color}40`,
      }}
      data-tech={tech}
    >
      {tech}
    </span>
  );
}

