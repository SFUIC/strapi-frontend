import { fetchAPI } from "../utils/fetch-api";

export async function getPages(locale?: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path: string = `/pages`;
  const urlParamsObject = {
    locale: locale ? locale : "en",
    populate: "deep",
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}
