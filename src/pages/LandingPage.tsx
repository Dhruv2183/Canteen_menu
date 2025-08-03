import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaStore } from "react-icons/fa";

const gradientAnimation = `
@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes bounceIcon {
  0%, 100% { transform: translateY(0);}
  50% { transform: translateY(-10px);}
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px);}
  to { opacity: 1; transform: translateY(0);}
}
@media (max-width: 768px) {
  .container {
    padding: 0 !important;
  }
  .card {
    padding: 1.5rem 0.6rem !important;
    max-width: 98vw !important;
    margin: 0 auto !important;
    border-radius: 1.3rem !important;
  }
  .title {
    font-size: 1.4rem !important;
  }
  .subtitle {
    font-size: 1rem !important;
  }
  .icon {
    font-size: 48px !important;
    margin-bottom: 1.5rem !important;
  }
}
@media (max-width: 420px) {
  .card {
    padding: 0.6rem 0.1rem !important;
  }
  .title {
    font-size: 1rem !important;
  }
}
`;

const buttonData = [
  {
    label: "Amul Canteen",
    color1: "#7f8aff",
    color2: "#a29eff",
    hoverColor1: "#6159ee",
    hoverColor2: "#847aff",
    navigateTo: "/canteen1",
  },
  {
    label: "Plant J Canteen",
    color1: "#f7a1a1",
    color2: "#edbbc0",
    hoverColor1: "#e05a5a",
    hoverColor2: "#d499c0",
    navigateTo: "/canteen2",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => setFadeIn(true), []);

  return (
    <>
      <style>{gradientAnimation}</style>
      <div
        className="container"
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          background:
            "linear-gradient(270deg, #7f8aff, #a29eff, #edd6e0, #f7a1a1)",
          backgroundSize: "800% 800%",
          animation: "gradientFlow 18s ease infinite",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
          position: "relative",
          boxSizing: "border-box",
          padding: 0,
        }}
      >
        <div
          className="card"
          style={{
            background: "rgba(255 255 255 / 0.9)",
            borderRadius: 32,
            boxShadow:
              "0 15px 35px rgba(117 89 214 / 0.15), 0 8px 24px rgba(116 79 215 / 0.07)",
            backdropFilter: "blur(20px)",
            padding: "48px 64px",
            maxWidth: 480,
            width: "100%",
            textAlign: "center",
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 0.7s",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          <FaUtensils
            className="icon"
            size={64}
            color="#6159ee"
            style={{
              marginBottom: 36,
              filter: "drop-shadow(0 0 8px #6159eeaa)",
              animation: "bounceIcon 2.5s infinite ease-in-out",
            }}
            aria-hidden="true"
          />
          <h1
            className="title"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: 36,
              marginBottom: 12,
              color: "#4b3e9a",
              letterSpacing: "0.1em",
              position: "relative",
            }}
          >
            Welcome to Campus Canteens
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: -8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 120,
                height: 4,
                background:
                  "linear-gradient(90deg, #7f8aff, #a29eff)",
                borderRadius: 3,
                boxShadow: "0 2px 8px #a29effaa",
              }}
            />
          </h1>
          <p
            className="subtitle"
            style={{
              fontSize: 18,
              marginBottom: 32,
              color: "#555",
            }}
          >
            Select your favorite canteen to explore and start your delicious
            adventure!
          </p>
          <div
            className="buttons"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              justifyContent: "center",
            }}
          >
            {buttonData.map(
              ({ label, color1, color2, hoverColor1, hoverColor2, navigateTo }) => (
                <button
                  key={label}
                  className="button"
                  aria-label={`Go to ${label}`}
                  onClick={() => navigate(navigateTo)}
                  style={{
                    flex: "1 1 140px",
                    maxWidth: 220,
                    background: `linear-gradient(90deg, ${color1}, ${color2})`,
                    color: "white",
                    fontWeight: 700,
                    fontSize: 18,
                    border: "none",
                    borderRadius: 24,
                    padding: "18px 0",
                    cursor: "pointer",
                    userSelect: "none",
                    transition: "transform 0.25s, box-shadow 0.3s, background 0.3s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(90deg, ${hoverColor1}, ${hoverColor2})`;
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `linear-gradient(90deg, ${color1}, ${color2})`;
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = "scale(0.95)";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                >
                  <FaStore size={20} />
                  {label}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
