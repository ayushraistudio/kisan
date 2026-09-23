"use client";

import { useMemo, useState } from "react";

import AppShell from "@/components/layout/AppShell";

import {
  Sprout,
  Droplets,
  FlaskConical,
  ShieldCheck,
  Sun,
  Wind,
  Leaf,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  CalendarDays,
  Activity,
  Tractor,
} from "lucide-react";


/* =========================================================
   TYPES
   ========================================================= */

type AdvisoryCategory =
  | "overview"
  | "irrigation"
  | "nutrition"
  | "protection";


/* =========================================================
   CROP ADVISORY PAGE
   ========================================================= */

export default function CropAdvisoryPage() {

  const [crop, setCrop] =
    useState("Wheat");

  const [stage, setStage] =
    useState("Vegetative");

  const [category, setCategory] =
    useState<AdvisoryCategory>("overview");


  /* =======================================================
     ADVISORY DATA
     ======================================================= */

  const advisory = useMemo(() => {

    if (crop === "Rice") {

      return {
        title: "Rice Crop Advisory",
        summary:
          "Maintain consistent field moisture while monitoring nutrient balance and common fungal risks.",

        irrigation:
          "Maintain adequate standing moisture according to field condition and local water availability.",

        nutrition:
          "Monitor nitrogen requirement carefully and avoid excessive application.",

        protection:
          "Regularly inspect leaves for fungal symptoms, discoloration and pest activity.",

        actions: [
          "Inspect the crop twice a week.",
          "Maintain appropriate field moisture.",
          "Monitor nitrogen and micronutrient requirements.",
          "Watch for fungal disease symptoms.",
        ],
      };

    }


    if (crop === "Maize") {

      return {
        title: "Maize Crop Advisory",
        summary:
          "Focus on balanced nutrition, moisture management and early detection of pest pressure.",

        irrigation:
          "Maintain sufficient soil moisture during active vegetative growth.",

        nutrition:
          "Balanced nitrogen and other essential nutrients are important during vegetative development.",

        protection:
          "Inspect leaves and growing points regularly for pest damage.",

        actions: [
          "Check plant growth uniformity.",
          "Monitor soil moisture.",
          "Inspect leaves for pest damage.",
          "Maintain balanced nutrition.",
        ],
      };

    }


    if (crop === "Potato") {

      return {
        title: "Potato Crop Advisory",
        summary:
          "Prioritize moisture consistency, soil health and early disease monitoring.",

        irrigation:
          "Avoid both prolonged dryness and excessive water accumulation around the crop.",

        nutrition:
          "Maintain balanced nutrient availability throughout crop development.",

        protection:
          "Inspect foliage regularly for signs of disease and pest activity.",

        actions: [
          "Monitor soil moisture regularly.",
          "Avoid prolonged waterlogging.",
          "Inspect foliage for disease symptoms.",
          "Maintain balanced crop nutrition.",
        ],
      };

    }


    return {
      title: "Wheat Crop Advisory",
      summary:
        "Your wheat crop is currently in the vegetative stage. Focus on balanced nutrition, moisture management and disease monitoring.",

      irrigation:
        "Maintain moderate soil moisture. Avoid unnecessary over-irrigation and monitor field conditions before the next irrigation.",

      nutrition:
        "Vegetative growth requires balanced nutrition. Monitor crop colour and growth uniformity before applying nutrients.",

      protection:
        "Regularly inspect leaves for rust symptoms, discoloration and pest activity.",

      actions: [
        "Monitor soil moisture before irrigation.",
        "Inspect leaves for early disease symptoms.",
        "Maintain balanced nutrient availability.",
        "Walk the field regularly to identify stressed plants.",
      ],
    };

  }, [crop]);


  /* =======================================================
     CATEGORY CONTENT
     ======================================================= */

  const categoryContent = {

    overview: {
      title: "Overall Crop Guidance",
      icon: <Sprout size={18} />,
      color: "#4ade80",
      text: advisory.summary,
    },

    irrigation: {
      title: "Irrigation Advisory",
      icon: <Droplets size={18} />,
      color: "#60a5fa",
      text: advisory.irrigation,
    },

    nutrition: {
      title: "Nutrition Advisory",
      icon: <FlaskConical size={18} />,
      color: "#facc15",
      text: advisory.nutrition,
    },

    protection: {
      title: "Crop Protection",
      icon: <ShieldCheck size={18} />,
      color: "#a78bfa",
      text: advisory.protection,
    },

  };


  const activeContent =
    categoryContent[category];


  return (

    <AppShell>

      {/* =====================================================
          HEADER
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
                background: "#22c55e",
                boxShadow:
                  "0 0 12px rgba(34,197,94,0.8)",
              }}
            />

            <span
              style={{
                color: "#86efac",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              SMART FARMING ADVISORY
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
            Crop Advisory
          </h1>


          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Practical guidance based on your crop and its current growth stage.
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
              "rgba(34,197,94,0.07)",

            border:
              "1px solid rgba(34,197,94,0.15)",

            color: "#86efac",

            fontSize: "10px",
            fontWeight: 700,
          }}
        >

          <Sparkles size={14} />

          SMART RECOMMENDATIONS

        </div>

      </section>


      {/* =====================================================
          CROP SELECTOR
          ===================================================== */}

      <section
        style={{
          padding: "20px",

          borderRadius: "18px",

          background:
            "linear-gradient(110deg, rgba(15,31,67,0.94), rgba(22,18,61,0.94))",

          border:
            "1px solid rgba(99,102,241,0.23)",

          marginBottom: "18px",
        }}
      >

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "1fr 1fr 1fr",

            gap: "14px",
          }}
        >

          <Selector
            label="Select Crop"
            value={crop}
            onChange={setCrop}
            options={[
              "Wheat",
              "Rice",
              "Maize",
              "Potato",
            ]}
          />

          <Selector
            label="Crop Stage"
            value={stage}
            onChange={setStage}
            options={[
              "Germination",
              "Vegetative",
              "Flowering",
              "Maturity",
            ]}
          />


          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "4px 8px",
            }}
          >

            <div
              style={{
                color: "#64748b",
                fontSize: "9px",
                marginBottom: "7px",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              CURRENT PROFILE
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
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
                    "rgba(34,197,94,0.10)",

                  color: "#4ade80",
                }}
              >
                <Sprout size={18} />
              </div>

              <div>

                <div
                  style={{
                    color: "#f8fafc",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  {crop} • {stage}
                </div>

                <div
                  style={{
                    color: "#64748b",
                    fontSize: "9px",
                    marginTop: "2px",
                  }}
                >
                  Advisory updated for selection
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          HERO ADVISORY
          ===================================================== */}

      <section
        style={{
          position: "relative",
          overflow: "hidden",

          padding: "25px",

          borderRadius: "18px",

          background:
            "radial-gradient(circle at 85% 20%, rgba(124,58,237,0.24), transparent 35%), radial-gradient(circle at 10% 80%, rgba(34,197,94,0.14), transparent 38%), linear-gradient(110deg, rgba(14,32,64,0.96), rgba(28,18,63,0.94))",

          border:
            "1px solid rgba(129,140,248,0.25)",

          marginBottom: "18px",
        }}
      >

        <div
          style={{
            position: "relative",
            zIndex: 2,

            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          <div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",

                padding:
                  "5px 9px",

                borderRadius: "999px",

                background:
                  "rgba(34,197,94,0.08)",

                border:
                  "1px solid rgba(34,197,94,0.15)",

                color: "#86efac",

                fontSize: "9px",
                fontWeight: 700,
              }}
            >

              <CheckCircle2 size={11} />

              ACTIVE ADVISORY

            </div>


            <h2
              style={{
                margin: "11px 0 5px",

                fontSize: "23px",
                fontWeight: 800,

                color: "#ffffff",
              }}
            >
              {advisory.title}
            </h2>


            <p
              style={{
                maxWidth: "650px",

                margin: 0,

                color: "#94a3b8",

                fontSize: "11px",
                lineHeight: 1.6,
              }}
            >
              {advisory.summary}
            </p>

          </div>


          <div
            style={{
              width: "85px",
              height: "85px",

              borderRadius: "50%",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              background:
                "radial-gradient(circle, rgba(74,222,128,0.15), rgba(99,102,241,0.06))",

              border:
                "1px solid rgba(74,222,128,0.20)",

              boxShadow:
                "0 0 35px rgba(34,197,94,0.08)",
            }}
          >

            <Sprout
              size={42}
              color="#4ade80"
              strokeWidth={1.25}
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          CATEGORY NAVIGATION
          ===================================================== */}

      <section
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(4, 1fr)",

          gap: "10px",

          marginBottom: "18px",
        }}
      >

        {(
          Object.keys(categoryContent) as AdvisoryCategory[]
        ).map((key) => {

          const item =
            categoryContent[key];

          const active =
            category === key;

          return (

            <button
              key={key}
              type="button"
              onClick={() =>
                setCategory(key)
              }
              style={{
                minHeight: "72px",

                display: "flex",
                alignItems: "center",
                gap: "10px",

                padding: "12px",

                borderRadius: "13px",

                border:
                  active
                    ? `1px solid ${item.color}55`
                    : "1px solid rgba(99,102,241,0.13)",

                background:
                  active
                    ? `${item.color}10`
                    : "rgba(12,21,49,0.62)",

                color: active
                  ? item.color
                  : "#64748b",

                cursor: "pointer",

                textAlign: "left",
              }}
            >

              <div
                style={{
                  width: "34px",
                  height: "34px",

                  flexShrink: 0,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius: "9px",

                  background:
                    `${item.color}10`,
                }}
              >
                {item.icon}
              </div>


              <div>

                <div
                  style={{
                    color:
                      active
                        ? "#f8fafc"
                        : "#94a3b8",

                    fontSize: "10px",
                    fontWeight: 700,
                  }}
                >
                  {item.title}
                </div>

                {active && (
                  <div
                    style={{
                      color: item.color,
                      fontSize: "8px",
                      marginTop: "3px",
                    }}
                  >
                    Selected
                  </div>
                )}

              </div>

            </button>

          );

        })}

      </section>


      {/* =====================================================
          ACTIVE ADVISORY
          ===================================================== */}

      <section
        style={{
          display: "grid",

          gridTemplateColumns:
            "1.25fr 0.75fr",

          gap: "15px",

          marginBottom: "18px",
        }}
      >

        {/* MAIN ADVICE */}

        <div
          style={{
            padding: "22px",

            borderRadius: "18px",

            background:
              "linear-gradient(145deg, rgba(18,29,67,0.84), rgba(8,17,43,0.90))",

            border:
              "1px solid rgba(99,102,241,0.20)",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",

              marginBottom: "15px",
            }}
          >

            <div
              style={{
                width: "38px",
                height: "38px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: "10px",

                background:
                  `${activeContent.color}12`,

                color:
                  activeContent.color,
              }}
            >
              {activeContent.icon}
            </div>


            <div>

              <h3
                style={{
                  margin: 0,

                  color: "#ffffff",

                  fontSize: "14px",
                  fontWeight: 750,
                }}
              >
                {activeContent.title}
              </h3>

              <p
                style={{
                  margin: "3px 0 0",

                  color: "#64748b",

                  fontSize: "9px",
                }}
              >
                For {crop} • {stage} stage
              </p>

            </div>

          </div>


          <div
            style={{
              padding: "17px",

              borderRadius: "13px",

              background:
                "rgba(4,10,30,0.45)",

              border:
                "1px solid rgba(99,102,241,0.10)",

              color: "#cbd5e1",

              fontSize: "12px",

              lineHeight: 1.7,
            }}
          >
            {activeContent.text}
          </div>


          {/* CONDITIONS */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(3, 1fr)",

              gap: "9px",

              marginTop: "12px",
            }}
          >

            <Condition
              icon={
                <Sun size={14} />
              }
              label="Temperature"
              value="26°C"
              color="#facc15"
            />

            <Condition
              icon={
                <Droplets size={14} />
              }
              label="Humidity"
              value="68%"
              color="#60a5fa"
            />

            <Condition
              icon={
                <Wind size={14} />
              }
              label="Wind"
              value="12 km/h"
              color="#a78bfa"
            />

          </div>

        </div>


        {/* FIELD PRIORITIES */}

        <div
          style={{
            padding: "22px",

            borderRadius: "18px",

            background:
              "linear-gradient(145deg, rgba(18,29,67,0.84), rgba(8,17,43,0.90))",

            border:
              "1px solid rgba(99,102,241,0.20)",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",

              marginBottom: "16px",
            }}
          >

            <Activity
              size={17}
              color="#a78bfa"
            />

            <h3
              style={{
                margin: 0,

                color: "#ffffff",

                fontSize: "13px",
                fontWeight: 750,
              }}
            >
              Field Priorities
            </h3>

          </div>


          {advisory.actions.map(
            (action, index) => (

              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "9px",

                  padding: "11px 0",

                  borderBottom:
                    index !==
                    advisory.actions.length - 1
                      ? "1px solid rgba(99,102,241,0.09)"
                      : "none",
                }}
              >

                <div
                  style={{
                    width: "23px",
                    height: "23px",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    borderRadius: "7px",

                    background:
                      "rgba(34,197,94,0.09)",

                    color: "#4ade80",

                    flexShrink: 0,
                  }}
                >
                  <CheckCircle2 size={13} />
                </div>


                <div
                  style={{
                    color: "#94a3b8",

                    fontSize: "10px",

                    lineHeight: 1.5,
                  }}
                >
                  {action}
                </div>

              </div>

            )
          )}

        </div>

      </section>


      {/* =====================================================
          DAILY ACTIONS
          ===================================================== */}

      <section
        style={{
          padding: "21px",

          borderRadius: "18px",

          background:
            "linear-gradient(145deg, rgba(18,29,67,0.80), rgba(8,17,43,0.88))",

          border:
            "1px solid rgba(99,102,241,0.18)",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            marginBottom: "16px",
          }}
        >

          <div>

            <h3
              style={{
                margin: 0,

                color: "#ffffff",

                fontSize: "14px",
                fontWeight: 750,
              }}
            >
              Recommended Farm Actions
            </h3>

            <p
              style={{
                margin: "4px 0 0",

                color: "#64748b",

                fontSize: "9px",
              }}
            >
              Keep track of the important activities for your current crop stage.
            </p>

          </div>


          <CalendarDays
            size={18}
            color="#818cf8"
          />

        </div>


        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(4, 1fr)",

            gap: "10px",
          }}
        >

          <ActionCard
            number="01"
            title="Inspect Field"
            text="Walk through the crop and look for visible stress."
            icon={<Leaf size={17} />}
            color="#4ade80"
          />

          <ActionCard
            number="02"
            title="Check Moisture"
            text="Assess soil moisture before deciding irrigation."
            icon={<Droplets size={17} />}
            color="#60a5fa"
          />

          <ActionCard
            number="03"
            title="Monitor Disease"
            text="Look for early signs of leaf discoloration or rust."
            icon={<ShieldCheck size={17} />}
            color="#a78bfa"
          />

          <ActionCard
            number="04"
            title="Review Growth"
            text="Check whether crop growth is uniform across the field."
            icon={<Activity size={17} />}
            color="#facc15"
          />

        </div>

      </section>


    </AppShell>
  );
}


