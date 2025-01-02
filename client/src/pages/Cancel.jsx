import React, { useEffect } from "react";
import cancelAnim from "../assets/cancel.gif";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearPaymentAttempt,  } from "../store/paymentSlice";

const Cancel = () => {
  const dispatch = useDispatch();
  
    useEffect(() => {
      // Clear payment state on mount
      dispatch(clearPaymentAttempt());
    }, [dispatch]);



  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded">
      <img src={cancelAnim} alt="success animation" width={150} />
      <p  className="text-red-600 font-bold text-xl">Payment Cancelled</p>
      <div className="flex gap-2">
      <Link
        to={"/"}
        className="p-2 px-3 mt-4 border-2 border-red-600 rounded font-semibold hover:text-red-600 hover:bg-slate-200 bg-red-600 text-white"
      >
        Back Home
      </Link>
      <Link
        to={"/order"}
        className="p-2 px-3 mt-4 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white"
      >
        View Cart
      </Link>

      </div>
    </div>
  );
};

export default Cancel;
