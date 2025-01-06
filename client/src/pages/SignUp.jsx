import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/login')
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }

    } else {
      toast.error("Passwords doesn't match!")
    }
  };

  return (
    <section id="signup" className="bg-gray-100 h-[calc(100vh-18rem)] flex items-center justify-center">
  <div className="mx-auto container p-4">
    <div className="bg-white shadow-lg p-6 w-full max-w-md mx-auto rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Sign Up</h2>
      <form
        method="POST"
        className="space-y-4"
        onSubmit={onSubmitHandler}
      >
        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            required
            minLength="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-300 focus:outline-none"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-300 focus:outline-none"
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              required
              minLength="8" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-300 focus:outline-none"
            />
            <div
              className="absolute right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <IoMdEye />}
            </div>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
          <div className="relative flex items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={onChangeHandler}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-300 focus:outline-none"
            />
            <div
              className="absolute right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <IoMdEye />}
            </div>
          </div>
        </div>

        {/* Sign-Up Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition-all"
          >
            Sign Up
          </button>
        </div>

        {/* Redirect to Login */}
        <div className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-cyan-500 hover:underline"
          >
            Log in
          </Link>
        </div>
      </form>
    </div>
  </div>
</section>

  );
};

export default SignUp;
