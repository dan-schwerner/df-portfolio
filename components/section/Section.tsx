import { Box, Container, type SxProps, type Theme } from "@mui/material";
import { FC, ReactNode } from "react";

type SectionProps = {
    children: ReactNode;
    /** "muted" gives the section a light gray background to separate it from its neighbours. */
    variant?: "default" | "muted";
    /** Extra styles merged onto the outer Box — e.g. `{ pb: { xs: 1, md: 2 } }` to trim bottom padding. */
    sx?: SxProps<Theme>;
};

/**
 * Full-width page section with generous vertical padding and an optional muted
 * (light gray) background. Alternating default/muted sections gives the home
 * page clear visual separation between blocks. Pass `sx` to override styles
 * (e.g. a smaller bottom padding for a specific section).
 */
const Section: FC<SectionProps> = ({ children, variant = "default", sx }) => (
    <Box
        sx={[
            {
                width: "100%",
                bgcolor: variant === "muted" ? "grey.100" : "background.paper",
                py: { xs: 6, md: 9 },
            },
            ...(Array.isArray(sx) ? sx : [sx]),
        ]}
    >
        <Container maxWidth="lg">{children}</Container>
    </Box>
);

export default Section;
