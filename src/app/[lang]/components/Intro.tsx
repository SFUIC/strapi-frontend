"use client";
import { useGlobal } from "../contexts/GlobalContext";
import { Key } from "react";
import { RenderIcon } from "../utils/icon-renderer";
import { SocialLink } from "../types";

interface InfoLink {
    infoType: string;
    text: string;
    url?: string; // URL is optional for non-link info types
}

export default function Intro({ description = "", joinText = "", joinLink = "/" }: { description: string, joinText: string, joinLink: string }) {
    const { socialLinks } = useGlobal();
    return (
        <div className="bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
            <div className="px-8 pt-8">
                <p className="text-gray-700">
                    {description}
                </p>
            </div>
            <div className="m-4 flex justify-center">
                <a
                    href={joinLink}
                    className="bg-sfuLightRed hover:bg-sfuDarkRed text-white mx-12 px-4 py-2 rounded-full w-full"
                >
                    <center>{joinText}</center>
                </a>
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
