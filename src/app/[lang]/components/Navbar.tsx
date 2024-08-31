// ./strapi-frontend/src/app/[lang]/components/Navbar.tsx

"use client";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import SessionLink from "./SessionLink";
import { useGlobal } from "../contexts/GlobalContext";
import LocaleControl from "./LocaleControl";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname();

  return (
    <li className="flex">
      <Link
        href={url}
        className={`flex items-center mx-4 -mb-1 border-b-2 dark:border-transparent ${path === url && "dark:text-violet-400 dark:border-violet-400"
          }}`}
      >
        {text}
      </Link>
    </li>
  );
}

export default function Navbar({
  links,
  logoUrl,
  logoText,
  backgroundUrl,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
  backgroundUrl: string | null;
}) {
  const { userData } = useAuth();
  const { navbar } = useGlobal();
  const auth = navbar.authentication
  const userID = userData ? userData["cas:user"]["_text"] : null;

  return (
    <div
      className=" dark:bg-customGray dark:text-black-100"
      style={{
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : "none",
        backgroundColor: backgroundUrl ? "transparent" : "bg-customGray",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container flex justify-between h-16 mx-auto px-0 sm:px-6">
        <Logo src={logoUrl}>
          {logoText && <h2 className="text-2xl font-bold text-sfuDarkRed" style={{ fontFamily: "Trebuchet MS" }}>{logoText}</h2>}
        </Logo>

        <div className="items-center flex-shrink-0 hidden lg:flex">
          <ul className="items-stretch hidden space-x-3 lg:flex">
            {userID && (
              <li key={0} className={`flex items-center mx-4 -mb-1 border-b-2 dark:border-transparent`}>
                {auth.loggedinText + userID}
              </li>
            )}
            <SessionLink key={1} loginText={auth.loginText} logoutText={auth.logoutText} />
            {links.map((item: NavLink) => (
              <NavLink key={item.id + 2} {...item} />
            ))}
            <LocaleControl text={navbar.localeControlText} />
          </ul>
        </div>

        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
