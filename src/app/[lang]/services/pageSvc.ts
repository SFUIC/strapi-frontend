import { fetchAPI } from "../utils/fetch-api";

export async function getPageBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/pages`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      metadata: { populate: "*" },
      chunks: { populate: "*" },
      shortName: { populate: "*" },
      heading: { populate: "*" },
      description: { populate: "*" },
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}
