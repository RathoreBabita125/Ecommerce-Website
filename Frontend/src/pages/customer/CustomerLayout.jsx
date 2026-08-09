import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Category from "./Category";
import Navbar from '../../components/navbar/Navbar';

const CustomerLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <>
            <Navbar />
            {isHomePage && (
                <Box className="home-category">
                    <Category />
                </Box>
            )}
            <Outlet />
        </>
    )
}
export default CustomerLayout;