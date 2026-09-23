"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, X, Send, Loader2, AlertCircle } from "lucide-react";

/* =========================================================
   TYPES & INTERFACES
   ========================================================= */

interface SaathiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: string; 
  diseaseContext?: any; 
}

interface ChatMessage {
  sender: "user" | "saathi";
  text: string;
}

/* =========================================================
   LOCALIZATION DATA
   ========================================================= */

const quickQuestions: Record<string, string[]> = {
  en: ["Should I irrigate today?", "How is my crop health?", "Will it rain tomorrow?"],
  hi: ["Kya mujhe aaj sinchai karni chahiye?", "Meri fasal ki sthiti kaisi hai?", "Kya kal barish hogi?"],
  gu: ["શું મારે આજે સિંચાઈ કરવી જોઈએ?", "મારા પાકની સ્થિતિ કેવી છે?", "શું આવતીકાલે વરસાદ પડશે?"],
};

const defaultGreetings: Record<string, string> = {
  en: "Namaste! I'm Saathi. How can I help with your farm today?",
  hi: "Namaste! Main Saathi hoon. Main aaj aapke khet ke liye kaise madad kar sakta hoon?",
  gu: "નમસ્તે! હું સાથી છું. આજે હું તમારા ખેતર માટે કેવી રીતે મદદ કરી શકું?",
};

/* =========================================================
   COMPONENT
   ========================================================= */

