import {promises as fs } from 'fs';

import About from "@/components/about/About";
import Banner from "@/components/banner/Banner";
import styles from "./page.module.css";
import { Recommendation } from '@/types/Types';
import Recommendations from '@/components/recommendations/Recommendations';
import Contact from '@/components/contact/Contact';
import Section from '@/components/section/Section';
import Values from '@/components/values/Values';
import BlogCarousel from '@/components/blog-carousel/BlogCarousel';
import { Typography } from '@mui/material';
import { getBlogAbout, BLOG_ABOUT_FALLBACK, getBlogValues, BLOG_VALUES_FALLBACK, getBlogPosts } from './sanity/queries';

export default async function Home() {

  const [aboutDoc, valuesDoc, blogPosts] = await Promise.all([getBlogAbout(), getBlogValues(), getBlogPosts()]);
  const about = aboutDoc ?? BLOG_ABOUT_FALLBACK;
  const values = valuesDoc ?? BLOG_VALUES_FALLBACK;

  const recommendationResponse = await fs.readFile(process.cwd() + '/app/data/recommendationContent.json', 'utf8');
  const recommendations: Recommendation[] = JSON.parse(recommendationResponse).data;

  return (
    <main className={styles.main}>
      <Banner />
      <Section>
        <About about={about} />
      </Section>
      <Section variant="muted">
        <Values data={values} />
      </Section>
      {blogPosts.length > 0 && (
        <Section>
          <Typography variant="h2" component="h2" id="blog">Blog</Typography>
          <BlogCarousel posts={blogPosts} />
        </Section>
      )}
      {/* Experience section hidden for now */}
      <Section variant="muted">
        <Recommendations recommendations={recommendations} />
      </Section>
      <Section>
        <Contact />
      </Section>
    </main>
  );
}
