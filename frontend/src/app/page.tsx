"use client";

import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CloudRain,
  Droplets,
  Eye,
  Gauge,
  Leaf,
  Loader2,
  MapPin,
  Mic,
  ShieldCheck,
  Sprout,
  Sun,
  Thermometer,
  TrendingUp,
  UploadCloud,
  Wind,
  X,
} from "lucide-react";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import AppShell from "@/components/layout/AppShell";

/* =========================================================
   TYPES
   ========================================================= */

type AnalysisAction = {
  action: string;
  details: string;
};

type AnalysisResult = {
  prediction: string;
  confidence: number;
  risk_level: string;
  actions: AnalysisAction[];
};

/* =========================================================
   DEMO DATA
   ========================================================= */

const yieldData = [
  { month: "Oct", yield: 31 },
  { month: "Nov", yield: 43 },
  { month: "Dec", yield: 55 },
  { month: "Jan", yield: 67 },
  { month: "Feb", yield: 74 },
  { month: "Mar", yield: 81 },
];

const cropHealthData = [
  { day: "Mon", health: 71 },
  { day: "Tue", health: 74 },
  { day: "Wed", health: 72 },
  { day: "Thu", health: 76 },
  { day: "Fri", health: 79 },
  { day: "Sat", health: 78 },
  { day: "Sun", health: 82 },
];

/* =========================================================
   DASHBOARD
   ========================================================= */

