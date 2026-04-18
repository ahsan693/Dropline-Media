import imageUrlBuilder from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";
import { createClient, groq } from "next-sanity";

export type SanityImageSource = {
  _type?: string;
  asset?: {
    _ref?: string;
    _type?: string;
  };
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "demo-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2026-04-10";

export const sanityConfigReady =
  projectId !== "demo-project-id" && Boolean(projectId) && Boolean(dataset);

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "published",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);

export interface SanityPostPreview {
  _id: string;
  title: string;
  slug: string;
  mainImage?: SanityImageSource;
  publishedAt?: string;
  author?: {
    name?: string;
  };
}

export interface SanityPost extends SanityPostPreview {
  body?: PortableTextBlock[];
}

export const POSTS_QUERY = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  author->{name}
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  body,
  publishedAt,
  author->{name}
}`;

export const POST_SLUGS_QUERY = groq`*[_type == "post" && defined(slug.current)] {
  "slug": slug.current
}`;
