const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || "ije73mzr";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || process.env.SANITY_API_VERSION || "2024-01-01";
const useCdn = (process.env.NEXT_PUBLIC_SANITY_USE_CDN || "true") === "true";

export async function getSanityClient() {
  const mod = await import("@sanity/client");
  const createClient = (mod && (mod.createClient || mod.default || mod)) as any;
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
  });
}

export async function urlFor(source: any) {
  const client = await getSanityClient();
  const imgMod = await import("@sanity/image-url");
  const imageUrlBuilder = (imgMod && (imgMod.default || imgMod)) as any;
  const builder = imageUrlBuilder(client);
  return builder.image(source);
}

export async function fetchQuery(query: string, params?: Record<string, any>) {
  const client = await getSanityClient();
  return client.fetch(query, params);
}

const defaultExport = {
  fetch: fetchQuery,
  getSanityClient,
  urlFor,
};

export default defaultExport;
