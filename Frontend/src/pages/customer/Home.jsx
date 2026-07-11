import { Box } from "@mui/material";
import Banner from '../../assets/banner.png';
import './Home.css';
import SliderSection from "./Slider";
import ProductListing from "./ProductListing";

const Home = () => {
    return (
        <Box>
            <Box className="home-banner">
                <Box>
                    <img src={Banner} alt="banner" />
                    <SliderSection />
                </Box>
            </Box>
            <ProductListing />
        </Box>
    )
}
export default Home;