export default function Dashboard() {
  const router = useRouter();
  const { t } = useTranslation();

  const [uploadedImage, setUploadedImage] =
    useState<string | null>(null);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResult | null>(null);

  const [showAnalysisModal, setShowAnalysisModal] =
    useState(false);

  /* =======================================================
     IMAGE UPLOAD
     ======================================================= */

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) {
        return;
      }

      const file = acceptedFiles[0];

      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }

      const preview =
        URL.createObjectURL(file);

      setUploadedImage(preview);
      setImageFile(file);
      setAnalysisResult(null);

      toast.success(
        t("disease.imageSelected")
      );
    },
    [uploadedImage]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    maxFiles: 1,
  });

  /* =======================================================
     AI ANALYSIS
     ======================================================= */

  async function handleAnalyze() {
    if (!imageFile) {
      toast.error(
        t("disease.uploadFirst")
      );
      return;
    }

    setIsAnalyzing(true);

    const toastId =
      toast.loading(
        t("disease.analyzing")
      );

    const formData = new FormData();

    formData.append(
      "file",
      imageFile
    );

    formData.append(
      "crop",
      "Wheat"
    );

    try {
      const response =
        await axios.post<AnalysisResult>(
          "http://127.0.0.1:8000/api/analyze-disease",
          formData
        );

      setAnalysisResult(
        response.data
      );

      toast.success(
        t("disease.analysisComplete", { disease: response.data.prediction }),
        {
          id: toastId,
        }
      );

      setShowAnalysisModal(true);
    } catch (error) {
      console.error(error);

      toast.error(
        t("disease.analysisFailed"),
        {
          id: toastId,
        }
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  /* =======================================================
     DEFAULT / DYNAMIC VALUES
     ======================================================= */

  const diseaseRisk =
    analysisResult?.confidence ?? 78;

  const diseaseName =
    analysisResult?.prediction ??
    "Leaf Rust Risk";

  const riskLevel =
    analysisResult?.risk_level ??
    "High Risk";

  const riskColor =
    diseaseRisk >= 70
      ? "#fb7185"
      : diseaseRisk >= 40
      ? "#fbbf24"
      : "#4ade80";

  /* =======================================================
     QUICK ACTIONS
     ======================================================= */

  const quickActions = [
    {
      title: t("dashboard.checkCropDisease"),
      description: t("dashboard.uploadLeafForDiagnosis"),
      icon: <Leaf size={18} />,
      color: "#a78bfa",
      route: "/disease-detection",
    },
    {
      title: t("dashboard.reviewWeather"),
      description: t("dashboard.checkRainfallIrrigation"),
      icon: <CloudRain size={18} />,
      color: "#60a5fa",
      route: "/weather",
    },
    {
      title: t("dashboard.cropAdvisory"),
      description: t("dashboard.cropAdvisoryDescription"),
      icon: <Sprout size={18} />,
      color: "#4ade80",
      route: "/crop-advisory",
    },
    {
      title: t("dashboard.checkMarket"),
      description: t("dashboard.compareMandiPrices"),
      icon: <TrendingUp size={18} />,
      color: "#fbbf24",
      route: "/market-prices",
    },
  ];

  return (
    <AppShell>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "22px",
        }}
      >
        {/* =================================================
            HEADER
            ================================================= */}

        <section
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "flex-end",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: "7px",
                marginBottom:
                  "8px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius:
                    "50%",
                  background:
                    "#4ade80",
                  boxShadow:
                    "0 0 10px #4ade80",
                }}
              />

              <span
                style={{
                  color:
                    "#4ade80",
                  fontSize:
                    "9px",
                  fontWeight:
                    800,
                  letterSpacing:
                    "1.5px",
                }}
              >
                FARM INTELLIGENCE
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                color:
                  "#f8fafc",
                fontSize:
                  "30px",
                lineHeight:
                  1.15,
                fontWeight:
                  800,
                letterSpacing:
                  "-0.8px",
              }}
            >
              Good morning, Farmer 👋
            </h1>

            <p
              style={{
                margin:
                  "8px 0 0",
                color:
                  "#64748b",
                fontSize:
                  "12px",
              }}
            >
              Here is your farm intelligence
              for today.
            </p>
          </div>

          <div
            style={{
              display:
                "flex",
              alignItems:
                "center",
              gap: "10px",
              padding:
                "10px 13px",
              borderRadius:
                "12px",
              border:
                "1px solid rgba(74,222,128,0.16)",
              background:
                "rgba(34,197,94,0.05)",
            }}
          >
            <div
              style={{
                width:
                  "34px",
                height:
                  "34px",
                borderRadius:
                  "9px",
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                background:
                  "rgba(74,222,128,0.10)",
                color:
                  "#4ade80",
              }}
            >
              <ShieldCheck
                size={18}
              />
            </div>

            <div>
              <div
                style={{
                  color:
                    "#e2e8f0",
                  fontSize:
                    "10px",
                  fontWeight:
                    750,
                }}
              >
                Farm Status
              </div>

              <div
                style={{
                  color:
                    "#4ade80",
                  fontSize:
                    "8px",
                  marginTop:
                    "3px",
                }}
              >
                Monitoring active
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            FARM HERO
            ================================================= */}

        <section
          className="glass-card-strong"
          style={{
            position:
              "relative",
            minHeight:
              "240px",
            overflow:
              "hidden",
            padding:
              "28px",
            border:
              "1px solid rgba(99,102,241,0.20)",
            background:
              "linear-gradient(135deg, rgba(20,27,67,0.96), rgba(19,15,52,0.96))",
          }}
        >
          {/* Atmospheric glow */}

          <div
            style={{
              position:
                "absolute",
              width:
                "320px",
              height:
                "320px",
              right:
                "-80px",
              top:
                "-130px",
              borderRadius:
                "50%",
              background:
                "rgba(96,165,250,0.16)",
              filter:
                "blur(50px)",
            }}
          />

          <div
            style={{
              position:
                "absolute",
              width:
                "260px",
              height:
                "260px",
              right:
                "130px",
              bottom:
                "-180px",
              borderRadius:
                "50%",
              background:
                "rgba(139,92,246,0.14)",
              filter:
                "blur(45px)",
            }}
          />

          <div
            style={{
              position:
                "relative",
              zIndex: 2,
              display:
                "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              gap: "30px",
              flexWrap:
                "wrap",
              height:
                "100%",
            }}
          >
            <div
              style={{
                flex:
                  "1 1 420px",
              }}
            >
              <div
                style={{
                  display:
                    "inline-flex",
                  alignItems:
                    "center",
                  gap: "6px",
                  padding:
                    "6px 9px",
                  borderRadius:
                    "999px",
                  background:
                    "rgba(96,165,250,0.08)",
                  border:
                    "1px solid rgba(96,165,250,0.14)",
                  color:
                    "#93c5fd",
                  fontSize:
                    "8px",
                  fontWeight:
                    750,
                }}
              >
                <MapPin
                  size={12}
                />
                Ghaziabad, Uttar Pradesh
              </div>

              <h2
                style={{
                  margin:
                    "15px 0 5px",
                  color:
                    "#ffffff",
                  fontSize:
                    "25px",
                  fontWeight:
                    800,
                }}
              >
                Wheat Field
              </h2>

              <p
                style={{
                  margin: 0,
                  color:
                    "#94a3b8",
                  fontSize:
                    "11px",
                }}
              >
                Vegetative stage •
                15 Nov 2025 sowing
              </p>

              <div
                style={{
                  display:
                    "flex",
                  gap: "8px",
                  marginTop:
                    "20px",
                  flexWrap:
                    "wrap",
                }}
              >
                <StatusPill
                  icon={
                    <Sprout
                      size={12}
                    />
                  }
                  text={t("dashboard.healthyCrop")}
                  color="#4ade80"
                />

                <StatusPill
                  icon={
                    <CalendarDays
                      size={12}
                    />
                  }
                  text="Day 129"
                  color="#60a5fa"
                />

                <StatusPill
                  icon={
                    <Gauge
                      size={12}
                    />
                  }
                  text={t("dashboard.monitoring")}
                  color="#a78bfa"
                />
              </div>
            </div>

            {/* Weather visual */}

            <div
              style={{
                minWidth:
                  "300px",
                flex:
                  "0 1 360px",
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
              }}
            >
              <div
                style={{
                  position:
                    "relative",
                  width:
                    "300px",
                  height:
                    "155px",
                }}
              >
                {/* Sun */}

                <div
                  style={{
                    position:
                      "absolute",
                    right:
                      "45px",
                    top:
                      "8px",
                    width:
                      "82px",
                    height:
                      "82px",
                    borderRadius:
                      "50%",
                    background:
                      "radial-gradient(circle, #fde68a 0%, #fbbf24 48%, rgba(251,191,36,0.05) 70%)",
                    boxShadow:
                      "0 0 55px rgba(251,191,36,0.30)",
                  }}
                />

                {/* Cloud */}

                <div
                  style={{
                    position:
                      "absolute",
                    left:
                      "18px",
                    bottom:
                      "35px",
                    width:
                      "220px",
                    height:
                      "62px",
                    borderRadius:
                      "50px",
                    background:
                      "linear-gradient(180deg, rgba(148,163,184,0.82), rgba(71,85,105,0.85))",
                    boxShadow:
                      "0 15px 40px rgba(15,23,42,0.30)",
                  }}
                />

                <div
                  style={{
                    position:
                      "absolute",
                    left:
                      "68px",
                    bottom:
                      "68px",
                    width:
                      "85px",
                    height:
                      "85px",
                    borderRadius:
                      "50%",
                    background:
                      "#64748b",
                  }}
                />

                <div
                  style={{
                    position:
                      "absolute",
                    left:
                      "125px",
                    bottom:
                      "60px",
                    width:
                      "70px",
                    height:
                      "70px",
                    borderRadius:
                      "50%",
                    background:
                      "#718096",
                  }}
                />

                {/* Rain */}

                <div
                  style={{
                    position:
                      "absolute",
                    left:
                      "72px",
                    bottom:
                      "7px",
                    display:
                      "flex",
                    gap:
                      "12px",
                  }}
                >
                  {[0, 1, 2, 3].map(
                    (item) => (
                      <span
                        key={
                          item
                        }
                        style={{
                          width:
                            "2px",
                          height:
                            "17px",
                          borderRadius:
                            "4px",
                          background:
                            "rgba(96,165,250,0.75)",
                          transform:
                            "skewX(-12deg)",
                        }}
                      />
                    )
                  )}
                </div>

                <div
                  style={{
                    position:
                      "absolute",
                    right:
                      "0",
                    bottom:
                      "8px",
                    color:
                      "#ffffff",
                    textAlign:
                      "right",
                  }}
                >
                  <div
                    style={{
                      fontSize:
                        "38px",
                      fontWeight:
                        800,
                      lineHeight:
                        1,
                    }}
                  >
                    26°
                  </div>

                  <div
                    style={{
                      marginTop:
                        "6px",
                      color:
                        "#93c5fd",
                      fontSize:
                        "9px",
                    }}
                  >
                    Partly Cloudy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            KPI CARDS
            ================================================= */}

        <section
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap:
              "14px",
          }}
        >
          <MetricCard
            icon={
              <Droplets
                size={19}
              />
            }
            iconColor="#38bdf8"
            title={t("dashboard.soilMoisture")}
            value="72%"
            subtitle={t("dashboard.optimalRange")}
            trend="+4.2%"
          />

          <MetricCard
            icon={
              <Wind
                size={19}
              />
            }
            iconColor="#60a5fa"
            title={t("dashboard.windSpeed")}
            value="14 km/h"
            subtitle={t("dashboard.moderateWind")}
            trend={t("common.normal")}
          />

          <MetricCard
            icon={
              <Thermometer
                size={19}
              />
            }
            iconColor="#fbbf24"
            title={t("dashboard.temperature")}
            value="26°C"
            subtitle={t("dashboard.feelsLike", { value: 27 })}
            trend={t("common.stable")}
          />

          <MetricCard
            icon={
              <Eye
                size={19}
              />
            }
            iconColor="#a78bfa"
            title={t("dashboard.visibility")}
            value="8.4 km"
            subtitle={t("dashboard.goodVisibility")}
            trend={t("common.clear")}
          />
        </section>

        {/* =================================================
            INTELLIGENCE CARDS
            ================================================= */}

        <section
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap:
              "14px",
          }}
        >
          {/* Disease */}

          <div
            className="glass-card"
            style={{
              padding:
                "20px",
              minHeight:
                "260px",
              position:
                "relative",
              overflow:
                "hidden",
            }}
          >
            <CardHeading
              icon={
                <ShieldCheck
                  size={17}
                />
              }
              title={t("dashboard.diseaseRisk")}
              subtitle={t("dashboard.aiCropHealthAssessment")}
              color={riskColor}
            />

            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap:
                  "20px",
                marginTop:
                  "25px",
              }}
            >
              <div
                style={{
                  position:
                    "relative",
                  width:
                    "125px",
                  height:
                    "125px",
                  flexShrink:
                    0,
                }}
              >
                <svg
                  width="125"
                  height="125"
                  viewBox="0 0 125 125"
                  style={{
                    transform:
                      "rotate(-90deg)",
                  }}
                >
                  <circle
                    cx="62.5"
                    cy="62.5"
                    r="50"
                    fill="none"
                    stroke="rgba(99,102,241,0.10)"
                    strokeWidth="11"
                  />

                  <circle
                    cx="62.5"
                    cy="62.5"
                    r="50"
                    fill="none"
                    stroke={riskColor}
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeDasharray="314"
                    strokeDashoffset={
                      314 -
                      (314 *
                        diseaseRisk) /
                        100
                    }
                    style={{
                      transition:
                        "stroke-dashoffset 0.6s ease",
                      filter:
                        `drop-shadow(0 0 7px ${riskColor})`,
                    }}
                  />
                </svg>

                <div
                  style={{
                    position:
                      "absolute",
                    inset: 0,
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                  }}
                >
                  <span
                    style={{
                      color:
                        "#ffffff",
                      fontSize:
                        "25px",
                      fontWeight:
                        800,
                    }}
                  >
                    {diseaseRisk}%
                  </span>

                  <span
                    style={{
                      color:
                        riskColor,
                      fontSize:
                        "7px",
                      fontWeight:
                        800,
                    }}
                  >
                    {riskLevel}
                  </span>
                </div>
              </div>

              <div>
                <div
                  style={{
                    color:
                      "#ffffff",
                    fontSize:
                      "13px",
                    fontWeight:
                      750,
                  }}
                >
                  {diseaseName}
                </div>

                <p
                  style={{
                    margin:
                      "7px 0 0",
                    color:
                      "#64748b",
                    fontSize:
                      "9px",
                    lineHeight:
                      1.6,
                  }}
                >
                  AI assessment based on
                  current crop-health
                  indicators.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      "/disease-detection"
                    )
                  }
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap:
                      "5px",
                    marginTop:
                      "14px",
                    padding:
                      "7px 9px",
                    borderRadius:
                      "7px",
                    border:
                      "1px solid rgba(167,139,250,0.18)",
                    background:
                      "rgba(139,92,246,0.08)",
                    color:
                      "#c4b5fd",
                    fontSize:
                      "8px",
                    fontWeight:
                      700,
                    cursor:
                      "pointer",
                  }}
                >
                  {t("dashboard.runAiDiagnosis")}
                  <ArrowRight
                    size={11}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Crop health */}

          <div
            className="glass-card"
            style={{
              padding:
                "20px",
              minHeight:
                "260px",
            }}
          >
            <CardHeading
              icon={
                <Leaf
                  size={17}
                />
              }
              title={t("dashboard.cropHealth")}
              subtitle={t("dashboard.sevenDayHealthTrend")}
              color="#4ade80"
            />

            <div
              style={{
                height:
                  "170px",
                marginTop:
                  "18px",
              }}
            >
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <AreaChart
                  data={
                    cropHealthData
                  }
                >
                  <defs>
                    <linearGradient
                      id="healthGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#4ade80"
                        stopOpacity={
                          0.35
                        }
                      />
                      <stop
                        offset="100%"
                        stopColor="#4ade80"
                        stopOpacity={
                          0
                        }
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="rgba(148,163,184,0.06)"
                    vertical={
                      false
                    }
                  />

                  <XAxis
                    dataKey="day"
                    tick={{
                      fill:
                        "#64748b",
                      fontSize:
                        8,
                    }}
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                  />

                  <YAxis
                    domain={[
                      60,
                      90,
                    ]}
                    tick={{
                      fill:
                        "#64748b",
                      fontSize:
                        8,
                    }}
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                  />

                  <Tooltip
                    contentStyle={{
                      background:
                        "#0f172a",
                      border:
                        "1px solid rgba(99,102,241,0.18)",
                      borderRadius:
                        "8px",
                      color:
                        "#ffffff",
                      fontSize:
                        "9px",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="health"
                    stroke="#4ade80"
                    strokeWidth={2}
                    fill="url(#healthGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Yield */}

          <div
            className="glass-card"
            style={{
              padding:
                "20px",
              minHeight:
                "260px",
            }}
          >
            <CardHeading
              icon={
                <TrendingUp
                  size={17}
                />
              }
              title={t("dashboard.yieldOutlook")}
              subtitle={t("dashboard.seasonalGrowthProjection")}
              color="#fbbf24"
            />

            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "baseline",
                gap:
                  "8px",
                marginTop:
                  "15px",
              }}
            >
              <span
                style={{
                  color:
                    "#ffffff",
                  fontSize:
                    "28px",
                  fontWeight:
                    800,
                }}
              >
                +12%
              </span>

              <span
                style={{
                  color:
                    "#4ade80",
                  fontSize:
                    "8px",
                  fontWeight:
                    700,
                }}
              >
                {t("dashboard.aboveBaseline")}
              </span>
            </div>

            <div
              style={{
                height:
                  "155px",
                marginTop:
                  "5px",
              }}
            >
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={
                    yieldData
                  }
                >
                  <CartesianGrid
                    stroke="rgba(148,163,184,0.06)"
                    vertical={
                      false
                    }
                  />

                  <XAxis
                    dataKey="month"
                    tick={{
                      fill:
                        "#64748b",
                      fontSize:
                        8,
                    }}
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                  />

                  <YAxis
                    tick={{
                      fill:
                        "#64748b",
                      fontSize:
                        8,
                    }}
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                  />

                  <Tooltip
                    contentStyle={{
                      background:
                        "#0f172a",
                      border:
                        "1px solid rgba(99,102,241,0.18)",
                      borderRadius:
                        "8px",
                      color:
                        "#ffffff",
                      fontSize:
                        "9px",
                    }}
                  />

                  <Bar
                    dataKey="yield"
                    fill="#fbbf24"
                    radius={[
                      4,
                      4,
                      0,
                      0,
                    ]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* =================================================
            FIELD INTELLIGENCE + ACTIONS
            ================================================= */}

        <section
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "minmax(0, 1.4fr) minmax(300px, 0.8fr)",
            gap:
              "14px",
          }}
        >
          {/* FIELD INTELLIGENCE */}

          <div
            className="glass-card"
            style={{
              padding:
                "22px",
            }}
          >
            <CardHeading
              icon={
                <Sprout
                  size={17}
                />
              }
              title={t("dashboard.fieldIntelligence")}
              subtitle={t("dashboard.currentCropConditions")}
              color="#4ade80"
            />

            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(150px, 1fr))",
                gap:
                  "10px",
                marginTop:
                  "18px",
              }}
            >
              <FieldIndicator
                label={t("dashboard.cropGrowth")}
                value="82%"
                description={t("dashboard.healthyDevelopment")}
                progress={82}
                color="#4ade80"
              />

              <FieldIndicator
                label={t("dashboard.soilMoisture")}
                value="72%"
                description={t("dashboard.optimalMoisture")}
                progress={72}
                color="#38bdf8"
              />

              <FieldIndicator
                label={t("dashboard.nutrientStatus")}
                value="76%"
                description={t("dashboard.goodAvailability")}
                progress={76}
                color="#a78bfa"
              />

              <FieldIndicator
                label={t("dashboard.weatherSuitability")}
                value="88%"
                description={t("dashboard.favorableConditions")}
                progress={88}
                color="#fbbf24"
              />
            </div>

            <div
              style={{
                marginTop:
                  "18px",
                padding:
                  "13px",
                borderRadius:
                  "10px",
                background:
                  "linear-gradient(135deg, rgba(34,197,94,0.07), rgba(96,165,250,0.04))",
                border:
                  "1px solid rgba(74,222,128,0.10)",
                display:
                  "flex",
                alignItems:
                  "center",
                gap:
                  "10px",
              }}
            >
              <CheckCircle2
                size={17}
                color="#4ade80"
              />

              <div>
                <div
                  style={{
                    color:
                      "#e2e8f0",
                    fontSize:
                      "9px",
                    fontWeight:
                      750,
                  }}
                >
                  {t("dashboard.fieldConditionStable")}
                </div>

                <div
                  style={{
                    color:
                      "#64748b",
                    fontSize:
                      "8px",
                    marginTop:
                      "3px",
                  }}
                >
                  No major stress indicator detected
                  in the current demo data.
                </div>
              </div>
            </div>
          </div>

          {/* TODAY ACTIONS */}

          <div
            className="glass-card"
            style={{
              padding:
                "22px",
            }}
          >
            <CardHeading
              icon={
                <CheckCircle2
                  size={17}
                />
              }
              title={t("dashboard.todaysActions")}
              subtitle={t("dashboard.recommendedPriorities")}
              color="#60a5fa"
            />

            <div
              style={{
                display:
                  "flex",
                flexDirection:
                  "column",
                gap:
                  "9px",
                marginTop:
                  "18px",
              }}
            >
              <ActionItem
                number="01"
                title={t("dashboard.reviewIrrigation")}
                text={t("dashboard.checkSoilMoisture")}
                color="#38bdf8"
              />

              <ActionItem
                number="02"
                title={t("dashboard.inspectCropLeaves")}
                text={t("dashboard.diseaseRiskElevated")}
                color="#fb7185"
              />

              <ActionItem
                number="03"
                title={t("dashboard.monitorRainfall")}
                text={t("dashboard.rainfallAffectsIrrigation")}
                color="#60a5fa"
              />
            </div>
          </div>
        </section>

        {/* =================================================
            {t("disease.aiDiagnosis")}
            ================================================= */}

        <section
          className="glass-card-strong"
          style={{
            padding:
              "24px",
            border:
              "1px solid rgba(139,92,246,0.18)",
            background:
              "linear-gradient(135deg, rgba(30,20,65,0.72), rgba(10,18,43,0.88))",
          }}
        >
          <div
            style={{
              display:
                "flex",
              justifyContent:
                "space-between",
              alignItems:
                "flex-start",
              gap:
                "15px",
              flexWrap:
                "wrap",
            }}
          >
            <div>
              <div
                style={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap:
                    "7px",
                  color:
                    "#c4b5fd",
                  fontSize:
                    "9px",
                  fontWeight:
                    800,
                  letterSpacing:
                    "1px",
                }}
              >
                <ShieldCheck
                  size={14}
                />
                {t("disease.aiCropDiagnostics")}
              </div>

              <h2
                style={{
                  margin:
                    "8px 0 5px",
                  color:
                    "#ffffff",
                  fontSize:
                    "19px",
                  fontWeight:
                    800,
                }}
              >
                {t("disease.detectInstantly")}
              </h2>

              <p
                style={{
                  margin: 0,
                  color:
                    "#64748b",
                  fontSize:
                    "9px",
                  maxWidth:
                    "500px",
                  lineHeight:
                    1.6,
                }}
              >
                Upload a clear image of your crop leaf.
                Kisan Saathi will send it to the AI
                disease-analysis system and display the
                detected condition and recommended actions.
              </p>
            </div>

            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap:
                  "6px",
                padding:
                  "7px 9px",
                borderRadius:
                  "999px",
                background:
                  "rgba(74,222,128,0.07)",
                border:
                  "1px solid rgba(74,222,128,0.12)",
                color:
                  "#4ade80",
                fontSize:
                  "7px",
                fontWeight:
                  800,
              }}
            >
              ● AI READY
            </div>
          </div>

          <div
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "minmax(0, 1.2fr) minmax(260px, 0.8fr)",
              gap:
                "15px",
              marginTop:
                "20px",
            }}
          >
            {/* UPLOAD */}

            <div
              {...getRootProps()}
              style={{
                minHeight:
                  "220px",
                border:
                  isDragActive
                    ? "2px dashed #a78bfa"
                    : "1px dashed rgba(139,92,246,0.35)",
                borderRadius:
                  "14px",
                background:
                  isDragActive
                    ? "rgba(139,92,246,0.10)"
                    : "rgba(8,15,38,0.45)",
                display:
                  "flex",
                flexDirection:
                  "column",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                padding:
                  "25px",
                cursor:
                  "pointer",
                transition:
                  "all 0.2s ease",
              }}
            >
              <input
                {...getInputProps()}
              />

              {uploadedImage ? (
                <>
                  <div
                    style={{
                      position:
                        "relative",
                    }}
                  >
                    <img
                      src={
                        uploadedImage
                      }
                      alt="Uploaded crop"
                      style={{
                        width:
                          "145px",
                        height:
                          "115px",
                        objectFit:
                          "cover",
                        borderRadius:
                          "10px",
                        border:
                          "1px solid rgba(167,139,250,0.30)",
                      }}
                    />

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();

                        if (
                          uploadedImage
                        ) {
                          URL.revokeObjectURL(
                            uploadedImage
                          );
                        }

                        setUploadedImage(
                          null
                        );
                        setImageFile(
                          null
                        );
                        setAnalysisResult(
                          null
                        );
                      }}
                      style={{
                        position:
                          "absolute",
                        top:
                          "-8px",
                        right:
                          "-8px",
                        width:
                          "25px",
                        height:
                          "25px",
                        borderRadius:
                          "50%",
                        border:
                          "1px solid rgba(255,255,255,0.15)",
                        background:
                          "#1e293b",
                        color:
                          "#ffffff",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        cursor:
                          "pointer",
                      }}
                    >
                      <X
                        size={12}
                      />
                    </button>
                  </div>

                  <div
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap:
                        "5px",
                      marginTop:
                        "12px",
                      color:
                        "#4ade80",
                      fontSize:
                        "9px",
                      fontWeight:
                        700,
                    }}
                  >
                    <CheckCircle2
                      size={13}
                    />
                    {t("disease.imageSelectedShort")}
                  </div>

                  <p
                    style={{
                      margin:
                        "5px 0 0",
                      color:
                        "#64748b",
                      fontSize:
                        "8px",
                    }}
                  >
                    {t("disease.clickReplace")}
                  </p>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width:
                        "55px",
                      height:
                        "55px",
                      display:
                        "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      borderRadius:
                        "15px",
                      background:
                        "rgba(139,92,246,0.10)",
                      border:
                        "1px solid rgba(139,92,246,0.18)",
                      color:
                        "#a78bfa",
                    }}
                  >
                    <UploadCloud
                      size={25}
                    />
                  </div>

                  <h3
                    style={{
                      margin:
                        "12px 0 5px",
                      color:
                        "#e2e8f0",
                      fontSize:
                        "11px",
                    }}
                  >
                    {isDragActive
                      ? t("disease.dropImageHere")
                      : t("disease.uploadImage")}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color:
                        "#64748b",
                      fontSize:
                        "8px",
                      textAlign:
                        "center",
                    }}
                  >
                    {t("disease.dragDropBrowse")}
                    <br />
                    JPG, JPEG or PNG
                  </p>
                </>
              )}
            </div>

            {/* RESULT / ACTION */}

            <div
              style={{
                borderRadius:
                  "14px",
                background:
                  "rgba(5,10,28,0.65)",
                border:
                  "1px solid rgba(99,102,241,0.10)",
                padding:
                  "18px",
                display:
                  "flex",
                flexDirection:
                  "column",
                justifyContent:
                  "space-between",
              }}
            >
              {analysisResult ? (
                <>
                  <div>
                    <div
                      style={{
                        color:
                          "#64748b",
                        fontSize:
                          "8px",
                        fontWeight:
                          700,
                      }}
                    >
                      {t("disease.aiResult")}
                    </div>

                    <div
                      style={{
                        marginTop:
                          "8px",
                        color:
                          "#ffffff",
                        fontSize:
                          "17px",
                        fontWeight:
                          800,
                      }}
                    >
                      {
                        analysisResult.prediction
                      }
                    </div>

                    <div
                      style={{
                        display:
                          "inline-flex",
                        marginTop:
                          "8px",
                        padding:
                          "5px 8px",
                        borderRadius:
                          "999px",
                        background:
                          `${riskColor}12`,
                        color:
                          riskColor,
                        fontSize:
                          "8px",
                        fontWeight:
                          800,
                      }}
                    >
                      {
                        analysisResult.risk_level
                      }
                    </div>

                    <div
                      style={{
                        marginTop:
                          "17px",
                      }}
                    >
                      <div
                        style={{
                          display:
                            "flex",
                          justifyContent:
                            "space-between",
                          color:
                            "#64748b",
                          fontSize:
                            "8px",
                        }}
                      >
                        <span>
                          {t("disease.confidence")}
                        </span>
                        <span
                          style={{
                            color:
                              "#ffffff",
                            fontWeight:
                              750,
                          }}
                        >
                          {
                            analysisResult.confidence
                          }%
                        </span>
                      </div>

                      <div
                        style={{
                          height:
                            "6px",
                          marginTop:
                            "7px",
                          borderRadius:
                            "999px",
                          background:
                            "rgba(100,116,139,0.12)",
                          overflow:
                            "hidden",
                        }}
                      >
                        <div
                          style={{
                            width:
                              `${analysisResult.confidence}%`,
                            height:
                              "100%",
                            borderRadius:
                              "999px",
                            background:
                              riskColor,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowAnalysisModal(
                        true
                      )
                    }
                    style={{
                      width:
                        "100%",
                      marginTop:
                        "14px",
                      padding:
                        "10px",
                      borderRadius:
                        "9px",
                      border:
                        "1px solid rgba(139,92,246,0.20)",
                      background:
                        "rgba(139,92,246,0.09)",
                      color:
                        "#c4b5fd",
                      fontSize:
                        "8px",
                      fontWeight:
                        750,
                      cursor:
                        "pointer",
                    }}
                  >
                    {t("disease.viewFullDiagnosis")}
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <div
                      style={{
                        width:
                          "40px",
                        height:
                          "40px",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        borderRadius:
                          "11px",
                        background:
                          "rgba(139,92,246,0.08)",
                        color:
                          "#a78bfa",
                      }}
                    >
                      <ShieldCheck
                        size={20}
                      />
                    </div>

                    <h3
                      style={{
                        margin:
                          "12px 0 5px",
                        color:
                          "#ffffff",
                        fontSize:
                          "12px",
                      }}
                    >
                      {t("disease.readyForAnalysis")}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color:
                          "#64748b",
                        fontSize:
                          "8px",
                        lineHeight:
                          1.6,
                      }}
                    >
                      Upload a crop image to
                      receive disease prediction,
                      confidence and recommended
                      actions.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={
                      !imageFile ||
                      isAnalyzing
                    }
                    style={{
                      width:
                        "100%",
                      marginTop:
                        "15px",
                      padding:
                        "11px",
                      borderRadius:
                        "9px",
                      border:
                        "none",
                      background:
                        imageFile
                          ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                          : "rgba(100,116,139,0.12)",
                      color:
                        imageFile
                          ? "#ffffff"
                          : "#64748b",
                      fontSize:
                        "9px",
                      fontWeight:
                        800,
                      cursor:
                        imageFile &&
                        !isAnalyzing
                          ? "pointer"
                          : "not-allowed",
                      display:
                        "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      gap:
                        "7px",
                      boxShadow:
                        imageFile
                          ? "0 0 22px rgba(124,58,237,0.20)"
                          : "none",
                    }}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2
                          size={14}
                          style={{
                            animation:
                              "spin 1s linear infinite",
                          }}
                        />
                        {t("disease.analyzing")}
                      </>
                    ) : (
                      <>
                        <ShieldCheck
                          size={14}
                        />
                        {t("disease.analyzeWithAI")}
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            QUICK ACTIONS
            ================================================= */}

        <section>
          <div
            style={{
              marginBottom:
                "12px",
            }}
          >
            <h2
              style={{
                margin: 0,
                color:
                  "#ffffff",
                fontSize:
                  "14px",
                fontWeight:
                  800,
              }}
            >
              {t("dashboard.quickActions")}
            </h2>

            <p
              style={{
                margin:
                  "4px 0 0",
                color:
                  "#64748b",
                fontSize:
                  "8px",
              }}
            >
              {t("dashboard.quickActionsSubtitle")}
            </p>
          </div>

          <div
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap:
                "10px",
            }}
          >
            {quickActions.map(
              (action) => (
                <button
                  key={
                    action.title
                  }
                  type="button"
                  onClick={() =>
                    router.push(
                      action.route
                    )
                  }
                  className="glass-card"
                  style={{
                    padding:
                      "15px",
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap:
                      "11px",
                    textAlign:
                      "left",
                    border:
                      "1px solid rgba(99,102,241,0.10)",
                    cursor:
                      "pointer",
                    transition:
                      "transform 0.2s ease, border-color 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width:
                        "38px",
                      height:
                        "38px",
                      display:
                        "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      borderRadius:
                        "10px",
                      background:
                        `${action.color}12`,
                      border:
                        `1px solid ${action.color}20`,
                      color:
                        action.color,
                      flexShrink:
                        0,
                    }}
                  >
                    {
                      action.icon
                    }
                  </div>

                  <div
                    style={{
                      flex:
                        1,
                    }}
                  >
                    <div
                      style={{
                        color:
                          "#e2e8f0",
                        fontSize:
                          "9px",
                        fontWeight:
                          750,
                      }}
                    >
                      {
                        action.title
                      }
                    </div>

                    <div
                      style={{
                        marginTop:
                          "3px",
                        color:
                          "#64748b",
                        fontSize:
                          "7px",
                        lineHeight:
                          1.5,
                      }}
                    >
                      {
                        action.description
                      }
                    </div>
                  </div>

                  <ArrowRight
                    size={14}
                    color="#475569"
                  />
                </button>
              )
            )}
          </div>
        </section>

        {/* =================================================
            SAATHI CTA
            ================================================= */}

        <section
          style={{
            padding:
              "18px 20px",
            borderRadius:
              "14px",
            border:
              "1px solid rgba(139,92,246,0.15)",
            background:
              "linear-gradient(90deg, rgba(79,70,229,0.12), rgba(139,92,246,0.06), rgba(34,197,94,0.05))",
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
            gap:
              "15px",
            flexWrap:
              "wrap",
          }}
        >
          <div
            style={{
              display:
                "flex",
              alignItems:
                "center",
              gap:
                "11px",
            }}
          >
            <div
              style={{
                width:
                  "38px",
                height:
                  "38px",
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                borderRadius:
                  "11px",
                background:
                  "linear-gradient(135deg, #4f46e5, #7c3aed)",
                color:
                  "#ffffff",
                boxShadow:
                  "0 0 20px rgba(124,58,237,0.20)",
              }}
            >
              <Mic
                size={17}
              />
            </div>

            <div>
              <div
                style={{
                  color:
                    "#ffffff",
                  fontSize:
                    "10px",
                  fontWeight:
                    800,
                }}
              >
                {t("saathi.needHelp")}
              </div>

              <div
                style={{
                  color:
                    "#64748b",
                  fontSize:
                    "8px",
                  marginTop:
                    "3px",
                }}
              >
                {t("saathi.askInLanguage")}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
  toast.success(
    `Use the ${t("topbar.talkToSaathi")} button in the topbar.`
  )
}
            style={{
              display:
                "flex",
              alignItems:
                "center",
              gap:
                "6px",
              padding:
                "9px 13px",
              borderRadius:
                "9px",
              border:
                "1px solid rgba(167,139,250,0.20)",
              background:
                "rgba(139,92,246,0.10)",
              color:
                "#c4b5fd",
              fontSize:
                "8px",
              fontWeight:
                750,
              cursor:
                "pointer",
            }}
          >
            <Mic
              size={13}
            />
            {t("topbar.talkToSaathi")}
          </button>
        </section>
      </div>

      {/* ===================================================
          FULL ANALYSIS MODAL
          =================================================== */}

      {showAnalysisModal &&
        analysisResult && (
          <div
            style={{
              position:
                "fixed",
              inset: 0,
              zIndex: 4000,
              background:
                "rgba(2,6,23,0.72)",
              backdropFilter:
                "blur(10px)",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              padding:
                "20px",
            }}
            onMouseDown={(
              event
            ) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setShowAnalysisModal(
                  false
                );
              }
            }}
          >
            <div
              style={{
                width:
                  "560px",
                maxWidth:
                  "100%",
                maxHeight:
                  "85vh",
                overflowY:
                  "auto",
                borderRadius:
                  "18px",
                background:
                  "linear-gradient(180deg, #11183b, #080d22)",
                border:
                  "1px solid rgba(139,92,246,0.25)",
                boxShadow:
                  "0 30px 100px rgba(0,0,0,0.60)",
                padding:
                  "22px",
              }}
            >
              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                }}
              >
                <div>
                  <div
                    style={{
                      color:
                        "#a78bfa",
                      fontSize:
                        "8px",
                      fontWeight:
                        800,
                      letterSpacing:
                        "1px",
                    }}
                  >
                    {t("disease.aiDiagnosis")}
                  </div>

                  <h2
                    style={{
                      margin:
                        "6px 0 0",
                      color:
                        "#ffffff",
                      fontSize:
                        "20px",
                    }}
                  >
                    {t("disease.analysisReport")}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowAnalysisModal(
                      false
                    )
                  }
                  style={{
                    width:
                      "32px",
                    height:
                      "32px",
                    border:
                      "none",
                    borderRadius:
                      "8px",
                    background:
                      "rgba(100,116,139,0.10)",
                    color:
                      "#94a3b8",
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    cursor:
                      "pointer",
                  }}
                >
                  <X
                    size={15}
                  />
                </button>
              </div>

              <div
                style={{
                  marginTop:
                    "20px",
                  padding:
                    "17px",
                  borderRadius:
                    "12px",
                  background:
                    `${riskColor}08`,
                  border:
                    `1px solid ${riskColor}22`,
                }}
              >
                <div
                  style={{
                    color:
                      "#64748b",
                    fontSize:
                      "8px",
                  }}
                >
                  {t("disease.detectedCondition")}
                </div>

                <div
                  style={{
                    marginTop:
                      "7px",
                    color:
                      "#ffffff",
                    fontSize:
                      "20px",
                    fontWeight:
                      800,
                  }}
                >
                  {
                    analysisResult.prediction
                  }
                </div>

                <div
                  style={{
                    display:
                      "flex",
                    gap:
                      "8px",
                    marginTop:
                      "9px",
                  }}
                >
                  <span
                    style={{
                      padding:
                        "5px 8px",
                      borderRadius:
                        "999px",
                      background:
                        `${riskColor}12`,
                      color:
                        riskColor,
                      fontSize:
                        "8px",
                      fontWeight:
                        800,
                    }}
                  >
                    {
                      analysisResult.risk_level
                    }
                  </span>

                  <span
                    style={{
                      padding:
                        "5px 8px",
                      borderRadius:
                        "999px",
                      background:
                        "rgba(96,165,250,0.08)",
                      color:
                        "#93c5fd",
                      fontSize:
                        "8px",
                    }}
                  >
                    {t("disease.confidence")}{" "}
                    {
                      analysisResult.confidence
                    }%
                  </span>
                </div>
              </div>

              <div
                style={{
                  marginTop:
                    "18px",
                }}
              >
                <div
                  style={{
                    color:
                      "#e2e8f0",
                    fontSize:
                      "11px",
                    fontWeight:
                      750,
                  }}
                >
                  {t("disease.recommendedActions")}
                </div>

                <div
                  style={{
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    gap:
                      "8px",
                    marginTop:
                      "9px",
                  }}
                >
                  {analysisResult.actions?.map(
                    (
                      action,
                      index
                    ) => (
                      <div
                        key={
                          index
                        }
                        style={{
                          display:
                            "flex",
                          gap:
                            "10px",
                          padding:
                            "12px",
                          borderRadius:
                            "10px",
                          background:
                            "rgba(15,23,42,0.70)",
                          border:
                            "1px solid rgba(99,102,241,0.10)",
                        }}
                      >
                        <CheckCircle2
                          size={16}
                          color="#4ade80"
                        />

                        <div>
                          <div
                            style={{
                              color:
                                "#e2e8f0",
                              fontSize:
                                "9px",
                              fontWeight:
                                750,
                            }}
                          >
                            {
                              action.action
                            }
                          </div>

                          <div
                            style={{
                              color:
                                "#64748b",
                              fontSize:
                                "8px",
                              marginTop:
                                "3px",
                            }}
                          >
                            {
                              action.details
                            }
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
    </AppShell>
  );
}

/* =========================================================
   COMPONENTS
   ========================================================= */

function StatusPill({
  icon,
  text,
  color,
}: {
  icon: React.ReactNode;
  text: string;
  color: string;
}) {
  return (
    <div
      style={{
        display:
          "inline-flex",
        alignItems:
          "center",
        gap:
          "5px",
        padding:
          "6px 8px",
        borderRadius:
          "999px",
        background:
          `${color}10`,
        border:
          `1px solid ${color}20`,
        color,
        fontSize:
          "7px",
        fontWeight:
          750,
      }}
    >
      {icon}
      {text}
    </div>
  );
}

function MetricCard({
  icon,
  iconColor,
  title,
  value,
  subtitle,
  trend,
}: {
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  value: string;
  subtitle: string;
  trend: string;
}) {
  return (
    <div
      className="glass-card"
      style={{
        padding:
          "17px",
      }}
    >
      <div
        style={{
          display:
            "flex",
          justifyContent:
            "space-between",
          alignItems:
            "flex-start",
        }}
      >
        <div
          style={{
            width:
              "36px",
            height:
              "36px",
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            borderRadius:
              "10px",
            background:
              `${iconColor}10`,
            border:
              `1px solid ${iconColor}18`,
            color:
              iconColor,
          }}
        >
          {icon}
        </div>

        <span
          style={{
            padding:
              "4px 6px",
            borderRadius:
              "999px",
            background:
              `${iconColor}08`,
            color:
              iconColor,
            fontSize:
              "7px",
            fontWeight:
              750,
          }}
        >
          {trend}
        </span>
      </div>

      <div
        style={{
          marginTop:
            "14px",
        }}
      >
        <div
          style={{
            color:
              "#64748b",
            fontSize:
              "8px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop:
              "4px",
            color:
              "#ffffff",
            fontSize:
              "21px",
            fontWeight:
              800,
          }}
        >
          {value}
        </div>

        <div
          style={{
            marginTop:
              "3px",
            color:
              "#475569",
            fontSize:
              "7px",
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
}

function CardHeading({
  icon,
  title,
  subtitle,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
}) {
  return (
    <div
      style={{
        display:
          "flex",
        alignItems:
          "center",
        gap:
          "9px",
      }}
    >
      <div
        style={{
          width:
            "33px",
          height:
            "33px",
          display:
            "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          borderRadius:
            "9px",
          background:
            `${color}10`,
          border:
            `1px solid ${color}18`,
          color,
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            color:
              "#e2e8f0",
            fontSize:
              "10px",
            fontWeight:
              750,
          }}
        >
          {title}
        </div>

        <div
          style={{
            color:
              "#475569",
            fontSize:
              "7px",
            marginTop:
              "3px",
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
}

function FieldIndicator({
  label,
  value,
  description,
  progress,
  color,
}: {
  label: string;
  value: string;
  description: string;
  progress: number;
  color: string;
}) {
  return (
    <div
      style={{
        padding:
          "12px",
        borderRadius:
          "10px",
        background:
          "rgba(15,23,42,0.55)",
        border:
          "1px solid rgba(99,102,241,0.08)",
      }}
    >
      <div
        style={{
          display:
            "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
        }}
      >
        <span
          style={{
            color:
              "#94a3b8",
            fontSize:
              "8px",
          }}
        >
          {label}
        </span>

        <span
          style={{
            color,
            fontSize:
              "9px",
            fontWeight:
              800,
          }}
        >
          {value}
        </span>
      </div>

      <div
        style={{
          height:
            "5px",
          marginTop:
            "9px",
          borderRadius:
            "999px",
          background:
            "rgba(100,116,139,0.10)",
          overflow:
            "hidden",
        }}
      >
        <div
          style={{
            width:
              `${progress}%`,
            height:
              "100%",
            borderRadius:
              "999px",
            background:
              color,
            boxShadow:
              `0 0 8px ${color}`,
          }}
        />
      </div>

      <div
        style={{
          color:
            "#475569",
          fontSize:
            "7px",
          marginTop:
            "6px",
        }}
      >
        {description}
      </div>
    </div>
  );
}

function ActionItem({
  number,
  title,
  text,
  color,
}: {
  number: string;
  title: string;
  text: string;
  color: string;
}) {
  return (
    <div
      style={{
        display:
          "flex",
        gap:
          "9px",
        padding:
          "10px",
        borderRadius:
          "9px",
        background:
          "rgba(15,23,42,0.52)",
        border:
          "1px solid rgba(99,102,241,0.07)",
      }}
    >
      <div
        style={{
          width:
            "27px",
          height:
            "27px",
          display:
            "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          borderRadius:
            "8px",
          background:
            `${color}10`,
          color,
          fontSize:
            "7px",
          fontWeight:
            800,
          flexShrink:
            0,
        }}
      >
        {number}
      </div>

      <div>
        <div
          style={{
            color:
              "#e2e8f0",
            fontSize:
              "9px",
            fontWeight:
              750,
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop:
              "3px",
            color:
              "#64748b",
            fontSize:
              "7px",
            lineHeight:
              1.5,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}