"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/layout/AppShell";

import {
  Search,
  BookOpen,
  Wheat,
  Bug,
  Droplets,
  FlaskConical,
  Sprout,
  ArrowRight,
  Clock,
  Bookmark,
  CheckCircle2,
  Leaf,
  ShieldCheck,
} from "lucide-react";

/* =========================================================
   KNOWLEDGE DATA
   ========================================================= */

type Article = {
  id: number;
  title: string;
  description: string;
  category: string;
  crop: string;
  readTime: string;
  icon: React.ReactNode;
  color: string;
  tags: string[];
};

const articles: Article[] = [
  {
    id: 1,
    title: "Wheat Crop Management",
    description:
      "Understand the important stages of wheat cultivation, irrigation and field management.",
    category: "Crop Guide",
    crop: "Wheat",
    readTime: "5 min",
    icon: <Wheat size={20} />,
    color: "#4ade80",
    tags: ["wheat", "crop", "irrigation"],
  },
  {
    id: 2,
    title: "Identifying Common Crop Diseases",
    description:
      "Learn how to recognize early signs of common crop diseases and when to inspect your field.",
    category: "Disease",
    crop: "All Crops",
    readTime: "6 min",
    icon: <Bug size={20} />,
    color: "#fb7185",
    tags: ["disease", "inspection", "crop health"],
  },
  {
    id: 3,
    title: "Smart Irrigation Practices",
    description:
      "Learn how weather, soil conditions and crop stage can influence irrigation decisions.",
    category: "Irrigation",
    crop: "All Crops",
    readTime: "4 min",
    icon: <Droplets size={20} />,
    color: "#60a5fa",
    tags: ["water", "irrigation", "weather"],
  },
  {
    id: 4,
    title: "Understanding Soil Nutrition",
    description:
      "A practical introduction to soil nutrients and maintaining healthy crop growth.",
    category: "Nutrition",
    crop: "All Crops",
    readTime: "7 min",
    icon: <FlaskConical size={20} />,
    color: "#c084fc",
    tags: ["soil", "nutrition", "fertilizer"],
  },
  {
    id: 5,
    title: "Rice Crop Guide",
    description:
      "Explore basic rice crop management practices from establishment to maturity.",
    category: "Crop Guide",
    crop: "Rice",
    readTime: "5 min",
    icon: <Sprout size={20} />,
    color: "#22c55e",
    tags: ["rice", "crop", "farming"],
  },
  {
    id: 6,
    title: "Field Monitoring Checklist",
    description:
      "Use a simple field inspection routine to monitor crop health and identify changes early.",
    category: "Crop Health",
    crop: "All Crops",
    readTime: "3 min",
    icon: <ShieldCheck size={20} />,
    color: "#818cf8",
    tags: ["monitoring", "health", "inspection"],
  },
];

/* =========================================================
   CATEGORIES
   ========================================================= */

const categories = [
  "All",
  "Crop Guide",
  "Disease",
  "Irrigation",
  "Nutrition",
  "Crop Health",
];

/* =========================================================
   PAGE
   ========================================================= */