export default function SaathiAssistant({
  isOpen,
  onClose,
  currentLanguage,
  diseaseContext,
}: SaathiAssistantProps) {
  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chatMessages.length === 0) {
      setChatMessages([
        {
          sender: "saathi",
          text: defaultGreetings[currentLanguage] || defaultGreetings["en"],
        },
      ]);
    }
  }, [currentLanguage]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  if (!isOpen) return null;

  /* =======================================================
     VOICE ASSISTANT (SPEECH RECOGNITION)
     ======================================================= */

  const startVoiceRecording = () => {
    setUiError(null);
    
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setUiError("Your browser does not support voice input. Please use text.");
      return;
    }

    const recognition = new SpeechRecognition();
    
    if (currentLanguage === "hi") {
      recognition.lang = "hi-IN";
    } else if (currentLanguage === "gu") {
      recognition.lang = "gu-IN";
    } else {
      recognition.lang = "en-US";
    }

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
      setIsRecording(false);
    };

    recognition.onerror = (event: any) => {
      setIsRecording(false);
      setUiError(`Microphone error: ${event.error}. Please check your permissions.`);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  /* =======================================================
     API INTEGRATION (Send Data to Backend)
     ======================================================= */

  async function fetchAiResponse(userMessage: string) {
    setIsLoading(true);
    setUiError(null);

    try {
      // Backend ko context aur data bheja ja raha hai
      const payload = {
        message: userMessage,
        language: currentLanguage,
        diseaseData: diseaseContext || null, 
      };

      
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from AI server.");
      }

      const data = await response.json();
      
      setChatMessages((current) => [
        ...current,
        {
          sender: "saathi",
          text: data.reply || "I am currently unable to answer. Please try again later.",
        },
      ]);
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      setChatMessages((current) => [
        ...current,
        {
          sender: "saathi",
          text: "I am experiencing network issues right now. Please check your connection and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  /* =======================================================
     MESSAGE HANDLING
     ======================================================= */

  function sendMessage(customQuestion?: string) {
    const message = customQuestion ?? question;
    const cleanMessage = message.trim();

    if (!cleanMessage) return;

    setChatMessages((current) => [
      ...current,
      {
        sender: "user",
        text: cleanMessage,
      },
    ]);

    setQuestion("");
    fetchAiResponse(cleanMessage);
  }

  /* =======================================================
     RENDER
     ======================================================= */

  const activeQuestions = quickQuestions[currentLanguage] || quickQuestions["en"];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3000,
        background: "rgba(2,6,23,0.60)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: "24px",
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        style={{
          width: "390px",
          maxWidth: "100%",
          height: "min(650px, 82vh)",
          display: "flex",
          flexDirection: "column",
          borderRadius: "18px",
          background: "linear-gradient(180deg, #11183b, #080d22)",
          border: "1px solid rgba(139,92,246,0.30)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 40px rgba(99,102,241,0.10)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "17px",
            borderBottom: "1px solid rgba(99,102,241,0.12)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "37px",
                height: "37px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "11px",
                background: "linear-gradient(135deg, #4f46e5, #8b5cf6)",
                color: "#ffffff",
              }}
            >
              <Mic size={18} />
            </div>

            <div>
              <div style={{ color: "#ffffff", fontSize: "16px", fontWeight: 800 }}>
                Kisan Saathi
              </div>
              <div style={{ color: "#86efac", fontSize: "10px", marginTop: "2px" }}>
                ● AI ASSISTANT ONLINE
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              borderRadius: "8px",
              background: "rgba(100,116,139,0.10)",
              color: "#94a3b8",
              cursor: "pointer",
            }}
          >
            <X size={15} />
          </button>
        </div>

        {uiError && (
          <div
            style={{
              background: "rgba(220, 38, 38, 0.15)",
              borderBottom: "1px solid rgba(220, 38, 38, 0.3)",
              padding: "10px 15px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#fca5a5",
              fontSize: "16px",
            }}
          >
            <AlertCircle size={14} />
            {uiError}
          </div>
        )}

        {/* Style to hide scrollbar */}
        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        <div 
          ref={chatContainerRef} 
          className="hide-scrollbar"
          style={{ 
            flex: 1, 
            overflowY: "auto", 
            padding: "15px",
            msOverflowStyle: "none",  /* IE and Edge */
            scrollbarWidth: "none",  /* Firefox */
          }}
        >
          {chatMessages.map((message, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  maxWidth: "82%",
                  padding: "10px 12px",
                  borderRadius:
                    message.sender === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                  background:
                    message.sender === "user"
                      ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                      : "rgba(30,41,75,0.75)",
                  border:
                    message.sender === "user" ? "none" : "1px solid rgba(99,102,241,0.10)",
                  color: "#e2e8f0",
                  fontSize: "16px",
                  lineHeight: 1.6,
                }}
              >
                {message.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "10px" }}>
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: "12px 12px 12px 3px",
                  background: "rgba(30,41,75,0.75)",
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "16px",
                }}
              >
                <Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} />
                Thinking...
              </div>
            </div>
          )}

          {!isLoading && (
            <div style={{ marginTop: "16px" }}>
              <div style={{ color: "#64748b", fontSize: "8px", marginBottom: "7px", textTransform: "uppercase" }}>
                Quick Questions
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {activeQuestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => sendMessage(item)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: "8px",
                      border: "1px solid rgba(99,102,241,0.12)",
                      background: "rgba(99,102,241,0.04)",
                      color: "#94a3b8",
                      textAlign: "left",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: "12px", borderTop: "1px solid rgba(99,102,241,0.12)" }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            style={{ display: "flex", gap: "7px", alignItems: "center" }}
          >
            <button
              type="button"
              onClick={startVoiceRecording}
              style={{
                width: "38px",
                height: "38px",
                border: "none",
                borderRadius: "9px",
                background: isRecording ? "rgba(239, 68, 68, 0.2)" : "rgba(100,116,139,0.12)",
                color: isRecording ? "#ef4444" : "#94a3b8",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s ease",
              }}
            >
              <Mic size={16} />
            </button>

            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder={isRecording ? "Listening..." : "Ask Saathi anything..."}
              disabled={isRecording}
              style={{
                flex: 1,
                minWidth: 0,
                padding: "10px 11px",
                borderRadius: "9px",
                border: "1px solid rgba(99,102,241,0.16)",
                background: "rgba(8,17,43,0.65)",
                color: "#e2e8f0",
                outline: "none",
                fontSize: "15px",
              }}
            />

            <button
              type="submit"
              disabled={!question.trim() || isLoading}
              style={{
                width: "38px",
                height: "38px",
                border: "none",
                borderRadius: "9px",
                background: question.trim()
                  ? "linear-gradient(135deg, #161438, #7c3aed)"
                  : "rgba(100,116,139,0.12)",
                color: "#ffffff",
                cursor: question.trim() ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {isLoading ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={14} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}