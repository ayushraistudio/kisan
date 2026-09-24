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

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

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

      const preview = URL.createObjectURL(file);

      setUploadedImage(preview);
      setImageFile(file);
      setAnalysisResult(null);

      toast.success(t("disease.imageSelected"));
    },
    [uploadedImage, t]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    maxFiles: 1,
  });

  /* =======================================================
     AI ANALYSIS WITH FALLBACK MECHANISM
     ======================================================= */

  async function handleAnalyze() {
    if (!imageFile) {
      toast.error(t("disease.uploadFirst"));
      return;
    }

    setIsAnalyzing(true);

    const toastId = toast.loading(t("disease.analyzing"));
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("crop", "Wheat");

    try {
      let response;
      
      try {
        response = await axios.post<AnalysisResult>(
          " https://sig-infinite-recruitment-publishing.trycloudflare.com",
          formData
        );
      } catch (primaryError) {
        console.warn("Primary URL failed, falling back to local...", primaryError);
        response = await axios.post<AnalysisResult>(
          "http://127.0.0.1:8000/api/analyze-disease",
          formData
        );
      }

      setAnalysisResult(response.data);
      
      // ✅ NAYA CODE: AI Assistant ko global context bhejna
      window.dispatchEvent(
        new CustomEvent("update-disease-context", { detail: response.data })
      );

      toast.success(t("disease.analysisComplete", { disease: response.data.prediction }), {
        id: toastId,
      });
      setShowAnalysisModal(true);
    } catch (error) {
      console.error(error);
      toast.error(t("disease.analysisFailed"), {
        id: toastId,
      });
    } finally {
      setIsAnalyzing(false);
    }
  }

  /* =======================================================
     DEFAULT / DYNAMIC VALUES
     ======================================================= */

  const diseaseRisk = analysisResult?.confidence ?? 78;
  const diseaseName = analysisResult?.prediction ?? "Leaf Rust Risk";
  const riskLevel = analysisResult?.risk_level ?? "High Risk";

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
      icon: <Leaf size={22} />,
      color: "#a78bfa",
      route: "/disease-detection",
    },
    {
      title: t("dashboard.reviewWeather"),
      description: t("dashboard.checkRainfallIrrigation"),
      icon: <CloudRain size={22} />,
      color: "#60a5fa",
      route: "/weather",
    },
    {
      title: t("dashboard.cropAdvisory"),
      description: t("dashboard.cropAdvisoryDescription"),
      icon: <Sprout size={22} />,
      color: "#4ade80",
      route: "/crop-advisory",
    },
    {
      title: t("dashboard.checkMarket"),
      description: t("dashboard.compareMandiPrices"),
      icon: <TrendingUp size={22} />,
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
          gap: "28px",
        }}
      >
        {/* =================================================
            HEADER
            ================================================= */}

        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 12px #4ade80",
                }}
              />

              <span
                style={{
                  color: "#4ade80",
                  fontSize: "14px",
                  fontWeight: 800,
                  letterSpacing: "1.5px",
                }}
              >
                FARM INTELLIGENCE
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                color: "#f8fafc",
                fontSize: "36px",
                lineHeight: 1.2,
                fontWeight: 800,
                letterSpacing: "-0.8px",
              }}
            >
              Good morning, Farmer 👋
            </h1>

            <p
              style={{
                margin: "8px 0 0",
                color: "#94a3b8",
                fontSize: "16px",
              }}
            >
              Here is your farm intelligence for today.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 18px",
              borderRadius: "14px",
              border: "1px solid rgba(74,222,128,0.20)",
              background: "rgba(34,197,94,0.08)",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(74,222,128,0.15)",
                color: "#4ade80",
              }}
            >
              <ShieldCheck size={22} />
            </div>

            <div>
              <div
                style={{
                  color: "#f1f5f9",
                  fontSize: "15px",
                  fontWeight: 750,
                }}
              >
                Farm Status
              </div>

              <div
                style={{
                  color: "#4ade80",
                  fontSize: "13px",
                  marginTop: "4px",
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
            position: "relative",
            minHeight: "260px",
            overflow: "hidden",
            padding: "32px",
            border: "1px solid rgba(99,102,241,0.25)",
            background: "linear-gradient(135deg, rgba(20,27,67,0.96), rgba(19,15,52,0.96))",
            borderRadius: "16px"
          }}
        >
          {/* Atmospheric glow */}
          <div
            style={{
              position: "absolute",
              width: "360px",
              height: "360px",
              right: "-80px",
              top: "-130px",
              borderRadius: "50%",
              background: "rgba(96,165,250,0.16)",
              filter: "blur(55px)",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              right: "130px",
              bottom: "-180px",
              borderRadius: "50%",
              background: "rgba(139,92,246,0.15)",
              filter: "blur(50px)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "35px",
              flexWrap: "wrap",
              height: "100%",
            }}
          >
            <div style={{ flex: "1 1 420px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  borderRadius: "999px",
                  background: "rgba(96,165,250,0.10)",
                  border: "1px solid rgba(96,165,250,0.20)",
                  color: "#93c5fd",
                  fontSize: "13px",
                  fontWeight: 750,
                }}
              >
                <MapPin size={16} />
                Ghaziabad, Uttar Pradesh
              </div>

              <h2
                style={{
                  margin: "18px 0 6px",
                  color: "#ffffff",
                  fontSize: "32px",
                  fontWeight: 800,
                }}
              >
                Wheat Field
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#cbd5e1",
                  fontSize: "15px",
                }}
              >
                Vegetative stage • 15 Nov 2025 sowing
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "24px",
                  flexWrap: "wrap",
                }}
              >
                <StatusPill
                  icon={<Sprout size={16} />}
                  text={t("dashboard.healthyCrop")}
                  color="#4ade80"
                />

                <StatusPill
                  icon={<CalendarDays size={16} />}
                  text="Day 129"
                  color="#60a5fa"
                />

                <StatusPill
                  icon={<Gauge size={16} />}
                  text={t("dashboard.monitoring")}
                  color="#a78bfa"
                />
              </div>
            </div>

            {/* Weather visual */}
            <div
              style={{
                minWidth: "320px",
                flex: "0 1 380px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "320px",
                  height: "170px",
                }}
              >
                {/* Sun */}
                <div
                  style={{
                    position: "absolute",
                    right: "55px",
                    top: "10px",
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, #fde68a 0%, #fbbf24 48%, rgba(251,191,36,0.05) 70%)",
                    boxShadow: "0 0 60px rgba(251,191,36,0.35)",
                  }}
                />

                {/* Cloud */}
                <div
                  style={{
                    position: "absolute",
                    left: "20px",
                    bottom: "40px",
                    width: "240px",
                    height: "70px",
                    borderRadius: "60px",
                    background: "linear-gradient(180deg, rgba(148,163,184,0.9), rgba(71,85,105,0.95))",
                    boxShadow: "0 20px 45px rgba(15,23,42,0.35)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    left: "75px",
                    bottom: "75px",
                    width: "95px",
                    height: "95px",
                    borderRadius: "50%",
                    background: "#64748b",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    left: "135px",
                    bottom: "65px",
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "#718096",
                  }}
                />

                {/* Rain */}
                <div
                  style={{
                    position: "absolute",
                    left: "80px",
                    bottom: "10px",
                    display: "flex",
                    gap: "14px",
                  }}
                >
                  {[0, 1, 2, 3].map((item) => (
                    <span
                      key={item}
                      style={{
                        width: "3px",
                        height: "20px",
                        borderRadius: "5px",
                        background: "rgba(96,165,250,0.85)",
                        transform: "skewX(-15deg)",
                      }}
                    />
                  ))}
                </div>

                <div
                  style={{
                    position: "absolute",
                    right: "0",
                    bottom: "10px",
                    color: "#ffffff",
                    textAlign: "right",
                  }}
                >
                  <div
                    style={{
                      fontSize: "48px",
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    26°
                  </div>

                  <div
                    style={{
                      marginTop: "8px",
                      color: "#93c5fd",
                      fontSize: "14px",
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
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
          }}
        >
          <MetricCard
            icon={<Droplets size={24} />}
            iconColor="#38bdf8"
            title={t("dashboard.soilMoisture")}
            value="72%"
            subtitle={t("dashboard.optimalRange")}
            trend="+4.2%"
          />

          <MetricCard
            icon={<Wind size={24} />}
            iconColor="#60a5fa"
            title={t("dashboard.windSpeed")}
            value="14 km/h"
            subtitle={t("dashboard.moderateWind")}
            trend={t("common.normal")}
          />

          <MetricCard
            icon={<Thermometer size={24} />}
            iconColor="#fbbf24"
            title={t("dashboard.temperature")}
            value="26°C"
            subtitle={t("dashboard.feelsLike", { value: 27 })}
            trend={t("common.stable")}
          />

          <MetricCard
            icon={<Eye size={24} />}
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
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "18px",
          }}
        >
          {/* Disease */}
          <div
            className="glass-card"
            style={{
              padding: "26px",
              minHeight: "280px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <CardHeading
              icon={<ShieldCheck size={20} />}
              title={t("dashboard.diseaseRisk")}
              subtitle={t("dashboard.aiCropHealthAssessment")}
              color={riskColor}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                marginTop: "30px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "140px",
                  height: "140px",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="140"
                  height="140"
                  viewBox="0 0 140 140"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="rgba(99,102,241,0.15)"
                    strokeWidth="12"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke={riskColor}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="377"
                    strokeDashoffset={377 - (377 * diseaseRisk) / 100}
                    style={{
                      transition: "stroke-dashoffset 0.6s ease",
                      filter: `drop-shadow(0 0 10px ${riskColor})`,
                    }}
                  />
                </svg>

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: "32px",
                      fontWeight: 800,
                    }}
                  >
                    {diseaseRisk}%
                  </span>
                  <span
                    style={{
                      color: riskColor,
                      fontSize: "12px",
                      fontWeight: 800,
                      marginTop: "4px"
                    }}
                  >
                    {riskLevel}
                  </span>
                </div>
              </div>

              <div>
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: "18px",
                    fontWeight: 750,
                  }}
                >
                  {diseaseName}
                </div>

                <p
                  style={{
                    margin: "10px 0 0",
                    color: "#cbd5e1",
                    fontSize: "13px",
                    lineHeight: 1.6,
                  }}
                >
                  AI assessment based on current crop-health indicators.
                </p>

                <button
                  type="button"
                  onClick={() => router.push("/disease-detection")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "18px",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(167,139,250,0.25)",
                    background: "rgba(139,92,246,0.12)",
                    color: "#c4b5fd",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {t("dashboard.runAiDiagnosis")}
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Crop health */}
          <div
            className="glass-card"
            style={{
              padding: "26px",
              minHeight: "280px",
            }}
          >
            <CardHeading
              icon={<Leaf size={20} />}
              title={t("dashboard.cropHealth")}
              subtitle={t("dashboard.sevenDayHealthTrend")}
              color="#4ade80"
            />

            <div
              style={{
                height: "190px",
                marginTop: "20px",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cropHealthData}>
                  <defs>
                    <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4ade80" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="rgba(148,163,184,0.1)" vertical={false} />

                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    domain={[60, 90]}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid rgba(99,102,241,0.2)",
                      borderRadius: "10px",
                      color: "#ffffff",
                      fontSize: "14px",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="health"
                    stroke="#4ade80"
                    strokeWidth={3}
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
              padding: "26px",
              minHeight: "280px",
            }}
          >
            <CardHeading
              icon={<TrendingUp size={20} />}
              title={t("dashboard.yieldOutlook")}
              subtitle={t("dashboard.seasonalGrowthProjection")}
              color="#fbbf24"
            />

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "36px",
                  fontWeight: 800,
                }}
              >
                +12%
              </span>

              <span
                style={{
                  color: "#4ade80",
                  fontSize: "13px",
                  fontWeight: 700,
                }}
              >
                {t("dashboard.aboveBaseline")}
              </span>
            </div>

            <div
              style={{
                height: "165px",
                marginTop: "10px",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yieldData}>
                  <CartesianGrid stroke="rgba(148,163,184,0.1)" vertical={false} />

                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid rgba(99,102,241,0.2)",
                      borderRadius: "10px",
                      color: "#ffffff",
                      fontSize: "14px",
                    }}
                  />

                  <Bar dataKey="yield" fill="#fbbf24" radius={[6, 6, 0, 0]} />
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
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(320px, 0.8fr)",
            gap: "18px",
          }}
        >
          {/* FIELD INTELLIGENCE */}
          <div
            className="glass-card"
            style={{
              padding: "28px",
            }}
          >
            <CardHeading
              icon={<Sprout size={20} />}
              title={t("dashboard.fieldIntelligence")}
              subtitle={t("dashboard.currentCropConditions")}
              color="#4ade80"
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "14px",
                marginTop: "22px",
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
                marginTop: "22px",
                padding: "16px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(34,197,94,0.10), rgba(96,165,250,0.06))",
                border: "1px solid rgba(74,222,128,0.20)",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <CheckCircle2 size={24} color="#4ade80" />

              <div>
                <div
                  style={{
                    color: "#f1f5f9",
                    fontSize: "14px",
                    fontWeight: 750,
                  }}
                >
                  {t("dashboard.fieldConditionStable")}
                </div>

                <div
                  style={{
                    color: "#cbd5e1",
                    fontSize: "13px",
                    marginTop: "5px",
                  }}
                >
                  No major stress indicator detected in the current demo data.
                </div>
              </div>
            </div>
          </div>

          {/* TODAY ACTIONS */}
          <div
            className="glass-card"
            style={{
              padding: "28px",
            }}
          >
            <CardHeading
              icon={<CheckCircle2 size={20} />}
              title={t("dashboard.todaysActions")}
              subtitle={t("dashboard.recommendedPriorities")}
              color="#60a5fa"
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                marginTop: "22px",
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
            AI DIAGNOSIS SECTION
            ================================================= */}

        <section
          className="glass-card-strong"
          style={{
            padding: "32px",
            border: "1px solid rgba(139,92,246,0.25)",
            background: "linear-gradient(135deg, rgba(30,20,65,0.72), rgba(10,18,43,0.88))",
            borderRadius: "16px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#c4b5fd",
                  fontSize: "14px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
              >
                <ShieldCheck size={18} />
                {t("disease.aiCropDiagnostics")}
              </div>

              <h2
                style={{
                  margin: "12px 0 8px",
                  color: "#ffffff",
                  fontSize: "26px",
                  fontWeight: 800,
                }}
              >
                {t("disease.detectInstantly")}
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#94a3b8",
                  fontSize: "14px",
                  maxWidth: "550px",
                  lineHeight: 1.6,
                }}
              >
                Upload a clear image of your crop leaf. Kisan Saathi will send it to the AI disease-analysis system and display the detected condition and recommended actions.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                borderRadius: "999px",
                background: "rgba(74,222,128,0.12)",
                border: "1px solid rgba(74,222,128,0.20)",
                color: "#4ade80",
                fontSize: "13px",
                fontWeight: 800,
              }}
            >
              ● AI READY
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) minmax(300px, 0.8fr)",
              gap: "20px",
              marginTop: "28px",
            }}
          >
            {/* UPLOAD AREA */}
            <div
              {...getRootProps()}
              style={{
                minHeight: "280px",
                border: isDragActive ? "2px dashed #a78bfa" : "2px dashed rgba(139,92,246,0.40)",
                borderRadius: "16px",
                background: isDragActive ? "rgba(139,92,246,0.15)" : "rgba(8,15,38,0.55)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <input {...getInputProps()} />

              {uploadedImage ? (
                <>
                  <div style={{ position: "relative" }}>
                    <img
                      src={uploadedImage}
                      alt="Uploaded crop"
                      style={{
                        width: "180px",
                        height: "140px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        border: "2px solid rgba(167,139,250,0.40)",
                      }}
                    />
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (uploadedImage) URL.revokeObjectURL(uploadedImage);
                        setUploadedImage(null);
                        setImageFile(null);
                        setAnalysisResult(null);
                      }}
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "-10px",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.20)",
                        background: "#1e293b",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "16px",
                      color: "#4ade80",
                      fontSize: "14px",
                      fontWeight: 750,
                    }}
                  >
                    <CheckCircle2 size={18} />
                    {t("disease.imageSelectedShort")}
                  </div>

                  <p
                    style={{
                      margin: "6px 0 0",
                      color: "#94a3b8",
                      fontSize: "13px",
                    }}
                  >
                    {t("disease.clickReplace")}
                  </p>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "16px",
                      background: "rgba(139,92,246,0.15)",
                      border: "1px solid rgba(139,92,246,0.25)",
                      color: "#a78bfa",
                    }}
                  >
                    <UploadCloud size={32} />
                  </div>

                  <h3
                    style={{
                      margin: "18px 0 6px",
                      color: "#f1f5f9",
                      fontSize: "16px",
                    }}
                  >
                    {isDragActive ? t("disease.dropImageHere") : t("disease.uploadImage")}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "#94a3b8",
                      fontSize: "13px",
                      textAlign: "center",
                      lineHeight: 1.5
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
                borderRadius: "16px",
                background: "rgba(5,10,28,0.75)",
                border: "1px solid rgba(99,102,241,0.15)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {analysisResult ? (
                <>
                  <div>
                    <div
                      style={{
                        color: "#94a3b8",
                        fontSize: "13px",
                        fontWeight: 700,
                      }}
                    >
                      {t("disease.aiResult")}
                    </div>

                    <div
                      style={{
                        marginTop: "10px",
                        color: "#ffffff",
                        fontSize: "22px",
                        fontWeight: 800,
                      }}
                    >
                      {analysisResult.prediction}
                    </div>

                    <div
                      style={{
                        display: "inline-flex",
                        marginTop: "12px",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        background: `${riskColor}15`,
                        color: riskColor,
                        fontSize: "13px",
                        fontWeight: 800,
                      }}
                    >
                      {analysisResult.risk_level}
                    </div>

                    <div style={{ marginTop: "24px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          color: "#cbd5e1",
                          fontSize: "13px",
                        }}
                      >
                        <span>{t("disease.confidence")}</span>
                        <span style={{ color: "#ffffff", fontWeight: 750 }}>
                          {analysisResult.confidence}%
                        </span>
                      </div>

                      <div
                        style={{
                          height: "8px",
                          marginTop: "10px",
                          borderRadius: "999px",
                          background: "rgba(100,116,139,0.20)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${analysisResult.confidence}%`,
                            height: "100%",
                            borderRadius: "999px",
                            background: riskColor,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAnalysisModal(true)}
                    style={{
                      width: "100%",
                      marginTop: "20px",
                      padding: "14px",
                      borderRadius: "12px",
                      border: "1px solid rgba(139,92,246,0.30)",
                      background: "rgba(139,92,246,0.15)",
                      color: "#c4b5fd",
                      fontSize: "14px",
                      fontWeight: 750,
                      cursor: "pointer",
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
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "14px",
                        background: "rgba(139,92,246,0.15)",
                        color: "#a78bfa",
                      }}
                    >
                      <ShieldCheck size={26} />
                    </div>

                    <h3
                      style={{
                        margin: "18px 0 8px",
                        color: "#ffffff",
                        fontSize: "16px",
                      }}
                    >
                      {t("disease.readyForAnalysis")}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: "#94a3b8",
                        fontSize: "13px",
                        lineHeight: 1.6,
                      }}
                    >
                      Upload a crop image to receive disease prediction, confidence and recommended actions.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={!imageFile || isAnalyzing}
                    style={{
                      width: "100%",
                      marginTop: "20px",
                      padding: "14px",
                      borderRadius: "12px",
                      border: "none",
                      background: imageFile
                        ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                        : "rgba(100,116,139,0.15)",
                      color: imageFile ? "#ffffff" : "#94a3b8",
                      fontSize: "14px",
                      fontWeight: 800,
                      cursor: imageFile && !isAnalyzing ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      boxShadow: imageFile ? "0 0 25px rgba(124,58,237,0.30)" : "none",
                    }}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                        {t("disease.analyzing")}
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={18} />
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
          <div style={{ marginBottom: "16px" }}>
            <h2
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "18px",
                fontWeight: 800,
              }}
            >
              {t("dashboard.quickActions")}
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                color: "#94a3b8",
                fontSize: "14px",
              }}
            >
              {t("dashboard.quickActionsSubtitle")}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "14px",
            }}
          >
            {quickActions.map((action) => (
              <button
                key={action.title}
                type="button"
                onClick={() => router.push(action.route)}
                className="glass-card"
                style={{
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  textAlign: "left",
                  border: "1px solid rgba(99,102,241,0.15)",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    background: `${action.color}15`,
                    border: `1px solid ${action.color}25`,
                    color: action.color,
                    flexShrink: 0,
                  }}
                >
                  {action.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      color: "#f1f5f9",
                      fontSize: "14px",
                      fontWeight: 750,
                    }}
                  >
                    {action.title}
                  </div>

                  <div
                    style={{
                      marginTop: "6px",
                      color: "#94a3b8",
                      fontSize: "12px",
                      lineHeight: 1.5,
                    }}
                  >
                    {action.description}
                  </div>
                </div>

                <ArrowRight size={20} color="#64748b" />
              </button>
            ))}
          </div>
        </section>

        {/* =================================================
            SAATHI CTA
            ================================================= */}

        <section
          style={{
            padding: "24px 30px",
            borderRadius: "16px",
            border: "1px solid rgba(139,92,246,0.25)",
            background: "linear-gradient(90deg, rgba(79,70,229,0.15), rgba(139,92,246,0.10), rgba(34,197,94,0.08))",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                color: "#ffffff",
                boxShadow: "0 0 25px rgba(124,58,237,0.30)",
              }}
            >
              <Mic size={22} />
            </div>

            <div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: "16px",
                  fontWeight: 800,
                }}
              >
                {t("saathi.needHelp")}
              </div>

              <div
                style={{
                  color: "#cbd5e1",
                  fontSize: "13px",
                  marginTop: "5px",
                }}
              >
                {t("saathi.askInLanguage")}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("open-saathi", { detail: analysisResult })
              );
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 18px",
              borderRadius: "12px",
              border: "1px solid rgba(167,139,250,0.30)",
              background: "rgba(139,92,246,0.15)",
              color: "#e2e8f0",
              fontSize: "14px",
              fontWeight: 750,
              cursor: "pointer",
            }}
          >
            <Mic size={16} />
            {t("topbar.talkToSaathi")}
          </button>
        </section>
      </div>

      {/* ===================================================
          FULL ANALYSIS MODAL
          =================================================== */}

      {showAnalysisModal && analysisResult && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 4000,
            background: "rgba(2,6,23,0.85)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowAnalysisModal(false);
          }}
        >
          <div
            style={{
              width: "600px",
              maxWidth: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              borderRadius: "20px",
              background: "linear-gradient(180deg, #11183b, #080d22)",
              border: "1px solid rgba(139,92,246,0.35)",
              boxShadow: "0 30px 100px rgba(0,0,0,0.80)",
              padding: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    color: "#a78bfa",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "1px",
                    textTransform: "uppercase"
                  }}
                >
                  {t("disease.aiDiagnosis")}
                </div>

                <h2
                  style={{
                    margin: "8px 0 0",
                    color: "#ffffff",
                    fontSize: "24px",
                    fontWeight: 800
                  }}
                >
                  {t("disease.analysisReport")}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowAnalysisModal(false)}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "none",
                  borderRadius: "12px",
                  background: "rgba(100,116,139,0.15)",
                  color: "#cbd5e1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div
              style={{
                marginTop: "26px",
                padding: "24px",
                borderRadius: "16px",
                background: `${riskColor}10`,
                border: `1px solid ${riskColor}30`,
              }}
            >
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  fontWeight: 600
                }}
              >
                {t("disease.detectedCondition")}
              </div>

              <div
                style={{
                  marginTop: "8px",
                  color: "#ffffff",
                  fontSize: "28px",
                  fontWeight: 800,
                }}
              >
                {analysisResult.prediction}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "14px",
                }}
              >
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "999px",
                    background: `${riskColor}15`,
                    color: riskColor,
                    fontSize: "13px",
                    fontWeight: 800,
                  }}
                >
                  {analysisResult.risk_level}
                </span>

                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "999px",
                    background: "rgba(96,165,250,0.12)",
                    color: "#93c5fd",
                    fontSize: "13px",
                    fontWeight: 750
                  }}
                >
                  {t("disease.confidence")} {analysisResult.confidence}%
                </span>
              </div>
            </div>

            <div style={{ marginTop: "28px" }}>
              <div
                style={{
                  color: "#f1f5f9",
                  fontSize: "16px",
                  fontWeight: 750,
                }}
              >
                {t("disease.recommendedActions")}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginTop: "16px",
                }}
              >
                {analysisResult.actions?.map((action, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "16px",
                      padding: "18px",
                      borderRadius: "14px",
                      background: "rgba(15,23,42,0.80)",
                      border: "1px solid rgba(99,102,241,0.20)",
                    }}
                  >
                    <CheckCircle2 size={22} color="#4ade80" />

                    <div>
                      <div
                        style={{
                          color: "#f1f5f9",
                          fontSize: "14px",
                          fontWeight: 750,
                        }}
                      >
                        {action.action}
                      </div>

                      <div
                        style={{
                          color: "#94a3b8",
                          fontSize: "13px",
                          marginTop: "6px",
                          lineHeight: 1.5
                        }}
                      >
                        {action.details}
                      </div>
                    </div>
                  </div>
                ))}
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

