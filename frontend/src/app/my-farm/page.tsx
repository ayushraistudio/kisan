"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

import AppShell from "@/components/layout/AppShell";

import {
  MapPin,
  Sprout,
  Calendar,
  Ruler,
  Pencil,
  Save,
  CheckCircle2,
  CloudSun,
  Droplets,
  Activity,
  Leaf,
  ShieldCheck,
  TrendingUp,
  Tractor,
} from "lucide-react";


/* =========================================================
   MY FARM PAGE
   ========================================================= */

export default function MyFarmPage() {

  /* ---------------------------------------------------------
     FARM STATE
     --------------------------------------------------------- */

  const [isEditing, setIsEditing] =
    useState(false);

  const [farmName, setFarmName] =
    useState("My Wheat Farm");

  const [location, setLocation] =
    useState("Ghaziabad, Uttar Pradesh");

  const [crop, setCrop] =
    useState("Wheat");

  const [stage, setStage] =
    useState("Vegetative");

  const [area, setArea] =
    useState("5");

  const [sowingDate, setSowingDate] =
    useState("15 Nov 2025");


  /* ---------------------------------------------------------
     SAVE FARM
     --------------------------------------------------------- */

  const handleSave = () => {
    setIsEditing(false);
  };


  /* ---------------------------------------------------------
     COMMON CARD STYLE
     --------------------------------------------------------- */

  const cardStyle: CSSProperties = {
    background:
      "linear-gradient(145deg, rgba(18,29,67,0.82), rgba(8,17,43,0.90))",

    border:
      "1px solid rgba(99,102,241,0.22)",

    borderRadius: "18px",

    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.035), 0 12px 35px rgba(0,0,0,0.22)",

    backdropFilter: "blur(16px)",

    WebkitBackdropFilter: "blur(16px)",
  };


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
              FARM MANAGEMENT
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
            My Farm
          </h1>


          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Manage your farm profile and crop information.
          </p>

        </div>


        {/* EDIT / SAVE */}

        {!isEditing ? (

          <button
            onClick={() => setIsEditing(true)}
            style={{
              height: "42px",
              padding: "0 16px",

              display: "flex",
              alignItems: "center",
              gap: "8px",

              borderRadius: "10px",

              border:
                "1px solid rgba(129,140,248,0.30)",

              background:
                "linear-gradient(135deg, rgba(79,70,229,0.25), rgba(124,58,237,0.22))",

              color: "#c4b5fd",

              fontSize: "12px",
              fontWeight: 700,

              cursor: "pointer",
            }}
          >

            <Pencil size={15} />

            Edit Farm

          </button>

        ) : (

          <button
            onClick={handleSave}
            style={{
              height: "42px",
              padding: "0 16px",

              display: "flex",
              alignItems: "center",
              gap: "8px",

              borderRadius: "10px",

              border:
                "1px solid rgba(34,197,94,0.25)",

              background:
                "rgba(34,197,94,0.12)",

              color: "#86efac",

              fontSize: "12px",
              fontWeight: 700,

              cursor: "pointer",
            }}
          >

            <Save size={15} />

            Save Changes

          </button>

        )}

      </section>


      {/* =====================================================
          FARM HERO
          ===================================================== */}

      <section
        style={{
          ...cardStyle,

          position: "relative",
          overflow: "hidden",

          padding: "28px",

          marginBottom: "18px",

          background:
            "radial-gradient(circle at 82% 30%, rgba(34,197,94,0.18), transparent 30%), radial-gradient(circle at 15% 80%, rgba(37,99,235,0.20), transparent 35%), linear-gradient(110deg, rgba(15,31,67,0.95), rgba(22,18,61,0.94))",
        }}
      >

        {/* Decorative farm horizon */}

        <div
          style={{
            position: "absolute",
            right: "-30px",
            bottom: "-90px",

            width: "430px",
            height: "190px",

            borderRadius: "50% 50% 0 0",

            background:
              "linear-gradient(180deg, rgba(34,197,94,0.15), rgba(21,128,61,0.03))",

            transform:
              "rotate(-5deg)",
          }}
        />


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
                gap: "7px",

                padding: "5px 9px",

                borderRadius: "999px",

                background:
                  "rgba(34,197,94,0.08)",

                border:
                  "1px solid rgba(34,197,94,0.16)",

                color: "#86efac",

                fontSize: "9px",
                fontWeight: 700,
              }}
            >

              <CheckCircle2 size={12} />

              FARM PROFILE ACTIVE

            </div>


            <h2
              style={{
                margin: "12px 0 5px",

                fontSize: "25px",
                fontWeight: 800,

                color: "#ffffff",
              }}
            >
              {farmName}
            </h2>


            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",

                color: "#94a3b8",

                fontSize: "12px",
              }}
            >

              <MapPin
                size={14}
                color="#60a5fa"
              />

              {location}

            </div>

          </div>


          {/* FARM VISUAL */}

          <div
            style={{
              width: "150px",
              height: "100px",

              position: "relative",

              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >

            <div
              style={{
                position: "absolute",

                bottom: "8px",

                width: "150px",
                height: "48px",

                borderRadius:
                  "50% 50% 8px 8px",

                background:
                  "linear-gradient(180deg, rgba(74,222,128,0.28), rgba(22,101,52,0.10))",

                transform:
                  "skewX(-15deg)",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "24px",
                left: "38px",
                transform: "rotate(-12deg)",
              }}
            >
              <Leaf
                size={43}
                color="#4ade80"
                strokeWidth={1.2}
              />
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "28px",
                right: "28px",
                transform: "rotate(15deg)",
              }}
            >
              <Sprout
                size={38}
                color="#86efac"
                strokeWidth={1.2}
              />
            </div>

            <div
              style={{
                position: "absolute",
                top: "3px",
                right: "18px",
                opacity: 0.65,
              }}
            >
              <CloudSun
                size={36}
                color="#a5b4fc"
                strokeWidth={1.2}
              />
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FARM DETAILS
          ===================================================== */}

      <section
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",

          gap: "14px",

          marginBottom: "18px",
        }}
      >

        {/* LOCATION */}

        <div
          style={{
            ...cardStyle,
            padding: "20px",
          }}
        >

          <FarmDetail
            icon={
              <MapPin
                size={19}
              />
            }
            title="Farm Location"
            color="#8b5cf6"
          >

            {isEditing ? (

              <input
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                style={inputStyle}
              />

            ) : (

              <span>
                {location}
              </span>

            )}

          </FarmDetail>

        </div>


        {/* CROP */}

        <div
          style={{
            ...cardStyle,
            padding: "20px",
          }}
        >

          <FarmDetail
            icon={
              <Sprout
                size={19}
              />
            }
            title="Crop"
            color="#22c55e"
          >

            {isEditing ? (

              <select
                value={crop}
                onChange={(e) =>
                  setCrop(e.target.value)
                }
                style={inputStyle}
              >

                <option value="Wheat">
                  Wheat
                </option>

                <option value="Rice">
                  Rice
                </option>

                <option value="Maize">
                  Maize
                </option>

                <option value="Potato">
                  Potato
                </option>

              </select>

            ) : (

              <span>
                {crop}
              </span>

            )}

          </FarmDetail>

        </div>


        {/* CROP STAGE */}

        <div
          style={{
            ...cardStyle,
            padding: "20px",
          }}
        >

          <FarmDetail
            icon={
              <Activity
                size={19}
              />
            }
            title="Crop Stage"
            color="#60a5fa"
          >

            {isEditing ? (

              <select
                value={stage}
                onChange={(e) =>
                  setStage(e.target.value)
                }
                style={inputStyle}
              >

                <option value="Germination">
                  Germination
                </option>

                <option value="Vegetative">
                  Vegetative
                </option>

                <option value="Flowering">
                  Flowering
                </option>

                <option value="Maturity">
                  Maturity
                </option>

              </select>

            ) : (

              <span>
                {stage}
              </span>

            )}

          </FarmDetail>

        </div>


        {/* AREA */}

        <div
          style={{
            ...cardStyle,
            padding: "20px",
          }}
        >

          <FarmDetail
            icon={
              <Ruler
                size={19}
              />
            }
            title="Farm Area"
            color="#eab308"
          >

            {isEditing ? (

              <input
                value={area}
                onChange={(e) =>
                  setArea(e.target.value)
                }
                type="number"
                min="0"
                style={inputStyle}
              />

            ) : (

              <span>
                {area} acres
              </span>

            )}

          </FarmDetail>

        </div>


        {/* SOWING DATE */}

        <div
          style={{
            ...cardStyle,
            padding: "20px",
          }}
        >

          <FarmDetail
            icon={
              <Calendar
                size={19}
              />
            }
            title="Sowing Date"
            color="#a78bfa"
          >

            {isEditing ? (

              <input
                value={sowingDate}
                onChange={(e) =>
                  setSowingDate(
                    e.target.value
                  )
                }
                style={inputStyle}
              />

            ) : (

              <span>
                {sowingDate}
              </span>

            )}

          </FarmDetail>

        </div>


        {/* STATUS */}

        <div
          style={{
            ...cardStyle,
            padding: "20px",
          }}
        >

          <FarmDetail
            icon={
              <ShieldCheck
                size={19}
              />
            }
            title="Farm Status"
            color="#22c55e"
          >

            <span
              style={{
                color: "#4ade80",
              }}
            >
              Healthy & Monitoring
            </span>

          </FarmDetail>

        </div>

      </section>


      {/* =====================================================
          FARM HEALTH OVERVIEW
          ===================================================== */}

      <section
        style={{
          ...cardStyle,

          padding: "22px",

          marginBottom: "18px",
        }}
      >

        <div
          style={{
            marginBottom: "18px",
          }}
        >

          <h3
            style={{
              margin: 0,
              fontSize: "15px",
              color: "#ffffff",
            }}
          >
            Farm Health Overview
          </h3>

          <p
            style={{
              margin: "5px 0 0",
              color: "#64748b",
              fontSize: "10px",
            }}
          >
            AI-generated indicators from your current farm profile.
          </p>

        </div>


        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(4, minmax(0, 1fr))",

            gap: "12px",
          }}
        >

          <HealthCard
            icon={
              <Leaf size={18} />
            }
            title="Crop Health"
            value="Good"
            detail="No major stress detected"
            color="#22c55e"
          />

          <HealthCard
            icon={
              <Droplets size={18} />
            }
            title="Soil Moisture"
            value="68%"
            detail="Moderate moisture level"
            color="#60a5fa"
          />

          <HealthCard
            icon={
              <CloudSun size={18} />
            }
            title="Weather"
            value="26°C"
            detail="Partly cloudy"
            color="#a78bfa"
          />

          <HealthCard
            icon={
              <TrendingUp size={18} />
            }
            title="Yield Outlook"
            value="+12%"
            detail="Compared with baseline"
            color="#4ade80"
          />

        </div>

      </section>


      {/* =====================================================
          QUICK ACTIONS
          ===================================================== */}

      <section
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",

          gap: "12px",
        }}
      >

        <QuickAction
          icon={
            <Tractor size={18} />
          }
          title="Manage Farm"
          text="Update your farm information."
        />

        <QuickAction
          icon={
            <Leaf size={18} />
          }
          title="Crop Advisory"
          text="View recommendations for your crop."
        />

        <QuickAction
          icon={
            <ShieldCheck size={18} />
          }
          title="Disease Detection"
          text="Check your crop for diseases."
        />

      </section>

    </AppShell>
  );
}


