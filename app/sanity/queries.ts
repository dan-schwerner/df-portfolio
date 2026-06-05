import { type SanityDocument } from "next-sanity";
import { client } from "./client";
import mapToBlogPost, { mapToProject } from "./mappers";
import { BLOG_ABOUT_ID, BLOG_VALUES_ID, type ValueIconKey } from "./constants";
import { type BlogPost, type Project } from "@/types/Types";
import { type Locale } from "@/i18n/config";

/**
 * GROQ projection for a field-level localized field: resolves to the active
 * language, then Maltese, then English, and finally the raw value — so a
 * not-yet-migrated plain-string field still renders (see field-level i18n in
 * app/sanity/schemas/localeTypes.ts).
 */
const loc = (field: string) =>
  `"${field}": coalesce(${field}[$lang], ${field}.mt, ${field}.en, ${field})`;

export type BlogAbout = {
  title: string;
  /** The bold lead quote shown at the top of the section. */
  headerQuote?: string;
  content: string;
  /** Areas of expertise, rendered as chips beneath the bio. */
  tags?: string[];
};

/**
 * Fallback for the home "About Me" section, used until the `blogAbout` singleton
 * is created/updated in the Studio. Short and punchy by design — a lead quote,
 * two tight paragraphs and a few expertise tags. Edit the Studio document to
 * change the live copy.
 */
export const BLOG_ABOUT_FALLBACK: Record<Locale, BlogAbout> = {
  mt: {
    title: "Min Jien",
    headerQuote:
      "Nibni sistemi li jikbru, jifilħu għall-piż, u jwasslu dak li jwiegħdu.",
    content: `Minn dejjem affaxxinani nifhem kif jaħdmu s-sistemi — x'jagħmilhom effiċjenti u fejn jiġu nieqsa. Dik il-kurżità wasslitni għal degree fil-Computing & IT u karriera fl-inġinerija tas-softwer, fit-tmexxija ta' timijiet, u fl-arkitettura tas-sistemi.

Wara snin ma' software houses Maltin u fl-industrija tal-iGaming, illum napplika l-istess ħsieb għall-isfidi ta' pajjiżna. It-teknoloġija mhix maġija — imma applikata b'għaqal, hija fost l-aktar għodod b'saħħithom biex intejbu kif tiffunzjona soċjetà.`,
    tags: [
      "Software Engineering",
      "Engineering Management",
      "System Architecture",
      "Data Analysis",
    ],
  },
  en: {
    title: "About Me",
    headerQuote:
      "I build systems that scale, hold up under load, and deliver what they promise.",
    content: `I've always been fascinated by understanding how systems work — what makes them efficient and where they fall short. That curiosity led me to a degree in Computing & IT and a career in software engineering, leading teams, and systems architecture.

After years with Maltese software houses and in the iGaming industry, today I apply the same thinking to our country's challenges. Technology isn't magic — but applied wisely, it's among the most powerful tools we have for improving how a society functions.`,
    tags: [
      "Software Engineering",
      "Engineering Management",
      "System Architecture",
      "Data Analysis",
    ],
  },
};

/** Fetch the single "About Me" document by its fixed id, localized to `lang`. */
const BLOG_ABOUT_QUERY = `*[_id == $id][0]{ ${loc("title")}, ${loc("headerQuote")}, ${loc("content")}, tags }`;

/**
 * Returns the blog "About Me" singleton from Sanity, or null if it hasn't been
 * created in the Studio yet. Callers should fall back to default copy on null.
 */
export async function getBlogAbout(lang: Locale): Promise<BlogAbout | null> {
  return client.fetch<BlogAbout | null>(
    BLOG_ABOUT_QUERY,
    { id: BLOG_ABOUT_ID, lang },
    { next: { revalidate: 30 } },
  );
}

export type BlogValue = {
  title: string;
  text: string;
  icon: ValueIconKey;
};

export type BlogValues = {
  title: string;
  values: BlogValue[];
};

