import { Recommendation } from "@/types/Types"
import { Button, Container, Link, Typography } from "@mui/material"
import { FC } from "react";
import RecommendationSlider from "../recommendation-slider/RecommendationSlider";

type RecommendationsProps = {
    recommendations: Recommendation[];
}

const Recommendations: FC<RecommendationsProps> = ({recommendations}) => {
    return(
        <>
            <Typography
                variant="h2"
                id='recommendations'
            >
                {"X'Jgħidu n-Nies"}
            </Typography>
            <RecommendationSlider texts={recommendations.map((r) => r.text)} />
        </>
    )
}

export default Recommendations;