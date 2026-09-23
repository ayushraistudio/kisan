"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/layout/AppShell";

import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  MapPin,
  Wheat,
  IndianRupee,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Store,
  Activity,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/* =========================================================
   MARKET DATA
   ========================================================= */

const crops = {
  Wheat: {
    price: 2480,
    change: 3.8,
    min: 2380,
    max: 2560,
    modal: 2480,
    arrival: "1,240 q",
    trend: "up",
    color: "#4ade80",
    unit: "₹ / quintal",
    data: [
      { day: "Mon", price: 2310 },
      { day: "Tue", price: 2350 },
      { day: "Wed", price: 2390 },
      { day: "Thu", price: 2420 },
      { day: "Fri", price: 2450 },
      { day: "Sat", price: 2470 },
      { day: "Sun", price: 2480 },
    ],
  },

  Rice: {
    price: 3150,
    change: 2.1,
    min: 3010,
    max: 3240,
    modal: 3150,
    arrival: "980 q",
    trend: "up",
    color: "#60a5fa",
    unit: "₹ / quintal",
    data: [
      { day: "Mon", price: 3040 },
      { day: "Tue", price: 3070 },
      { day: "Wed", price: 3090 },
      { day: "Thu", price: 3100 },
      { day: "Fri", price: 3120 },
      { day: "Sat", price: 3140 },
      { day: "Sun", price: 3150 },
    ],
  },

  Maize: {
    price: 2190,
    change: -1.4,
    min: 2100,
    max: 2260,
    modal: 2190,
    arrival: "1,560 q",
    trend: "down",
    color: "#facc15",
    unit: "₹ / quintal",
    data: [
      { day: "Mon", price: 2240 },
      { day: "Tue", price: 2230 },
      { day: "Wed", price: 2210 },
      { day: "Thu", price: 2200 },
      { day: "Fri", price: 2215 },
      { day: "Sat", price: 2200 },
      { day: "Sun", price: 2190 },
    ],
  },

  Potato: {
    price: 1680,
    change: 4.6,
    min: 1570,
    max: 1740,
    modal: 1680,
    arrival: "2,140 q",
    trend: "up",
    color: "#c084fc",
    unit: "₹ / quintal",
    data: [
      { day: "Mon", price: 1550 },
      { day: "Tue", price: 1580 },
      { day: "Wed", price: 1600 },
      { day: "Thu", price: 1630 },
      { day: "Fri", price: 1650 },
      { day: "Sat", price: 1670 },
      { day: "Sun", price: 1680 },
    ],
  },

  Tomato: {
    price: 2850,
    change: -2.8,
    min: 2700,
    max: 2990,
    modal: 2850,
    arrival: "740 q",
    trend: "down",
    color: "#fb7185",
    unit: "₹ / quintal",
    data: [
      { day: "Mon", price: 3010 },
      { day: "Tue", price: 2980 },
      { day: "Wed", price: 2940 },
      { day: "Thu", price: 2910 },
      { day: "Fri", price: 2890 },
      { day: "Sat", price: 2870 },
      { day: "Sun", price: 2850 },
    ],
  },
};

const markets = [
  {
    name: "Ghaziabad Mandi",
    location: "Ghaziabad, UP",
    priceMultiplier: 1,
  },
  {
    name: "Meerut Mandi",
    location: "Meerut, UP",
    priceMultiplier: 0.97,
  },
  {
    name: "Delhi Azadpur",
    location: "Delhi",
    priceMultiplier: 1.04,
  },
];

/* =========================================================
   PAGE
   ========================================================= */

