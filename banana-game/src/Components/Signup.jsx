// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Form validation
  const FormValidate = () => {
    const validationErrors = {};
    if (!username) validationErrors.username = "Username is required";
    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";
    if (!confirmPassword) validationErrors.confirmPassword = "Confirm Password is required";
    if (password !== confirmPassword) validationErrors.confirmPassword = "Passwords do not match";
    
    setErrors(validationErrors);
    return validationErrors;
  };

  // Handle form submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate form inputs
    const validationErrors = FormValidate();
    
    // Only proceed if no validation errors
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/register",
          {
            username,
            email,
            password,
            confirmPassword
          }
        );
        console.log(response); // Log the response for debugging
        toast.success("Registration successful");

        // Redirect to login page after a delay
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Delay navigation by 3 seconds
      } catch (error) {
        console.error(error.response.data.msg); // Log error to console
        toast.error(error.response.data.msg); // Show error notification
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-yellow-400 to-yellow-100 flex justify-center items-center h-screen">
      <form onSubmit={handleSignupSubmit}>
        <div className="bg-yellow-200 bg-opacity-70 p-8 rounded-lg w-[380px] shadow-lg">
          <h2 className="text-3xl font-bold text-yellow-600 text-center mb-6">Sign Up Here !!</h2>

          <ToastContainer />
          
          {/* Username Field */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 text-black rounded-lg outline-none"
          />
          {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}

          {/* Email Field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 text-black rounded-lg outline-none"
          />
          {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

          {/* Password Field with Show/Hide Icon */}
          <div className="relative mb-4">
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
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

          {/* Confirm Password Field with Show/Hide Icon */}
          <div className="relative mb-6">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 text-black rounded-lg outline-none"
            />
            <span
              className="absolute right-3 top-3 text-gray-600 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
          >
            Sign Up
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-700">Already have an account? <Link to='/login' className="text-yellow-700 hover:underline">Log in</Link></p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
