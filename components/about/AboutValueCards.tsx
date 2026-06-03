'use client'

import { useState } from "react";
import { Box, Card, CardActionArea, Collapse, Stack, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { BlogValues } from "@/app/sanity/queries";
import { valueIconFor } from "../values/valueIcons";

type AboutValueCardsProps = {
    values: BlogValues;
};

// A distinct accent colour per value icon, cycled by position.
const VALUE_COLORS = ["#4961b0", "#2a9d8f", "#e9a23b", "#d1495b"];

// "My values" rendered as compact, clickable cards. By default each card shows
// only its icon + title (keeping the column short); clicking a card expands it
// to reveal the description. Accordion-style — opening one closes the others —
// so the list stays tidy.
const AboutValueCards = ({ values }: AboutValueCardsProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <Box>
            <Typography
                sx={{
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "text.secondary",
                    mb: 2,
                }}
            >
                {values.title}
            </Typography>
            <Stack spacing={1.5}>
                {values.values.map((value, index) => {
                    const Icon = valueIconFor(value.icon);
                    const open = openIndex === index;
                    return (
                        <Card key={index} variant="outlined" sx={{ borderRadius: 2 }}>
                            <CardActionArea
                                onClick={() => setOpenIndex(open ? null : index)}
                                aria-expanded={open}
                            >
                                <Box sx={{ display: "flex", gap: 2, alignItems: "center", px: { xs: 2, md: 2.5 }, py: 1.75 }}>
                                    <Icon
                                        sx={{
                                            fontSize: "1.5rem",
                                            color: VALUE_COLORS[index % VALUE_COLORS.length],
                                            flexShrink: 0,
                                        }}
                                    />
                                    <Typography component="h3" sx={{ fontSize: "1.05rem", fontWeight: 700, flex: 1, mb: 0 }}>
                                        {value.title}
                                    </Typography>
                                    <ExpandMore
                                        sx={{
                                            color: "text.secondary",
                                            flexShrink: 0,
                                            transform: open ? "rotate(180deg)" : "none",
                                            transition: "transform 0.2s",
                                        }}
                                    />
                                </Box>
                                <Collapse in={open} unmountOnExit>
                                    <Box sx={{ px: { xs: 2, md: 2.5 }, pb: 2, pt: 0 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0 }}>
                                            {value.text}
                                        </Typography>
                                    </Box>
                                </Collapse>
                            </CardActionArea>
                        </Card>
                    );
                })}
            </Stack>
        </Box>
    );
};

export default AboutValueCards;