export default function MarketPricesPage() {
  const [selectedCrop, setSelectedCrop] =
    useState<keyof typeof crops>("Wheat");

  const [selectedMarket, setSelectedMarket] =
    useState(markets[0]);

  const crop = crops[selectedCrop];

  const marketPrice = Math.round(
    crop.price * selectedMarket.priceMultiplier
  );

  const chartData = useMemo(() => {
    return crop.data.map((item) => ({
      ...item,
      price: Math.round(
        item.price * selectedMarket.priceMultiplier
      ),
    }));
  }, [crop, selectedMarket]);

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
          gap: "20px",
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
                background: "#4ade80",
                boxShadow:
                  "0 0 12px rgba(74,222,128,0.8)",
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
              MARKET INTELLIGENCE
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: 800,
              letterSpacing: "-0.7px",
              color: "#ffffff",
            }}
          >
            Market Prices
          </h1>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Track crop prices and market movement across nearby mandis.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "8px 12px",
            borderRadius: "10px",
            background: "rgba(74,222,128,0.06)",
            border: "1px solid rgba(74,222,128,0.14)",
            color: "#86efac",
            fontSize: "10px",
            fontWeight: 700,
          }}
        >
          <MapPin size={13} />
          NORTH INDIA MARKETS
        </div>
      </section>

      {/* =====================================================
          CONTROL PANEL
          ===================================================== */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
          marginBottom: "18px",
        }}
      >
        <div className="glass-card" style={{ padding: "18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              marginBottom: "12px",
            }}
          >
            <Wheat size={17} color="#4ade80" />

            <span
              style={{
                color: "#e2e8f0",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              Select Crop
            </span>
          </div>

          <select
            value={selectedCrop}
            onChange={(e) =>
              setSelectedCrop(
                e.target.value as keyof typeof crops
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border:
                "1px solid rgba(99,102,241,0.20)",
              background: "rgba(4,10,30,0.65)",
              color: "#ffffff",
              outline: "none",
              fontSize: "12px",
            }}
          >
            {Object.keys(crops).map((cropName) => (
              <option
                key={cropName}
                value={cropName}
                style={{
                  background: "#0b1535",
                }}
              >
                {cropName}
              </option>
            ))}
          </select>
        </div>

        <div className="glass-card" style={{ padding: "18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              marginBottom: "12px",
            }}
          >
            <Store size={17} color="#60a5fa" />

            <span
              style={{
                color: "#e2e8f0",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              Select Market
            </span>
          </div>

          <select
            value={selectedMarket.name}
            onChange={(e) => {
              const market = markets.find(
                (item) => item.name === e.target.value
              );

              if (market) {
                setSelectedMarket(market);
              }
            }}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border:
                "1px solid rgba(99,102,241,0.20)",
              background: "rgba(4,10,30,0.65)",
              color: "#ffffff",
              outline: "none",
              fontSize: "12px",
            }}
          >
            {markets.map((market) => (
              <option
                key={market.name}
                value={market.name}
                style={{
                  background: "#0b1535",
                }}
              >
                {market.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* =====================================================
          MAIN PRICE HERO
          ===================================================== */}

      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "220px",
          padding: "25px",
          borderRadius: "20px",
          background:
            "radial-gradient(circle at 85% 20%, rgba(34,197,94,0.20), transparent 30%), radial-gradient(circle at 95% 90%, rgba(124,58,237,0.20), transparent 35%), linear-gradient(110deg, #071b2e 0%, #0c2042 48%, #171442 100%)",
          border:
            "1px solid rgba(74,222,128,0.22)",
          boxShadow:
            "0 20px 55px rgba(30,64,175,0.12)",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "230px",
            height: "230px",
            borderRadius: "50%",
            right: "50px",
            top: "-110px",
            background:
              "rgba(74,222,128,0.10)",
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
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                color: "#86efac",
                fontSize: "10px",
                marginBottom: "12px",
              }}
            >
              <MapPin size={13} />

              {selectedMarket.location}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "18px",
                  background:
                    "rgba(74,222,128,0.09)",
                  border:
                    "1px solid rgba(74,222,128,0.18)",
                  boxShadow:
                    "0 0 35px rgba(74,222,128,0.08)",
                }}
              >
                <Wheat
                  size={38}
                  color="#4ade80"
                  strokeWidth={1.2}
                />
              </div>

              <div>
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "11px",
                  }}
                >
                  {selectedCrop} · Current Market Price
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                    marginTop: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "40px",
                      fontWeight: 800,
                      color: "#ffffff",
                      letterSpacing: "-1.5px",
                    }}
                  >
                    ₹{marketPrice.toLocaleString("en-IN")}
                  </span>

                  <span
                    style={{
                      color: "#64748b",
                      fontSize: "10px",
                    }}
                  >
                    / quintal
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "7px",
                    color:
                      crop.trend === "up"
                        ? "#4ade80"
                        : "#fb7185",
                    fontSize: "10px",
                    fontWeight: 700,
                  }}
                >
                  {crop.trend === "up" ? (
                    <TrendingUp size={13} />
                  ) : (
                    <TrendingDown size={13} />
                  )}

                  {Math.abs(crop.change)}% from previous period
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL MARKET ORB */}

          <div
            style={{
              width: "230px",
              height: "150px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "115px",
                height: "115px",
                borderRadius: "50%",
                right: "30px",
                top: "15px",
                background:
                  "radial-gradient(circle at 35% 30%, rgba(134,239,172,0.30), rgba(34,197,94,0.06) 55%, transparent 70%)",
                border:
                  "1px solid rgba(74,222,128,0.18)",
                boxShadow:
                  "0 0 55px rgba(34,197,94,0.12)",
              }}
            />

            <div
              style={{
                position: "absolute",
                width: "170px",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(74,222,128,0.35), transparent)",
                right: "0",
                top: "76px",
                transform: "rotate(-18deg)",
              }}
            />

            <div
              style={{
                position: "absolute",
                width: "130px",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(96,165,250,0.25), transparent)",
                right: "15px",
                top: "105px",
                transform: "rotate(20deg)",
              }}
            />

            <div
              style={{
                position: "absolute",
                right: "75px",
                top: "65px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow:
                  "0 0 18px rgba(74,222,128,0.8)",
              }}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          PRICE METRICS
          ===================================================== */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "11px",
          marginBottom: "18px",
        }}
      >
        <MarketMetric
          icon={<ArrowDownRight size={16} />}
          label="Minimum Price"
          value={`₹${crop.min.toLocaleString("en-IN")}`}
          color="#60a5fa"
        />

        <MarketMetric
          icon={<Activity size={16} />}
          label="Modal Price"
          value={`₹${crop.modal.toLocaleString("en-IN")}`}
          color="#4ade80"
        />

        <MarketMetric
          icon={<ArrowUpRight size={16} />}
          label="Maximum Price"
          value={`₹${crop.max.toLocaleString("en-IN")}`}
          color="#facc15"
        />

        <MarketMetric
          icon={<Package size={16} />}
          label="Market Arrival"
          value={crop.arrival}
          color="#c084fc"
        />
      </section>

      {/* =====================================================
          CHART + MARKET COMPARISON
          ===================================================== */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.65fr 1fr",
          gap: "14px",
          marginBottom: "18px",
        }}
      >
        {/* CHART */}

        <div className="glass-card" style={{ padding: "21px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
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
                7-Day Price Movement
              </h3>

              <p
                style={{
                  margin: "4px 0 0",
                  color: "#64748b",
                  fontSize: "9px",
                }}
              >
                Price trend for {selectedCrop}
              </p>
            </div>

            <BarChart3
              size={18}
              color="#4ade80"
            />
          </div>

          <div
            style={{
              width: "100%",
              height: "250px",
            }}
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="marketGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#4ade80"
                      stopOpacity={0.28}
                    />

                    <stop
                      offset="100%"
                      stopColor="#4ade80"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="rgba(148,163,184,0.07)"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  tick={{
                    fill: "#64748b",
                    fontSize: 9,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fill: "#64748b",
                    fontSize: 9,
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={45}
                />

                <Tooltip
                  contentStyle={{
                    background:
                      "#0b1535",
                    border:
                      "1px solid rgba(99,102,241,0.25)",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: "10px",
                  }}
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString(
                      "en-IN"
                    )}`
                  }
                />

                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#4ade80"
                  strokeWidth={2}
                  fill="url(#marketGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MARKET COMPARISON */}

        <div className="glass-card" style={{ padding: "21px" }}>
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
                Nearby Markets
              </h3>

              <p
                style={{
                  margin: "4px 0 0",
                  color: "#64748b",
                  fontSize: "9px",
                }}
              >
                Compare indicative prices
              </p>
            </div>

            <Store
              size={18}
              color="#60a5fa"
            />
          </div>

          <div>
            {markets.map((market, index) => {
              const price = Math.round(
                crop.price *
                  market.priceMultiplier
              );

              const difference =
                ((price - crop.price) /
                  crop.price) *
                100;

              return (
                <div
                  key={market.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "13px 0",
                    borderBottom:
                      index !== markets.length - 1
                        ? "1px solid rgba(99,102,241,0.08)"
                        : "none",
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
                        "rgba(96,165,250,0.08)",
                      color: "#60a5fa",
                    }}
                  >
                    <Store size={15} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        color: "#e2e8f0",
                        fontSize: "10px",
                        fontWeight: 700,
                      }}
                    >
                      {market.name}
                    </div>

                    <div
                      style={{
                        color: "#64748b",
                        fontSize: "8px",
                        marginTop: "2px",
                      }}
                    >
                      {market.location}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        color: "#ffffff",
                        fontSize: "11px",
                        fontWeight: 800,
                      }}
                    >
                      ₹{price.toLocaleString("en-IN")}
                    </div>

                    <div
                      style={{
                        color:
                          difference >= 0
                            ? "#4ade80"
                            : "#fb7185",
                        fontSize: "8px",
                        marginTop: "2px",
                      }}
                    >
                      {difference >= 0
                        ? "+"
                        : ""}
                      {difference.toFixed(1)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          MARKET INTELLIGENCE
          ===================================================== */}

      <section
        style={{
          display: "flex",
          alignItems: "center",
          gap: "13px",
          padding: "15px 18px",
          borderRadius: "14px",
          background:
            "rgba(96,165,250,0.045)",
          border:
            "1px solid rgba(96,165,250,0.12)",
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
              "rgba(96,165,250,0.09)",
            color: "#60a5fa",
            flexShrink: 0,
          }}
        >
          <CalendarDays size={17} />
        </div>

        <div>
          <div
            style={{
              color: "#e2e8f0",
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            Market Data Status
          </div>

          <div
            style={{
              color: "#64748b",
              fontSize: "9px",
              marginTop: "3px",
            }}
          >
            Prices shown here are prototype/demo values.
            The page is ready to connect to a live mandi
            price API later.
          </div>
        </div>
      </section>
    </AppShell>
  );
}

/* =========================================================
   MARKET METRIC
   ========================================================= */

function MarketMetric({
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
      className="glass-card"
      style={{
        padding: "15px",
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