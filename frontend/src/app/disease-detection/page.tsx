"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";

import AppShell from "@/components/layout/AppShell";

import {
  Upload,
  ImageIcon,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Leaf,
  Droplets,
  Loader2,
  RotateCcw,
  Activity,
  ArrowRight,
  Microscope,
} from "lucide-react";


/* =========================================================
   TYPES
   ========================================================= */

interface AnalysisAction {
  action: string;
  details: string;
}

interface AnalysisResult {
  prediction: string;
  confidence: number;
  risk_level: string;
  actions?: AnalysisAction[];
}


/* =========================================================
   DISEASE DETECTION PAGE
   ========================================================= */

export default function DiseaseDetectionPage() {

  const [uploadedImage, setUploadedImage] =
    useState<string | null>(null);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResult | null>(null);


  /* =======================================================
     IMAGE DROP
     ======================================================= */

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {

      if (!acceptedFiles.length) {
        return;
      }

      const file =
        acceptedFiles[0];

      const preview =
        URL.createObjectURL(file);

      setUploadedImage(preview);
      setImageFile(file);
      setAnalysisResult(null);

      toast.success(
        "Crop image selected successfully."
      );
    },
    []
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
     ANALYZE IMAGE
     ======================================================= */

  const handleAnalyze = async () => {

    if (!imageFile) {

      toast.error(
        "Please select a crop image first."
      );

      return;
    }


    setIsAnalyzing(true);

    const toastId =
      toast.loading(
        "AI is analyzing your crop..."
      );


    const formData =
      new FormData();

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
        await axios.post(
          "http://127.0.0.1:8000/api/analyze-disease",
          formData
        );


      setAnalysisResult(
        response.data
      );


      toast.success(
        "Disease analysis completed.",
        {
          id: toastId,
        }
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Analysis failed. Please make sure the AI backend is running.",
        {
          id: toastId,
        }
      );

    } finally {

      setIsAnalyzing(false);

    }
  };


  /* =======================================================
     RESET
     ======================================================= */

  const resetAnalysis = () => {

    setUploadedImage(null);
    setImageFile(null);
    setAnalysisResult(null);

  };


  /* =======================================================
     RISK
     ======================================================= */

  const riskLevel =
    analysisResult?.risk_level ||
    "Awaiting Analysis";

  const confidence =
    analysisResult?.confidence ||
    0;

  const isHighRisk =
    riskLevel
      .toLowerCase()
      .includes("high");

  const isMediumRisk =
    riskLevel
      .toLowerCase()
      .includes("medium");


  const riskColor =
    isHighRisk
      ? "#ef4444"
      : isMediumRisk
        ? "#f59e0b"
        : "#22c55e";


  return (

    <AppShell>

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "22px",
        }}
      >

        <div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "7px",
            }}
          >

            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#a78bfa",
                boxShadow:
                  "0 0 12px rgba(167,139,250,0.8)",
              }}
            />

            <span
              style={{
                color: "#c4b5fd",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              AI CROP HEALTH
            </span>

          </div>


          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: 800,
              letterSpacing: "-0.7px",
            }}
          >
            Disease Detection
          </h1>


          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Upload a crop image and let Kisan Saathi analyze it with AI.
          </p>

        </div>


        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",

            padding:
              "8px 12px",

            borderRadius: "10px",

            background:
              "rgba(99,102,241,0.08)",

            border:
              "1px solid rgba(99,102,241,0.15)",

            color: "#a5b4fc",

            fontSize: "10px",
            fontWeight: 700,
          }}
        >

          <Microscope
            size={14}
          />

          AI DIAGNOSTICS

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
          ===================================================== */}

      <section
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(3, 1fr)",

          gap: "12px",

          marginBottom: "18px",
        }}
      >

        <ProcessCard
          number="01"
          icon={
            <Upload
              size={17}
            />
          }
          title="Upload"
          text="Add a clear photo of the crop leaf."
          color="#60a5fa"
        />

        <ProcessCard
          number="02"
          icon={
            <Sparkles
              size={17}
            />
          }
          title="AI Analysis"
          text="The AI model examines the crop image."
          color="#a78bfa"
        />

        <ProcessCard
          number="03"
          icon={
            <ShieldCheck
              size={17}
            />
          }
          title="Get Guidance"
          text="Receive disease risk and recommended actions."
          color="#4ade80"
        />

      </section>


      {/* =====================================================
          MAIN ANALYSIS AREA
          ===================================================== */}

      <section
        style={{
          display: "grid",

          gridTemplateColumns:
            "1.15fr 0.85fr",

          gap: "16px",

          marginBottom: "18px",
        }}
      >


        {/* ===================================================
            IMAGE UPLOAD PANEL
            =================================================== */}

        <div
          style={{
            padding: "22px",

            borderRadius: "18px",

            background:
              "linear-gradient(145deg, rgba(18,29,67,0.86), rgba(8,17,43,0.92))",

            border:
              "1px solid rgba(99,102,241,0.22)",

            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.035), 0 12px 35px rgba(0,0,0,0.22)",
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              marginBottom: "15px",
            }}
          >

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
              }}
            >

              <div
                style={{
                  width: "35px",
                  height: "35px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius: "9px",

                  background:
                    "rgba(99,102,241,0.12)",

                  color: "#a78bfa",
                }}
              >

                <ImageIcon
                  size={18}
                />

              </div>


              <div>

                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 750,
                    color: "#ffffff",
                  }}
                >
                  Crop Image
                </div>

                <div
                  style={{
                    fontSize: "9px",
                    color: "#64748b",
                    marginTop: "2px",
                  }}
                >
                  JPG or PNG
                </div>

              </div>

            </div>


            {uploadedImage && (

              <button
                type="button"
                onClick={resetAnalysis}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",

                  border: "none",
                  background: "transparent",

                  color: "#64748b",

                  fontSize: "10px",
                  cursor: "pointer",
                }}
              >

                <RotateCcw
                  size={12}
                />

                Reset

              </button>

            )}

          </div>


          {/* DROP ZONE */}

          <div
            {...getRootProps()}
            style={{
              minHeight: "340px",

              border:
                isDragActive
                  ? "2px dashed #a78bfa"
                  : "1px dashed rgba(129,140,248,0.30)",

              borderRadius: "15px",

              background:
                isDragActive
                  ? "rgba(124,58,237,0.10)"
                  : "rgba(3,8,23,0.35)",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              cursor: "pointer",

              overflow: "hidden",

              transition:
                "all 0.2s ease",
            }}
          >

            <input
              {...getInputProps()}
            />


            {uploadedImage ? (

              <div
                style={{
                  width: "100%",
                  height: "100%",

                  minHeight: "340px",

                  position: "relative",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >

                <img
                  src={uploadedImage}
                  alt="Uploaded crop"
                  style={{
                    maxWidth: "90%",
                    maxHeight: "310px",

                    objectFit: "contain",

                    borderRadius: "12px",

                    border:
                      "1px solid rgba(129,140,248,0.25)",

                    boxShadow:
                      "0 15px 40px rgba(0,0,0,0.35)",
                  }}
                />


                <div
                  style={{
                    position: "absolute",

                    left: "15px",
                    bottom: "15px",

                    display: "flex",
                    alignItems: "center",
                    gap: "6px",

                    padding:
                      "7px 10px",

                    borderRadius: "8px",

                    background:
                      "rgba(3,8,23,0.80)",

                    border:
                      "1px solid rgba(34,197,94,0.18)",

                    color: "#86efac",

                    fontSize: "10px",
                    fontWeight: 700,
                  }}
                >

                  <CheckCircle2
                    size={13}
                  />

                  IMAGE READY

                </div>

              </div>

            ) : (

              <div
                style={{
                  textAlign: "center",
                  padding: "25px",
                }}
              >

                <div
                  style={{
                    width: "72px",
                    height: "72px",

                    margin:
                      "0 auto 18px",

                    borderRadius: "20px",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    background:
                      "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.16))",

                    border:
                      "1px solid rgba(129,140,248,0.22)",

                    boxShadow:
                      "0 0 30px rgba(99,102,241,0.08)",
                  }}
                >

                  <Upload
                    size={30}
                    color="#818cf8"
                    strokeWidth={1.5}
                  />

                </div>


                <div
                  style={{
                    color: "#e2e8f0",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  {isDragActive
                    ? "Drop the image here"
                    : "Upload your crop image"}
                </div>


                <div
                  style={{
                    color: "#64748b",
                    fontSize: "10px",
                    marginTop: "7px",
                  }}
                >
                  Drag & drop or click to browse
                </div>


                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",

                    marginTop: "18px",

                    padding:
                      "6px 10px",

                    borderRadius: "999px",

                    background:
                      "rgba(99,102,241,0.07)",

                    color: "#64748b",

                    fontSize: "9px",
                  }}
                >

                  <ImageIcon
                    size={11}
                  />

                  JPG / PNG • Max 10MB

                </div>

              </div>

            )}

          </div>


          {/* ANALYZE */}

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={
              !imageFile ||
              isAnalyzing
            }
            style={{
              width: "100%",

              height: "46px",

              marginTop: "13px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",

              borderRadius: "11px",

              border:
                "1px solid rgba(165,180,252,0.25)",

              background:
                !imageFile
                  ? "rgba(51,65,85,0.35)"
                  : "linear-gradient(135deg, #4f46e5, #7c3aed)",

              color:
                !imageFile
                  ? "#64748b"
                  : "#ffffff",

              fontSize: "12px",
              fontWeight: 750,

              cursor:
                !imageFile ||
                isAnalyzing
                  ? "not-allowed"
                  : "pointer",

              boxShadow:
                imageFile
                  ? "0 8px 25px rgba(79,70,229,0.20)"
                  : "none",
            }}
          >

            {isAnalyzing ? (

              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />

                AI is analyzing...

              </>

            ) : (

              <>
                <Sparkles
                  size={16}
                />

                Analyze Crop

              </>

            )}

          </button>

        </div>


        {/* ===================================================
            AI RESULT PANEL
            =================================================== */}

        <div
          style={{
            padding: "22px",

            borderRadius: "18px",

            background:
              "linear-gradient(145deg, rgba(15,24,58,0.90), rgba(7,14,37,0.94))",

            border:
              "1px solid rgba(99,102,241,0.22)",

            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.035), 0 12px 35px rgba(0,0,0,0.22)",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",

              marginBottom: "20px",
            }}
          >

            <Sparkles
              size={18}
              color="#a78bfa"
            />

            <div>

              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 750,
                  color: "#ffffff",
                }}
              >
                AI Diagnosis
              </div>

              <div
                style={{
                  fontSize: "9px",
                  color: "#64748b",
                  marginTop: "2px",
                }}
              >
                Analysis result
              </div>

            </div>

          </div>


          {analysisResult ? (

            <>

              {/* RESULT */}

              <div
                style={{
                  padding: "18px",

                  borderRadius: "14px",

                  background:
                    isHighRisk
                      ? "rgba(239,68,68,0.07)"
                      : "rgba(34,197,94,0.07)",

                  border:
                    `1px solid ${
                      isHighRisk
                        ? "rgba(239,68,68,0.18)"
                        : "rgba(34,197,94,0.18)"
                    }`,

                  marginBottom: "15px",
                }}
              >

                <div
                  style={{
                    color: "#64748b",
                    fontSize: "9px",
                    letterSpacing: "0.7px",
                    fontWeight: 700,
                  }}
                >
                  DETECTED CONDITION
                </div>


                <div
                  style={{
                    marginTop: "7px",

                    color: "#ffffff",

                    fontSize: "21px",
                    fontWeight: 800,
                  }}
                >
                  {analysisResult.prediction}
                </div>


                <div
                  style={{
                    marginTop: "12px",

                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",

                    padding:
                      "5px 9px",

                    borderRadius: "999px",

                    background:
                      `${riskColor}15`,

                    color:
                      riskColor,

                    fontSize: "9px",
                    fontWeight: 800,
                  }}
                >

                  <AlertTriangle
                    size={12}
                  />

                  {riskLevel}

                </div>

              </div>


              {/* CONFIDENCE */}

              <div
                style={{
                  marginBottom: "18px",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",

                    marginBottom: "7px",
                  }}
                >

                  <span
                    style={{
                      color: "#94a3b8",
                      fontSize: "10px",
                    }}
                  >
                    AI Confidence
                  </span>

                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: "11px",
                      fontWeight: 800,
                    }}
                  >
                    {confidence}%
                  </span>

                </div>


                <div
                  style={{
                    height: "7px",

                    borderRadius: "999px",

                    background:
                      "rgba(99,102,241,0.10)",

                    overflow: "hidden",
                  }}
                >

                  <div
                    style={{
                      width:
                        `${Math.min(
                          Math.max(
                            confidence,
                            0
                          ),
                          100
                        )}%`,

                      height: "100%",

                      borderRadius: "999px",

                      background:
                        `linear-gradient(90deg, ${riskColor}, #a78bfa)`,

                      transition:
                        "width 0.5s ease",
                    }}
                  />

                </div>

              </div>


              {/* ACTIONS */}

              <div>

                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "10px",
                    fontWeight: 700,
                    marginBottom: "9px",
                  }}
                >
                  RECOMMENDED ACTIONS
                </div>


                {analysisResult.actions?.length ? (

                  analysisResult.actions.map(
                    (action, index) => (

                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: "10px",

                          padding: "11px",

                          marginBottom: "7px",

                          borderRadius: "10px",

                          background:
                            "rgba(22,35,67,0.62)",

                          border:
                            "1px solid rgba(99,102,241,0.10)",
                        }}
                      >

                        <Leaf
                          size={16}
                          color="#4ade80"
                          style={{
                            flexShrink: 0,
                          }}
                        />

                        <div>

                          <div
                            style={{
                              color: "#e2e8f0",
                              fontSize: "10px",
                              fontWeight: 700,
                            }}
                          >
                            {action.action}
                          </div>

                          <div
                            style={{
                              color: "#64748b",
                              fontSize: "9px",
                              marginTop: "3px",
                              lineHeight: 1.4,
                            }}
                          >
                            {action.details}
                          </div>

                        </div>

                      </div>

                    )

                  )

                ) : (

                  <div
                    style={{
                      color: "#64748b",
                      fontSize: "10px",
                    }}
                  >
                    No specific actions returned.
                  </div>

                )}

              </div>

            </>

          ) : (

            /* =================================================
               EMPTY RESULT
               ================================================= */

            <div
              style={{
                minHeight: "390px",

                display: "flex",
                flexDirection: "column",

                alignItems: "center",
                justifyContent: "center",

                textAlign: "center",
              }}
            >

              <div
                style={{
                  width: "75px",
                  height: "75px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius: "22px",

                  background:
                    "radial-gradient(circle, rgba(124,58,237,0.18), rgba(37,99,235,0.05))",

                  border:
                    "1px solid rgba(129,140,248,0.18)",

                  marginBottom: "17px",
                }}
              >

                <Activity
                  size={32}
                  color="#818cf8"
                  strokeWidth={1.4}
                />

              </div>


              <div
                style={{
                  color: "#e2e8f0",
                  fontSize: "13px",
                  fontWeight: 700,
                }}
              >
                Awaiting Crop Image
              </div>


              <div
                style={{
                  maxWidth: "220px",

                  color: "#64748b",

                  fontSize: "10px",
                  lineHeight: 1.6,

                  marginTop: "7px",
                }}
              >
                Upload a clear image of the crop leaf to start AI disease analysis.
              </div>


              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",

                  marginTop: "18px",

                  color: "#475569",

                  fontSize: "9px",
                }}
              >

                <ShieldCheck
                  size={12}
                />

                AI-powered crop health analysis

              </div>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          TIPS
          ===================================================== */}

      <section
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(3, 1fr)",

          gap: "12px",
        }}
      >

        <Tip
          icon={
            <ImageIcon size={16} />
          }
          title="Use a clear image"
          text="Make sure the affected leaf is clearly visible."
          color="#60a5fa"
        />

        <Tip
          icon={
            <Leaf size={16} />
          }
          title="Capture the affected area"
          text="Include visible spots, discoloration or damage."
          color="#4ade80"
        />

        <Tip
          icon={
            <ShieldCheck size={16} />
          }
          title="Use AI as guidance"
          text="Combine AI results with local agricultural advice."
          color="#a78bfa"
        />

      </section>

    </AppShell>
  );
}


