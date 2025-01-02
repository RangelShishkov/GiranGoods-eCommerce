import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuard = ({ children }) => {
  const user = useSelector((state) => state?.user?.user); // Get user info from Redux store

  return user ? children : <Navigate to="/login" />;
};

export default AuthGuard;
