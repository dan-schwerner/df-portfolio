'use client'

import { ExperienceItem } from "@/types/Types";
import { Box, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import ExperienceListItemsMobile from "../experience-list-items-mobile/ExperienceListItemsMobile";
import ExperienceListItemsDesktop from "../experience-list-items-desktop/ExperienceListItemsDesktop";

type ExperienceListProps = {
    experienceItems: ExperienceItem[]
}

const ExperienceList: FC<ExperienceListProps> = ({experienceItems}) => {
    
    const theme = useTheme();

    const primaryColor = theme.palette.primary.main;

    return(
        <>
            <Typography variant="h2" id='experience'>
                Esperjenza
            </Typography>
            <Box
                sx={{
                    borderLeft: '3px solid',   // Define the width of the left border
                    borderImage: `linear-gradient(to bottom, ${primaryColor}, black) 1`, // Apply a gradient to the left border
                }}
            >
                <Box
                    sx={{
                        display: {md: 'none'}
                    }}
                >
                    <ExperienceListItemsMobile experienceItems={experienceItems} />
                </Box>
                <Box
                    sx={{
                        display: {xs: 'none', md: 'block'}
                    }}
                >
                    <ExperienceListItemsDesktop experienceItems={experienceItems} />
                </Box>
            </Box>
        </>
    )
}

export default ExperienceList;