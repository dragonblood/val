import React, { useState, useEffect } from 'react';
import './App.css';
import yey from './kawaii-cute.gif';

function App() {
  const [message, setMessage] = useState('Will you be my Valentine?');
  const [yesSize, setYesSize] = useState(1);
  const [noMessage, setNoMessage] = useState('No');
  const [hearts, setHearts] = useState([]);
  const [showButtons, setShowButtons] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // New state for dark mode
  const noMessages = ['Are you sure?', 'Really sure?', 'Think again! 😢', 'You are breaking my heart 😭', 'You no love me( 💔', 'I am sad now 😭', 'No cookies for you 🍪', 'No cake for you 🍰', 'No ice cream for you 🍦', 'No candy for you 🍬'];

    // State to determine if the user is on a mobile device
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Effect hook to listen for window resize events
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Cleanup function to remove the event listener
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
  const handleNoClick = () => {
    const currentIndex = noMessages.indexOf(noMessage);
    const nextIndex = currentIndex + 1 < noMessages.length ? currentIndex + 1 : noMessages.length - 1;
    setNoMessage(noMessages[nextIndex]);
    setYesSize(yesSize + 0.5);
    setDarkMode(true); // Enable dark mode
    document.body.classList.add('shake'); // Add shake class to body
    setTimeout(() => {
      document.body.classList.remove('shake'); // Remove shake class after animation
    }, 500); // Adjust duration to match the CSS animation
  };

  const handleYesClick = () => {
    setDarkMode(false);
    const heartEmojis = ["❤️", "🌟", "🥳", "🤍", "✨", "🧡", "💛", "💚", "💙", "💜", "🤍", "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💌", "♥️", "🌹", "🌷", "🌸", "🏵️", "🌻", "🌼", "🍂", "🍁", "🍀", "🌾", "❄️", "🌙", "🪐", "🐢", "🐈", "🐥", "🍬", "🍭", "🍥", "🎈", "🎀", "🧶"]; 
    const heartEmojisM = ["❤️", "🌟", "🤍", "✨", "💛", "💚", "🤍", "💝", "💖", "💗","💕", "💌", "🌷", "🌸", "🌻", "🌼", "🍁", "🍀", "❄️", "🌙"]; 
    
    const emojisToUse = isMobile ? heartEmojisM : heartEmojis;

    const newHearts = emojisToUse.map(emoji => ({
      emoji,
      id: Math.random(),
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 2,
      left: Math.random() * 100,
      fontSize: Math.floor(Math.random() * 50) + 10 
    }));
    setHearts(newHearts);
    setShowButtons(false);
    setMessage('Yeyeyey thank you'); 
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className="App-header">
        <p className='message'>{message}</p>
        {showButtons && (
          <div className="buttons">
            <button onClick={handleYesClick} style={{ fontSize: `${yesSize}em`, padding: '10px 20px', backgroundColor: '#d08e6d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>Yes</button>
            <button onClick={handleNoClick} style={{ padding: '10px 20px', backgroundColor: '#B34934', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>{noMessage}</button>
          </div>
        )}
        {!showButtons && (
  <div className="gif-container">
    <img src={yey} alt="Celebration GIF" />
  </div>
)}

        {hearts.map(({ emoji, id, duration, delay, left, fontSize}) => (
          <div
            key={id}
            className="heart"
            style={{
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              left: `${left}%`,
              fontSize: `${fontSize}px`
            }}
          >
            {emoji}
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
