import type { QueryParams, SanityClient } from "@sanity/client";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || "ije73mzr";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || process.env.SANITY_API_VERSION || "2024-01-01";
const useCdn = (process.env.NEXT_PUBLIC_SANITY_USE_CDN || "true") === "true";

export async function getSanityClient(): Promise<SanityClient> {
  const { createClient } = await import("@sanity/client");
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
  });
}

export async function urlFor(source: SanityImageSource): Promise<ImageUrlBuilder> {
  const client = await getSanityClient();
  const { default: imageUrlBuilder } = await import("@sanity/image-url");
  const builder = imageUrlBuilder(client);
  return builder.image(source);
}

export async function fetchQuery<T = unknown>(query: string): Promise<T>;
export async function fetchQuery<T = unknown>(query: string, params: QueryParams): Promise<T>;
export async function fetchQuery<T = unknown>(query: string, params?: QueryParams): Promise<T> {
  const client = await getSanityClient();
  if (params) return client.fetch<T>(query, params);
  return client.fetch<T>(query);
}

const defaultExport = {
  fetch: fetchQuery,
  getSanityClient,
  urlFor,
};

export default defaultExport;
