'use client'; // This line ensures that the component is treated as a client component

import React, { createContext, useContext, ReactNode } from 'react';

interface GlobalData {
    navbar: any;
    footer: any;
    background: any;
    socialLinks: any;
}

const GlobalContext = createContext<GlobalData | undefined>(undefined);

export const GlobalProvider: React.FC<{ value: GlobalData; children: ReactNode }> = ({ value, children }) => {
    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
};

