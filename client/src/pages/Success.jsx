import React from "react";
import successAnim from "../assets/success.gif";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded">
      <img src={successAnim} alt="success animation" width={150} height={150} />
      <p className="text-green-600 font-bold text-xl">Payment Successful</p>
      <Link to={"/order"} className="p-2 px-3 mt-4 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white">
        Order details
      </Link>
    </div>
  );
};

export default Success;
