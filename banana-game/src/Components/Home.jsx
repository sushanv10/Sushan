import React from 'react';
import { FaUser, FaGamepad, FaTrophy, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import BananaImage from '../assets/Images/BananaImage.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex justify-center items-center bg-gradient-to-b from-yellow-400 to-yellow-100 h-screen'>
      <div className="absolute top-20 left-0 right-0 flex justify-center items-center">
        <h1 className='text-3xl font-bold text-yellow-50'>Welcome to Banana Game</h1>
        <img src={BananaImage} alt="Banana" className='w-12 h-12 p-2'></img>
      </div>

      <div className="relative bg-yellow-200 bg-opacity-50 h-[370px] w-[400px] mt-16 rounded-[10px] shadow-lg flex flex-col items-center p-8 space-y-6">
        <button className="flex items-center justify-center w-full bg-yellow-500 text-white mt-5 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300">
          <FaUser className="mr-2" /> Profile
        </button>

        <Link to="/game"><button className="flex items-center justify-center w-[340px] bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300">
          <FaGamepad className="mr-2" /> Start Game 
        </button></Link>

        <button className="flex items-center justify-center w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300">
          <FaTrophy className="mr-2" /> Leaderboard
        </button>

        <button className="flex items-center justify-center w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
