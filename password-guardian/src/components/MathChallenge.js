import React, { useState } from 'react';

function MathChallenge({ onComplete }) {
  const [answer, setAnswer] = useState('');
  const [problem] = useState(() => {
    const num1 = Math.floor(Math.random() * 50) + 50;
    const num2 = Math.floor(Math.random() * 50) + 50;
    return { num1, num2, solution: num1 * num2 };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(answer) === problem.solution) {
      onComplete();
    }
  };

  return (
    <div className="challenge">
      <h2>Math Challenge</h2>
      <p>Solve this multiplication problem:</p>
      <div className="problem">
        {problem.num1} × {problem.num2} = ?
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer"
        />
        <button type="submit">Check</button>
      </form>
    </div>
  );
}

export default MathChallenge; 