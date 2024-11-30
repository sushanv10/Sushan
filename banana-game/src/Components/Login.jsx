import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Form validation
  const validate = () => {
    const validationErrors = {};
    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });
      const { token, userDetails } = response.data;
      
      // Store token and user data in local storage
     
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userDetails));

      toast.success("Login successful!");
      setTimeout(() => {
          navigate("/home");
        }, 2000); // Navigate to home or dashboard after successful login
    } catch (error) {
      const msg = error.response && error.response.data ? error.response.data.msg : "Login failed";
      toast.error(msg);
    }
  };

  return (
    <div className="bg-gradient-to-b from-yellow-400 to-yellow-100 flex justify-center items-center h-screen ">
      <form onSubmit={handleLoginSubmit} className="bg-yellow-200 bg-opacity-90 p-8 rounded-lg w-[380px] shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-600 text-center mb-6">Login Here !!</h2>
        
        <ToastContainer />
        
        {/* Email Field */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-1 text-black rounded-lg outline-none"
          />
          {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
        </div>

        {/* Password Field */}
        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 text-black rounded-lg outline-none"
          />
          <span
            className="absolute right-3 top-3 text-gray-600 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash /> }
          </span>
          {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
        >
          Login
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-700">Don't have an account? 
            <Link to='/register' className="text-yellow-700 hover:underline">Sign up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
