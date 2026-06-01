import { BlogAbout } from "@/app/sanity/queries";
import BlogIntro from "../blog-intro/BlogIntro";
import { FC } from "react";

type AboutProps = {
    about: BlogAbout
}

// Home "About Me" renders the exact same content + component as the blog page's
// About section (the shared `blogAbout` singleton, or its shared fallback). The
// `id="about"` keeps the header menu's #about anchor working.
const About: FC<AboutProps> = ({ about }) => (
    <BlogIntro id="about" title={about.title} content={about.content} />
);

export default About;
