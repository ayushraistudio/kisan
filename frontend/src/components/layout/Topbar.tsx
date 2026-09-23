"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Globe2,
  Mic,
  Bell,
  User,
  X,
  ChevronDown,
  CloudRain,
  Bug,
  Droplets,
  Sprout,
  ArrowRight,
  MapPin,
  Settings,
  MessageCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import i18n from "@/i18n/config";
import SaathiAssistant from "./SaathiAssistant";

/* =========================================================
   SEARCH DATA
   ========================================================= */

const searchItems = [
  {
    title: "Dashboard",
    description: "Farm overview and AI insights",
    keywords: "dashboard home overview",
    route: "/",
    icon: <Sprout size={15} />,
  },
  {
    title: "My Farm",
    description: "Farm details and crop information",
    keywords: "farm field crop wheat",
    route: "/my-farm",
    icon: <Sprout size={15} />,
  },
  {
    title: "Disease Detection",
    description: "Upload a crop image for AI analysis",
    keywords: "disease leaf image analysis ai",
    route: "/disease-detection",
    icon: <Bug size={15} />,
  },
  {
    title: "Crop Advisory",
    description: "Crop-specific farming recommendations",
    keywords: "crop advice advisory farming",
    route: "/crop-advisory",
    icon: <Sprout size={15} />,
  },
  {
    title: "Weather & Forecast",
    description: "Weather conditions and forecast",
    keywords: "weather rain temperature humidity forecast",
    route: "/weather",
    icon: <CloudRain size={15} />,
  },
  {
    title: "Market Prices",
    description: "Crop prices and mandi information",
    keywords: "market mandi price wheat rice maize",
    route: "/market-prices",
    icon: <MapPin size={15} />,
  },
  {
    title: "Knowledge Hub",
    description: "Farming guides and learning resources",
    keywords: "knowledge guides farming learn",
    route: "/knowledge-hub",
    icon: <MessageCircle size={15} />,
  },
  {
    title: "Expert Connect",
    description: "Connect with agriculture experts",
    keywords: "expert doctor consultation help",
    route: "/expert-connect",
    icon: <User size={15} />,
  },
  {
    title: "My Alerts",
    description: "Weather, disease and farm alerts",
    keywords: "alerts notification warning critical",
    route: "/alerts",
    icon: <Bell size={15} />,
  },
  {
    title: "Settings",
    description: "Manage your Kisan Saathi preferences",
    keywords: "settings profile language notification",
    route: "/settings",
    icon: <Settings size={15} />,
  },
];

/* =========================================================
   ALERT DATA
   ========================================================= */

const recentAlerts = [
  {
    id: 1,
    title: "Disease Risk Increased",
    message: "Higher humidity may increase crop disease risk.",
    type: "Critical",
    icon: <Bug size={15} />,
    color: "#fb7185",
  },
  {
    id: 2,
    title: "Rain Expected Tomorrow",
    message: "Review irrigation plans before rainfall.",
    type: "Warning",
    icon: <CloudRain size={15} />,
    color: "#60a5fa",
  },
  {
    id: 3,
    title: "Irrigation Review",
    message: "Moderate irrigation demand detected.",
    type: "Info",
    icon: <Droplets size={15} />,
    color: "#38bdf8",
  },
];

/* =========================================================
   COMPONENT
   ========================================================= */

