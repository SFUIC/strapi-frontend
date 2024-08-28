'use client';
import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    userData: any | null;
    setUserData: (data: any | null) => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
    userData: null,
    setUserData: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<any | null>(null);

    // useEffect to check localStorage on initial load
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    // Update localStorage whenever userData changes
    useEffect(() => {
        if (userData) {
            localStorage.setItem('userData', JSON.stringify(userData));
        } else {
            localStorage.removeItem('userData');
        }
    }, [userData]);

    const value = { userData, setUserData };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

