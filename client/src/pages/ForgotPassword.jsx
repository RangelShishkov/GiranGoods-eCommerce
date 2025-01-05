import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <section
      id="forgot-password"
      className="bg-gray-100 h-[calc(100vh-18rem)] flex items-center justify-center"
    >
      <div className="mx-auto container p-4">
        <div className="bg-white shadow-lg p-6 w-full max-w-md mx-auto rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
            Forgot Password
          </h2>
          <form method="POST" className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>

            {/* Reset Password Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition-all"
              >
                Reset Password
              </button>
            </div>

            {/* Redirect to Login */}
            <div className="text-center text-sm text-gray-500">
              Remembered your password?{" "}
              <Link to={"/login"} className="text-cyan-500 hover:underline">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
