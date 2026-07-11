import { useState } from "react";
import {Box,CssBaseline,} from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  const drawerWidth = 360;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Navbar */}
      <Navbar setMobileOpen={setMobileOpen}/>

      {/* Sidebar */}
      <Sidebar 
        mobileOpen={mobileOpen} 
        drawerWidth={drawerWidth}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content */}
      <Box sx={{mt:12}}>
        <Outlet/>
      </Box>
    </Box>
  );
}
export default AdminLayout;