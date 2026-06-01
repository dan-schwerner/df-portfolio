import { type SanityDocument } from "next-sanity";
import { client } from "./client";
import mapToBlogPost from "./mappers";
import { BLOG_ABOUT_ID, BLOG_VALUES_ID, type ValueIconKey } from "./constants";
import { type BlogPost } from "@/types/Types";

export type BlogAbout = {
  title: string;
  content: string;
};

/**
 * Shared fallback for the "About Me" section, used by BOTH the home page and the
 * blog page so they stay identical until the `blogAbout` singleton is created in
 * the Studio. Once that document exists, both pages render it instead.
 */
export const BLOG_ABOUT_FALLBACK: BlogAbout = {
  title: "Min Jien",
  content: `Jisimni Daniel u jien mill-gżira Mediterranja ta' Malta. Sa minn età żgħira dejjem kont affaxxinat bl-Inġinerija tas-Softwer, u dan wassalni biex niggradwa fil-Computing u l-IT mill-Open University, università tat-tagħlim mill-bogħod ibbażata fir-Renju Unit. Hekk kif ksibt aktar esperjenza fil-qasam, skoprejt passjoni għall-Immaniġġjar tal-Inġinerija u bdejt napprezza l-valur kbir li dan ir-rwol iġib meta jsir sew.

Wara li ħdimt B2B ma' diversi software houses lokali u B2C fl-industrija tal-iGaming, żviluppajt firxa wiesgħa ta' ħiliet. L-għarfien tiegħi jvarja mill-analiżi tad-data, il-ġbir tar-rekwiżiti, u l-immaniġġjar tat-timijiet sal-arkitettura tas-sistemi u l-iżvilupp tas-softwer, li jkopru sistemi kemm tal-backend kif ukoll tal-frontend. Il-pożizzjonijiet attwali u tal-passat tawni ambjent fejn nista' nottimizza u nkabbar it-timijiet biex jilħqu l-aspettattivi dejjem jikbru tas-sistemi taħt ir-responsabbiltà tiegħi.

Għalkemm dawn il-pożizzjonijiet tawni esperjenza imprezzabbli u ħallewni nikber professjonalment, jien ukoll ħerqan li noffri l-għarfien tiegħi lil individwi u negozji lil hinn mix-xogħol full-time tiegħi. Għalhekk, minbarra li nintroduċi lili nnifsi u l-ħiliet tiegħi, dan il-portafoll se jservi bħala wirja tal-kapaċitajiet tiegħi permezz ta' lista ta' proġetti tal-passat u blog posts.

Nispera li tgawdi ż-żjara tiegħek, u tiddejjaqx tikkuntattjani jekk tixtieq tikkollabora fuq proġett.`,
};

/** Fetch the single "About Me" document by its fixed id. */
const BLOG_ABOUT_QUERY = `*[_id == $id][0]{ title, content }`;

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
  "excerpt": array::join(string::split((pt::text(body)), "")[0..280], "") + "..."
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