/* =========================================================
   SELECTOR
   ========================================================= */

function Selector({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {

  return (

    <div>

      <label
        style={{
          display: "block",

          color: "#64748b",

          fontSize: "9px",

          fontWeight: 700,

          marginBottom: "7px",
        }}
      >
        {label}
      </label>


      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        style={{
          width: "100%",

          height: "39px",

          padding: "0 10px",

          borderRadius: "9px",

          border:
            "1px solid rgba(129,140,248,0.25)",

          background:
            "rgba(4,10,30,0.65)",

          color: "#f8fafc",

          outline: "none",

          fontSize: "11px",

          cursor: "pointer",
        }}
      >

        {options.map(
          (option) => (

            <option
              key={option}
              value={option}
              style={{
                background: "#0b122c",
              }}
            >
              {option}
            </option>

          )
        )}

      </select>

    </div>
  );
}


/* =========================================================
   CONDITION
   ========================================================= */

function Condition({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {

  return (

    <div
      style={{
        padding: "11px",

        borderRadius: "10px",

        background:
          "rgba(4,10,30,0.40)",

        border:
          "1px solid rgba(99,102,241,0.10)",
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",

          color,
        }}
      >
        {icon}

        <span
          style={{
            color: "#64748b",
            fontSize: "8px",
          }}
        >
          {label}
        </span>

      </div>


      <div
        style={{
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: 750,
          marginTop: "6px",
        }}
      >
        {value}
      </div>

    </div>
  );
}


/* =========================================================
   ACTION CARD
   ========================================================= */

function ActionCard({
  number,
  title,
  text,
  icon,
  color,
}: {
  number: string;
  title: string;
  text: string;
  icon: React.ReactNode;
  color: string;
}) {

  return (

    <div
      style={{
        padding: "14px",

        borderRadius: "12px",

        background:
          "rgba(4,10,30,0.42)",

        border:
          "1px solid rgba(99,102,241,0.11)",
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
          }}
        >
          {icon}
        </div>


        <span
          style={{
            color,
            fontSize: "8px",
            fontWeight: 800,
          }}
        >
          {number}
        </span>

      </div>


      <div
        style={{
          marginTop: "12px",

          color: "#e2e8f0",

          fontSize: "10px",
          fontWeight: 700,
        }}
      >
        {title}
      </div>


      <div
        style={{
          marginTop: "4px",

          color: "#64748b",

          fontSize: "8px",

          lineHeight: 1.5,
        }}
      >
        {text}
      </div>


      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",

          marginTop: "8px",

          color,
        }}
      >
        <ChevronRight size={12} />
      </div>

    </div>
  );
}