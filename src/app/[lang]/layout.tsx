// ./strapi-frontend/src/app/[lang]/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";
import { cookies } from 'next/headers';

import { i18n } from "../../../i18n-config";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { GlobalProvider } from "./contexts/GlobalContext";
import { AuthProvider } from "./contexts/AuthContext";
import { getGlobal } from "./services/global";
import { LocaleProvider } from "./contexts/LocaleContext";

const FALLBACK_SEO = {
  title: "SFU Iranian Club",
  description: "SFU Iranian Club",
};

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
  const locale = cookies().get("LOCALE")?.value;
  const global = await getGlobal(locale);
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;

  const { navbar, footer, background, socialLinks, club } = global.data.attributes;

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
        <LocaleProvider>
          <AuthProvider>
            <GlobalProvider value={{ navbar, footer, background, socialLinks }}>
              <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar
                  links={navbar.links}
                  logoUrl={navbarLogoUrl}
                  logoText={navbar.navbarLogo.logoText}
                  backgroundUrl={navbarBackgroundUrl}
                />
              </div>

              <main
                className={`dark:bg-black dark:text-gray-100 min-h-screen bg-contain bg-repeat bg-center bg-gray-300 bg-cover bg-center ${backgroundUrl ? "" : "bg-none"
                  }`}
                style={{
                  backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : "none",
                  backgroundSize: 'contain', // Adjust the size to maintain aspect ratio
                  backgroundRepeat: 'repeat', // Repeat the image in both directions
                  backgroundPosition: 'center', // Position the image in the center
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
                socialLinks={socialLinks}
                backgroundUrl={footerBackgroundUrl}
                categoryTitle={footer.categoryTitle}
                menuTitle={footer.menuTitle}
              />
            </GlobalProvider>
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
