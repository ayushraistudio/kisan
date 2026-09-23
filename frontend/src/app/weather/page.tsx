"use client";

import { useState } from "react";

import AppShell from "@/components/layout/AppShell";

import {
  CloudSun,
  Sun,
  CloudRain,
  Cloud,
  Droplets,
  Wind,
  Eye,
  Gauge,
  Umbrella,
  Sprout,
  Leaf,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  CalendarDays,
  ArrowUp,
  ArrowDown,
  Thermometer,
  Waves,
} from "lucide-react";

/* =========================================================
   FORECAST DATA
   ========================================================= */

const forecast = [
  {
    day: "Today",
    date: "23 Sep",
    icon: CloudSun,
    temp: "26°",
    high: "29°",
    low: "22°",
    rain: "20%",
    color: "#60a5fa",
  },
  {
    day: "Thu",
    date: "24 Sep",
    icon: CloudRain,
    temp: "24°",
    high: "27°",
    low: "21°",
    rain: "65%",
    color: "#38bdf8",
  },
  {
    day: "Fri",
    date: "25 Sep",
    icon: CloudRain,
    temp: "25°",
    high: "28°",
    low: "22°",
    rain: "55%",
    color: "#38bdf8",
  },
  {
    day: "Sat",
    date: "26 Sep",
    icon: CloudSun,
    temp: "27°",
    high: "30°",
    low: "23°",
    rain: "25%",
    color: "#818cf8",
  },
  {
    day: "Sun",
    date: "27 Sep",
    icon: Sun,
    temp: "29°",
    high: "32°",
    low: "24°",
    rain: "10%",
    color: "#facc15",
  },
];


/* =========================================================
   WEATHER PAGE
   ========================================================= */