/* =========================================================
   FARM DETAIL COMPONENT
   ========================================================= */

function FarmDetail({
  icon,
  title,
  color,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  children: React.ReactNode;
}) {

  return (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "13px",
      }}
    >

      <div
        style={{
          width: "40px",
          height: "40px",

          flexShrink: 0,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: "11px",

          background:
            `${color}12`,

          border:
            `1px solid ${color}25`,

          color,
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
            color: "#64748b",
            fontSize: "10px",
            marginBottom: "5px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: "#f8fafc",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          {children}
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   HEALTH CARD
   ========================================================= */

function HealthCard({
  icon,
  title,
  value,
  detail,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
  color: string;
}) {

  return (

    <div
      style={{
        padding: "15px",

        borderRadius: "13px",

        background:
          "rgba(4,10,30,0.42)",

        border:
          "1px solid rgba(99,102,241,0.12)",
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",

          color,
        }}
      >

        {icon}

        <span
          style={{
            color: "#94a3b8",
            fontSize: "10px",
          }}
        >
          {title}
        </span>

      </div>


      <div
        style={{
          marginTop: "12px",

          color: "#ffffff",
          fontSize: "20px",
          fontWeight: 800,
        }}
      >
        {value}
      </div>


      <div
        style={{
          marginTop: "3px",

          color: "#475569",
          fontSize: "9px",
        }}
      >
        {detail}
      </div>

    </div>
  );
}


/* =========================================================
   QUICK ACTION
   ========================================================= */

function QuickAction({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {

  return (

    <button
      type="button"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",

        padding: "15px",

        borderRadius: "13px",

        border:
          "1px solid rgba(99,102,241,0.14)",

        background:
          "rgba(12,21,49,0.65)",

        color: "#ffffff",

        textAlign: "left",

        cursor: "pointer",
      }}
    >

      <div
        style={{
          width: "36px",
          height: "36px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: "10px",

          background:
            "rgba(99,102,241,0.12)",

          color: "#a5b4fc",

          flexShrink: 0,
        }}
      >
        {icon}
      </div>


      <div>

        <div
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#e2e8f0",
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: "3px",
            fontSize: "9px",
            color: "#64748b",
          }}
        >
          {text}
        </div>

      </div>

    </button>
  );
}


/* =========================================================
   INPUT STYLE
   ========================================================= */

const inputStyle: CSSProperties = {

  width: "100%",

  height: "34px",

  padding:
    "0 9px",

  borderRadius: "8px",

  border:
    "1px solid rgba(129,140,248,0.30)",

  background:
    "rgba(4,10,30,0.70)",

  color: "#ffffff",

  outline: "none",

  fontSize: "12px",

};