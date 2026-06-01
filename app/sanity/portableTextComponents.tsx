import { type ComponentProps } from "react";
import { PortableText } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { Box, Typography } from "@mui/material";

type PortableTextComponentsProp = ComponentProps<typeof PortableText>["components"];

/**
 * PortableText components for rendering a post body. Adds support for the inline
 * `image` blocks defined on the `post` schema so editors can place multiple
 * image sections anywhere in the body. Needs the project's projectId/dataset to
 * build image URLs (available from `client.config()`).
 */
export function getPortableTextComponents(
  projectId?: string,
  dataset?: string,
): PortableTextComponentsProp {
  return {
    types: {
      image: ({ value }) => {
        if (!projectId || !dataset || !value?.asset) return null;

        const url = createImageUrlBuilder({ projectId, dataset })
          .image(value as SanityImageSource)
          .width(800)
          .fit("max")
          .auto("format")
          .url();

        if (!url) return null;

        return (
          <Box component="figure" sx={{ m: 0, my: 3 }}>
            <Box
              component="img"
              src={url}
              alt={value.alt ?? ""}
              sx={{ display: "block", width: "100%", height: "auto", borderRadius: 1 }}
            />
            {value.caption && (
              <Typography
                component="figcaption"
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, textAlign: "center", fontStyle: "italic" }}
              >
                {value.caption}
              </Typography>
            )}
          </Box>
        );
      },
    },
  };
}