export default function KnowledgeHubPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] =
    useState<Article | null>(null);

  const filteredArticles = useMemo(() => {
    const query = search.toLowerCase().trim();

    return articles.filter((article) => {
      const matchesCategory =
        category === "All" ||
        article.category === category;

      const matchesSearch =
        query.length === 0 ||
        article.title.toLowerCase().includes(query) ||
        article.description
          .toLowerCase()
          .includes(query) ||
        article.crop.toLowerCase().includes(query) ||
        article.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

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
            FARMING KNOWLEDGE
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
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "-0.7px",
                color: "#ffffff",
              }}
            >
              Knowledge Hub
            </h1>

            <p
              style={{
                margin: "6px 0 0",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Practical farming knowledge to help you make
              informed field decisions.
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
                "rgba(167,139,250,0.07)",
              border:
                "1px solid rgba(167,139,250,0.15)",
              color: "#c4b5fd",
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            <BookOpen size={13} />
            LEARN & GROW
          </div>
        </div>
      </section>

      {/* =====================================================
          KNOWLEDGE HERO
          ===================================================== */}

      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "190px",
          padding: "26px",
          borderRadius: "20px",
          background:
            "radial-gradient(circle at 85% 20%, rgba(124,58,237,0.25), transparent 32%), radial-gradient(circle at 15% 100%, rgba(34,197,94,0.15), transparent 35%), linear-gradient(110deg, #081631 0%, #101b43 50%, #211442 100%)",
          border:
            "1px solid rgba(167,139,250,0.22)",
          marginBottom: "18px",
        }}
      >
        {/* Decorative circles */}

        <div
          style={{
            position: "absolute",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            right: "70px",
            top: "-75px",
            background:
              "rgba(124,58,237,0.12)",
            filter: "blur(30px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "90px",
            height: "90px",
            right: "170px",
            bottom: "-40px",
            borderRadius: "50%",
            background:
              "rgba(34,197,94,0.10)",
            filter: "blur(20px)",
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
              maxWidth: "560px",
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
                  "rgba(167,139,250,0.10)",
                border:
                  "1px solid rgba(167,139,250,0.20)",
                color: "#c4b5fd",
                marginBottom: "13px",
              }}
            >
              <BookOpen size={23} />
            </div>

            <h2
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "21px",
                fontWeight: 800,
              }}
            >
              Learn smarter farming.
            </h2>

            <p
              style={{
                margin: "7px 0 0",
                color: "#94a3b8",
                fontSize: "11px",
                lineHeight: 1.7,
              }}
            >
              Explore crop guides, disease awareness,
              irrigation practices and crop-health
              information in one place.
            </p>
          </div>

          {/* Farming visual */}

          <div
            style={{
              width: "240px",
              height: "120px",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "20px",
                right: "0",
                bottom: "15px",
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, rgba(74,222,128,0.6), transparent)",
              }}
            />

            {[0, 1, 2, 3, 4].map((item) => (
              <div
                key={item}
                style={{
                  position: "absolute",
                  bottom: "18px",
                  left: `${45 + item * 34}px`,
                  width: "3px",
                  height: `${30 + item * 7}px`,
                  borderRadius: "999px",
                  background:
                    "linear-gradient(180deg, #4ade80, #166534)",
                  transform: `rotate(${
                    item % 2 === 0 ? "-8deg" : "8deg"
                  }deg)`,
                  boxShadow:
                    "0 0 12px rgba(74,222,128,0.18)",
                }}
              />
            ))}

            <div
              style={{
                position: "absolute",
                right: "20px",
                top: "15px",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 35%, #ddd6fe, #8b5cf6 65%, #4c1d95)",
                boxShadow:
                  "0 0 35px rgba(139,92,246,0.22)",
              }}
            />
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
            placeholder="Search farming guides, diseases, irrigation..."
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
          CATEGORY FILTER
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
                  ? "1px solid rgba(167,139,250,0.40)"
                  : "1px solid rgba(99,102,241,0.12)",
                background: active
                  ? "rgba(124,58,237,0.18)"
                  : "rgba(8,17,43,0.55)",
                color: active
                  ? "#ddd6fe"
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
          QUICK LEARN
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
        <QuickLearn
          icon={<Leaf size={17} />}
          title="Crop Health"
          text="Monitor leaves, stems and overall crop condition."
          color="#4ade80"
        />

        <QuickLearn
          icon={<Droplets size={17} />}
          title="Water Management"
          text="Understand irrigation timing and rainfall impact."
          color="#60a5fa"
        />

        <QuickLearn
          icon={<ShieldCheck size={17} />}
          title="Disease Awareness"
          text="Learn the signs that require closer inspection."
          color="#facc15"
        />
      </section>

      {/* =====================================================
          ARTICLES
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
              Farming Guides
            </h3>

            <p
              style={{
                margin: "4px 0 0",
                color: "#64748b",
                fontSize: "9px",
              }}
            >
              {filteredArticles.length} resources available
            </p>
          </div>

          <BookOpen
            size={18}
            color="#a78bfa"
          />
        </div>

        {filteredArticles.length === 0 ? (
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
                margin:
                  "10px 0 0",
              }}
            >
              No guides found for your search.
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
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onOpen={() =>
                  setSelectedArticle(article)
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* =====================================================
          ARTICLE MODAL
          ===================================================== */}

      {selectedArticle && (
        <div
          onClick={() =>
            setSelectedArticle(null)
          }
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            background:
              "rgba(1,5,20,0.72)",
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
              width: "min(620px, 100%)",
              maxHeight: "80vh",
              overflowY: "auto",
              padding: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "flex-start",
                gap: "15px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding:
                      "5px 8px",
                    borderRadius: "999px",
                    background:
                      `${selectedArticle.color}12`,
                    color:
                      selectedArticle.color,
                    fontSize: "8px",
                    fontWeight: 700,
                  }}
                >
                  {selectedArticle.category}
                </div>

                <h2
                  style={{
                    margin:
                      "12px 0 0",
                    color: "#ffffff",
                    fontSize: "21px",
                    fontWeight: 800,
                  }}
                >
                  {selectedArticle.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedArticle(null)
                }
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
                ×
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: "14px",
                marginTop: "13px",
                color: "#64748b",
                fontSize: "9px",
              }}
            >
              <span>
                Crop: {selectedArticle.crop}
              </span>

              <span>
                <Clock
                  size={10}
                  style={{
                    display: "inline",
                    marginRight: "3px",
                  }}
                />
                {selectedArticle.readTime}
              </span>
            </div>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: "11px",
                lineHeight: 1.8,
                marginTop: "20px",
              }}
            >
              {selectedArticle.description}
            </p>

            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "12px",
                background:
                  "rgba(74,222,128,0.045)",
                border:
                  "1px solid rgba(74,222,128,0.10)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  color: "#4ade80",
                  fontSize: "10px",
                  fontWeight: 700,
                }}
              >
                <CheckCircle2
                  size={14}
                />
                Saathi Tip
              </div>

              <p
                style={{
                  margin:
                    "7px 0 0",
                  color: "#94a3b8",
                  fontSize: "9px",
                  lineHeight: 1.7,
                }}
              >
                Use this guide as general farming
                information and combine it with
                observations from your own field.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedArticle(null)
              }
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
              Done Reading
            </button>
          </div>
        </div>
      )}
    </AppShell>
  );
}

