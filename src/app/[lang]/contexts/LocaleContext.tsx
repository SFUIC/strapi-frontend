// LocaleContext.tsx
"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';

// Define the type for your context
interface LocaleContextType {
    locale: string;
    setLocale: (locale: string) => void;
}

// Create the context with a default value
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Define a provider component
export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cookies, setCookie] = useCookies(['LOCALE']);
    const [locale, setLocaleState] = useState<string>(cookies.LOCALE || 'en');

    // Update cookie whenever locale changes
    useEffect(() => {
        setCookie('LOCALE', locale, { path: '/' });
    }, [locale, setCookie]);

    const setLocale = (newLocale: string) => {
        setLocaleState(newLocale);
    };

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    );
};

// Create a custom hook to use the locale context
export const useLocale: any = (): LocaleContextType => {
    const context = useContext(LocaleContext);
    if (context === undefined) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
};
