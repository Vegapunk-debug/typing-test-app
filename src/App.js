import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "React makes it painless to create interactive UIs.",
  "Typing speed tests help improve accuracy and speed.",
  "JavaScript is a versatile and powerful programming language.",
  "Practice daily to become a better programmer."
];

const App = () => {
  const [sampleText, setSampleText] = useState('');
  const [typed, setTyped] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [results, setResults] = useState(null);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isStarted && startTime) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isStarted, startTime]);

  const startTest = () => {
    setSampleText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
    setTyped('');
    setIsStarted(true);
    setStartTime(Date.now());
    setResults(null);
    setMessage('');
    setElapsedTime(0);
    inputRef.current.focus();
  };

  const endTest = () => {
    const time = (Date.now() - startTime) / 1000;
    const correctChars = [...typed].filter((c, i) => c === sampleText[i]).length;
    const wpm = Math.round((typed.trim().split(' ').length / time) * 60);
    const accuracy = Math.round((correctChars / sampleText.length) * 100);
    setResults({ wpm, accuracy, time });
    setIsStarted(false);

    if (accuracy === 100 && typed.trim() === sampleText.trim()) {
      setMessage('🎉 Congratulations! Perfect typing!');
    } else {
      setMessage('❌ Oops! Try again. Keep practicing!');
    }
  };

  const resetTest = () => {
    setTyped('');
    setIsStarted(false);
    setResults(null);
    setElapsedTime(0);
    setMessage('');
  };

  return (
    <div className="container">
      <header className="header">
        <h1><button class="button" data-text="Awesome">
          <span class="actual-text">&nbsp;TypeAce&nbsp;</span>
          <span aria-hidden="true" class="hover-text">&nbsp;TypeAce&nbsp;</span>
        </button></h1>
        <p className="subtitle">Test your typing speed and accuracy</p>
        <p className="subtitle">Click the Start button </p>
      </header>

      <main className="main-content">
        <div className="sample-text">
          {sampleText.split('').map((char, i) => (
            <span key={i} className={i < typed.length ? (typed[i] === char ? 'correct' : 'incorrect') : ''}>
              {char}
            </span>
          ))}
        </div>

        <div className="typing-area">
          <textarea
            ref={inputRef}
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            disabled={!isStarted}
            placeholder="Start typing here..."
          />
          <div className="timer">⏱ Time: {elapsedTime}s</div>
        </div>

        <div className="controls">
          <button className="start" onClick={startTest} disabled={isStarted}><span>Start</span></button>
          <button className="end" onClick={endTest} disabled={!isStarted}><span>End</span></button>
          <button className="reset" onClick={resetTest}><span>Reset</span></button>
        </div>

        {results && (
          <div className="results-area">
            <div className="results">
              <div>📝 WPM: {results.wpm}</div>
              <div>🎯 Accuracy: {results.accuracy}%</div>
              <div>⏰ Time: {results.time}s</div>
              {message && <div className={`congrats ${message.includes("Oops") ? "fail" : "success"}`}>{message}</div>}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2025 TypeAce. All rights reserved. Built by Rohit Nair P</p>
        <div className="footer-links">
          <a href="https://github.com/Vegapunk-debug" target="_blank" rel="noopener noreferrer">GitHub</a> |
          <a href="https://www.linkedin.com/in/rohit-nair-p-7a535b251/" target="_blank" rel="noopener noreferrer">
            <button class="Btn">
              <div class="sign">
                <svg
                  fill="white"
                  class="svgIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.6em"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"
                  ></path>
                </svg>
              </div>

              <div class="text">Linkedln</div>
            </button>
          </a> |
          <a href="mailto:you@example.com">Contact</a>
        </div>
      </footer>
    </div>
  );
};
export default App;
