import React, { useState, useEffect } from 'react';
import './TypingChallenge.css';

function TypingChallenge({ onComplete }) {
  const [input, setInput] = useState('');
  const [errors, setErrors] = useState([]);
  const [showError, setShowError] = useState(false);

  const text = "I acknowledge that I'm making this request thoughtfully and not impulsively.";
  
  // Calculate accuracy percentage
  const calculateAccuracy = () => {
    if (input.length === 0) return 0;
    const correctChars = input.split('').filter((char, i) => char === text[i]).length;
    return Math.floor((correctChars / input.length) * 100);
  };

  // Check for errors in real-time
  useEffect(() => {
    const newErrors = [];
    input.split('').forEach((char, index) => {
      if (char !== text[index]) {
        newErrors.push(index);
      }
    });
    setErrors(newErrors);
    setShowError(newErrors.length > 0);
  }, [input]);

  const handleInput = (e) => {
    const newValue = e.target.value;
    setInput(newValue);

    // Check if the entire text matches
    if (newValue === text) {
      setTimeout(() => onComplete(), 500); // Small delay for feedback
    }
  };

  // Split text into characters for highlighting
  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = '';
      if (index < input.length) {
        className = input[index] === char ? 'correct' : 'incorrect';
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="typing-challenge">
      <div className="sample-text">
        <p>Please type the following text:</p>
        <div className="text-display">{renderText()}</div>
      </div>

      <div className="input-container">
        <textarea
          value={input}
          onChange={handleInput}
          placeholder="Start typing here..."
          className={showError ? 'has-error' : ''}
          rows={3}
        />
      </div>

      <div className="typing-stats">
        <div className="stat">
          <span>Progress:</span>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(input.length / text.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="stat">
          <span>Accuracy:</span>
          <span>{calculateAccuracy()}%</span>
        </div>
        <div className="stat">
          <span>Characters:</span>
          <span>{input.length}/{text.length}</span>
        </div>
      </div>

      {showError && (
        <div className="error-message">
          Please correct the errors to proceed
        </div>
      )}
    </div>
  );
}

export default TypingChallenge;