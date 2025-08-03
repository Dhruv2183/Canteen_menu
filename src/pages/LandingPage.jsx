import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUtensils, FaStore } from 'react-icons/fa';

function LandingPage() {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const gradientAnimation = `
    @keyframes gradientFlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes bounceIcon {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      .main-card {
        padding: 2.5rem 2.5rem !important;
        max-width: 90vw !important;
        border-radius: 1.5rem !important;
      }
      .title {
        font-size: 2rem !important;
      }
      .subtitle {
        font-size: 1rem !important;
        margin-bottom: 1.8rem !important;
      }
      .buttons-container {
        flex-wrap: wrap !important;
        gap: 1rem !important;
      }
      .button {
        font-size: 1rem !important;
        padding: 0.9rem 0 !important;
        flex-basis: 48% !important;
      }
    }
    @media (max-width: 400px) {
      .button {
        flex-basis: 100% !important;
      }
    }
  `;

  const decorativeStyle = {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(70px)',
    opacity: 0.25,
    zIndex: 0,
  };

  return (
    <>
      <style>{gradientAnimation}</style>

      <div
        style={{
          height: '100vh',
          width: '100vw',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          background: 'linear-gradient(270deg, #d7eaff, #f2e9ff, #fceae8, #fff6ea)',
          backgroundSize: '800% 800%',
          animation: 'gradientFlow 30s ease infinite',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Inter', sans-serif",
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        {/* Decorative Blur Circles */}
        <div style={{ ...decorativeStyle, top: 50, left: 50, width: 180, height: 180, background: '#a2bfff' }} />
        <div style={{ ...decorativeStyle, bottom: 60, right: 70, width: 220, height: 220, background: '#ffd3e2' }} />
        <div style={{ ...decorativeStyle, top: 150, right: 200, width: 140, height: 140, background: '#ffe6aa' }} />

        {/* Main Card */}
        <div
          className="main-card"
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            borderRadius: '2rem',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(16px)',
            padding: '3.5rem 4.5rem',
            maxWidth: 520,
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: fadeIn ? 1 : 0,
            animation: fadeIn ? 'fadeIn 0.6s ease-out forwards' : 'none',
            color: '#333',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <FaUtensils
            size={56}
            color="#6c63ff"
            style={{
              marginBottom: 26,
              filter: 'drop-shadow(0 0 8px #6c63ffaa)',
              animation: 'bounceIcon 3.2s ease-in-out infinite',
            }}
            aria-hidden="true"
          />

          <h1
            className="title"
            style={{
              fontWeight: 800,
              fontSize: '2.6rem',
              marginBottom: '0.5rem',
              color: '#222',
              letterSpacing: '0.05em',
              textShadow: '0 0 4px rgba(0,0,0,0.04)',
              position: 'relative',
            }}
          >
            Welcome to Campus Canteens
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '3px',
                borderRadius: '3px',
                background: 'linear-gradient(90deg, #6c63ff, #a29bfe)',
                boxShadow: '0 1px 10px #a29bfe80',
              }}
            />
          </h1>

          <p
            className="subtitle"
            style={{
              fontSize: '1.2rem',
              color: '#555',
              marginBottom: '2.5rem',
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            Select a canteen below to explore the menu, view deals, and enjoy delicious meals!
          </p>

          <div
            className="buttons-container"
            style={{
              display: 'flex',
              gap: '1.5rem',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            {[
              {
                label: 'Amul Canteen',
                color1: '#7f8aff',
                color2: '#a29bfe',
                hoverColor1: '#6159ee',
                hoverColor2: '#8476e8',
                navigateTo: '/canteen1',
              },
              {
                label: 'Plant J Canteen',
                color1: '#f7a1a1',
                color2: '#edc4c4',
                hoverColor1: '#e45d5d',
                hoverColor2: '#d29d9d',
                navigateTo: '/canteen2',
              },
            ].map(({ label, color1, color2, hoverColor1, hoverColor2, navigateTo }) => (
              <button
                key={label}
                className="button"
                aria-label={`Go to ${label}`}
                title={`Explore ${label}`}
                style={{
                  flex: 1,
                  background: `linear-gradient(90deg, ${color1} 0%, ${color2} 100%)`,
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '1.1rem 0',
                  boxShadow: `0 6px 18px rgba(0, 0, 0, 0.08)`,
                  cursor: 'pointer',
                  outline: 'none',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => navigate(navigateTo)}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'scale(1.07)';
                  e.currentTarget.style.background = `linear-gradient(90deg, ${hoverColor1}, ${hoverColor2})`;
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = `linear-gradient(90deg, ${color1} 0%, ${color2} 100%)`;
                  e.currentTarget.style.boxShadow = `0 6px 18px rgba(0, 0, 0, 0.08)`;
                }}
                onMouseDown={e => {
                  e.currentTarget.style.transform = 'scale(0.95)';
                  e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.12)';
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = 'scale(1.07)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                }}
              >
                <FaStore size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
