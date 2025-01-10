import React, { useState } from 'react';
import TypingChallenge from './components/TypingChallenge';
import MathChallenge from './components/MathChallenge';
import PuzzleChallenge from './components/PuzzleChallenge';
import Timer from './components/Timer';
import './App.css';

function App() {
  const [stage, setStage] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);

  // Define the challenge stages and their configurations
  const stages = [
    {
      component: TypingChallenge,
      waitTime: 10, // Reduced for testing (original: 120)
      title: "Stage 1: Typing Challenge",
      description: "Type the text exactly as shown"
    },
    {
      component: MathChallenge,
      waitTime: 15, // Reduced for testing (original: 180)
      title: "Stage 2: Math Challenge",
      description: "Solve the mathematical problem"
    },
    {
      component: PuzzleChallenge,
      waitTime: 20, // Reduced for testing (original: 300)
      title: "Stage 3: Pattern Challenge",
      description: "Complete the pattern recognition task"
    }
  ];

  // Handle completion of a challenge
  const handleStageComplete = () => {
    setIsWaiting(true);
  };

  // Handle completion of the timer
  const handleTimerComplete = () => {
    setIsWaiting(false);
    setStage(stage + 1);
  };

  // Show final password screen if all stages are complete
  if (stage >= stages.length) {
    return (
      <div className="app">
        <div className="password-reveal">
          <h2>Access Granted</h2>
          <p>Your password is: [r85C57l9MYVj&*oD9]</p>
          <button 
            onClick={() => {
              setStage(0);
              setIsWaiting(false);
            }}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const CurrentChallenge = stages[stage].component;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Password Guardian</h1>
        <div className="stage-info">
          Stage {stage + 1} of {stages.length}
        </div>
      </header>

      <main className="app-main">
        <div className="challenge-container">
          <h2>{stages[stage].title}</h2>
          <p className="challenge-description">{stages[stage].description}</p>

          {isWaiting ? (
            <Timer 
              seconds={stages[stage].waitTime} 
              onComplete={handleTimerComplete}
            />
          ) : (
            <CurrentChallenge onComplete={handleStageComplete} />
          )}
        </div>

        <div className="progress-indicator">
          {stages.map((_, index) => (
            <div 
              key={index}
              className={`progress-dot ${index === stage ? 'active' : ''} 
                         ${index < stage ? 'completed' : ''}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;