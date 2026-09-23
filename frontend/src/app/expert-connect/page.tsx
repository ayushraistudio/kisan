"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/layout/AppShell";

import {
  Search,
  MapPin,
  Star,
  Clock,
  MessageCircle,
  CalendarDays,
  Sprout,
  FlaskConical,
  Bug,
  Droplets,
  X,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

/* =========================================================
   EXPERT DATA
   ========================================================= */

type Expert = {
  id: number;
  name: string;
  specialty: string;
  category: string;
  experience: string;
  rating: number;
  reviews: number;
  location: string;
  availability: string;
  color: string;
  icon: React.ReactNode;
  about: string;
};

const experts: Expert[] = [
  {
    id: 1,
    name: "Dr. Anil Sharma",
    specialty: "Crop & Agronomy Specialist",
    category: "Crop Management",
    experience: "12 years",
    rating: 4.9,
    reviews: 128,
    location: "Ghaziabad, UP",
    availability: "Available Today",
    color: "#4ade80",
    icon: <Sprout size={21} />,
    about:
      "Specializes in crop management, growth stages, irrigation planning and field-level crop practices.",
  },
  {
    id: 2,
    name: "Dr. Priya Verma",
    specialty: "Plant Disease Specialist",
    category: "Disease Management",
    experience: "9 years",
    rating: 4.8,
    reviews: 96,
    location: "Delhi",
    availability: "Available Today",
    color: "#fb7185",
    icon: <Bug size={21} />,
    about:
      "Focuses on identifying crop diseases, disease prevention and practical crop-health management.",
  },
  {
    id: 3,
    name: "Er. Rajesh Kumar",
    specialty: "Soil & Nutrition Expert",
    category: "Soil & Nutrition",
    experience: "15 years",
    rating: 4.9,
    reviews: 154,
    location: "Meerut, UP",
    availability: "Available Tomorrow",
    color: "#c084fc",
    icon: <FlaskConical size={21} />,
    about:
      "Works on soil health, nutrient management and improving field productivity through soil practices.",
  },
  {
    id: 4,
    name: "Dr. Meena Singh",
    specialty: "Irrigation Specialist",
    category: "Water Management",
    experience: "8 years",
    rating: 4.7,
    reviews: 72,
    location: "Noida, UP",
    availability: "Available Today",
    color: "#60a5fa",
    icon: <Droplets size={21} />,
    about:
      "Specializes in irrigation planning, rainfall-based decisions and efficient water management.",
  },
];

/* =========================================================
   FILTERS
   ========================================================= */

const categories = [
  "All",
  "Crop Management",
  "Disease Management",
  "Soil & Nutrition",
  "Water Management",
];

/* =========================================================
   PAGE
   ========================================================= */

export default function ExpertConnectPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [selectedExpert, setSelectedExpert] =
    useState<Expert | null>(null);

  const [modalType, setModalType] = useState<
    "ask" | "consult" | null
  >(null);

  const [problem, setProblem] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filteredExperts = useMemo(() => {
    const query = search.toLowerCase().trim();

    return experts.filter((expert) => {
      const categoryMatch =
        category === "All" ||
        expert.category === category;

      const searchMatch =
        query.length === 0 ||
        expert.name.toLowerCase().includes(query) ||
        expert.specialty
          .toLowerCase()
          .includes(query) ||
        expert.category
          .toLowerCase()
          .includes(query) ||
        expert.location
          .toLowerCase()
          .includes(query);

      return categoryMatch && searchMatch;
    });
  }, [search, category]);

  function openModal(
    expert: Expert,
    type: "ask" | "consult"
  ) {
    setSelectedExpert(expert);
    setModalType(type);
    setProblem("");
    setSubmitted(false);
  }

  function closeModal() {
    setSelectedExpert(null);
    setModalType(null);
    setProblem("");
    setSubmitted(false);
  }

  function submitRequest() {
    if (!problem.trim()) return;

    setSubmitted(true);
  }

  return (
    <AppShell>
      {/* =====================================================
          HEADER
          ===================================================== */}

      <section
        style={{
          marginBottom: "22px",
        }}
      >
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
            EXPERT AGRICULTURE NETWORK
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "20px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "-0.7px",
              }}
            >
              Expert Connect
            </h1>

            <p
              style={{
                margin: "6px 0 0",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Connect with agricultural experts for
              crop and farm-related guidance.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "8px 12px",
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
            <ShieldCheck size={13} />
            VERIFIED EXPERTS
          </div>
        </div>
      </section>

      {/* =====================================================
          HERO
          ===================================================== */}

      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "190px",
          padding: "26px",
          borderRadius: "20px",
          background:
            "radial-gradient(circle at 85% 20%, rgba(59,130,246,0.25), transparent 32%), radial-gradient(circle at 15% 100%, rgba(34,197,94,0.13), transparent 35%), linear-gradient(110deg, #071a35 0%, #101e48 50%, #1d1645 100%)",
          border:
            "1px solid rgba(96,165,250,0.22)",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            right: "60px",
            top: "-90px",
            borderRadius: "50%",
            background:
              "rgba(59,130,246,0.12)",
            filter: "blur(35px)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <div
            style={{
              maxWidth: "570px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "14px",
                background:
                  "rgba(96,165,250,0.10)",
                border:
                  "1px solid rgba(96,165,250,0.20)",
                color: "#60a5fa",
                marginBottom: "13px",
              }}
            >
              <MessageCircle size={23} />
            </div>

            <h2
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "21px",
                fontWeight: 800,
              }}
            >
              Get guidance from the right expert.
            </h2>

            <p
              style={{
                margin: "7px 0 0",
                color: "#94a3b8",
                fontSize: "11px",
                lineHeight: 1.7,
              }}
            >
              Find specialists for crop management,
              disease identification, soil nutrition
              and irrigation.
            </p>
          </div>

          {/* Decorative network visual */}

          <div
            style={{
              width: "230px",
              height: "120px",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "25px",
                top: "52px",
                width: "180px",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(96,165,250,0.45), transparent)",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "72px",
                top: "18px",
                width: "1px",
                height: "85px",
                background:
                  "linear-gradient(180deg, transparent, rgba(74,222,128,0.35), transparent)",
                transform: "rotate(32deg)",
              }}
            />

            {[
              {
                left: "28px",
                top: "43px",
                color: "#4ade80",
              },
              {
                left: "105px",
                top: "18px",
                color: "#60a5fa",
              },
              {
                left: "168px",
                top: "67px",
                color: "#c084fc",
              },
            ].map((node, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: node.left,
                  top: node.top,
                  width: "13px",
                  height: "13px",
                  borderRadius: "50%",
                  background: node.color,
                  boxShadow:
                    `0 0 18px ${node.color}`,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SEARCH
          ===================================================== */}

      <section
        className="glass-card"
        style={{
          padding: "14px",
          marginBottom: "15px",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          <Search
            size={17}
            color="#64748b"
            style={{
              position: "absolute",
              left: "13px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search expert, specialization or location..."
            style={{
              width: "100%",
              padding:
                "12px 14px 12px 40px",
              borderRadius: "11px",
              border:
                "1px solid rgba(99,102,241,0.16)",
              background:
                "rgba(4,10,30,0.58)",
              color: "#ffffff",
              outline: "none",
              fontSize: "11px",
            }}
          />
        </div>
      </section>

      {/* =====================================================
          CATEGORY FILTERS
          ===================================================== */}

      <section
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "18px",
        }}
      >
        {categories.map((item) => {
          const active = category === item;

          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              style={{
                padding: "8px 13px",
                borderRadius: "999px",
                border: active
                  ? "1px solid rgba(96,165,250,0.40)"
                  : "1px solid rgba(99,102,241,0.12)",
                background: active
                  ? "rgba(37,99,235,0.17)"
                  : "rgba(8,17,43,0.55)",
                color: active
                  ? "#bfdbfe"
                  : "#64748b",
                fontSize: "9px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {item}
            </button>
          );
        })}
      </section>

      {/* =====================================================
          EXPERT STATS
          ===================================================== */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: "11px",
          marginBottom: "20px",
        }}
      >
        <StatCard
          icon={<ShieldCheck size={17} />}
          value="24+"
          label="Verified Experts"
          color="#4ade80"
        />

        <StatCard
          icon={<MessageCircle size={17} />}
          value="180+"
          label="Consultations"
          color="#60a5fa"
        />

        <StatCard
          icon={<Star size={17} />}
          value="4.8"
          label="Average Rating"
          color="#facc15"
        />
      </section>

      {/* =====================================================
          EXPERT DIRECTORY
          ===================================================== */}

      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
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
              Agricultural Experts
            </h3>

            <p
              style={{
                margin: "4px 0 0",
                color: "#64748b",
                fontSize: "9px",
              }}
            >
              {filteredExperts.length} experts matching
              your search
            </p>
          </div>
        </div>

        {filteredExperts.length === 0 ? (
          <div
            className="glass-card"
            style={{
              padding: "35px",
              textAlign: "center",
            }}
          >
            <Search
              size={25}
              color="#475569"
            />

            <p
              style={{
                color: "#94a3b8",
                fontSize: "11px",
                marginTop: "10px",
              }}
            >
              No experts found.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, 1fr)",
              gap: "13px",
            }}
          >
            {filteredExperts.map((expert) => (
              <ExpertCard
                key={expert.id}
                expert={expert}
                onAsk={() =>
                  openModal(expert, "ask")
                }
                onConsult={() =>
                  openModal(expert, "consult")
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* =====================================================
          MODAL
          ===================================================== */}

      {selectedExpert && modalType && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            background:
              "rgba(1,5,20,0.75)",
            backdropFilter:
              "blur(10px)",
          }}
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="glass-card-strong"
            style={{
              width: "min(580px, 100%)",
              padding: "25px",
            }}
          >
            {!submitted ? (
              <>
                {/* Modal Header */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "flex-start",
                    gap: "15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "46px",
                        height: "46px",
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        borderRadius: "12px",
                        background:
                          `${selectedExpert.color}12`,
                        color:
                          selectedExpert.color,
                      }}
                    >
                      {selectedExpert.icon}
                    </div>

                    <div>
                      <h2
                        style={{
                          margin: 0,
                          color: "#ffffff",
                          fontSize: "17px",
                          fontWeight: 800,
                        }}
                      >
                        {modalType === "ask"
                          ? "Ask Expert"
                          : "Request Consultation"}
                      </h2>

                      <p
                        style={{
                          margin:
                            "4px 0 0",
                          color: "#94a3b8",
                          fontSize: "10px",
                        }}
                      >
                        {selectedExpert.name}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      border:
                        "1px solid rgba(99,102,241,0.15)",
                      background:
                        "rgba(4,10,30,0.55)",
                      color: "#94a3b8",
                      cursor: "pointer",
                    }}
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Expert Info */}

                <div
                  style={{
                    display: "flex",
                    gap: "14px",
                    marginTop: "18px",
                    padding: "12px",
                    borderRadius: "11px",
                    background:
                      "rgba(4,10,30,0.35)",
                    border:
                      "1px solid rgba(99,102,241,0.10)",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "#facc15",
                      fontSize: "9px",
                    }}
                  >
                    <Star
                      size={11}
                      fill="#facc15"
                    />
                    {selectedExpert.rating}
                  </span>

                  <span
                    style={{
                      color: "#64748b",
                      fontSize: "9px",
                    }}
                  >
                    {selectedExpert.experience}
                  </span>

                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "#64748b",
                      fontSize: "9px",
                    }}
                  >
                    <MapPin size={10} />
                    {selectedExpert.location}
                  </span>
                </div>

                {/* Problem */}

                <div
                  style={{
                    marginTop: "18px",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      color: "#cbd5e1",
                      fontSize: "10px",
                      fontWeight: 700,
                      marginBottom: "7px",
                    }}
                  >
                    Describe your problem
                  </label>

                  <textarea
                    value={problem}
                    onChange={(e) =>
                      setProblem(
                        e.target.value
                      )
                    }
                    placeholder="Describe your crop, symptoms, field condition or question..."
                    rows={5}
                    style={{
                      width: "100%",
                      resize: "vertical",
                      padding: "12px",
                      borderRadius: "10px",
                      border:
                        "1px solid rgba(99,102,241,0.16)",
                      background:
                        "rgba(4,10,30,0.58)",
                      color: "#ffffff",
                      outline: "none",
                      fontSize: "10px",
                      lineHeight: 1.6,
                    }}
                  />
                </div>

                {/* Action */}

                <button
                  type="button"
                  onClick={submitRequest}
                  disabled={!problem.trim()}
                  className="gradient-button"
                  style={{
                    width: "100%",
                    marginTop: "16px",
                    padding: "12px",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: "10px",
                    fontWeight: 700,
                    cursor: problem.trim()
                      ? "pointer"
                      : "not-allowed",
                    opacity: problem.trim()
                      ? 1
                      : 0.45,
                  }}
                >
                  {modalType === "ask"
                    ? "Send Question"
                    : "Send Consultation Request"}
                </button>
              </>
            ) : (
              /* =================================================
                 SUCCESS STATE
                 ================================================= */

              <div
                style={{
                  textAlign: "center",
                  padding: "25px 10px",
                }}
              >
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    margin: "0 auto",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    borderRadius: "50%",
                    background:
                      "rgba(74,222,128,0.10)",
                    border:
                      "1px solid rgba(74,222,128,0.20)",
                    color: "#4ade80",
                    boxShadow:
                      "0 0 30px rgba(74,222,128,0.12)",
                  }}
                >
                  <CheckCircle2 size={30} />
                </div>

                <h2
                  style={{
                    margin:
                      "17px 0 0",
                    color: "#ffffff",
                    fontSize: "19px",
                    fontWeight: 800,
                  }}
                >
                  Request Submitted
                </h2>

                <p
                  style={{
                    margin:
                      "8px auto 0",
                    maxWidth: "400px",
                    color: "#64748b",
                    fontSize: "10px",
                    lineHeight: 1.7,
                  }}
                >
                  Your{" "}
                  {modalType === "ask"
                    ? "question"
                    : "consultation request"}{" "}
                  has been recorded for{" "}
                  <strong
                    style={{
                      color: "#cbd5e1",
                    }}
                  >
                    {selectedExpert.name}
                  </strong>
                  .
                </p>

                <button
                  type="button"
                  onClick={closeModal}
                  className="gradient-button"
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    padding: "11px",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: "10px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Back to Experts
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}