/**
 * Shared fallback for the "My Values" section, used until the `blogValues`
 * singleton is created in the Studio.
 */
export const BLOG_VALUES_FALLBACK: Record<Locale, BlogValues> = {
  mt: {
    title: "Il-Valuri Tiegħi",
    values: [
      {
        title: "Tagħlim Kontinwu",
        text: "It-teknoloġija qatt ma tieqaf, u lanqas jien. Kontinwament intejjeb il-ħiliet tiegħi u nesplora ideat ġodda.",
        icon: "school",
      },
      {
        title: "Trasparenza u Serjeta",
        text: "Permezz ta sistemi awtomatizzati, komunikazzjoni ċara u informattiva tkun disponibli għal kulħadd.",
        icon: "handshake",
      },
      {
        title: "Sengħa",
        text: "Nimporta li l-affarijiet isiru sewwa. Sistemi organizzati, sodi, u li jservu fit-tul.",
        icon: "code",
      },
      {
        title: "Innovazzjoni Prammatika",
        text: "Infittex soluzzjonijiet sempliċi u effettivi li verament jagħmlu differenza, mhux kumplessità għalxejn.",
        icon: "lightbulb",
      },
    ],
  },
  en: {
    title: "My Values",
    values: [
      {
        title: "Continuous Learning",
        text: "Technology never stands still, and neither do I. I'm constantly sharpening my skills and exploring new ideas.",
        icon: "school",
      },
      {
        title: "Transparency & Integrity",
        text: "Through automated systems, clear and informative communication is available to everyone.",
        icon: "handshake",
      },
      {
        title: "Craftsmanship",
        text: "I care about doing things right — organised, solid systems that last.",
        icon: "code",
      },
      {
        title: "Pragmatic Innovation",
        text: "I look for simple, effective solutions that genuinely make a difference — not complexity for its own sake.",
        icon: "lightbulb",
      },
    ],
  },
};

const BLOG_VALUES_QUERY = `*[_id == $id][0]{ ${loc("title")}, "values": values[]{ ${loc("title")}, ${loc("text")}, icon } }`;

/**
 * Returns the "My Values" singleton from Sanity, or null if it hasn't been
 * created in the Studio yet. Callers should fall back to BLOG_VALUES_FALLBACK.
 */
export async function getBlogValues(lang: Locale): Promise<BlogValues | null> {
  return client.fetch<BlogValues | null>(
    BLOG_VALUES_QUERY,
    { id: BLOG_VALUES_ID, lang },
    { next: { revalidate: 30 } },
  );
}

