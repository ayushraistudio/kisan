"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", color: "#f8fafc" }}>
      {/* Mobile Responsive Global Overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .app-main-content { margin-left: 0 !important; }
          .app-main-padding { padding-top: 85px !important; padding-left: 16px !important; padding-right: 16px !important; padding-bottom: 90px !important; }
          .app-topbar { left: 0 !important; padding: 0 16px !important; }
          .app-sidebar { transform: translateX(-100%); transition: transform 0.3s ease; }
          .app-sidebar.open { transform: translateX(0); }
          .mobile-overlay { display: block !important; }
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
        }
        .mobile-overlay { display: none; }
        .mobile-only { display: none; }
        .app-sidebar { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      `}} />

      {/* Mobile Sidebar Overlay */}
      <div
        className={`mobile-overlay ${sidebarOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 40,
          opacity: sidebarOpen ? 1 : 0,
          pointerEvents: sidebarOpen ? "auto" : "none",
          transition: "opacity 0.3s ease"
        }}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className="app-main-content"
        style={{
          marginLeft: "260px",
          minHeight: "100vh",
          transition: "margin-left 0.3s ease"
        }}
      >
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main
          className="app-main-padding"
          style={{
            paddingTop: "102px",
            paddingLeft: "28px",
            paddingRight: "28px",
            paddingBottom: "40px",
            maxWidth: "1500px",
            margin: "0 auto",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}