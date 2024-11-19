import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Game = () => {
  const [question, setQuestion] = useState(null); // Store the question data
  const [answer, setAnswer] = useState('');       // Store the user's answer
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch the question from the API
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get('https://marcconrad.com/uob/banana/api.php');
        setQuestion(response.data); // Save question data to state
        setIsLoading(false);         // Turn off loading state
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, []);

  // Handle answer submission
  const handleSubmit = () => {
    if (parseInt(answer) === question.solution) {
      alert("Correct!");
    } else {
      alert("Incorrect. Try again!");
    }
    setAnswer(''); // Clear the answer field
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-yellow-400 to-yellow-100 text-yellow-800">
        <p className="text-xl font-bold animate-pulse">Loading question...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-yellow-400 to-yellow-100">
      <h1 className="text-4xl font-extrabold text-yellow-800 mb-6 shadow-lg bg-white/50 p-4 rounded-lg">
        🍌 Banana Game
      </h1>

      {/* Display question image outside the main card */}
      {question && (
        <img 
          src={question.question} 
          alt="Question" 
          className="w-[500px] h-[500px]  rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 ease-in-out mb-6"
        />
      )}

      {/* Main content container */}
      {question && (
        <div className="bg-yellow bg-opacity-50 p-8 rounded-xl shadow-2xl text-center ">
          <p className="text-xl mb-4 font-semibold text-gray-800">What's the answer?</p>
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 mb-6 w-full text-center text-lg shadow-md focus:outline-none focus:border-yellow-500"
            placeholder="Your answer here..."
          />
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
          >
            Submit Answer
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
