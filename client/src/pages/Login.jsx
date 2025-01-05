import { useContext, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

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
    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section id="login" className="bg-gray-100 flex h-[calc(100vh-18rem)] items-center justify-center">
  <div className="mx-auto container p-4">
    <div className="bg-white shadow-lg p-6 w-full max-w-md mx-auto rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Login</h2>
      <form
        action=""
        className="space-y-4"
        onSubmit={onSubmitHandler}
      >
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
            <div
              className="absolute right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <IoMdEye />}
            </div>
          </div>
        </div>

        {/* Login Button */}
        <div>
          <button
            className="w-full bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition-all"
          >
            Login
          </button>
        </div>

        {/* Links */}
        <div className="flex justify-between text-sm text-gray-500">
          <Link
            to={"/sign-up"}
            className="hover:text-cyan-500"
          >
            Don&apos;t have an account yet?
          </Link>
          <Link
            to={"/forgot-password"}
            className="hover:text-cyan-500"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  </div>
</section>

  );
};

export default Login;
