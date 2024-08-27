"use client";
import { useGlobal } from "../GlobalContext";
import { Key } from "react";
import { RenderIcon } from "../utils/icon-renderer";
import { SocialLink } from "../types";

interface InfoLink {
    infoType: string;
    text: string;
    url?: string; // URL is optional for non-link info types
}

export default function Intro() {
    const { socialLinks } = useGlobal();
    console.log(socialLinks)
    return (
        <div className="bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
            <div className="p-8">
                <p className="text-gray-700">
                    This is a short paragraph description that introduces the content or
                    purpose of the box. It should be concise and to the point, providing a
                    clear overview of the information presented below.
                </p>
            </div>
            <hr className="mx-8 border-gray-300" />
            <div className="p-8 space-y-2 text-gray-600">
                {socialLinks.map((link: SocialLink, index: Key) => (
                    <div key={index} className="flex items-center space-x-2">
                        <RenderIcon type={link.social} />
                        {link.url ? (
                            <a href={link.url} className="text-gray-600 hover:underline">
                                {link.url}
                            </a>
                        ) : (
                            <span>{link.text}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
