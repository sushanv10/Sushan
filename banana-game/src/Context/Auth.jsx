// import React, { useState, createContext, useContext, useEffect } from "react";
// import axios from "axios";

// // Create a new context for authentication
// const AuthContext = createContext();

// /**
//  * AuthProvider component:
//  * - This component wraps around the children components and provides authentication data (auth state) to them via the context.
//  */
// const AuthProvider = ({ children }) => {
//   // State to hold the authentication data: user info and token.
//   const [auth, setAuth] = useState({
//     user: null,  // Initially, no user is logged in
//     token: "",   // No token initially
//   });

//   // Set the Authorization header for axios with the token from the state, so all requests will automatically include it.
//   axios.defaults.headers.common["Authorization"] = `Bearer ${auth?.token}`;

//   // useEffect hook to load auth data from localStorage when the component mounts (on first render).
//   useEffect(() => {
//     const storedAuth = JSON.parse(localStorage.getItem("auth")); // Fetch 'auth' from localStorage
//     if (storedAuth) {
//       setAuth(storedAuth); // If there is auth data stored, update the auth state with it.
//     }
//     // Disable eslint warning for missing dependencies
//     // (This hook should only run once on component mount, so we don't want it to re-run)
//     //eslint-disable-next-line
//   }, []);

//   // useEffect hook to store the auth data in localStorage whenever 'auth' changes (e.g., when user logs in or out).
//   useEffect(() => {
//     localStorage.setItem("auth", JSON.stringify(auth)); // Save the current auth state to localStorage
//   }, [auth]); // Runs whenever the 'auth' state changes

//   return (
//     // Provide the 'auth' state and 'setAuth' function to all children components that use this context.
//     <AuthContext.Provider value={[auth, setAuth]}>
//       {children} {/* Render child components */}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to easily access the AuthContext
// const useAuth = () => useContext(AuthContext);

// export { useAuth, AuthProvider };
