import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle, registerWithEmailPassword, loginWithEmailPassword } from "../../Admin/firebase/setup.js";

const LoginModal = ({ reset }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(); // Wait for signInWithGoogle to complete
      reset()
    } catch (error) {
      setError("Failed to sign in with Google");
    }
  };

  const handleLogin = async () => {
    try {
      await loginWithEmailPassword(email, password);
      reset()
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const handleRegister = async () => {
    try {
      await registerWithEmailPassword(email, password);
      reset()
    } catch (error) {
      setError("Failed to register");
    }
  };

  return (
    <div
      id="login-popup"
      tabIndex="-1"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Close Button */}
          <button
            type="button"
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={reset}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Close popup</span>
          </button>

          {/* Modal Content */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome Back</h2>

            {/* Google Sign-In Button */}
            <button
              onClick={handleGoogleSignIn} // Use the corrected handler
              className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 48 48">
                <path
                  fill="#fff"
                  d="M24 4a20 20 0 0 1 14.14 5.86l-6.14 6.14a10 10 0 1 0 2.95 10.47H24v-8h20v4A20 20 0 1 1 24 4z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Email & Password Form */}
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p className="text-red-500">{error}</p>}
              <button
                onClick={handleLogin}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Login
              </button>
              {/* <button
                onClick={handleRegister}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Register
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;