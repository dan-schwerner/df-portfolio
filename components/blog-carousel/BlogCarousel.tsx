'use client'

import { FC } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { BlogPost } from "@/types/Types";
import { getDayDifferenceText } from "@/app/utils";

type BlogCarouselProps = {
    posts: BlogPost[];
};

// Generic image shown when a post has no image of its own, so cards never look empty.
const FALLBACK_IMAGE = "/blog-placeholder.svg";

// Carousel of the latest blog posts for the home page. Two cards on desktop,
// one-and-a-half on mobile (swipeable peek). Cards share the visual design of
// the "Values" cards with an image-on-top layout, are forced to equal height,
// and link to the individual /blog/[slug] article pages.
const BlogCarousel: FC<BlogCarouselProps> = ({ posts }) => {
    if (!posts.length) return null;

    const meta = (post: BlogPost): string =>
        post.author
            ? `${post.author} · ${getDayDifferenceText(post.publishedAt)}`
            : `Ippubblikat ${getDayDifferenceText(post.publishedAt)}`;

    const settings = {
        dots: true,
        arrows: false,
        infinite: posts.length > 2,
        speed: 500,
        slidesToShow: Math.min(2, posts.length),
        slidesToScroll: 1,
        responsive: [
            // Mobile: one full card and a half peek of the next, swipeable.
            { breakpoint: 600, settings: { slidesToShow: 1.5, infinite: false } },
        ],
    };

    return (
        <Box
            sx={{
                mt: 2,
                mb: { xs: 4, md: 6 },
                // Gutters between cards: pull the list out, pad each slide's wrapper.
                // Vertical padding gives the card shadows room so they aren't clipped.
                "& .slick-list": { mx: -2, py: 1 },
                "& .slick-slide > div": { height: "100%", px: 2 },
                // Equal-height cards regardless of excerpt length.
                "& .slick-track": { display: "flex" },
                "& .slick-slide": { height: "auto" },
                "& .slick-dots": { position: "static", mt: 4 },
            }}
        >
            <Slider {...settings}>
                {posts.map((post) => (
                    <Box key={post.id} sx={{ height: "100%" }}>
                        <Card sx={{ height: "100%", display: "flex" }}>
                            <CardActionArea
                                component={Link}
                                href={`/blog/${post.slug}`}
                                sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}
                            >
                                <CardMedia
                                    component="img"
                                    image={post.imageUrl || FALLBACK_IMAGE}
                                    alt={post.title}
                                    sx={{ height: { xs: 200, md: 260 }, objectFit: "cover" }}
                                />
                                <CardContent sx={{ p: { xs: 3, md: 4 }, flex: 1, display: "flex", flexDirection: "column" }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                                        {meta(post)}
                                    </Typography>
                                    <Typography component="h3" sx={{ fontSize: "1.15rem", fontWeight: 700, mb: "0.6rem" }}>
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0 }}>
                                        {post.excerpt}
                                    </Typography>
                                    <Typography sx={{ mt: "auto", pt: 2, color: "primary.main", fontWeight: 700 }}>
                                        Aqra Aktar →
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default BlogCarousel;
