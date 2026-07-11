import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Category from "./Category";
import Navbar from '../../components/navbar/Navbar';

const CustomerLayout = () => {
    return (
        <>
            <Navbar />
            <Box className="home-category">
                <Category />
            </Box>
            <Outlet />
        </>
    )
}
export default CustomerLayout;