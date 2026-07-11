import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Home from "../pages/customer/Home";
import AdminHome from "../pages/admin/AdminHome";

const RoleBasedDashboard=()=> {
  const {authUser} = useContext(AuthContext);
  
  switch (authUser?.role) {
    case 'Admin':
      return <AdminHome/>;
    case 'Customer':
      return <Home />;
    default:
      return <Navigate to="/signin" />;
  }
}
export default RoleBasedDashboard;