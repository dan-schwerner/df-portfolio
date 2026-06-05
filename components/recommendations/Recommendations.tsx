import { Recommendation } from "@/types/Types"
import { Button, Container, Link, Typography } from "@mui/material"
import { FC } from "react";
import { useTranslations } from "next-intl";
import RecommendationSlider from "../recommendation-slider/RecommendationSlider";

type RecommendationsProps = {
    recommendations: Recommendation[];
}

const Recommendations: FC<RecommendationsProps> = ({recommendations}) => {
    const t = useTranslations('recommendations');
    return(
        <>
            <Typography
                variant="h2"
                id='recommendations'
            >
                {t('heading')}
            </Typography>
            <RecommendationSlider texts={recommendations.map((r) => r.text)} />
        </>
    )
}

export default Recommendations;