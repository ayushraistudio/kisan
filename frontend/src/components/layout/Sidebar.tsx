"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import {
  Home,
  Map,
  Camera,
  Leaf,
  CloudSun,
  LineChart,
  BookOpen,
  Users,
  Bell,
  Settings,
  Sprout,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const menuItems = [
    {
      icon: Home,
      label: t("sidebar.dashboard"),
      href: "/",
    },
    {
      icon: Map,
      label: t("sidebar.myFarm"),
      href: "/my-farm",
    },
    {
      icon: Camera,
      label: t("sidebar.diseaseDetection"),
      href: "/disease-detection",
    },
    {
      icon: Leaf,
      label: t("sidebar.cropAdvisory"),
      href: "/crop-advisory",
    },
    {
      icon: CloudSun,
      label: t("sidebar.weather"),
      href: "/weather",
    },
    {
      icon: LineChart,
      label: t("sidebar.marketPrices"),
      href: "/market-prices",
    },
    {
      icon: BookOpen,
      label: t("sidebar.knowledgeHub"),
      href: "/knowledge-hub",
    },
    {
      icon: Users,
      label: t("sidebar.expertConnect"),
      href: "/expert-connect",
    },
    {
      icon: Bell,
      label: t("sidebar.alerts"),
      href: "/alerts",
      badge: 3,
    },
    {
      icon: Settings,
      label: t("sidebar.settings"),
      href: "/settings",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "260px",
        height: "100vh",
        zIndex: 50,

        display: "flex",
        flexDirection: "column",

        background:
          "linear-gradient(180deg, rgba(7,15,42,0.98) 0%, rgba(5,12,32,0.99) 50%, rgba(8,8,30,0.99) 100%)",

        borderRight: "1px solid rgba(99,102,241,0.22)",

        boxShadow:
          "10px 0 40px rgba(0,0,0,0.25), inset -1px 0 25px rgba(79,70,229,0.04)",

        overflow: "hidden",
      }}
    >

      {/* =====================================================
          BRAND
      ===================================================== */}

      <div
        style={{
          padding: "24px 20px 20px",
          borderBottom: "1px solid rgba(99,102,241,0.16)",
          position: "relative",
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "-70px",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "rgba(59,130,246,0.16)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "13px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              background:
                "linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)",

              border: "1px solid rgba(165,180,252,0.35)",

              boxShadow:
                "0 8px 25px rgba(79,70,229,0.28), 0 0 25px rgba(37,99,235,0.12)",
            }}
          >
            <Sprout
              size={23}
              strokeWidth={2.2}
              color="#ffffff"
            />
          </div>

          <div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                color: "#ffffff",
                lineHeight: "1.1",
              }}
            >
              Kisan Saathi
            </div>

            <div
              style={{
                marginTop: "5px",
                fontSize: "11px",
                color: "#8b9cff",
                fontWeight: 600,
                letterSpacing: "0.4px",
              }}
            >
              SMART FARMING
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "16px",
            fontSize: "12px",
            color: "#64748b",
            letterSpacing: "0.2px",
          }}
        >
          AI-powered farming intelligence
        </div>
      </div>


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav
        style={{
          flex: 1,
          padding: "18px 12px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >

        <div
          style={{
            padding: "0 10px 10px",
            fontSize: "10px",
            fontWeight: 700,
            color: "#475569",
            letterSpacing: "1.2px",
            textTransform: "uppercase",
          }}
        >
          Main Menu
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  position: "relative",

                  display: "flex",
                  alignItems: "center",
                  gap: "12px",

                  width: "100%",
                  minHeight: "44px",

                  padding: "10px 12px",

                  borderRadius: "11px",

                  textDecoration: "none",

                  color: active ? "#ffffff" : "#94a3b8",

                  background: active
                    ? "linear-gradient(135deg, rgba(79,70,229,0.30), rgba(124,58,237,0.20))"
                    : "transparent",

                  border: active
                    ? "1px solid rgba(129,140,248,0.25)"
                    : "1px solid transparent",

                  boxShadow: active
                    ? "0 6px 20px rgba(79,70,229,0.12), inset 0 1px 0 rgba(255,255,255,0.04)"
                    : "none",

                  transition:
                    "all 0.2s ease",

                  fontSize: "13px",
                  fontWeight: active ? 650 : 500,
                }}
              >

                {/* active indicator */}
                {active && (
                  <div
                    style={{
                      position: "absolute",
                      left: "-1px",
                      top: "8px",
                      bottom: "8px",
                      width: "3px",
                      borderRadius: "0 4px 4px 0",

                      background:
                        "linear-gradient(180deg, #60a5fa, #818cf8, #a78bfa)",

                      boxShadow:
                        "0 0 12px rgba(96,165,250,0.8)",
                    }}
                  />
                )}

                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    flexShrink: 0,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    borderRadius: "9px",

                    background: active
                      ? "rgba(99,102,241,0.18)"
                      : "rgba(30,41,75,0.45)",

                    color: active ? "#a5b4fc" : "#64748b",

                    transition: "all 0.2s ease",
                  }}
                >
                  <Icon
                    size={17}
                    strokeWidth={active ? 2.2 : 1.8}
                  />
                </div>

                <span
                  style={{
                    flex: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.label}
                </span>

                {item.badge && (
                  <span
                    style={{
                      minWidth: "21px",
                      height: "21px",

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      borderRadius: "999px",

                      background:
                        "linear-gradient(135deg, #ef4444, #dc2626)",

                      color: "#ffffff",

                      fontSize: "10px",
                      fontWeight: 800,

                      boxShadow:
                        "0 0 12px rgba(239,68,68,0.25)",
                    }}
                  >
                    {item.badge}
                  </span>
                )}

                {active && !item.badge && (
                  <ChevronRight
                    size={14}
                    color="#818cf8"
                    strokeWidth={2}
                  />
                )}

              </Link>
            );
          })}
        </div>
      </nav>


      {/* =====================================================
          AI STATUS CARD
      ===================================================== */}

      <div
        style={{
          margin: "0 14px 14px",
          padding: "14px",

          borderRadius: "14px",

          background:
            "linear-gradient(135deg, rgba(30,64,175,0.18), rgba(91,33,182,0.18))",

          border:
            "1px solid rgba(99,102,241,0.18)",

          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "9px",
          }}
        >

          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 10px rgba(34,197,94,0.8)",
            }}
          />

          <span
            style={{
              fontSize: "11px",
              color: "#86efac",
              fontWeight: 700,
            }}
          >
            AI SYSTEM ONLINE
          </span>

        </div>

        <div
          style={{
            color: "#e2e8f0",
            fontSize: "12px",
            lineHeight: "1.5",
          }}
        >
          Smart insights are ready for your farm.
        </div>

      </div>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div
        style={{
          padding: "12px 20px 18px",

          borderTop:
            "1px solid rgba(99,102,241,0.12)",

          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            color: "#475569",
            letterSpacing: "0.5px",
          }}
        >
          MADE FOR INDIAN FARMERS
        </div>

        <div
          style={{
            marginTop: "4px",
            fontSize: "10px",
            color: "#334155",
          }}
        >
          © Kisan Saathi
        </div>
      </div>

    </aside>
  );
}