import { Box } from "@mui/material";
import Banner from '../../assets/banner.png';
import './Home.css';
import SliderSection from "./Slider";
import ProductListing from "./ProductListing";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const Home = () => {

     const [searchParams] = useSearchParams();
    const productListingRef = useRef(null);

    const category = searchParams.get("category");
    const search = searchParams.get("search");

    useEffect(() => {
        if (category || search) {
            productListingRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [category, search]);

    return (
        <Box>
            <Box className="home-banner">
                <Box>
                    <img src={Banner} alt="banner" />
                    <SliderSection />
                </Box>
            </Box>
             <Box ref={productListingRef}>
                <ProductListing />
            </Box>
        </Box>
    )
}
export default Home;