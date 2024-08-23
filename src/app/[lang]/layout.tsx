// ./strapi-frontend/src/app/[lang]/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";

import { i18n } from "../../../i18n-config";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const FALLBACK_SEO = {
  title: "Strapi Starter Next Blog",
  description: "Strapi Starter Next Blog",
};

async function getGlobal(): Promise<any> {
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
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
      "footer.footerBackground",
      "background",
    ],
  };

  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getGlobal();

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const global = await getGlobal();
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;

  const { navbar, footer, background } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url
  );

  const navbarBackgroundUrl = navbar.navbarBackground.data
    ? getStrapiMedia(navbar.navbarBackground.data.attributes?.url)
    : null;

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data.attributes.url
  );

  const footerBackgroundUrl = footer.footerBackground.data
    ? getStrapiMedia(footer.footerBackground.data.attributes.url)
    : null;

  const backgroundUrl = getStrapiMedia(background?.data?.attributes?.url);

  return (
    <html lang={params.lang}>
      <body>
        <Navbar
          links={navbar.links}
          logoUrl={navbarLogoUrl}
          logoText={navbar.navbarLogo.logoText}
          backgroundUrl={navbarBackgroundUrl}
        />

        <main
          className="dark:bg-black dark:text-gray-100 min-h-screen"
          style={{
            backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#d3d3d3",
          }}
        >
          {children}
        </main>

        <Footer
          logoUrl={footerLogoUrl}
          logoText={footer.footerLogo.logoText}
          menuLinks={footer.menuLinks}
          categoryLinks={footer.categories.data}
          legalLinks={footer.legalLinks}
          socialLinks={footer.socialLinks}
          backgroundUrl={footerBackgroundUrl}
        />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
