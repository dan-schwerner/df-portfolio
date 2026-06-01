import { Box, Container } from "@mui/material";
import { FC, ReactNode } from "react";

type SectionProps = {
    children: ReactNode;
    /** "muted" gives the section a light gray background to separate it from its neighbours. */
    variant?: "default" | "muted";
};

/**
 * Full-width page section with generous vertical padding and an optional muted
 * (light gray) background. Alternating default/muted sections gives the home
 * page clear visual separation between blocks.
 */
const Section: FC<SectionProps> = ({ children, variant = "default" }) => (
    <Box
        sx={{
            width: "100%",
            bgcolor: variant === "muted" ? "grey.100" : "background.paper",
            py: { xs: 6, md: 9 },
        }}
    >
        <Container maxWidth="lg">{children}</Container>
    </Box>
);

export default Section;
