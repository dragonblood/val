import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';

import "./App.css";
import yey from "./kawaii-cute.gif";

function App() {
  const [message, setMessage] = useState("Will you be my Valentine?");
  const [yesSize, setYesSize] = useState(1);
  const [noMessage, setNoMessage] = useState("No");
  const [showDialog, setShowDialog] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [showButtons, setShowButtons] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [score, setScore] = useState(0);
  const noMessages = [
    "Are you sure?",
    "Really sure?",
    "Think again! 😢",
    "You are breaking my heart 😭",
    "You no love me( 💔",
    "I am sad now 😭",
    "No cookies for you 🍪",
    "No cake for you 🍰",
    "No ice cream for you 🍦",
    "No candy for you 🍬",
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNoClick = () => {
    const currentIndex = noMessages.indexOf(noMessage);
    const nextIndex =
      currentIndex + 1 < noMessages.length
        ? currentIndex + 1
        : noMessages.length - 1;
    setNoMessage(noMessages[nextIndex]);
    setYesSize(yesSize * 1.4);
    setDarkMode(true);
    document.body.classList.add("shake");
    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 500);
  };

  const handleYesClick = () => {
    setDarkMode(false);
    setShowDialog(true);
    const heartEmojis = ["❤️", "🌟", "🥳", "🤍", "✨", "🧡", "💛", "💚", "💙", "💜", "🤍", "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💌", "♥️", "🌹", "🌷", "🌸", "🏵️", "🌻", "🌼", "🍂", "🍁", "🍀", "🌾", "❄️", "🌙", "🪐", "🐢", "🐈", "🐥", "🍬", "🍭", "🍥", "🎈", "🎀", "🧶"]; 
    const heartEmojisM = ["❤️", "🌟", "🤍", "✨", "💛", "💚", "💖", "💗","💕", "💌", "🌷", "🌸", "🌻", "🍁", "🍀", "❄️", "🌙"]; 
    
    const emojisToUse = isMobile ? heartEmojisM : heartEmojis;

    const newHearts = emojisToUse.map((emoji) => ({
      emoji,
      id: Math.random(),
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 2,
      left: Math.random() * 100,
      fontSize: Math.floor(Math.random() * 50) + 10,
    }));
    setHearts(newHearts);
    setShowButtons(false);
    setMessage("YeYeYeYe! thank you");
  };

    // Dialog component (place this inside your App function)
    const Dialog = ({ onClose }) => (
      <div className="dialog-overlay">
        <div className="dialog">
          <p className="dialog-message">Click the ❤️ to increase your score!</p>
          <button className="close-button" onClick={onClose}>Okay</button>
        </div>
      </div>
    );

  // New function to handle heart click
  const handleHeartClick = (emoji, id) => {
    if (emoji === "❤️") {
      setScore((prevScore) => prevScore + 10);
    }
  };

  return (
    <>
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
    <Helmet>
        <title>Valentine's Day Special</title>
        <meta name="description" content="Will you be my Valentine? Click the ❤️ to increase your love score!" />
        <meta name="keywords" content="Valentine, Love, Emoji Game" />
        <meta property="og:title" content="Valentine's Day Special" />
    </Helmet>
      <header className="App-header">
        {!showButtons && <div className="score-display">Score: {score}</div>}
        <p className="message">{message}</p>
        {showButtons && (
          <div className="buttons">
            <button
              onClick={handleYesClick}
              className="yes-button"
              style={{ fontSize: `${yesSize}em` }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              className="no-button"
              onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              {noMessage}
            </button>
          </div>
        )}
        {!showButtons && (
          <div className="gif-container">
            <img src={yey} style={{ width: "50%", height: "50%" }} alt="Yey" />
          </div>
        )}

        {showDialog && <Dialog onClose={() => setShowDialog(false)} />}
        {hearts.map(({ emoji, id, duration, delay, left, fontSize }) => (
          <div
            key={id}
            className="heart"
            style={{
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              left: `${left}%`,
              fontSize: `${fontSize}px`,
              cursor: "pointer",
            }}
            onClick={() => handleHeartClick(emoji, id)}
          >
            {emoji}
          </div>
        ))}
      </header>
    </div>
    </>
  );
}

export default App;
