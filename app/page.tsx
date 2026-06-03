import {promises as fs } from 'fs';

import About from "@/components/about/About";
import Banner from "@/components/banner/Banner";
import styles from "./page.module.css";
import { Recommendation } from '@/types/Types';
import Recommendations from '@/components/recommendations/Recommendations';
import Contact from '@/components/contact/Contact';
import Section from '@/components/section/Section';
import BlogCarousel from '@/components/blog-carousel/BlogCarousel';
import ProjectsCarousel from '@/components/projects-carousel/ProjectsCarousel';
import ChatWidget from '@/components/chat-widget/ChatWidget';
import { Typography } from '@mui/material';
import { getBlogAbout, BLOG_ABOUT_FALLBACK, getBlogValues, BLOG_VALUES_FALLBACK, getBlogPosts, getProjects, PROJECTS_FALLBACK } from './sanity/queries';

export default async function Home() {

  const [aboutDoc, valuesDoc, blogPosts, projectDocs] = await Promise.all([getBlogAbout(), getBlogValues(), getBlogPosts(), getProjects()]);
  const about = aboutDoc ?? BLOG_ABOUT_FALLBACK;
  const values = valuesDoc ?? BLOG_VALUES_FALLBACK;
  // Show real projects when any exist, otherwise the placeholder examples.
  const projects = projectDocs.length ? projectDocs : PROJECTS_FALLBACK;

  const recommendationResponse = await fs.readFile(process.cwd() + '/app/data/recommendationContent.json', 'utf8');
  const recommendations: Recommendation[] = JSON.parse(recommendationResponse).data;

  return (
    <main className={styles.main}>
      <Banner />
      <Section sx={{ pb: { xs: 1, md: 2 } }}>
        <Typography variant="h2" component="h2" id="projects">Il-Proposti Tiegħi</Typography>
        <ProjectsCarousel projects={projects} />
      </Section>
      <Section variant="muted">
        <About about={about} values={values} />
      </Section>
      {blogPosts.length > 0 && (
        <Section>
          <Typography variant="h2" component="h2" id="blog">Blog</Typography>
          <BlogCarousel posts={blogPosts} />
        </Section>
      )}
      <Section variant="muted">
        <Recommendations recommendations={recommendations} />
      </Section>
      <Section>
        <Contact />
      </Section>
      <ChatWidget />
    </main>
  );
}
