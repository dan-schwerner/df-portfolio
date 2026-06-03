import { type SanityDocument } from "next-sanity";
import { client } from "./client";
import mapToBlogPost, { mapToProject } from "./mappers";
import { BLOG_ABOUT_ID, BLOG_VALUES_ID, type ValueIconKey } from "./constants";
import { type BlogPost, type Project } from "@/types/Types";

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
export const BLOG_ABOUT_FALLBACK: BlogAbout = {
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
};

/** Fetch the single "About Me" document by its fixed id. */
const BLOG_ABOUT_QUERY = `*[_id == $id][0]{ title, headerQuote, content, tags }`;

/**
 * Returns the blog "About Me" singleton from Sanity, or null if it hasn't been
 * created in the Studio yet. Callers should fall back to default copy on null.
 */
export async function getBlogAbout(): Promise<BlogAbout | null> {
  return client.fetch<BlogAbout | null>(
    BLOG_ABOUT_QUERY,
    { id: BLOG_ABOUT_ID },
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
export const BLOG_VALUES_FALLBACK: BlogValues = {
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
};

const BLOG_VALUES_QUERY = `*[_id == $id][0]{ title, values[]{ title, text, icon } }`;

/**
 * Returns the "My Values" singleton from Sanity, or null if it hasn't been
 * created in the Studio yet. Callers should fall back to BLOG_VALUES_FALLBACK.
 */
export async function getBlogValues(): Promise<BlogValues | null> {
  return client.fetch<BlogValues | null>(
    BLOG_VALUES_QUERY,
    { id: BLOG_VALUES_ID },
    { next: { revalidate: 30 } },
  );
}

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
export const PROJECTS_FALLBACK: Project[] = [
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
];

const PROJECTS_QUERY = `*[
  _type == "project"
]|order(coalesce(order, 9999) asc, _createdAt desc){
  _id,
  title,
  tagline,
  description,
  image,
  tags,
  url
}`;

/** Fetches projects from Sanity, mapped to the frontend Project shape. */
export async function getProjects(): Promise<Project[]> {
  const { projectId, dataset } = client.config();
  const docs = await client.fetch<SanityDocument[]>(
    PROJECTS_QUERY,
    {},
    { next: { revalidate: 30 } },
  );
  return docs
    .map((doc) => mapToProject(doc, projectId, dataset))
    .filter((project): project is Project => project !== undefined);
}
