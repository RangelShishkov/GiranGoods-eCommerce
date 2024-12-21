import React from 'react'
import cancelAnim from "../assets/cancel.gif"
import { Link } from "react-router-dom";


const Cancel = () => {
    return (
        <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded">
          <img src={cancelAnim} alt="success animation" width={150}  />
          <p className="text-red-600 font-bold text-xl">Payment Cancelled</p>
          <Link to={"/order"} className="p-2 px-3 mt-4 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white">
            View Cart
          </Link>
        </div>
      );
}

export default Cancel