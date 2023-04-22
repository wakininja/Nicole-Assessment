import React from 'react';

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = React.useState(-1);
  const [attemptsLeft, setAttemptsLeft] = React.useState(2);

  const questions = [
    {
      question: 'What is the capital of France?',
      choices: ['Paris', 'London', 'Berlin', 'Rome'],
      correctAnswerIndex: 0
    },
    {
      question: 'What is the largest planet in our solar system?',
      choices: ['Jupiter', 'Saturn', 'Mars', 'Earth'],
      correctAnswerIndex: 0
    },
    {
      question: 'What is the currency of Japan?',
      choices: ['Yen', 'Dollar', 'Euro', 'Pound'],
      correctAnswerIndex: 0
    }
  ];

  function handleAnswerSelect(selectedAnswerIndex) {
    setSelectedAnswerIndex(selectedAnswerIndex);
  }

  function handleNextClick() {
    if (selectedAnswerIndex === -1) {
      alert('Please select an answer!');
      return;
    }

    if (selectedAnswerIndex !== questions[currentQuestionIndex].correctAnswerIndex) {
      setAttemptsLeft(attemptsLeft - 1);
      if (attemptsLeft === 0) {
        alert('You have run out of attempts!');
        setCurrentQuestionIndex(0);
        setSelectedAnswerIndex(-1);
        setAttemptsLeft(2);
        return;
      }
      alert(`Incorrect answer! You have ${attemptsLeft} attempts left.`);
      return;
    }

    setSelectedAnswerIndex(-1);
    if (currentQuestionIndex === questions.length - 1) {
      alert('Congratulations! You have completed the quiz!');
      setCurrentQuestionIndex(0);
      setAttemptsLeft(2);
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handlePreviousClick() {
    if (currentQuestionIndex === 0) {
      alert('You are on the first question!');
      return;
    }

    setSelectedAnswerIndex(-1);
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }

  return (
    <div className="container">
      <h1>{questions[currentQuestionIndex].question}</h1>
      {questions[currentQuestionIndex].choices.map((choice, index) => (
        <div key={index}>
          <input type="radio" name="answer" value={choice} onChange={() => handleAnswerSelect(index)} checked={selectedAnswerIndex === index} />
          <label>{choice}</label>
        </div>
      ))}
      <div className="attempts-left">Attempts left: {attemptsLeft}</div>
      <div className="button-container">
        <button className="previous-button" disabled={currentQuestionIndex === 0} onClick={handlePreviousClick}>Previous</button>
        <button className="next-button" disabled={selectedAnswerIndex === -1} onClick={handleNextClick}>Check</button>
      </div>
    </div>
  );
}

export default Quiz;
