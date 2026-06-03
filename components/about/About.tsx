import { Box, Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { BlogAbout, BlogValues } from "@/app/sanity/queries";
import AboutValueCards from "./AboutValueCards";

type AboutProps = {
    about: BlogAbout;
    values: BlogValues;
};

// Home page "About Me" ("Min Jien"). A 50/50 split on desktop (stacked on
// mobile): the left is the bio (a bold lead quote, the body content and
// expertise tags, sourced from the `blogAbout` Sanity singleton); the right
// lists "my values" as compact, click-to-expand cards. The two columns are
// vertically centred so a height difference between them stays balanced.
// `id="about"` keeps the header menu's #about anchor working.
const About: FC<AboutProps> = ({ about, values }) => (
    <Box component="section">
        <Typography variant="h2" component="h2" id="about" sx={{ maxWidth: { md: "50%" } }}>
            {about.title}
        </Typography>
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: { xs: 4, md: 6 },
                alignItems: "center",
            }}
        >
            {/* Left: the bio */}
            <Box>
                {about.headerQuote && (
                    <Typography
                        sx={{
                            fontSize: { xs: "1.5rem", md: "1.9rem" },
                            fontWeight: 800,
                            lineHeight: 1.25,
                            color: "primary.main",
                            borderLeft: "4px solid",
                            borderColor: "primary.main",
                            pl: 2.5,
                            mb: 3,
                        }}
                    >
                        {about.headerQuote}
                    </Typography>
                )}
                <Typography
                    variant="body1"
                    sx={{ whiteSpace: "pre-line", mb: about.tags?.length ? 3 : 0 }}
                >
                    {about.content}
                </Typography>
                {about.tags && about.tags.length > 0 && (
                    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                        {about.tags.map((tag) => (
                            <Chip
                                key={tag}
                                label={tag}
                                sx={{ bgcolor: "primary.main", color: "#fff", fontWeight: 600 }}
                            />
                        ))}
                    </Stack>
                )}
            </Box>

            {/* Right: my values, click to expand */}
            <AboutValueCards values={values} />
        </Box>
    </Box>
);

export default About;
