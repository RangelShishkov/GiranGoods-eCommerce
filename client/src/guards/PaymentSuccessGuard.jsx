import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PaymentSuccessGuard = ({ children }) => {
  const paymentSuccess =
    useSelector((state) => state.payment.success) ||
    localStorage.getItem("paymentSuccess") === "true";

  if (paymentSuccess === false) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PaymentSuccessGuard;
