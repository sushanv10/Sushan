import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Game from './Game/BananaGamePage';
import Leaderboard from './Components/UserProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/profile" element={<Leaderboard />} />

      </Routes>
    </Router>
  );
}

export default App;
