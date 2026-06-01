import { BlogPost } from "@/types/Types";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { SanityDocument } from "next-sanity";

const mapToBlogPost = (sanityPost: SanityDocument, projectId?: string, dataset?: string): BlogPost | undefined => {

    try{
        const blogPost: BlogPost = {
            id: sanityPost._id, // Assuming SanityDocument has an _id field
            title: sanityPost.title,
           // imageUrl: urlFor(sanityPost.image, projectId, dataset)?.width(550).height(310).url() || "", // We need to create different sizes depending on the content used. 
            imageUrl: (projectId && dataset) ? urlFor(sanityPost.image, projectId, dataset)?.width(550).height(310).url() ?? "" : "",
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

const urlFor = (source: SanityImageSource, projectId: string, dataset :string) => {
    return projectId && dataset
        ? createImageUrlBuilder({ projectId, dataset }).image(source)
        : null;
}
 

export default mapToBlogPost;