import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRedo } from 'react-icons/fa';

const Game = () => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isDisabled, setIsDisabled] = useState(false);
  const [score, setScore] = useState(0);
 

  const fetchQuestion = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://marcconrad.com/uob/banana/api.php');
      setQuestion(response.data);
      setTimeLeft(30);
      setAnswer('');
      setIsDisabled(false); // Enable the input and button again
    } catch (error) {
      toast.error('Error fetching question! Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      toast.warn("Time's up! Please try again.");
      setAnswer('');
      setIsDisabled(true);  // Disable input and submit button when time's up
      setTimeout(() => {
        fetchQuestion();  // Reload the game after a short delay
      }, 1500);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

 const handleSubmit = async () => {
  if (parseInt(answer) === question.solution) {
    toast.success('Correct!');
    const newScore = score + 1; // Calculate updated score

    setScore(newScore); // Update the state with the new score

    // Assuming you have a token stored in localStorage or context
    const token = localStorage.getItem('token'); // Or get it from context
    const user = JSON.parse(localStorage.getItem('user')); 
    const userId = user ? user._id : null; 

      console.log('Token:', token);
      console.log('UserId:', userId);

        // Ensure userId and token are available
    if (!userId || !token) {
      toast.error('User not authenticated. Please log in.');
      return; // Early return if no userId or token
    }
    // Send the updated score to the backend with the authorization token
    try {
      await axios.post('http://localhost:3000/api/score', {
        userId,
        score: newScore, // Send the updated score
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in the headers
        }
      });
    } catch (error) {
      toast.error('Error saving score! Please try again.');
    }

    setTimeout(() => {
      fetchQuestion(); // Reload the game after a short delay
    }, 1500);
  } else {
    toast.error('Incorrect. Try again!');
  }
  setAnswer(''); // Clear the answer field
};


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-yellow-400 to-yellow-100 text-yellow-800">
        <p className="text-2xl font-bold animate-pulse">Loading question...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between h-full bg-gradient-to-b from-yellow-400 to-yellow-100 p-6">
      <ToastContainer /> {/* Toast notification container */}
      <h1 className="text-2xl font-extrabold text-yellow-800 mb-8 shadow-lg bg-white/50 p-6 rounded-lg text-center">
        🍌 Banana Game
      </h1>

      {/* Score display */}
      <p className="text-xl font-bold text-yellow-800 mb-6">Score: {score}</p>

      <button
        onClick={fetchQuestion}
        className="absolute top-6 right-6 bg-yellow-500 text-white text-lg p-3 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-110 flex items-center"
        title="Reload Game"
      >
        <FaRedo size={24} />
      </button>

      <div className="flex flex-col justify-between items-center flex-grow">
        {question && (
          <img
            src={question.question}
            alt="Question"
            className="w-[350px] h-[250px] rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 ease-in-out mb-8"
          />
        )}

        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-[400px] text-center">
          <p className="text-2xl mb-4 font-semibold text-gray-800">
            Time Remaining: <span className="text-red-500 font-bold">{timeLeft} seconds</span>
          </p>

          <p className="text-xl mb-4 font-semibold text-gray-800">What's the answer?</p>
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border border-gray-300 rounded-lg px-6 py-3 mb-8 w-full text-center text-lg shadow-md focus:outline-none focus:border-yellow-500"
            placeholder="Your answer here..."
            disabled={isDisabled}  // Disable input when time is up
          />
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-110"
            disabled={isDisabled}  // Disable button when time is up
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
