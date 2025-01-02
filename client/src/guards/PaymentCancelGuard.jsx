import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PaymentCancelGuard = ({ children }) => {
  const paymentAttempt =
    useSelector((state) => state.payment.attempt) ||
    localStorage.getItem("paymentAttempt") === "true";

  if (!paymentAttempt) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PaymentCancelGuard;
