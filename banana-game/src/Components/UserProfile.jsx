import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaTrophy, FaStar, FaArrowLeft } from 'react-icons/fa'; // For icons

const Profile = () => {
  // Sample user data (you can fetch this from your API or context)
  const user = JSON.parse(localStorage.getItem("user")) || { username: 'Guest', email: 'guest@example.com' };
  const lastScore = 85; // Dummy data for last score
  const highScore = 120; // Dummy data for high score

  const navigate = useNavigate();

  // Handle back navigation
  const handleBack = () => {
    navigate('/home'); // Navigate to the home page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-300 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-lg">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition duration-300"
        >
          <FaArrowLeft className="text-2xl" />
        </button>

        {/* Profile Header */}
        <div className="flex justify-center mb-6">
          <div className="w-36 h-36 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-900 text-white flex items-center justify-center text-5xl font-bold">
            {user.username[0].toUpperCase()} {/* First letter of username */}
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4 tracking-wide">
          Welcome, {user.username}!
        </h1>
        {/* Divider */}
        <div className="border-t-2 border-gray-200 my-6"></div>
        
        {/* Email */}
        <div className="flex items-center mb-4">
          <FaEnvelope className="text-gray-600 mr-3 text-2xl" />
          <p className="text-lg font-semibold text-gray-600">Email: 
            <span className="text-gray-800 font-medium"> {user.email}</span>
          </p>
        </div>

        {/* Scores */}
        <div className="flex justify-between mb-6">
          <div className="flex items-center">
            <FaStar className="text-green-600 mr-3 text-2xl" />
            <div>
              <p className="text-lg font-medium text-gray-700">Last Score:</p>
              <p className="text-2xl font-semibold text-green-600">{lastScore}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaTrophy className="text-red-600 mr-3 text-2xl" />
            <div>
              <p className="text-lg font-medium text-gray-700">High Score:</p>
              <p className="text-2xl font-semibold text-red-600">{highScore}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
