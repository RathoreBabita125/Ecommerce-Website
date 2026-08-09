import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom"
import LoadingCompo from "../common/LoadingCompo";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { authUser, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingCompo />
  }

  console.log("user auth : ", authUser);

  if (!authUser?.role) {
    return <Navigate to="/signin" replace />;
  }
  else if (allowedRoles && !allowedRoles.includes(authUser?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};
export default ProtectedRoute; 