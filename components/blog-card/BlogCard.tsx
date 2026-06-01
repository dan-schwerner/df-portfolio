'use client'

import { getDayDifferenceText } from "@/app/utils"
import { BlogPost } from "@/types/Types"
import { Card, CardActionArea, CardContent, Typography } from "@mui/material"
import Link from "next/link"
import { FC } from "react"

const BlogCard:FC<BlogPost | undefined> = (post) => {
    const cardHeaderSubtitle = () : string => {
        if(!post){ return "Artiklu" }
        if(!post.author){ return `Ippubblikat ${getDayDifferenceText(post?.publishedAt)}` }
        return `${post.author} - ${getDayDifferenceText(post?.publishedAt)}`
    }

    return (
    <Card>
        <CardActionArea
            component={Link}
            href={`/blog/${post?.slug ?? ""}`}
        >
            <CardContent sx={{ py: 2, px: 2 }}>
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>
                    {cardHeaderSubtitle()}
                </Typography>
                <Typography
                    component="h3"
                    sx={{ color: "text.primary", fontWeight: 700, fontSize: "1.15rem", lineHeight: 1.3, mb: "0.6rem" }}
                >
                    {post?.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 0 }}>
                    {post?.excerpt}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>)
}

export default BlogCard
