import { PortableText } from "next-sanity";
import { getTranslations, getFormatter } from "next-intl/server";
import styles from "@/app/page.module.css";
import { client } from "../../sanity/client";
import { Container, Typography, Box, Divider, Grid } from "@mui/material";
import Contact from "@/components/contact/Contact";
import { BlogPost } from "@/types/Types";
import BlogCard from "@/components/blog-card/BlogCard";
import { getPortableTextComponents } from "@/app/sanity/portableTextComponents";
import { getPostBySlug, getOtherPosts } from "@/app/sanity/queries";

const { projectId, dataset } = client.config();
const portableTextComponents = getPortableTextComponents(projectId, dataset);

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = await getTranslations('blog');
  const format = await getFormatter();
  const [blogPost, otherBlogPosts] = await Promise.all([
    getPostBySlug(slug),
    getOtherPosts(slug),
  ]);

  if (!blogPost) {
    return <div>{t('notFound')}</div>;
  }

  return (
    <main className={styles.main}>
      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={{ xs: 0, md: 4 }}
          sx={{ 
            margin: 0,
            justifyContent: 'center'
          }}
        >
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ py: 4 }}>
              <Typography variant="h3" sx={{ mb: 2 }}>
                {blogPost.title}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                {t('authorDate', {
                  author: blogPost.author,
                  date: format.dateTime(new Date(blogPost.publishedAt), 'medium'),
                })}
              </Typography>

              {blogPost.imageUrl && (
                <Box 
                  component="img"
                  src={blogPost.imageUrl}
                  alt={blogPost.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 1,
                    mb: 4
                  }}
                />
              )}

              <Box sx={{ 
                typography: 'body1',
                '& p': { mb: 2 },
                '& p:first-of-type::first-letter': {
                  fontSize: '3.5rem',
                  float: 'left',
                  lineHeight: 1,
                  pr: 1,
                  fontWeight: 'bold'
                }
              }}>
                <PortableText value={blogPost.content} components={portableTextComponents} />
              </Box>
            </Box>
          </Grid>

          <Grid
            size={{ md: 4 }}
            sx={{
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Box sx={{ py: 4 }}>
              <Typography variant="h5" sx={{ mb: 3 }}>{t('otherArticles')}</Typography>
              <Grid
                container
                spacing={2}
              >
                {otherBlogPosts.map((post: BlogPost) => (
                  <Grid size={12} key={post.id} sx={{ maxWidth: 330, width: '100%' }}>
                    <BlogCard {...post} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />
        <Box sx={{ mb: 6 }}>
          <Contact />
        </Box>
      </Container>
    </main>
  );
}