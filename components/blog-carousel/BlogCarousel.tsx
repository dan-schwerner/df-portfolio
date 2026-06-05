'use client'

import { FC } from "react";
import Link from "next/link";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { BlogPost } from "@/types/Types";
import { daysSince } from "@/app/utils";

type BlogCarouselProps = {
    posts: BlogPost[];
};

// Generic image shown when a post has no image of its own, so cards never look empty.
const FALLBACK_IMAGE = "/blog-placeholder.svg";

// Fixed card dimensions — cards never shrink/stretch, so their size is identical
// on first paint (no JS measurement) and at every viewport width.
const CARD_WIDTH = 327;
const CARD_HEIGHT = 500;
const IMAGE_HEIGHT = 200;

// Latest blog posts for the home page. A horizontal CSS scroll-snap row of
// fixed-size cards (swipe on touch, scroll/drag on desktop). On narrow screens a
// card peeks at the edge to hint that the row scrolls. Cards link to the
// individual /blog/[slug] article pages.
const BlogCarousel: FC<BlogCarouselProps> = ({ posts }) => {
    const t = useTranslations('blog');

    if (!posts.length) return null;

    const meta = (post: BlogPost): string => {
        const relative = t('relativeDays', { days: daysSince(post.publishedAt) });
        return post.author
            ? `${post.author} · ${relative}`
            : t('publishedRelative', { relative });
    };

    return (
        <Box
            sx={{
                mt: 2,
                mb: { xs: 4, md: 6 },
                display: "flex",
                gap: 2,
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                // Vertical padding gives the card shadows room so they aren't clipped.
                py: 1,
                WebkitOverflowScrolling: "touch",
                // Slim, unobtrusive scrollbar as a scroll affordance on desktop.
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": { height: 8 },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderRadius: 4,
                },
            }}
        >
            {posts.map((post) => (
                <Card
                    key={post.id}
                    sx={{
                        flex: `0 0 ${CARD_WIDTH}px`,
                        width: CARD_WIDTH,
                        height: CARD_HEIGHT,
                        display: "flex",
                        scrollSnapAlign: "start",
                    }}
                >
                    <CardActionArea
                        component={Link}
                        href={`/blog/${post.slug}`}
                        sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}
                    >
                        <CardMedia
                            component="img"
                            image={post.imageUrl || FALLBACK_IMAGE}
                            alt={post.title}
                            sx={{ flexShrink: 0, height: IMAGE_HEIGHT, objectFit: "cover" }}
                        />
                        <CardContent sx={{ p: 3, flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                                {meta(post)}
                            </Typography>
                            <Typography
                                component="h3"
                                sx={{
                                    fontSize: "1.15rem",
                                    fontWeight: 700,
                                    mb: "0.6rem",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 2,
                                    overflow: "hidden",
                                }}
                            >
                                {post.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mb: 0,
                                    flex: 1,
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 5,
                                    overflow: "hidden",
                                }}
                            >
                                {post.excerpt}
                            </Typography>
                            <Typography sx={{ mt: "auto", pt: 2, color: "primary.main", fontWeight: 700 }}>
                                {t('readMore')}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Box>
    );
};

export default BlogCarousel;
