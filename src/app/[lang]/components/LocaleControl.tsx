import { useState, useEffect } from 'react';
import { i18n } from '../../../../i18n-config';

export default function LocaleControl({ text = "Language" }: { text: string }) {
    const [selectedLocale, setSelectedLocale] = useState<string>('en'); // Default to English
    const [locales, setLocales] = useState<string[]>([]);

    useEffect(() => {
        // Retrieve locales from i18n and set them in the state
        const availableLocales: any = i18n.locales || ['en']; // Fallback to ['en'] if i18n.locales is undefined
        setLocales(availableLocales);

        // Set the default locale based on the user's browser settings
        const userLocale = navigator.language || 'en';
        setSelectedLocale(userLocale);
    }, []);

    const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = event.target.value;
        setSelectedLocale(newLocale);
        // Change locale
        window.location.reload();
    };

    return (
        <div>
            <label htmlFor="locale-select">{text}</label>
            <select
                id="locale-select"
                value={selectedLocale}
                onChange={handleLocaleChange}
            >
                {locales.map(locale => {
                    const display = new Intl.DisplayNames(locale, { type: "language" });
                    return (
                        <option key={locale} value={locale}>
                            {display.of(locale)}
                        </option>
                    )
                })}
            </select>
        </div>
    );
}

