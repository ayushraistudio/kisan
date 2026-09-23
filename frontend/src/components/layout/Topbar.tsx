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
  Send,
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
   TALK TO SAATHI QUICK QUESTIONS
   ========================================================= */

const quickQuestions = [
  "Should I irrigate today?",
  "How is my crop health?",
  "Will it rain tomorrow?",
];

/* =========================================================
   COMPONENT
   ========================================================= */

export default function Topbar() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [saathiOpen, setSaathiOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [languageOpen, setLanguageOpen] =
    useState(false);

  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState<
    {
      sender: "user" | "saathi";
      text: string;
    }[]
  >([
    {
      sender: "saathi",
      text: "Namaste! I'm Saathi. How can I help with your farm today?",
    },
  ]);

  const searchRef = useRef<HTMLDivElement>(null);

  const notificationRef =
    useRef<HTMLDivElement>(null);

  const profileRef =
    useRef<HTMLDivElement>(null);

  const languageRef =
    useRef<HTMLDivElement>(null);

  /* =======================================================
     SEARCH RESULTS
     ======================================================= */

  const normalizedSearch =
    search.trim().toLowerCase();

  const searchResults =
    normalizedSearch.length === 0
      ? []
      : searchItems.filter((item) =>
          `${item.title} ${item.description} ${item.keywords}`
            .toLowerCase()
            .includes(normalizedSearch)
        );

  /* =======================================================
     CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
     ======================================================= */

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      const target =
        event.target as Node;

      if (
        searchRef.current &&
        !searchRef.current.contains(target)
      ) {
        setSearchOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setNotificationOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }

      if (
        languageRef.current &&
        !languageRef.current.contains(target)
      ) {
        setLanguageOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =======================================================
     NAVIGATION
     ======================================================= */

  function navigate(route: string) {
    router.push(route);

    setSearchOpen(false);
    setNotificationOpen(false);
    setProfileOpen(false);
    setLanguageOpen(false);
  }

  /* =======================================================
     SEARCH
     ======================================================= */

  function handleSearchSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (searchResults.length > 0) {
      navigate(searchResults[0].route);
      return;
    }

    if (search.trim()) {
      toast.error(
        `No Kisan Saathi feature found for "${search}".`
      );
    }
  }

  /* =======================================================
     LANGUAGE
     ======================================================= */

  function changeLanguage(
    language: string
  ) {
    i18n.changeLanguage(language);

    const names: Record<
      string,
      string
    > = {
      en: "English",
      hi: "Hindi",
      gu: "Gujarati",
    };

    toast.success(
      `Language changed to ${
        names[language] ?? language
      }`
    );

    setLanguageOpen(false);
  }

  /* =======================================================
     SAATHI RESPONSE
     ======================================================= */

  function generateSaathiResponse(
    message: string
  ) {
    const lower =
      message.toLowerCase();

    if (
      lower.includes("irrigat") ||
      lower.includes("water")
    ) {
      return "Based on the current demo farm conditions, irrigation demand is moderate. Check soil moisture before irrigating and avoid unnecessary watering if rainfall is expected.";
    }

    if (
      lower.includes("weather") ||
      lower.includes("rain")
    ) {
      return "The current demo forecast indicates changing weather conditions. Please check the Weather & Forecast section for the latest forecast information.";
    }

    if (
      lower.includes("disease") ||
      lower.includes("health") ||
      lower.includes("leaf")
    ) {
      return "You can upload a clear crop-leaf image in Disease Detection. Saathi will send it to the AI analysis system when the backend is connected.";
    }

    if (
      lower.includes("market") ||
      lower.includes("price") ||
      lower.includes("mandi")
    ) {
      return "You can check current demo mandi information from the Market Prices section and compare nearby markets.";
    }

    if (
      lower.includes("crop") ||
      lower.includes("wheat")
    ) {
      return "Your demo farm is currently configured around wheat. Crop Advisory contains stage-specific recommendations for irrigation, nutrition and crop protection.";
    }

    return "I can help you with crop health, irrigation, weather, market prices and farming recommendations. Try asking about one of these.";
  }

  function sendMessage(
    customQuestion?: string
  ) {
    const message =
      customQuestion ?? question;

    if (!message.trim()) {
      return;
    }

    const cleanMessage =
      message.trim();

    setChatMessages((current) => [
      ...current,
      {
        sender: "user",
        text: cleanMessage,
      },
      {
        sender: "saathi",
        text: generateSaathiResponse(
          cleanMessage
        ),
      },
    ]);

    setQuestion("");
  }

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <>
      {/* ===================================================
          TOPBAR
          =================================================== */}

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
          padding:
            "0 28px",
          background:
            "rgba(7,10,27,0.88)",
          backdropFilter:
            "blur(20px)",
          WebkitBackdropFilter:
            "blur(20px)",
          borderBottom:
            "1px solid rgba(99,102,241,0.12)",
        }}
      >
        {/* =================================================
            SEARCH
            ================================================= */}

        <div
          ref={searchRef}
          style={{
            position: "relative",
            flex: 1,
            maxWidth: "640px",
          }}
        >
          <form
            onSubmit={
              handleSearchSubmit
            }
          >
            <Search
              size={19}
              style={{
                position:
                  "absolute",
                left: "17px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                color: "#64748b",
                pointerEvents:
                  "none",
              }}
            />

            <input
              value={search}
              onChange={(event) => {
                setSearch(
                  event.target.value
                );
                setSearchOpen(true);
              }}
              onFocus={() =>
                setSearchOpen(true)
              }
              placeholder="Search village, district or farm location..."
              style={{
                width: "100%",
                height: "54px",
                boxSizing: "border-box",
                padding:
                  "0 45px",
                borderRadius:
                  "13px",
                border:
                  "1px solid rgba(99,102,241,0.20)",
                outline: "none",
                background:
                  "linear-gradient(135deg, rgba(24,20,62,0.85), rgba(13,20,47,0.88))",
                color: "#e2e8f0",
                fontSize: "13px",
              }}
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSearchOpen(false);
                }}
                style={{
                  position:
                    "absolute",
                  right: "13px",
                  top: "50%",
                  transform:
                    "translateY(-50%)",
                  width: "26px",
                  height: "26px",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  border: "none",
                  borderRadius:
                    "50%",
                  background:
                    "rgba(100,116,139,0.12)",
                  color: "#64748b",
                  cursor: "pointer",
                }}
              >
                <X size={13} />
              </button>
            )}
          </form>

          {/* SEARCH DROPDOWN */}

          {searchOpen &&
            search.trim() && (
              <div
                style={{
                  position:
                    "absolute",
                  top: "61px",
                  left: 0,
                  right: 0,
                  padding: "7px",
                  borderRadius:
                    "13px",
                  background:
                    "rgba(10,15,36,0.98)",
                  border:
                    "1px solid rgba(99,102,241,0.20)",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.45)",
                  backdropFilter:
                    "blur(20px)",
                }}
              >
                {searchResults.length >
                0 ? (
                  searchResults
                    .slice(0, 6)
                    .map((item) => (
                      <button
                        key={
                          item.route
                        }
                        type="button"
                        onClick={() =>
                          navigate(
                            item.route
                          )
                        }
                        style={{
                          width: "100%",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: "11px",
                          padding:
                            "10px",
                          border: "none",
                          borderRadius:
                            "9px",
                          background:
                            "transparent",
                          color:
                            "#e2e8f0",
                          textAlign:
                            "left",
                          cursor:
                            "pointer",
                        }}
                      >
                        <div
                          style={{
                            width:
                              "30px",
                            height:
                              "30px",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            borderRadius:
                              "8px",
                            background:
                              "rgba(96,165,250,0.08)",
                            color:
                              "#60a5fa",
                          }}
                        >
                          {
                            item.icon
                          }
                        </div>

                        <div
                          style={{
                            flex: 1,
                          }}
                        >
                          <div
                            style={{
                              fontSize:
                                "10px",
                              fontWeight:
                                700,
                            }}
                          >
                            {
                              item.title
                            }
                          </div>

                          <div
                            style={{
                              marginTop:
                                "3px",
                              color:
                                "#64748b",
                              fontSize:
                                "8px",
                            }}
                          >
                            {
                              item.description
                            }
                          </div>
                        </div>

                        <ArrowRight
                          size={13}
                          color="#475569"
                        />
                      </button>
                    ))
                ) : (
                  <div
                    style={{
                      padding:
                        "20px",
                      textAlign:
                        "center",
                      color:
                        "#64748b",
                      fontSize:
                        "9px",
                    }}
                  >
                    No Kisan Saathi
                    feature found.
                  </div>
                )}
              </div>
            )}
        </div>

        {/* =================================================
            LANGUAGE
            ================================================= */}

        <div
          ref={languageRef}
          style={{
            position: "relative",
          }}
        >
          <button
            type="button"
            onClick={() =>
              setLanguageOpen(
                (current) =>
                  !current
              )
            }
            style={{
              height: "54px",
              minWidth: "150px",
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "space-between",
              gap: "10px",
              padding:
                "0 14px",
              borderRadius:
                "12px",
              border:
                "1px solid rgba(99,102,241,0.20)",
              background:
                "rgba(20,18,55,0.80)",
              color: "#e2e8f0",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap: "8px",
                fontSize:
                  "11px",
                fontWeight:
                  700,
              }}
            >
              <Globe2
                size={16}
                color="#60a5fa"
              />
              English
            </span>

            <ChevronDown
              size={14}
              color="#64748b"
            />
          </button>

          {languageOpen && (
            <div
              style={{
                position:
                  "absolute",
                top: "61px",
                right: 0,
                width:
                  "170px",
                padding: "6px",
                borderRadius:
                  "12px",
                background:
                  "rgba(10,15,36,0.98)",
                border:
                  "1px solid rgba(99,102,241,0.20)",
                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.4)",
              }}
            >
              {[
                ["en", "English"],
                ["hi", "Hindi"],
                ["gu", "Gujarati"],
              ].map(
                ([code, label]) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() =>
                      changeLanguage(
                        code
                      )
                    }
                    style={{
                      width:
                        "100%",
                      padding:
                        "9px 10px",
                      border:
                        "none",
                      borderRadius:
                        "8px",
                      background:
                        "transparent",
                      color:
                        "#cbd5e1",
                      textAlign:
                        "left",
                      fontSize:
                        "9px",
                      cursor:
                        "pointer",
                    }}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* =================================================
            TALK TO SAATHI
            ================================================= */}

        <button
          type="button"
          onClick={() =>
            setSaathiOpen(true)
          }
          style={{
            height: "54px",
            display: "flex",
            alignItems:
              "center",
            gap: "8px",
            padding:
              "0 16px",
            borderRadius:
              "12px",
            border:
              "1px solid rgba(139,92,246,0.40)",
            background:
              "linear-gradient(135deg, rgba(79,70,229,0.24), rgba(139,92,246,0.18))",
            color: "#ddd6fe",
            fontSize: "10px",
            fontWeight: 750,
            cursor: "pointer",
            boxShadow:
              "0 0 22px rgba(139,92,246,0.10)",
          }}
        >
          <Mic size={16} />
          <span>
            Talk to
            <br />
            Saathi
          </span>
        </button>

        {/* =================================================
            NOTIFICATIONS
            ================================================= */}

        <div
          ref={notificationRef}
          style={{
            position:
              "relative",
          }}
        >
          <button
            type="button"
            onClick={() =>
              setNotificationOpen(
                (current) =>
                  !current
              )
            }
            style={{
              position:
                "relative",
              width: "54px",
              height: "54px",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              borderRadius:
                "12px",
              border:
                "1px solid rgba(99,102,241,0.18)",
              background:
                "rgba(15,21,48,0.82)",
              color: "#94a3b8",
              cursor:
                "pointer",
            }}
          >
            <Bell size={18} />

            <span
              style={{
                position:
                  "absolute",
                top: "11px",
                right: "11px",
                width: "7px",
                height: "7px",
                borderRadius:
                  "50%",
                background:
                  "#fb7185",
                boxShadow:
                  "0 0 8px rgba(251,113,133,0.9)",
              }}
            />
          </button>

          {notificationOpen && (
            <div
              style={{
                position:
                  "absolute",
                top: "61px",
                right: 0,
                width:
                  "330px",
                padding: "10px",
                borderRadius:
                  "14px",
                background:
                  "rgba(10,15,36,0.98)",
                border:
                  "1px solid rgba(99,102,241,0.20)",
                boxShadow:
                  "0 25px 60px rgba(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "space-between",
                  padding:
                    "5px 5px 10px",
                }}
              >
                <div
                  style={{
                    color:
                      "#ffffff",
                    fontSize:
                      "11px",
                    fontWeight:
                      750,
                  }}
                >
                  Recent Alerts
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/alerts"
                    )
                  }
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: "4px",
                    border:
                      "none",
                    background:
                      "transparent",
                    color:
                      "#60a5fa",
                    fontSize:
                      "8px",
                    fontWeight:
                      700,
                    cursor:
                      "pointer",
                  }}
                >
                  View all
                  <ArrowRight
                    size={10}
                  />
                </button>
              </div>

              {recentAlerts.map(
                (alert) => (
                  <button
                    key={
                      alert.id
                    }
                    type="button"
                    onClick={() =>
                      navigate(
                        "/alerts"
                      )
                    }
                    style={{
                      width:
                        "100%",
                      display:
                        "flex",
                      alignItems:
                        "flex-start",
                      gap: "9px",
                      padding:
                        "10px 7px",
                      border:
                        "none",
                      borderTop:
                        "1px solid rgba(99,102,241,0.07)",
                      background:
                        "transparent",
                      textAlign:
                        "left",
                      cursor:
                        "pointer",
                    }}
                  >
                    <div
                      style={{
                        width:
                          "29px",
                        height:
                          "29px",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        borderRadius:
                          "8px",
                        background:
                          `${alert.color}12`,
                        color:
                          alert.color,
                        flexShrink: 0,
                      }}
                    >
                      {
                        alert.icon
                      }
                    </div>

                    <div
                      style={{
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          color:
                            "#e2e8f0",
                          fontSize:
                            "9px",
                          fontWeight:
                            700,
                        }}
                      >
                        {
                          alert.title
                        }
                      </div>

                      <div
                        style={{
                          color:
                            "#64748b",
                          fontSize:
                            "8px",
                          lineHeight:
                            1.5,
                          marginTop:
                            "3px",
                        }}
                      >
                        {
                          alert.message
                        }
                      </div>
                    </div>

                    <span
                      style={{
                        color:
                          alert.color,
                        fontSize:
                          "7px",
                        fontWeight:
                          700,
                      }}
                    >
                      {
                        alert.type
                      }
                    </span>
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* =================================================
            PROFILE
            ================================================= */}

        <div
          ref={profileRef}
          style={{
            position:
              "relative",
          }}
        >
          <button
            type="button"
            onClick={() =>
              setProfileOpen(
                (current) =>
                  !current
              )
            }
            style={{
              display:
                "flex",
              alignItems:
                "center",
              gap: "9px",
              padding:
                "0 3px",
              border:
                "none",
              background:
                "transparent",
              color:
                "#ffffff",
              cursor:
                "pointer",
            }}
          >
            <div
              style={{
                width:
                  "50px",
                height:
                  "50px",
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                borderRadius:
                  "50%",
                background:
                  "linear-gradient(135deg, #4f46e5, #7c3aed)",
                border:
                  "1px solid rgba(129,140,248,0.5)",
                boxShadow:
                  "0 0 20px rgba(99,102,241,0.18)",
              }}
            >
              <User size={21} />
            </div>

            <div
              style={{
                textAlign:
                  "left",
                minWidth:
                  "85px",
              }}
            >
              <div
                style={{
                  fontSize:
                    "12px",
                  fontWeight:
                    750,
                  color:
                    "#ffffff",
                }}
              >
                Hello, Farmer
              </div>

              <div
                style={{
                  marginTop:
                    "2px",
                  color:
                    "#64748b",
                  fontSize:
                    "9px",
                }}
              >
                ID: 240033
              </div>
            </div>
          </button>

          {profileOpen && (
            <div
              style={{
                position:
                  "absolute",
                top: "61px",
                right: 0,
                width:
                  "200px",
                padding: "7px",
                borderRadius:
                  "13px",
                background:
                  "rgba(10,15,36,0.98)",
                border:
                  "1px solid rgba(99,102,241,0.20)",
                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.45)",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/my-farm"
                  )
                }
                style={menuButtonStyle}
              >
                <Sprout size={14} />
                My Farm
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/settings"
                  )
                }
                style={menuButtonStyle}
              >
                <Settings
                  size={14}
                />
                Settings
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/alerts"
                  )
                }
                style={menuButtonStyle}
              >
                <Bell size={14} />
                My Alerts
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ===================================================
          SAATHI MODAL
          =================================================== */}

      {saathiOpen && (
        <div
          style={{
            position:
              "fixed",
            inset: 0,
            zIndex: 3000,
            background:
              "rgba(2,6,23,0.60)",
            backdropFilter:
              "blur(8px)",
            display:
              "flex",
            alignItems:
              "flex-end",
            justifyContent:
              "flex-end",
            padding:
              "24px",
          }}
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSaathiOpen(
                false
              );
            }
          }}
        >
          <div
            style={{
              width:
                "390px",
              maxWidth:
                "100%",
              height:
                "min(650px, 82vh)",
              display:
                "flex",
              flexDirection:
                "column",
              borderRadius:
                "18px",
              background:
                "linear-gradient(180deg, #11183b, #080d22)",
              border:
                "1px solid rgba(139,92,246,0.30)",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.55), 0 0 40px rgba(99,102,241,0.10)",
              overflow:
                "hidden",
            }}
          >
            {/* HEADER */}

            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "space-between",
                padding:
                  "17px",
                borderBottom:
                  "1px solid rgba(99,102,241,0.12)",
              }}
            >
              <div
                style={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width:
                      "37px",
                    height:
                      "37px",
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    borderRadius:
                      "11px",
                    background:
                      "linear-gradient(135deg, #4f46e5, #8b5cf6)",
                    color:
                      "#ffffff",
                  }}
                >
                  <Mic size={18} />
                </div>

                <div>
                  <div
                    style={{
                      color:
                        "#ffffff",
                      fontSize:
                        "12px",
                      fontWeight:
                        800,
                    }}
                  >
                    Kisan Saathi
                  </div>

                  <div
                    style={{
                      color:
                        "#86efac",
                      fontSize:
                        "8px",
                      marginTop:
                        "2px",
                    }}
                  >
                    ● AI ASSISTANT ONLINE
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSaathiOpen(
                    false
                  )
                }
                style={{
                  width:
                    "30px",
                  height:
                    "30px",
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  border:
                    "none",
                  borderRadius:
                    "8px",
                  background:
                    "rgba(100,116,139,0.10)",
                  color:
                    "#94a3b8",
                  cursor:
                    "pointer",
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* CHAT */}

            <div
              style={{
                flex: 1,
                overflowY:
                  "auto",
                padding:
                  "15px",
              }}
            >
              {chatMessages.map(
                (
                  message,
                  index
                ) => (
                  <div
                    key={
                      index
                    }
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        message.sender ===
                        "user"
                          ? "flex-end"
                          : "flex-start",
                      marginBottom:
                        "10px",
                    }}
                  >
                    <div
                      style={{
                        maxWidth:
                          "82%",
                        padding:
                          "10px 12px",
                        borderRadius:
                          message.sender ===
                          "user"
                            ? "12px 12px 3px 12px"
                            : "12px 12px 12px 3px",
                        background:
                          message.sender ===
                          "user"
                            ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                            : "rgba(30,41,75,0.75)",
                        border:
                          message.sender ===
                          "user"
                            ? "none"
                            : "1px solid rgba(99,102,241,0.10)",
                        color:
                          "#e2e8f0",
                        fontSize:
                          "9px",
                        lineHeight:
                          1.6,
                      }}
                    >
                      {
                        message.text
                      }
                    </div>
                  </div>
                )
              )}

              {/* QUICK QUESTIONS */}

              <div
                style={{
                  marginTop:
                    "16px",
                }}
              >
                <div
                  style={{
                    color:
                      "#64748b",
                    fontSize:
                      "8px",
                    marginBottom:
                      "7px",
                  }}
                >
                  QUICK QUESTIONS
                </div>

                <div
                  style={{
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    gap: "6px",
                  }}
                >
                  {quickQuestions.map(
                    (
                      item
                    ) => (
                      <button
                        key={
                          item
                        }
                        type="button"
                        onClick={() =>
                          sendMessage(
                            item
                          )
                        }
                        style={{
                          padding:
                            "8px 10px",
                          borderRadius:
                            "8px",
                          border:
                            "1px solid rgba(99,102,241,0.12)",
                          background:
                            "rgba(99,102,241,0.04)",
                          color:
                            "#94a3b8",
                          textAlign:
                            "left",
                          fontSize:
                            "8px",
                          cursor:
                            "pointer",
                        }}
                      >
                        {
                          item
                        }
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* INPUT */}

            <div
              style={{
                padding:
                  "12px",
                borderTop:
                  "1px solid rgba(99,102,241,0.12)",
              }}
            >
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
                style={{
                  display:
                    "flex",
                  gap: "7px",
                }}
              >
                <input
                  value={question}
                  onChange={(event) =>
                    setQuestion(
                      event.target.value
                    )
                  }
                  placeholder="Ask Saathi anything about your farm..."
                  style={{
                    flex: 1,
                    minWidth:
                      0,
                    padding:
                      "10px 11px",
                    borderRadius:
                      "9px",
                    border:
                      "1px solid rgba(99,102,241,0.16)",
                    background:
                      "rgba(8,17,43,0.65)",
                    color:
                      "#e2e8f0",
                    outline:
                      "none",
                    fontSize:
                      "9px",
                  }}
                />

                <button
                  type="submit"
                  disabled={
                    !question.trim()
                  }
                  style={{
                    width:
                      "38px",
                    border:
                      "none",
                    borderRadius:
                      "9px",
                    background:
                      question.trim()
                        ? "linear-gradient(135deg, #161438, #7c3aed)"
                        : "rgba(100,116,139,0.12)",
                    color:
                      "#ffffff",
                    cursor:
                      question.trim()
                        ? "pointer"
                        : "not-allowed",
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                  }}
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   PROFILE MENU BUTTON
   ========================================================= */

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
  fontSize: "9px",
  fontWeight: 650,
  cursor: "pointer",
};