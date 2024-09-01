import { fetchAPI } from "../utils/fetch-api";

export async function getArticles(
  start: number,
  limit: number,
  locale?: string
) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path: string = `/articles`;
  const urlParamsObject = {
    sort: { createdAt: "desc" },
    locale: locale ? locale : "en",
    populate: "deep",
    pagination: {
      start: start,
      limit: limit,
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}
