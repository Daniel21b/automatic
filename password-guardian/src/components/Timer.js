import React, { useState, useEffect } from 'react';

function Timer({ seconds: initialSeconds, onComplete }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    // Don't start if no seconds provided
    if (!initialSeconds) return;

    // Set up the interval
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(intervalId);
          onComplete?.(); // Call onComplete if provided
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [initialSeconds, onComplete]);

  // Convert seconds to minutes and seconds for display
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="timer">
      <h3>Cooling Down</h3>
      <div className="timer-display">
        {minutes > 0 && `${minutes}m `}{remainingSeconds}s remaining
      </div>
      <div className="timer-message">
        <p>Please wait before proceeding to the next challenge...</p>
        <p>Use this time to reflect on whether you really need access.</p>
      </div>
      
      {/* Optional progress bar */}
      <div className="timer-progress">
        <div 
          className="timer-progress-bar"
          style={{
            width: `${(seconds / initialSeconds) * 100}%`,
            transition: 'width 1s linear'
          }}
        />
      </div>
    </div>
  );
}

export default Timer;