// LocaleControl.tsx
import React, { useEffect, useState } from 'react';
import { useLocale } from '../contexts/LocaleContext'; // Adjust the import path as needed
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { i18n } from '../../../../i18n-config';

const LocaleControl: React.FC<{ text?: string }> = ({ text = "Language" }) => {
    const { locale, setLocale } = useLocale();
    const [locales, setLocales] = useState<string[]>([]);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Retrieve locales from i18n and set them in the state
        // @ts-ignore
        const availableLocales: string[] = i18n.locales || ['en']; // Fallback to ['en'] if i18n.locales is undefined
        setLocales(availableLocales);

        // Check if the current locale is valid
        if (!availableLocales.includes(locale)) {
            // If the current locale is not in the list, use the browser's language or fallback to 'en'
            const userLocale = navigator.language || 'en';
            const initialLocale = availableLocales.includes(userLocale) ? userLocale : 'en';
            setLocale(initialLocale);
        }
    }, [locale, setLocale]);

    const handleLocaleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const newLocale = event.target.value;
        setLocale(newLocale);

        // Use router to navigate to the new locale's URL
        // Replace locale in path
        const segments = pathname.split('/');
        if (segments.length > 1) {
            segments[1] = newLocale;
        }
        const newPathname = segments.join('/');
        await router.push(newPathname + searchParams.toString());
        router.refresh();
    };

    return (
        <div>
            <label htmlFor="locale-select">{text}</label>
            <select
                id="locale-select"
                value={locale}
                onChange={handleLocaleChange}
            >
                {locales.map(locale => {
                    const display = new Intl.DisplayNames(locale, { type: "language" });
                    return (
                        <option key={locale} value={locale}>
                            {display.of(locale)}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default LocaleControl;


