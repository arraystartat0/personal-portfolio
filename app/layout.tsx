import type { Metadata } from "next";
import Script from "next/script";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={montserrat.variable}>
        <Script
          src="/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://kit.fontawesome.com/2c61bcd5f2.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <div style={{ height: "100px" }}></div>
        <div className="d-flex justify-content-center">
          <div className="d-flex" style={{ maxWidth: "1200px", width: "100%" }}>
            <Sidebar />
            <main className="flex-grow-1 p-4" style={{ overflowY: "auto", maxHeight: "calc(100vh - 100px)" }}>
              <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {children}
              </div>
            </main>
            <RightSidebar />
          </div>
        </div>
      </body>
    </html>
  );
}
