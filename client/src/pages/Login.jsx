import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  console.log("login data:", data);

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-2 w-full max-w-md mx-auto rounded">
          <form action="" className="p-3 flex flex-col gap-3" onSubmit={onSubmitHandler}>
            <div className="grid">
              <label htmlFor="email">Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="enter email.."
                  name="email"
                  value={data.email}
                  onChange={onChangeHandler}
                  required
                  className="w-full h-full outline-none bg-transparent "
                />
              </div>
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password.."
                  name="password"
                  value={data.password}
                  onChange={onChangeHandler}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <IoMdEye />}</span>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <button className="text-white bg-cyan-300 w-full px-5 py-2 max-w-[100px] rounded-full hover:scale-110 hover:bg-cyan-400 transition-all mx-auto block">
                Login
              </button>
            </div>

            <div className="flex pt-4 pb-2">
              <Link
                to={"/sign-up"}
                className="block w-fit mr-auto text-sm hover:underline hover:text-cyan-400"
              >
                Don&apos;t have an account yet?
              </Link>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto text-sm hover:underline hover:text-cyan-400"
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