export default function WeatherPage() {

  const [selectedDay, setSelectedDay] =
    useState(0);


  const selected =
    forecast[selectedDay];


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
                background: "#60a5fa",
                boxShadow:
                  "0 0 12px rgba(96,165,250,0.8)",
              }}
            />

            <span
              style={{
                color: "#93c5fd",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              WEATHER INTELLIGENCE
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
            Weather & Forecast
          </h1>


          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Understand weather conditions before making farm decisions.
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
              "rgba(96,165,250,0.07)",

            border:
              "1px solid rgba(96,165,250,0.15)",

            color: "#93c5fd",

            fontSize: "10px",
            fontWeight: 700,
          }}
        >

          <MapPin size={13} />

          GHAZIABAD, UP

        </div>

      </section>


      {/* =====================================================
          MAIN WEATHER HERO
          ===================================================== */}

      <section
        style={{
          position: "relative",
          overflow: "hidden",

          minHeight: "270px",

          padding: "28px",

          borderRadius: "20px",

          background:
            "radial-gradient(circle at 78% 30%, rgba(59,130,246,0.28), transparent 32%), radial-gradient(circle at 95% 90%, rgba(124,58,237,0.22), transparent 35%), linear-gradient(110deg, #0b1d45 0%, #101e4d 45%, #21154e 100%)",

          border:
            "1px solid rgba(96,165,250,0.28)",

          boxShadow:
            "0 20px 55px rgba(30,64,175,0.14)",

          marginBottom: "18px",
        }}
      >

        {/* atmospheric glow */}

        <div
          style={{
            position: "absolute",

            width: "240px",
            height: "240px",

            borderRadius: "50%",

            right: "100px",
            top: "-100px",

            background:
              "rgba(59,130,246,0.12)",

            filter: "blur(45px)",
          }}
        />


        <div
          style={{
            position: "relative",
            zIndex: 2,

            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            height: "100%",
          }}
        >

          {/* LEFT */}

          <div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",

                color: "#93c5fd",

                fontSize: "11px",
              }}
            >

              <MapPin size={14} />

              Ghaziabad, Uttar Pradesh

            </div>


            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",

                marginTop: "18px",
              }}
            >

              <div
                style={{
                  position: "relative",

                  width: "105px",
                  height: "105px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius: "50%",

                  background:
                    "radial-gradient(circle, rgba(96,165,250,0.16), rgba(37,99,235,0.03))",

                  border:
                    "1px solid rgba(96,165,250,0.20)",

                  boxShadow:
                    "0 0 40px rgba(37,99,235,0.10)",
                }}
              >

                <CloudSun
                  size={61}
                  color="#93c5fd"
                  strokeWidth={1.15}
                />

              </div>


              <div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "7px",
                  }}
                >

                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: "52px",
                      fontWeight: 800,
                      lineHeight: 1,
                      letterSpacing: "-2px",
                    }}
                  >
                    26°
                  </span>

                  <span
                    style={{
                      color: "#64748b",
                      fontSize: "14px",
                    }}
                  >
                    C
                  </span>

                </div>


                <div
                  style={{
                    color: "#cbd5e1",
                    fontSize: "14px",
                    marginTop: "7px",
                  }}
                >
                  Partly Cloudy
                </div>


                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "8px",
                  }}
                >

                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",

                      color: "#94a3b8",
                      fontSize: "9px",
                    }}
                  >
                    <ArrowUp
                      size={11}
                      color="#f87171"
                    />
                    29°
                  </span>

                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",

                      color: "#94a3b8",
                      fontSize: "9px",
                    }}
                  >
                    <ArrowDown
                      size={11}
                      color="#60a5fa"
                    />
                    22°
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* RIGHT VISUAL */}

          <div
            style={{
              width: "330px",
              height: "180px",

              position: "relative",
            }}
          >

            {/* moon / sun */}

            <div
              style={{
                position: "absolute",

                width: "74px",
                height: "74px",

                borderRadius: "50%",

                top: "8px",
                right: "45px",

                background:
                  "radial-gradient(circle at 35% 35%, #bfdbfe, #60a5fa 60%, #2563eb)",

                boxShadow:
                  "0 0 45px rgba(96,165,250,0.25)",
              }}
            />


            {/* cloud */}

            <div
              style={{
                position: "absolute",

                width: "160px",
                height: "55px",

                bottom: "42px",
                right: "25px",

                borderRadius: "999px",

                background:
                  "linear-gradient(180deg, rgba(148,163,184,0.20), rgba(71,85,105,0.08))",

                border:
                  "1px solid rgba(148,163,184,0.16)",

                boxShadow:
                  "0 12px 35px rgba(0,0,0,0.12)",
              }}
            />


            <div
              style={{
                position: "absolute",

                width: "75px",
                height: "75px",

                borderRadius: "50%",

                bottom: "45px",
                right: "115px",

                background:
                  "rgba(148,163,184,0.13)",
              }}
            />

            <div
              style={{
                position: "absolute",

                width: "55px",
                height: "55px",

                borderRadius: "50%",

                bottom: "52px",
                right: "70px",

                background:
                  "rgba(148,163,184,0.16)",
              }}
            />


            {/* rain */}

            {[0, 1, 2, 3, 4].map(
              (i) => (

                <div
                  key={i}
                  style={{
                    position: "absolute",

                    width: "1px",
                    height: "20px",

                    bottom:
                      18 + (i % 2) * 8,

                    right:
                      62 + i * 22,

                    background:
                      "linear-gradient(180deg, rgba(96,165,250,0.05), #60a5fa)",

                    transform:
                      "rotate(15deg)",

                    opacity:
                      i === 3
                        ? 0.45
                        : 0.25,
                  }}
                />

              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          CURRENT CONDITIONS
          ===================================================== */}

      <section
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(5, 1fr)",

          gap: "11px",

          marginBottom: "18px",
        }}
      >

        <WeatherMetric
          icon={<Droplets size={17} />}
          label="Humidity"
          value="68%"
          color="#60a5fa"
        />

        <WeatherMetric
          icon={<Wind size={17} />}
          label="Wind"
          value="12 km/h"
          color="#a78bfa"
        />

        <WeatherMetric
          icon={<Eye size={17} />}
          label="Visibility"
          value="8.5 km"
          color="#4ade80"
        />

        <WeatherMetric
          icon={<Gauge size={17} />}
          label="Pressure"
          value="1012 hPa"
          color="#facc15"
        />

        <WeatherMetric
          icon={<Umbrella size={17} />}
          label="Rain Chance"
          value="20%"
          color="#38bdf8"
        />

      </section>


      {/* =====================================================
          FORECAST
          ===================================================== */}

      <section
        style={{
          padding: "21px",

          borderRadius: "18px",

          background:
            "linear-gradient(145deg, rgba(18,29,67,0.82), rgba(8,17,43,0.90))",

          border:
            "1px solid rgba(99,102,241,0.20)",

          marginBottom: "18px",
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            marginBottom: "15px",
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
              5-Day Forecast
            </h3>

            <p
              style={{
                margin: "4px 0 0",
                color: "#64748b",
                fontSize: "9px",
              }}
            >
              Select a day to inspect the forecast.
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
              "repeat(5, 1fr)",

            gap: "9px",
          }}
        >

          {forecast.map(
            (item, index) => {

              const Icon =
                item.icon;

              const active =
                selectedDay === index;

              return (

                <button
                  key={item.day}
                  type="button"
                  onClick={() =>
                    setSelectedDay(index)
                  }
                  style={{
                    minHeight: "145px",

                    padding: "13px",

                    borderRadius: "13px",

                    border:
                      active
                        ? `1px solid ${item.color}55`
                        : "1px solid rgba(99,102,241,0.10)",

                    background:
                      active
                        ? `${item.color}0d`
                        : "rgba(4,10,30,0.38)",

                    cursor: "pointer",

                    color: "#ffffff",

                    textAlign: "center",
                  }}
                >

                  <div
                    style={{
                      color:
                        active
                          ? "#ffffff"
                          : "#94a3b8",

                      fontSize: "10px",
                      fontWeight: 700,
                    }}
                  >
                    {item.day}
                  </div>


                  <div
                    style={{
                      color: "#475569",
                      fontSize: "8px",
                      marginTop: "3px",
                    }}
                  >
                    {item.date}
                  </div>


                  <div
                    style={{
                      margin:
                        "14px auto 9px",

                      width: "39px",
                      height: "39px",

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      borderRadius: "11px",

                      background:
                        `${item.color}12`,

                      color:
                        item.color,
                    }}
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.5}
                    />
                  </div>


                  <div
                    style={{
                      color: "#ffffff",
                      fontSize: "17px",
                      fontWeight: 800,
                    }}
                  >
                    {item.temp}
                  </div>


                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "7px",

                      marginTop: "4px",

                      color: "#64748b",
                      fontSize: "8px",
                    }}
                  >

                    <span>
                      H {item.high}
                    </span>

                    <span>
                      L {item.low}
                    </span>

                  </div>


                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",

                      marginTop: "8px",

                      color: "#60a5fa",
                      fontSize: "8px",
                    }}
                  >

                    <Droplets
                      size={10}
                    />

                    {item.rain}

                  </div>

                </button>

              );

            }
          )}

        </div>

      </section>


      {/* =====================================================
          SELECTED DAY + FARM IMPACT
          ===================================================== */}

      <section
        style={{
          display: "grid",

          gridTemplateColumns:
            "1fr 1fr",

          gap: "14px",

          marginBottom: "18px",
        }}
      >

        {/* SELECTED WEATHER */}

        <div
          style={{
            padding: "21px",

            borderRadius: "18px",

            background:
              "linear-gradient(145deg, rgba(18,29,67,0.82), rgba(8,17,43,0.90))",

            border:
              "1px solid rgba(99,102,241,0.20)",
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

            <div>

              <h3
                style={{
                  margin: 0,
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: 750,
                }}
              >
                {selected.day} Conditions
              </h3>

              <p
                style={{
                  margin: "4px 0 0",
                  color: "#64748b",
                  fontSize: "9px",
                }}
              >
                Detailed conditions for your selected day.
              </p>

            </div>

            <Thermometer
              size={19}
              color={selected.color}
            />

          </div>


          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(2, 1fr)",

              gap: "9px",
            }}
          >

            <MiniMetric
              label="Temperature"
              value={selected.temp}
              icon={<Thermometer size={14} />}
              color="#f87171"
            />

            <MiniMetric
              label="Rain Probability"
              value={selected.rain}
              icon={<Droplets size={14} />}
              color="#60a5fa"
            />

            <MiniMetric
              label="Expected High"
              value={selected.high}
              icon={<ArrowUp size={14} />}
              color="#facc15"
            />

            <MiniMetric
              label="Expected Low"
              value={selected.low}
              icon={<ArrowDown size={14} />}
              color="#38bdf8"
            />

          </div>

        </div>


        {/* FARM IMPACT */}

        <div
          style={{
            padding: "21px",

            borderRadius: "18px",

            background:
              "radial-gradient(circle at 85% 10%, rgba(34,197,94,0.13), transparent 35%), linear-gradient(145deg, rgba(18,29,67,0.82), rgba(8,17,43,0.90))",

            border:
              "1px solid rgba(99,102,241,0.20)",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",

              marginBottom: "14px",
            }}
          >

            <Sprout
              size={18}
              color="#4ade80"
            />

            <div>

              <h3
                style={{
                  margin: 0,
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: 750,
                }}
              >
                Farm Impact
              </h3>

              <p
                style={{
                  margin: "3px 0 0",
                  color: "#64748b",
                  fontSize: "9px",
                }}
              >
                What the weather means for your crop.
              </p>

            </div>

          </div>


          <ImpactRow
            icon={
              <Droplets size={14} />
            }
            title="Irrigation"
            text={
              selectedDay === 0
                ? "Moderate irrigation demand."
                : "Review irrigation after rainfall."
            }
            status={
              selectedDay === 0
                ? "Monitor"
                : "Review"
            }
            color="#60a5fa"
          />


          <ImpactRow
            icon={
              <Leaf size={14} />
            }
            title="Crop Growth"
            text="Current conditions support active crop development."
            status="Favourable"
            color="#4ade80"
          />


          <ImpactRow
            icon={
              <ShieldCheck size={14} />
            }
            title="Disease Risk"
            text={
              selectedDay >= 1
                ? "Higher moisture may require closer monitoring."
                : "Continue routine crop inspection."
            }
            status={
              selectedDay >= 1
                ? "Watch"
                : "Normal"
            }
            color={
              selectedDay >= 1
                ? "#facc15"
                : "#4ade80"
            }
          />

        </div>

      </section>


      {/* =====================================================
          WEATHER ALERT
          ===================================================== */}

      <section
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",

          padding: "15px 18px",

          borderRadius: "14px",

          background:
            "rgba(250,204,21,0.05)",

          border:
            "1px solid rgba(250,204,21,0.14)",
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
              "rgba(250,204,21,0.10)",

            color: "#facc15",

            flexShrink: 0,
          }}
        >

          <AlertTriangle
            size={17}
          />

        </div>


        <div>

          <div
            style={{
              color: "#e2e8f0",
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            Weather Watch
          </div>

          <div
            style={{
              color: "#64748b",
              fontSize: "9px",
              marginTop: "3px",
            }}
          >
            Rain probability is higher later this week. Review irrigation decisions and monitor your crop after rainfall.
          </div>

        </div>

      </section>

    </AppShell>
  );
}


