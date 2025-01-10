import React, { useState } from 'react';

function PuzzleChallenge({ onComplete }) {
  const [answer, setAnswer] = useState('');
  const pattern = '1, 3, 6, 10, ?';  // Triangle numbers sequence
  const correctAnswer = '15';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer === correctAnswer) {
      onComplete();
    }
  };

  return (
    <div className="challenge">
      <h2>Pattern Recognition</h2>
      <p>What number comes next in this sequence?</p>
      <div className="pattern">
        {pattern}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter the next number"
        />
        <button type="submit">Check</button>
      </form>
    </div>
  );
}

export default PuzzleChallenge;