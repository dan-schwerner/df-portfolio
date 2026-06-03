'use client'

import { FC } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Card, CardActionArea, Chip, Stack, Typography } from "@mui/material";
import { Project } from "@/types/Types";

// Shown when a project has no image of its own, so the graphic-heavy cards
// never look empty.
const FALLBACK_IMAGE = "/blog-placeholder.svg";

// Cards never grow wider than this — so a single card (or very wide screens)
// don't produce an oversized card.
const CARD_MAX_WIDTH = 450;

type ProjectsCarouselProps = {
    projects: Project[];
};

// "Il-Proġetti Tiegħi" carousel. Each project card is a single full-bleed image
// with a dark gradient that deepens towards the bottom, where the title, tagline
// and a short description sit overlaid in white. Clickable cards (those with a
// `url`) show an always-visible "Ara l-Proġett" pill, and on hover the card lifts,
// the image zooms and the pill fills coral.
//
// A single project renders as one centred card; two-or-more use a swipeable
// carousel. Either way each card is capped at CARD_MAX_WIDTH and centred.
const ProjectsCarousel: FC<ProjectsCarouselProps> = ({ projects }) => {
    if (!projects.length) return null;

    const renderCard = (project: Project) => {
        const isLink = Boolean(project.url);
        const body = (
            <>
                {/* Full-bleed background image */}
                <Box
                    component="img"
                    className="project-img"
                    src={project.imageUrl || FALLBACK_IMAGE}
                    alt={project.title}
                    sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* Gradient: clear at the top, darkest at the bottom where the text sits. */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 22%, rgba(0,0,0,0.38) 50%, rgba(0,0,0,0) 78%)",
                    }}
                />
                {project.tags.length > 0 && (
                    <Stack
                        direction="row"
                        sx={{ position: "absolute", top: 16, left: 16, right: 16, flexWrap: "wrap", gap: 1 }}
                    >
                        {project.tags.slice(0, 3).map((tag) => (
                            <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                sx={{ bgcolor: "rgba(255,255,255,0.92)", fontWeight: 600 }}
                            />
                        ))}
                    </Stack>
                )}
                {/* Text overlaid at the bottom */}
                <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, p: { xs: 3, md: 4 } }}>
                    <Typography
                        component="h3"
                        sx={{
                            color: "#fff",
                            fontWeight: 800,
                            fontSize: { xs: "1.6rem", md: "2rem" },
                            lineHeight: 1.12,
                            textShadow: "0 2px 14px rgba(0,0,0,0.6)",
                            mb: 1,
                        }}
                    >
                        {project.title}
                    </Typography>
                    <Typography
                        sx={{
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: { xs: "1rem", md: "1.1rem" },
                            lineHeight: 1.3,
                            mb: project.description ? 1 : 0,
                        }}
                    >
                        {project.tagline}
                    </Typography>
                    {project.description && (
                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.82)",
                                fontSize: "0.9rem",
                                lineHeight: 1.55,
                                mb: 0,
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                            }}
                        >
                            {project.description}
                        </Typography>
                    )}
                    {isLink && (
                        <Box
                            className="project-cta"
                            sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 0.75,
                                mt: 2,
                                px: 1.75,
                                py: 0.75,
                                borderRadius: 999,
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "0.85rem",
                                bgcolor: "rgba(255,255,255,0.14)",
                                border: "1px solid rgba(255,255,255,0.55)",
                                transition: "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
                            }}
                        >
                            Ara l-Proġett ↗
                        </Box>
                    )}
                </Box>
            </>
        );

        return (
            <Card
                sx={{
                    position: "relative",
                    height: { xs: 440, md: 520 },
                    overflow: "hidden",
                    borderRadius: 2,
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    "& .project-img": { transition: "transform 0.4s ease" },
                    // Hover affordances only on devices that actually hover (not touch).
                    ...(isLink && {
                        "@media (hover: hover)": {
                            "&:hover": { transform: "translateY(-6px)", boxShadow: 8 },
                            "&:hover .project-img": { transform: "scale(1.06)" },
                            "&:hover .project-cta": {
                                bgcolor: "cta.main",
                                borderColor: "cta.main",
                                color: "cta.contrastText",
                            },
                        },
                    }),
                }}
            >
                {isLink ? (
                    <CardActionArea
                        component={Link}
                        href={project.url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ position: "absolute", inset: 0, height: "100%" }}
                    >
                        {body}
                    </CardActionArea>
                ) : (
                    body
                )}
            </Card>
        );
    };

    // A single project: one left-aligned card (capped width), no carousel.
    if (projects.length === 1) {
        return (
            <Box sx={{ mt: 2 }}>
                <Box sx={{ maxWidth: CARD_MAX_WIDTH }}>{renderCard(projects[0])}</Box>
            </Box>
        );
    }

    const settings = {
        dots: true,
        arrows: false,
        infinite: projects.length > 2,
        speed: 500,
        slidesToShow: Math.min(2, projects.length),
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 600, settings: { slidesToShow: 1.1, infinite: false } },
        ],
    };

    return (
        <Box
            sx={{
                mt: 2,
                // Gutters between cards + room for card shadows (mirrors BlogCarousel).
                "& .slick-list": { mx: -2, py: 1 },
                "& .slick-slide > div": { height: "100%", px: 2 },
                "& .slick-track": { display: "flex" },
                "& .slick-slide": { height: "auto" },
                "& .slick-dots": { position: "static", mt: 3 },
            }}
        >
            <Slider {...settings}>
                {projects.map((project) => (
                    <Box key={project.id} sx={{ height: "100%" }}>
                        {/* Cap each card and centre it within its slide. */}
                        <Box sx={{ maxWidth: CARD_MAX_WIDTH, mx: "auto", height: "100%" }}>
                            {renderCard(project)}
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default ProjectsCarousel;