/* =========================================================
   WEATHER METRIC
   ========================================================= */

function WeatherMetric({
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
        padding: "15px",

        borderRadius: "13px",

        background:
          "rgba(12,21,49,0.62)",

        border:
          "1px solid rgba(99,102,241,0.12)",
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",

          color,
        }}
      >

        {icon}

        <span
          style={{
            color: "#64748b",
            fontSize: "9px",
          }}
        >
          {label}
        </span>

      </div>


      <div
        style={{
          color: "#ffffff",
          fontSize: "17px",
          fontWeight: 800,

          marginTop: "8px",
        }}
      >
        {value}
      </div>

    </div>
  );
}


/* =========================================================
   MINI METRIC
   ========================================================= */

function MiniMetric({
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
        padding: "12px",

        borderRadius: "10px",

        background:
          "rgba(4,10,30,0.42)",

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
          fontSize: "15px",
          fontWeight: 800,
          marginTop: "6px",
        }}
      >
        {value}
      </div>

    </div>
  );
}


/* =========================================================
   IMPACT ROW
   ========================================================= */

function ImpactRow({
  icon,
  title,
  text,
  status,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  status: string;
  color: string;
}) {

  return (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",

        padding: "11px 0",

        borderBottom:
          "1px solid rgba(99,102,241,0.08)",
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


      <div
        style={{
          flex: 1,
        }}
      >

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
            fontSize: "8px",
            marginTop: "2px",
          }}
        >
          {text}
        </div>

      </div>


      <span
        style={{
          padding:
            "4px 7px",

          borderRadius:
            "999px",

          background:
            `${color}12`,

          color,

          fontSize: "8px",
          fontWeight: 700,

          whiteSpace: "nowrap",
        }}
      >
        {status}
      </span>

    </div>
  );
}