/* =========================================================
   PROCESS CARD
   ========================================================= */

function ProcessCard({
  number,
  icon,
  title,
  text,
  color,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  color: string;
}) {

  return (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",

        padding: "14px 16px",

        borderRadius: "14px",

        background:
          "rgba(12,21,49,0.62)",

        border:
          "1px solid rgba(99,102,241,0.13)",
      }}
    >

      <div
        style={{
          width: "34px",
          height: "34px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: "9px",

          background:
            `${color}12`,

          color,

          flexShrink: 0,
        }}
      >
        {icon}
      </div>


      <div
        style={{
          minWidth: 0,
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >

          <span
            style={{
              color,
              fontSize: "8px",
              fontWeight: 800,
            }}
          >
            {number}
          </span>

          <span
            style={{
              color: "#e2e8f0",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            {title}
          </span>

        </div>

        <div
          style={{
            color: "#64748b",
            fontSize: "9px",
            marginTop: "3px",
          }}
        >
          {text}
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   TIP
   ========================================================= */

function Tip({
  icon,
  title,
  text,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  color: string;
}) {

  return (

    <div
      style={{
        display: "flex",
        gap: "10px",

        padding: "14px",

        borderRadius: "13px",

        background:
          "rgba(12,21,49,0.60)",

        border:
          "1px solid rgba(99,102,241,0.12)",
      }}
    >

      <div
        style={{
          width: "31px",
          height: "31px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: "8px",

          background:
            `${color}12`,

          color,

          flexShrink: 0,
        }}
      >
        {icon}
      </div>


      <div>

        <div
          style={{
            color: "#e2e8f0",
            fontSize: "10px",
            fontWeight: 700,
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: "#64748b",
            fontSize: "9px",
            lineHeight: 1.45,
            marginTop: "3px",
          }}
        >
          {text}
        </div>

      </div>

    </div>
  );
}