/* =========================================================
   EXPERT CARD
   ========================================================= */

function ExpertCard({
  expert,
  onAsk,
  onConsult,
}: {
  expert: Expert;
  onAsk: () => void;
  onConsult: () => void;
}) {
  return (
    <div
      className="glass-card"
      style={{
        padding: "18px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "13px",
            background:
              `${expert.color}12`,
            border:
              `1px solid ${expert.color}25`,
            color: expert.color,
            flexShrink: 0,
          }}
        >
          {expert.icon}
        </div>

        <div
          style={{
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              gap: "10px",
            }}
          >
            <div>
              <h4
                style={{
                  margin: 0,
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 800,
                }}
              >
                {expert.name}
              </h4>

              <p
                style={{
                  margin: "4px 0 0",
                  color: "#94a3b8",
                  fontSize: "9px",
                }}
              >
                {expert.specialty}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
                color: "#facc15",
                fontSize: "9px",
                fontWeight: 700,
              }}
            >
              <Star
                size={11}
                fill="#facc15"
              />
              {expert.rating}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "11px",
              color: "#64748b",
              fontSize: "8px",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Clock size={10} />
              {expert.experience}
            </span>

            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <MapPin size={10} />
              {expert.location}
            </span>

            <span
              style={{
                color:
                  expert.availability.includes(
                    "Today"
                  )
                    ? "#4ade80"
                    : "#facc15",
                fontWeight: 700,
              }}
            >
              {expert.availability}
            </span>
          </div>

          <p
            style={{
              margin: "12px 0 0",
              color: "#64748b",
              fontSize: "9px",
              lineHeight: 1.6,
            }}
          >
            {expert.about}
          </p>

          <div
            style={{
              display: "flex",
              gap: "7px",
              marginTop: "14px",
            }}
          >
            <button
              type="button"
              onClick={onAsk}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                padding: "9px",
                borderRadius: "9px",
                border:
                  "1px solid rgba(96,165,250,0.18)",
                background:
                  "rgba(96,165,250,0.06)",
                color: "#93c5fd",
                fontSize: "8px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <MessageCircle size={11} />
              Ask Expert
            </button>

            <button
              type="button"
              onClick={onConsult}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                padding: "9px",
                borderRadius: "9px",
                border:
                  "1px solid rgba(99,102,241,0.18)",
                background:
                  "rgba(99,102,241,0.09)",
                color: "#c4b5fd",
                fontSize: "8px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <CalendarDays size={11} />
              Consult
              <ArrowRight size={10} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   STAT CARD
   ========================================================= */

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
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
          gap: "7px",
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
          marginTop: "7px",
          color: "#ffffff",
          fontSize: "19px",
          fontWeight: 800,
        }}
      >
        {value}
      </div>
    </div>
  );
}