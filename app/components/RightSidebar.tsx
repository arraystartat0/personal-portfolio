"use client";

export default function RightSidebar() {
  const handleDownloadCV = () => {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = "/cv.pdf"; // Update this path to your actual CV file
    link.download = "Maneet_Bhatt_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <aside 
      className="d-flex flex-column align-items-center p-4"
      style={{ 
        width: "80px",
        position: "sticky",
        top: "20px",
        alignSelf: "flex-start",
        height: "fit-content",
        borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
        backgroundColor: "transparent",
        gap: "1.5rem"
      }}
    >
      <a
        href="https://www.linkedin.com/in/maneet-bhatt-543248303/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none"
        style={{ 
          color: "var(--foreground)",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          fontSize: "24px"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.color = "#0077b5";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.color = "var(--foreground)";
        }}
        title="LinkedIn"
      >
        <i className="fab fa-linkedin-in"></i>
      </a>

      <a
        href="https://github.com/arraystartat0"
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none"
        style={{ 
          color: "var(--foreground)",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          fontSize: "24px"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.color = "var(--foreground)";
        }}
        title="GitHub"
      >
        <i className="fab fa-github"></i>
      </a>

      <a
        href="mailto:bhattmaneet6@gmail.com"
        className="text-decoration-none"
        style={{ 
          color: "var(--foreground)",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          fontSize: "24px"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.color = "#ea4335";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.color = "var(--foreground)";
        }}
        title="Email"
      >
        <i className="fas fa-envelope"></i>
      </a>

      <button
        onClick={handleDownloadCV}
        className="btn"
        style={{ 
          backgroundColor: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "var(--foreground)",
          borderRadius: "6px",
          padding: "0.5rem",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.backgroundColor = "rgba(102, 126, 234, 0.2)";
          e.currentTarget.style.borderColor = "#667eea";
          e.currentTarget.style.color = "#667eea";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
          e.currentTarget.style.color = "var(--foreground)";
        }}
        title="Download CV"
      >
        <i className="fas fa-download" style={{ fontSize: "20px" }}></i>
      </button>
    </aside>
  );
}

