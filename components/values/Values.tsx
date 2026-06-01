import { Box, Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import { BlogValues } from "@/app/sanity/queries";
import { valueIconFor } from "./valueIcons";

type ValuesProps = {
    data: BlogValues;
};

// A distinct accent colour per value icon, cycled by position.
const VALUE_COLORS = ["#4961b0", "#2a9d8f", "#e9a23b", "#d1495b"];

// "Il-Valuri Tiegħi" (My Values) — sits under the home page About section.
// Renders up to four values as left-aligned cards (two per row on desktop so
// they're wider and easier to read), each with a CMS-chosen icon, title and text.
const Values: FC<ValuesProps> = ({ data }) => (
    <Box component="section">
        <Typography variant="h2" component="h2">
            {data.title}
        </Typography>
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: 3,
                mt: 2,
            }}
        >
            {data.values.map((value, index) => {
                const Icon = valueIconFor(value.icon);
                return (
                    <Card key={index} sx={{ height: "100%" }}>
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                textAlign: "left",
                                p: { xs: 3, md: 4 },
                            }}
                        >
                            <Icon sx={{ fontSize: "1.8rem", color: VALUE_COLORS[index % VALUE_COLORS.length], mb: 2 }} />
                            <Typography
                                component="h3"
                                sx={{ fontSize: "1.15rem", fontWeight: 700, mb: "0.6rem" }}
                            >
                                {value.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0 }}>
                                {value.text}
                            </Typography>
                        </CardContent>
                    </Card>
                );
            })}
        </Box>
    </Box>
);

export default Values;
