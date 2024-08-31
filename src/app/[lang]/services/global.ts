import { fetchAPI } from "../utils/fetch-api";

export async function getGlobal(): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "navbar.navbarBackground",
      "navbar.authentication",
      "navbar.localeControlText",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.categories",
      "footer.footerBackground",
      "background",
      "socialLinks",
    ],
  };

  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}
