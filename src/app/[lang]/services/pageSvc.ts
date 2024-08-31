import { fetchAPI } from "../utils/fetch-api";
import { api_id } from "../../../../api-id-config";

export async function getPage(locale?: string) {
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
