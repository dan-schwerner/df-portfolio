export type MenuItem = {
    name: string;
    link: string;
};

export type ContentItem = {
    type: ContentItemType,
    content: string,
    ImageProperties: ImageProperties | undefined
}

export type ExperienceItem = {
    company: string,
    dayFrom: string,
    dayTo: string | undefined,
    position: string,
    description: string,
    skills: string[]
}

export type Recommendation = {
    text: string,
    author: string,
    position: string
}

export type ImageProperties = {
    width: number,
    height: number,
    alt: string
}

export type BlogPost = {
    id: string
    title: string
    imageUrl: string
    content: any
    slug: string
    publishedAt: string
    author: string
    excerpt: string | undefined
}

export type Project = {
    id: string
    title: string
    tagline: string
    description: string
    imageUrl: string
    tags: string[]
    url: string | undefined
}

export enum ContentItemType {
    h2 = "h2",
    h3 = "h3",
    p = "p",
    img = "img"
}