function StatusPill({ icon, text, color }: { icon: React.ReactNode; text: string; color: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 12px",
        borderRadius: "999px",
        background: `${color}15`,
        border: `1px solid ${color}30`,
        color,
        fontSize: "12px",
        fontWeight: 750,
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
    <div className="glass-card" style={{ padding: "22px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
            background: `${iconColor}15`,
            border: `1px solid ${iconColor}25`,
            color: iconColor,
          }}
        >
          {icon}
        </div>

        <span
          style={{
            padding: "6px 10px",
            borderRadius: "999px",
            background: `${iconColor}12`,
            color: iconColor,
            fontSize: "12px",
            fontWeight: 750,
          }}
        >
          {trend}
        </span>
      </div>

      <div style={{ marginTop: "18px" }}>
        <div style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 600 }}>{title}</div>
        <div style={{ marginTop: "6px", color: "#ffffff", fontSize: "26px", fontWeight: 800 }}>{value}</div>
        <div style={{ marginTop: "4px", color: "#64748b", fontSize: "12px" }}>{subtitle}</div>
      </div>
    </div>
  );
}

function CardHeading({ icon, title, subtitle, color }: { icon: React.ReactNode; title: string; subtitle: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div
        style={{
          width: "42px",
          height: "42px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "12px",
          background: `${color}15`,
          border: `1px solid ${color}25`,
          color,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ color: "#f1f5f9", fontSize: "15px", fontWeight: 750 }}>{title}</div>
        <div style={{ color: "#94a3b8", fontSize: "12px", marginTop: "4px" }}>{subtitle}</div>
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
        padding: "16px",
        borderRadius: "12px",
        background: "rgba(15,23,42,0.65)",
        border: "1px solid rgba(99,102,241,0.15)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#cbd5e1", fontSize: "13px", fontWeight: 600 }}>{label}</span>
        <span style={{ color, fontSize: "14px", fontWeight: 800 }}>{value}</span>
      </div>

      <div
        style={{
          height: "6px",
          marginTop: "12px",
          borderRadius: "999px",
          background: "rgba(100,116,139,0.20)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            borderRadius: "999px",
            background: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      </div>
      <div style={{ color: "#94a3b8", fontSize: "12px", marginTop: "8px" }}>{description}</div>
    </div>
  );
}

function ActionItem({ number, title, text, color }: { number: string; title: string; text: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "14px",
        padding: "16px",
        borderRadius: "12px",
        background: "rgba(15,23,42,0.70)",
        border: "1px solid rgba(99,102,241,0.15)",
      }}
    >
      <div
        style={{
          width: "34px",
          height: "34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          background: `${color}15`,
          color,
          fontSize: "13px",
          fontWeight: 800,
          flexShrink: 0,
        }}
      >
        {number}
      </div>

      <div>
        <div style={{ color: "#f1f5f9", fontSize: "14px", fontWeight: 750 }}>{title}</div>
        <div style={{ marginTop: "4px", color: "#94a3b8", fontSize: "13px", lineHeight: 1.5 }}>{text}</div>
      </div>
    </div>
  );
}
