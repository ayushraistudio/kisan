"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({
  children,
}: AppShellProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#f8fafc",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          minHeight: "100vh",
        }}
      >
        <Topbar />

        <main
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