// Blog posts are single-language (authored as-is), so no locale coalesce here.
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  image,
  body,
  slug,
  author,
  publishedAt,
  "excerpt": array::join(string::split((pt::text(body)), "")[0..180], "") + "..."
}`;

/** Fetches the latest blog posts, mapped to the frontend BlogPost shape. */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const { projectId, dataset } = client.config();
  const posts = await client.fetch<SanityDocument[]>(
    POSTS_QUERY,
    {},
    { next: { revalidate: 30 } },
  );
  return posts
    .map((post) => mapToBlogPost(post, projectId, dataset))
    .filter((post): post is BlogPost => post !== undefined);
}

/**
 * Placeholder projects for the "Il-Proġetti Tiegħi" carousel, shown ONLY while
 * no `project` documents exist in the Studio yet (same pattern as the About /
 * Values fallbacks). Replace these by creating real projects in Sanity — once
 * any exist, these examples disappear. They have no image, so the carousel
 * renders the shared placeholder graphic for each.
 */
export const PROJECTS_FALLBACK: Record<Locale, Project[]> = {
  mt: [
    {
      id: "fallback-project-1",
      title: "Pjattaforma tad-Data",
      tagline: "Mid-data mhux maħduma għal deċiżjonijiet f'ħin reali.",
      description:
        "Pipelines u dashboards li jiġbru kollox f'post wieħed, biex it-timijiet jiddeċiedu fuq fatti — mhux fuq supponiment.",
      imageUrl: "",
      tags: ["Data", "Dashboards", "Cloud"],
      url: "#",
    },
    {
      id: "fallback-project-2",
      title: "Sistema tal-iGaming",
      tagline: "Skalabbiltà li tiflaħ eluf ta' transazzjonijiet kull sekonda.",
      description:
        "Arkitettura mibnija biex tibqa' stabbli taħt piż għoli, b'monitoraġġ u awtomazzjoni minn tarf sa tarf.",
      imageUrl: "",
      tags: ["Backend", "Scale", "iGaming"],
      url: "#",
    },
    {
      id: "fallback-project-3",
      title: "Għodda għas-Settur Pubbliku",
      tagline: "Servizzi diġitali li jlaħħqu mat-tkabbir tal-gżira.",
      description:
        "Soluzzjonijiet sempliċi u prammatiċi li jtejbu kif jaħdmu s-servizzi ta' kuljum għaċ-ċittadin.",
      imageUrl: "",
      tags: ["Settur Pubbliku", "UX", "Innovazzjoni"],
      url: "#",
    },
  ],
  en: [
    {
      id: "fallback-project-1",
      title: "Data Platform",
      tagline: "From raw data to real-time decisions.",
      description:
        "Pipelines and dashboards that bring everything into one place, so teams decide on facts — not guesswork.",
      imageUrl: "",
      tags: ["Data", "Dashboards", "Cloud"],
      url: "#",
    },
    {
      id: "fallback-project-2",
      title: "iGaming System",
      tagline: "Scalability that handles thousands of transactions per second.",
      description:
        "An architecture built to stay stable under heavy load, with end-to-end monitoring and automation.",
      imageUrl: "",
      tags: ["Backend", "Scale", "iGaming"],
      url: "#",
    },
    {
      id: "fallback-project-3",
      title: "Public Sector Tool",
      tagline: "Digital services that keep pace with the island's growth.",
      description:
        "Simple, pragmatic solutions that improve how everyday services work for citizens.",
      imageUrl: "",
      tags: ["Public Sector", "UX", "Innovation"],
      url: "#",
    },
  ],
};

const PROJECTS_QUERY = `*[
  _type == "project"
]|order(coalesce(order, 9999) asc, _createdAt desc){
  _id,
  ${loc("title")},
  ${loc("tagline")},
  ${loc("description")},
  image,
  tags,
  url
}`;

/** Fetches projects from Sanity, mapped to the frontend Project shape. */
export async function getProjects(lang: Locale): Promise<Project[]> {
  const { projectId, dataset } = client.config();
  const docs = await client.fetch<SanityDocument[]>(
    PROJECTS_QUERY,
    { lang },
    { next: { revalidate: 30 } },
  );
  return docs
    .map((doc) => mapToProject(doc, projectId, dataset))
    .filter((project): project is Project => project !== undefined);
}

const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  image,
  body,
  slug,
  author,
  publishedAt
}`;

/** Fetches a single post by slug, mapped to BlogPost. */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const { projectId, dataset } = client.config();
  const post = await client.fetch<SanityDocument | null>(
    POST_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 30 } },
  );
  return post ? mapToBlogPost(post, projectId, dataset) : undefined;
}

const OTHER_POSTS_QUERY = `*[
  _type == "post" && defined(slug.current) && slug.current != $slug
]|order(publishedAt desc)[0...3]{
  _id,
  title,
  image,
  body,
  slug,
  author,
  publishedAt,
  "excerpt": array::join(string::split((pt::text(body)), "")[0..155], "") + "..."
}`;

/** Fetches up to three other posts (excluding `slug`). */
export async function getOtherPosts(slug: string): Promise<BlogPost[]> {
  const { projectId, dataset } = client.config();
  const posts = await client.fetch<SanityDocument[]>(
    OTHER_POSTS_QUERY,
    { slug },
    { next: { revalidate: 30 } },
  );
  return posts
    .map((post) => mapToBlogPost(post, projectId, dataset))
    .filter((post): post is BlogPost => post !== undefined);
}
