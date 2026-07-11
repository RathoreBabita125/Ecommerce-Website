import { Box, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SliderImage1 from '../../assets/slider2.png'
import SliderImage2 from '../../assets/slider3.png'

const images = [
    SliderImage1,
    SliderImage2
];

const SliderSection = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const preSlide = () => {
        if(index!=0){
            setIndex((prev) => (prev - 1) % images.length);
        }
    };

    return (
        <Box className="home-slider">
            <Stack direction={'row'} sx={{alignItems:"center", justifyContent:'center'}}>
                <IconButton onClick={preSlide} className="slider-arrow-icon">
                    <ArrowBackIosIcon className="arrow"/>
                </IconButton>
                <Box>
                    <img src={images[index]} className="home-slider-images left-arrow" />
                </Box>
                <IconButton onClick={nextSlide} className="slider-arrow-icon right-arrow">
                    <ArrowForwardIosIcon className="arrow"/>
                </IconButton>
            </Stack>
        </Box>
    );
}
export default SliderSection;