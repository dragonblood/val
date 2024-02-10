import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Will you be my Valentine?');
  const [yesSize, setYesSize] = useState(1);
  const [noMessage, setNoMessage] = useState('Are you sure?');
  const [hearts, setHearts] = useState([]);
  const noMessages = ['Really sure?', 'Think again!', 'Are you 100% sure?', '😢', '😭'];

  const handleNoClick = () => {
    const currentIndex = noMessages.indexOf(noMessage);
    const nextIndex = currentIndex + 1 < noMessages.length ? currentIndex + 1 : noMessages.length - 1;
    setNoMessage(noMessages[nextIndex]);
    setYesSize(yesSize + 0.2);
  };

  const handleYesClick = () => {
     const heartEmojis = ["❤️", "🌟", "🥳", "🤍", "✨", "🧡", "💛", "💚", "💙", "💜", "🤍", "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💌", "♥️", "🌹", "🌷", "🌸", "🏵️", "🌻", "🌼", "🍂", "🍁", "🍀", "🌾", "❄️", "🌙", "🪐", "🐢", "🐈", "🐥", "🍬", "🍭", "🍥", "🎈", "🎀", "🧶"]; 
    const newHearts = heartEmojis.map(emoji => ({
      emoji,
      id: Math.random(),
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 2,
      left: Math.random() * 100,
      fontSize: Math.floor(Math.random() * 70) + 10 
    }));
    setHearts(newHearts);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
        <button onClick={handleYesClick} style={{ fontSize: `${yesSize}em` }}>Yes</button>
        <button onClick={handleNoClick}>{noMessage}</button>
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
