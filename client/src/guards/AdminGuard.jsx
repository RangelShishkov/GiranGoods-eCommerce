import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ROLE from "../common/role";

const AdminGuard = ({ children }) => {
  const user = useSelector((state) => state?.user?.user); // Get user info from Redux store

  return user?.role === ROLE.ADMIN ? children : <Navigate to="/" />;
};

export default AdminGuard;