/* =========================================================
   ARTICLE CARD
   ========================================================= */

function ArticleCard({
  article,
  onOpen,
}: {
  article: Article;
  onOpen: () => void;
}) {
  return (
    <div
      className="glass-card"
      style={{
        padding: "18px",
        transition:
          "transform 0.2s ease, border-color 0.2s ease",
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
            width: "42px",
            height: "42px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
            background:
              `${article.color}12`,
            border:
              `1px solid ${article.color}25`,
            color: article.color,
            flexShrink: 0,
          }}
        >
          {article.icon}
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
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                color: article.color,
                fontSize: "8px",
                fontWeight: 700,
              }}
            >
              {article.category}
            </span>

            <Bookmark
              size={14}
              color="#475569"
            />
          </div>

          <h4
            style={{
              margin:
                "6px 0 0",
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 750,
            }}
          >
            {article.title}
          </h4>

          <p
            style={{
              margin:
                "6px 0 0",
              color: "#64748b",
              fontSize: "9px",
              lineHeight: 1.6,
            }}
          >
            {article.description}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginTop: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#64748b",
                fontSize: "8px",
              }}
            >
              <Clock size={10} />

              {article.readTime}
            </div>

            <button
              type="button"
              onClick={onOpen}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "7px 9px",
                borderRadius: "8px",
                border:
                  "1px solid rgba(99,102,241,0.14)",
                background:
                  "rgba(99,102,241,0.06)",
                color: "#a5b4fc",
                fontSize: "8px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Read Guide
              <ArrowRight size={11} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   QUICK LEARN
   ========================================================= */

function QuickLearn({
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
      className="glass-card"
      style={{
        padding: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "9px",
            background: `${color}12`,
            color,
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
              fontSize: "8px",
              marginTop: "2px",
            }}
          >
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}