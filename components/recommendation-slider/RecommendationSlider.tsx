"use client"

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, useTheme } from "@mui/material";
import { FC } from "react";

type RecommendationSliderProps = {
    texts: string[]
}

const RecommendationSlider: FC<RecommendationSliderProps> = ({texts}) => {
    const settings = {
        arrows: false,
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false
    }

    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
    
    return(
        <Box
            sx={{
                padding:{xs: '2rem 1rem', md: '3rem 4rem'},
                border: '2px solid',
                borderImage: `linear-gradient(to bottom, ${primaryColor}, black) 1`
            }}
        >
            <Slider {...settings}>
                {texts.map((text, index) => (
                    <Typography
                        key={`recom-slide-${index}`}
                        variant="body1"
                        sx={{
                            textAlign: 'left',
                            padding: {md: '2rem 0px'},
                            fontSize: { xs: '1.15rem', md: '1.35rem' },
                            lineHeight: 1.7
                        }}
                    >
                        {text}
                    </Typography>
                ))}
            </Slider>
        </Box>
    )
}

export default RecommendationSlider;