export default function Topbar() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [saathiOpen, setSaathiOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currentLangCode, setCurrentLangCode] = useState("en");
  
  // Floating AI Guide state
  const [showTooltip, setShowTooltip] = useState(true);
  const [globalDiseaseData, setGlobalDiseaseData] = useState<any>(null);

  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  const normalizedSearch = search.trim().toLowerCase();
  const searchResults =
    normalizedSearch.length === 0
      ? []
      : searchItems.filter((item) =>
          `${item.title} ${item.description} ${item.keywords}`
            .toLowerCase()
            .includes(normalizedSearch)
        );

  // Close Dropdowns When Clicking Outside
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;
      if (searchRef.current && !searchRef.current.contains(target)) setSearchOpen(false);
      if (notificationRef.current && !notificationRef.current.contains(target)) setNotificationOpen(false);
      if (profileRef.current && !profileRef.current.contains(target)) setProfileOpen(false);
      if (languageRef.current && !languageRef.current.contains(target)) setLanguageOpen(false);
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Update Language
  useEffect(() => {
    if (i18n.language) {
      setCurrentLangCode(i18n.language.split("-")[0]);
    }
  }, [i18n.language]);

  // Tooltip fade out after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for Dashboard "Talk to Saathi" CTA
  useEffect(() => {
    const handleOpenSaathi = (e: Event) => {
      setSaathiOpen(true);
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setGlobalDiseaseData(customEvent.detail);
      }
    };
    window.addEventListener("open-saathi", handleOpenSaathi);
    return () => window.removeEventListener("open-saathi", handleOpenSaathi);
  }, []);

  function navigate(route: string) {
    router.push(route);
    setSearchOpen(false);
    setNotificationOpen(false);
    setProfileOpen(false);
    setLanguageOpen(false);
  }

  function handleSearchSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (searchResults.length > 0) {
      navigate(searchResults[0].route);
      return;
    }
    if (search.trim()) {
      toast.error(`No Kisan Saathi feature found for "${search}".`);
    }
  }

  function changeLanguage(language: string) {
    i18n.changeLanguage(language);
    setCurrentLangCode(language);
    const names: Record<string, string> = { en: "English", hi: "Hindi", gu: "Gujarati" };
    toast.success(`Language changed to ${names[language] ?? language}`);
    setLanguageOpen(false);
  }

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: "260px",
          right: 0,
          height: "78px",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "0 28px",
          background: "rgba(7,10,27,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(99,102,241,0.12)",
        }}
      >
        <div ref={searchRef} style={{ position: "relative", flex: 1, maxWidth: "640px" }}>
          <form onSubmit={handleSearchSubmit}>
            <Search size={19} style={{ position: "absolute", left: "17px", top: "50%", transform: "translateY(-50%)", color: "#64748b", pointerEvents: "none" }} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search village, district or farm location..."
              style={{
                width: "100%", height: "54px", boxSizing: "border-box", padding: "0 45px", borderRadius: "13px", border: "1px solid rgba(99,102,241,0.20)", outline: "none", background: "linear-gradient(135deg, rgba(24,20,62,0.85), rgba(13,20,47,0.88))", color: "#e2e8f0", fontSize: "13px"
              }}
            />
            {search && (
              <button type="button" onClick={() => { setSearch(""); setSearchOpen(false); }} style={{ position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", border: "none", borderRadius: "50%", background: "rgba(100,116,139,0.12)", color: "#64748b", cursor: "pointer" }}>
                <X size={13} />
              </button>
            )}
          </form>

          {searchOpen && search.trim() && (
            <div style={{ position: "absolute", top: "61px", left: 0, right: 0, padding: "7px", borderRadius: "13px", background: "rgba(10,15,36,0.98)", border: "1px solid rgba(99,102,241,0.20)", boxShadow: "0 20px 50px rgba(0,0,0,0.45)", backdropFilter: "blur(20px)" }}>
              {searchResults.length > 0 ? (
                searchResults.slice(0, 6).map((item) => (
                  <button key={item.route} type="button" onClick={() => navigate(item.route)} style={{ width: "100%", display: "flex", alignItems: "center", gap: "11px", padding: "10px", border: "none", borderRadius: "9px", background: "transparent", color: "#e2e8f0", textAlign: "left", cursor: "pointer" }}>
                    <div style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", background: "rgba(96,165,250,0.08)", color: "#60a5fa" }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "10px", fontWeight: 700 }}>{item.title}</div>
                      <div style={{ marginTop: "3px", color: "#64748b", fontSize: "8px" }}>{item.description}</div>
                    </div>
                    <ArrowRight size={13} color="#475569" />
                  </button>
                ))
              ) : (
                <div style={{ padding: "20px", textAlign: "center", color: "#64748b", fontSize: "9px" }}>No Kisan Saathi feature found.</div>
              )}
            </div>
          )}
        </div>

        <div ref={languageRef} style={{ position: "relative" }}>
          <button type="button" onClick={() => setLanguageOpen((current) => !current)} style={{ height: "54px", minWidth: "150px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", padding: "0 14px", borderRadius: "12px", border: "1px solid rgba(99,102,241,0.20)", background: "rgba(20,18,55,0.80)", color: "#e2e8f0", cursor: "pointer" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", fontWeight: 700 }}>
              <Globe2 size={16} color="#60a5fa" />
              {currentLangCode === "hi" ? "Hindi" : currentLangCode === "gu" ? "Gujarati" : "English"}
            </span>
            <ChevronDown size={14} color="#64748b" />
          </button>

          {languageOpen && (
            <div style={{ position: "absolute", top: "61px", right: 0, width: "170px", padding: "16px", borderRadius: "12px", background: "rgba(10,15,36,0.98)", border: "1px solid rgba(99,102,241,0.20)", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
              {[["en", "English"], ["hi", "Hindi"], ["gu", "Gujarati"]].map(([code, label]) => (
                <button key={code} type="button" onClick={() => changeLanguage(code)} style={{ width: "100%", padding: "9px 10px", border: "none", borderRadius: "8px", background: "transparent", color: "#cbd5e1", textAlign: "left", fontSize: "16px", cursor: "pointer" }}>{label}</button>
              ))}
            </div>
          )}
        </div>

        <button type="button" onClick={() => setSaathiOpen(true)} style={{ height: "54px", display: "flex", alignItems: "center", gap: "8px", padding: "0 16px", borderRadius: "12px", border: "1px solid rgba(139,92,246,0.40)", background: "linear-gradient(135deg, rgba(79,70,229,0.24), rgba(139,92,246,0.18))", color: "#ddd6fe", fontSize: "15px", fontWeight: 750, cursor: "pointer", boxShadow: "0 0 22px rgba(139,92,246,0.10)" }}>
          <Mic size={16} />
          <span>Talk to<br />Saathi</span>
        </button>

        <div ref={notificationRef} style={{ position: "relative" }}>
          <button type="button" onClick={() => setNotificationOpen((current) => !current)} style={{ position: "relative", width: "54px", height: "54px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", border: "1px solid rgba(99,102,241,0.18)", background: "rgba(15,21,48,0.82)", color: "#94a3b8", cursor: "pointer" }}>
            <Bell size={18} />
            <span style={{ position: "absolute", top: "11px", right: "11px", width: "7px", height: "7px", borderRadius: "50%", background: "#fb7185", boxShadow: "0 0 8px rgba(251,113,133,0.9)" }} />
          </button>

          {notificationOpen && (
            <div style={{ position: "absolute", top: "61px", right: 0, width: "330px", padding: "10px", borderRadius: "14px", background: "rgba(10,15,36,0.98)", border: "1px solid rgba(99,102,241,0.20)", boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 5px 10px" }}>
                <div style={{ color: "#ffffff", fontSize: "15px", fontWeight: 750 }}>Recent Alerts</div>
                <button type="button" onClick={() => navigate("/alerts")} style={{ display: "flex", alignItems: "center", gap: "4px", border: "none", background: "transparent", color: "#60a5fa", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
                  View all <ArrowRight size={10} />
                </button>
              </div>

              {recentAlerts.map((alert) => (
                <button key={alert.id} type="button" onClick={() => navigate("/alerts")} style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: "9px", padding: "10px 7px", border: "none", borderTop: "1px solid rgba(99,102,241,0.07)", background: "transparent", textAlign: "left", cursor: "pointer" }}>
                  <div style={{ width: "29px", height: "29px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", background: `${alert.color}12`, color: alert.color, flexShrink: 0 }}>{alert.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#e2e8f0", fontSize: "12px", fontWeight: 700 }}>{alert.title}</div>
                    <div style={{ color: "#64748b", fontSize: "12px", lineHeight: 1.5, marginTop: "3px" }}>{alert.message}</div>
                  </div>
                  <span style={{ color: alert.color, fontSize: "12px", fontWeight: 700 }}>{alert.type}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div ref={profileRef} style={{ position: "relative" }}>
          <button type="button" onClick={() => setProfileOpen((current) => !current)} style={{ display: "flex", alignItems: "center", gap: "9px", padding: "0 3px", border: "none", background: "transparent", color: "#ffffff", cursor: "pointer" }}>
            <div style={{ width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", border: "1px solid rgba(129,140,248,0.5)", boxShadow: "0 0 20px rgba(99,102,241,0.18)" }}>
              <User size={21} />
            </div>
            <div style={{ textAlign: "left", minWidth: "85px" }}>
              <div style={{ fontSize: "16px", fontWeight: 750, color: "#ffffff" }}>Hello, Farmer</div>
              <div style={{ marginTop: "2px", color: "#64748b", fontSize: "16px" }}>ID: 240033</div>
            </div>
          </button>

          {profileOpen && (
            <div style={{ position: "absolute", top: "61px", right: 0, width: "200px", padding: "7px", borderRadius: "13px", background: "rgba(10,15,36,0.98)", border: "1px solid rgba(99,102,241,0.20)", boxShadow: "0 20px 50px rgba(0,0,0,0.45)" }}>
              <button type="button" onClick={() => navigate("/my-farm")} style={menuButtonStyle}><Sprout size={14} /> My Farm</button>
              <button type="button" onClick={() => navigate("/settings")} style={menuButtonStyle}><Settings size={14} /> Settings</button>
              <button type="button" onClick={() => navigate("/alerts")} style={menuButtonStyle}><Bell size={14} /> My Alerts</button>
            </div>
          )}
        </div>
      </header>

      {/* FLOATING ACTION BUTTON (AI Guide) */}
      <div 
        style={{ 
          position: "fixed", 
          bottom: "35px", 
          right: "35px", 
          zIndex: 900, 
          display: "flex", 
          alignItems: "center", 
          gap: "12px" 
        }}
      >
        {showTooltip && (
          <div 
            style={{ 
              background: "rgba(79,70,229,0.9)", 
              color: "#fff", 
              padding: "10px 16px", 
              borderRadius: "12px", 
              fontSize: "12px", 
              fontWeight: 700, 
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              transition: "opacity 0.5s ease" 
            }}
          >
            AI Guide - Ask me anything!
          </div>
        )}
        <button
          onClick={() => setSaathiOpen(true)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            border: "1px solid rgba(139,92,246,0.5)",
            color: "white",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(124,58,237,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.2s ease"
          }}
        >
          <Mic size={26} />
        </button>
      </div>

      <SaathiAssistant
        isOpen={saathiOpen}
        onClose={() => setSaathiOpen(false)}
        currentLanguage={currentLangCode}
        diseaseContext={globalDiseaseData}
      />
    </>
  );
}

const menuButtonStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "9px",
  padding: "9px 10px",
  border: "none",
  borderRadius: "8px",
  background: "transparent",
  color: "#cbd5e1",
  textAlign: "left",
  fontSize: "16px",
  fontWeight: 650,
  cursor: "pointer",
};