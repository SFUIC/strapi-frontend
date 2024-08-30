"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { RenderIcon } from "../utils/icon-renderer";
import { SocialLink } from "../types";

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

function FooterLink({ url, text }: SocialLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`hover:dark:text-violet-400 ${path === url && "dark:text-violet-400 dark:border-violet-400"
          }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function CategoryLink({ attributes }: CategoryLink) {
  return (
    <li className="flex">
      <Link href={`/${attributes.slug}`} className="hover:dark:text-violet-400">
        {attributes.name}
      </Link>
    </li>
  );
}

export default function Footer({
  logoUrl,
  logoText,
  menuLinks,
  categoryLinks,
  legalLinks,
  socialLinks,
  backgroundUrl,
}: {
  logoUrl: string | null;
  logoText: string | null;
  menuLinks: Array<SocialLink>;
  categoryLinks: Array<CategoryLink>;
  legalLinks: Array<SocialLink>;
  socialLinks: Array<SocialLink>;
  backgroundUrl: string | null;
}) {
  return (
    <footer
      className="py-6 dark:bg-customGray dark:text-black-50"
      style={{
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : "none",
        backgroundColor: backgroundUrl ? "transparent" : "bg-customGray",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
        <div className="grid grid-cols-12">
          <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
            <Logo src={logoUrl}>
              {logoText && <h2 className="text-2xl font-bold text-sfuDarkRed" style={{ fontFamily: "Trebuchet MS" }}>{logoText}</h2>}
            </Logo>
          </div>

          <div className="col-span-6 text-center md:text-left md:col-span-3">
            <p className="pb-1 text-lg font-medium">Categories</p>
            <ul>
              {categoryLinks.map((link: CategoryLink) => (
                <CategoryLink key={link.id} {...link} />
              ))}
            </ul>
          </div>

          <div className="col-span-6 text-center md:text-left md:col-span-3">
            <p className="pb-1 text-lg font-medium">Menu</p>
            <ul>
              {menuLinks.map((link: SocialLink) => (
                <FooterLink key={link.id} {...link} />
              ))}
            </ul>
          </div>
        </div>
        <div className="grid justify-center pt-6 lg:justify-between">
          <div className="flex">
            <span className="mr-2">
              ©{new Date().getFullYear()} All rights reserved
            </span>
            <ul className="flex">
              {legalLinks.map((link: SocialLink) => (
                <Link
                  href={link.url}
                  className="text-gray-400 hover:text-gray-300 mr-2"
                  key={link.id}
                >
                  {link.text}
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
            {socialLinks.map((link: SocialLink) => {
              return (
                <a
                  key={link.id}
                  rel="noopener noreferrer"
                  href={link.url}
                  title={link.text}
                  target={link.newTab ? "_blank" : "_self"}
                  className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-sfuLightRed dark:text-gray-900"
                >
                  <RenderIcon type={link.social} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
