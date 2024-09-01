import Image from 'next/image';
import { getPages } from '../services/pages';
import { getStrapiMedia } from '../utils/api-helpers';
import { cookies } from 'next/headers';

export default async function AboutPage() {
    const locale = cookies().get("LOCALE")?.value;
    const pages = await getPages(locale);
    if (!pages || !pages.data) return null;
    const { chunks } = pages.data[0].attributes;
    const { title, description, picture } = chunks[0];
    const text = chunks[1].body;
    const containsHTML = /<\/?[a-z][\s\S]*>/i.test(text);
    const heroBackgroundUrl = getStrapiMedia(picture.data.attributes.url);

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative w-full" style={{ aspectRatio: '16 / 5' }}>
                <Image
                    src={heroBackgroundUrl ? heroBackgroundUrl : "https://via.placeholder.com/800x250"}
                    alt="Hero Background"
                    fill
                    style={{ objectFit: "cover" }}
                    className="absolute inset-0 z-0"
                />
                <div className="flex items-center justify-center h-full bg-black bg-opacity-50 z-10 relative">
                    <div className="text-center text-white px-6 md:px-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                        <p className="text-lg md:text-xl">{description}</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="py-12 px-6 md:px-12 flex justify-center">
                <div className="max-w-2xl w-full">
                    {containsHTML ?
                        <div
                            className="text-black text-lg md:text-xl leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: text }}
                        />
                        :
                        <div className="text-black text-lg md:text-xl leading-relaxed">
                            {text}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

