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
        <div className='Timediv'>
          <div className="timer">⏱ Time: {elapsedTime}s</div>
        </div>
        <div className="sample-text">
          {sampleText.split('').map((char, i) => (
            <span key={i} className={i < typed.length ? (typed[i] === char ? 'correct' : 'incorrect') : ''}>
              {char}
            </span>
          ))}
          <div className="input-container">
            <input
              ref={inputRef}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              disabled={!isStarted}
              placeholder="Start typing here..."
            />
          </div>
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
        <div class="social-links">
          <a href="https://x.com/RohitNairP1">
            <div id="twitter" class="social-btn flex-center">
              <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg><span>@RohitNairP1</span>
            </div></a>
          <a href="https://www.linkedin.com/in/rohit-nair-p-7a535b251/">
            <div id="linkedin" class="social-btn flex-center">
              <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path></svg><span>RohitNairP</span>
            </div></a>
          <a href="https://github.com/Vegapunk-debug">
            <div id="github" class="social-btn flex-center">
              <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg><span>Vegapunk-debug</span>
            </div></a>
        </div>


      </footer>
    </div>
  );
};
export default App;
