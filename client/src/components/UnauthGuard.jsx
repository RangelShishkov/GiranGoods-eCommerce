import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UnauthGuard = ({ children }) => {
  const user = useSelector((state) => state?.user?.user); // Get user from Redux state
    
  // Redirect logged-in users to the home page
  return user ? <Navigate to="/" /> : children;
};

export default UnauthGuard;