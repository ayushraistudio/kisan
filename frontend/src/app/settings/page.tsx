"use client";

import { useState } from "react";
import {
  User,
  Bell,
  CloudRain,
  Sprout,
  Shield,
  Bot,
  Globe,
  Save,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Smartphone,
  Lock,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [farmerName, setFarmerName] = useState("Farmer");
  const [phone, setPhone] = useState("+91 XXXXX XXXXX");
  const [language, setLanguage] = useState("English");

  const [notifications, setNotifications] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [diseaseAlerts, setDiseaseAlerts] = useState(true);
  const [irrigationAlerts, setIrrigationAlerts] =
    useState(true);

  const [aiInsights, setAiInsights] = useState(true);
  const [locationAccess, setLocationAccess] =
    useState(true);

  function handleSave() {
    toast.success("Settings saved successfully");
  }

  function handleReset() {
    setFarmerName("Farmer");
    setPhone("+91 XXXXX XXXXX");
    setLanguage("English");

    setNotifications(true);
    setWeatherAlerts(true);
    setDiseaseAlerts(true);
    setIrrigationAlerts(true);

    setAiInsights(true);
    setLocationAccess(true);

    toast.success("Settings restored to default");
  }

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
          gap: "20px",
          marginBottom: "24px",
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
              KISAN SAATHI
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: 800,
              letterSpacing: "-0.7px",
            }}
          >
            Settings
          </h1>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Manage your profile, alerts and Saathi
            preferences.
          </p>
        </div>

        {/* SAVE BUTTON */}

        <button
          type="button"
          onClick={handleSave}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "10px 15px",
            borderRadius: "9px",
            border:
              "1px solid rgba(96,165,250,0.35)",
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.22), rgba(139,92,246,0.22))",
            color: "#dbeafe",
            fontSize: "10px",
            fontWeight: 750,
            cursor: "pointer",
            boxShadow:
              "0 0 20px rgba(59,130,246,0.10)",
          }}
        >
          <Save size={13} />
          Save Changes
        </button>
      </section>

      {/* =====================================================
          PROFILE
          ===================================================== */}

      <SettingsSection
        icon={<User size={17} />}
        title="Farmer Profile"
        subtitle="Your basic account information"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "14px",
          }}
        >
          <Field
            label="Farmer Name"
            value={farmerName}
            onChange={setFarmerName}
          />

          <Field
            label="Mobile Number"
            value={phone}
            onChange={setPhone}
          />
        </div>

        <div
          style={{
            marginTop: "14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "11px 13px",
            borderRadius: "10px",
            background:
              "rgba(74,222,128,0.045)",
            border:
              "1px solid rgba(74,222,128,0.10)",
          }}
        >
          <CheckCircle2
            size={15}
            color="#4ade80"
          />

          <span
            style={{
              color: "#86efac",
              fontSize: "9px",
              fontWeight: 650,
            }}
          >
            Your farmer profile is active
          </span>
        </div>
      </SettingsSection>

      {/* =====================================================
          LANGUAGE
          ===================================================== */}

      <SettingsSection
        icon={<Globe size={17} />}
        title="Language"
        subtitle="Choose how Kisan Saathi communicates with you"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
          }}
        >
          <div>
            <div
              style={{
                color: "#e2e8f0",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              App Language
            </div>

            <div
              style={{
                color: "#64748b",
                fontSize: "9px",
                marginTop: "4px",
              }}
            >
              Select your preferred language.
            </div>
          </div>

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
            style={{
              minWidth: "150px",
              padding: "9px 11px",
              borderRadius: "9px",
              border:
                "1px solid rgba(99,102,241,0.18)",
              background: "#101832",
              color: "#e2e8f0",
              fontSize: "9px",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Gujarati</option>
            <option>Marathi</option>
            <option>Punjabi</option>
            <option>Tamil</option>
            <option>Telugu</option>
          </select>
        </div>
      </SettingsSection>

      {/* =====================================================
          NOTIFICATIONS
          ===================================================== */}

      <SettingsSection
        icon={<Bell size={17} />}
        title="Notifications"
        subtitle="Control which farm alerts you receive"
      >
        <SettingToggle
          icon={<Bell size={15} />}
          title="Smart Notifications"
          description="Receive important updates about your farm."
          enabled={notifications}
          onChange={setNotifications}
        />

        <SettingToggle
          icon={<CloudRain size={15} />}
          title="Weather Alerts"
          description="Get notified about important weather changes."
          enabled={weatherAlerts}
          onChange={setWeatherAlerts}
        />

        <SettingToggle
          icon={<Sprout size={15} />}
          title="Disease & Crop Alerts"
          description="Receive crop health and disease warnings."
          enabled={diseaseAlerts}
          onChange={setDiseaseAlerts}
        />

        <SettingToggle
          icon={<CloudRain size={15} />}
          title="Irrigation Alerts"
          description="Get reminders when irrigation may be required."
          enabled={irrigationAlerts}
          onChange={setIrrigationAlerts}
        />
      </SettingsSection>

      {/* =====================================================
          AI SAATHI
          ===================================================== */}

      <SettingsSection
        icon={<Bot size={17} />}
        title="Saathi AI"
        subtitle="Configure your farming assistant"
      >
        <SettingToggle
          icon={<Bot size={15} />}
          title="AI Farm Insights"
          description="Allow Saathi to generate smart farming recommendations."
          enabled={aiInsights}
          onChange={setAiInsights}
        />

        <div
          style={{
            marginTop: "12px",
            padding: "13px",
            borderRadius: "10px",
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.055), rgba(139,92,246,0.055))",
            border:
              "1px solid rgba(99,102,241,0.12)",
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
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "rgba(139,92,246,0.12)",
                color: "#a78bfa",
              }}
            >
              <Bot size={15} />
            </div>

            <div>
              <div
                style={{
                  color: "#e2e8f0",
                  fontSize: "10px",
                  fontWeight: 700,
                }}
              >
                Saathi Intelligence
              </div>

              <div
                style={{
                  color: "#64748b",
                  fontSize: "8px",
                  marginTop: "2px",
                }}
              >
                Personalized recommendations are
                enabled.
              </div>
            </div>
          </div>
        </div>
      </SettingsSection>

      {/* =====================================================
          PRIVACY
          ===================================================== */}

      <SettingsSection
        icon={<Shield size={17} />}
        title="Privacy & Data"
        subtitle="Manage permissions used by the application"
      >
        <SettingToggle
          icon={<Smartphone size={15} />}
          title="Location Access"
          description="Use your location for local weather and farm insights."
          enabled={locationAccess}
          onChange={setLocationAccess}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "12px",
            padding: "11px 13px",
            borderRadius: "9px",
            background:
              "rgba(96,165,250,0.045)",
            border:
              "1px solid rgba(96,165,250,0.10)",
          }}
        >
          <Lock
            size={14}
            color="#60a5fa"
          />

          <span
            style={{
              color: "#64748b",
              fontSize: "8px",
              lineHeight: 1.5,
            }}
          >
            Your settings are stored locally in
            this prototype. Backend data storage
            can be connected later.
          </span>
        </div>
      </SettingsSection>

      {/* =====================================================
          RESET
          ===================================================== */}

      <section
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "5px",
        }}
      >
        <button
          type="button"
          onClick={handleReset}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "9px 12px",
            borderRadius: "8px",
            border:
              "1px solid rgba(251,113,133,0.14)",
            background:
              "rgba(251,113,133,0.04)",
            color: "#fda4af",
            fontSize: "8px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <RotateCcw size={11} />
          Reset Settings
        </button>
      </section>
    </AppShell>
  );
}

