import { BlogPost, Project } from "@/types/Types";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { SanityDocument } from "next-sanity";

const urlFor = (source: SanityImageSource | undefined, projectId?: string, dataset?: string) => {
    if (!source || !projectId || !dataset) return null;
    try {
        return createImageUrlBuilder({ projectId, dataset }).image(source);
    } catch {
        return null;
    }
};

// Builds the post image URL, returning "" when there is no image (or it can't be
// resolved) so that an imageless article still maps successfully instead of being
// dropped. Callers render the image only when imageUrl is truthy.
const buildImageUrl = (image: SanityImageSource | undefined, projectId?: string, dataset?: string): string => {
    try {
        return urlFor(image, projectId, dataset)?.width(550).height(310).url() ?? "";
    } catch {
        return "";
    }
};

const mapToBlogPost = (sanityPost: SanityDocument, projectId?: string, dataset?: string): BlogPost | undefined => {

    try{
        const blogPost: BlogPost = {
            id: sanityPost._id, // Assuming SanityDocument has an _id field
            title: sanityPost.title,
            imageUrl: buildImageUrl(sanityPost.image, projectId, dataset),
            content: sanityPost.body, // Assuming your Sanity document has a content field
            slug: sanityPost.slug.current,
            publishedAt: new Date(sanityPost.publishedAt).toISOString(), // Convert to ISO string for consistency
            author: sanityPost.author, // Assuming your Sanity document has an author field
            excerpt: sanityPost.excerpt ?? ""
          };
          return blogPost;
    }catch(ex)
    {
        // Check if we can break down the error handling to be with the image only
        console.error("Mapping SanityPost to Blog Post failed with: ")
        console.error("SanityPost: ",sanityPost)
        console.error("ProjectId: ", projectId)
        console.error("Dataset: ", dataset)
    }
};

export default mapToBlogPost;

// Larger crop than blog cards: the project cards are graphic-heavy with the
// image as the focal point, so we request a bigger, wider image.
const buildProjectImageUrl = (image: SanityImageSource | undefined, projectId?: string, dataset?: string): string => {
    try {
        return urlFor(image, projectId, dataset)?.width(800).height(500).url() ?? "";
    } catch {
        return "";
    }
};

// Maps a Sanity `project` document to the frontend Project shape. Returns
// undefined (and logs) on a malformed document so a single bad doc doesn't
// take down the whole carousel. imageUrl is "" when there's no image — the
// carousel falls back to a placeholder so cards never look broken.
export const mapToProject = (doc: SanityDocument, projectId?: string, dataset?: string): Project | undefined => {
    try {
        return {
            id: doc._id,
            title: doc.title,
            tagline: doc.tagline ?? "",
            description: doc.description ?? "",
            imageUrl: buildProjectImageUrl(doc.image, projectId, dataset),
            tags: Array.isArray(doc.tags) ? doc.tags : [],
            url: doc.url || undefined,
        };
    } catch (ex) {
        console.error("Mapping Sanity project failed:", ex, doc);
        return undefined;
    }
};