/* =========================================================
   SECTION
   ========================================================= */

function SettingsSection({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="glass-card"
      style={{
        padding: "18px",
        marginBottom: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "17px",
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
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 750,
            }}
          >
            {title}
          </h2>

          <p
            style={{
              margin: "3px 0 0",
              color: "#64748b",
              fontSize: "8px",
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

/* =========================================================
   FIELD
   ========================================================= */

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <span
        style={{
          color: "#64748b",
          fontSize: "8px",
          fontWeight: 700,
        }}
      >
        {label}
      </span>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "10px 11px",
          borderRadius: "9px",
          border:
            "1px solid rgba(99,102,241,0.15)",
          background:
            "rgba(8,17,43,0.55)",
          color: "#e2e8f0",
          fontSize: "9px",
          outline: "none",
        }}
      />
    </label>
  );
}

/* =========================================================
   TOGGLE
   ========================================================= */

function SettingToggle({
  icon,
  title,
  description,
  enabled,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "15px",
        padding: "12px 0",
        borderBottom:
          "1px solid rgba(99,102,241,0.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            background:
              "rgba(99,102,241,0.07)",
            color: "#818cf8",
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
              fontSize: "8px",
              marginTop: "3px",
            }}
          >
            {description}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        aria-label={`Toggle ${title}`}
        style={{
          width: "38px",
          height: "21px",
          padding: "2px",
          borderRadius: "999px",
          border: "none",
          background: enabled
            ? "#4ade80"
            : "#334155",
          cursor: "pointer",
          flexShrink: 0,
          transition:
            "background 160ms ease",
        }}
      >
        <span
          style={{
            display: "block",
            width: "17px",
            height: "17px",
            borderRadius: "50%",
            background: "#ffffff",
            transform: enabled
              ? "translateX(17px)"
              : "translateX(0)",
            transition:
              "transform 160ms ease",
            boxShadow:
              "0 1px 5px rgba(0,0,0,0.3)",
          }}
        />
      </button>
    </div>
  );
}