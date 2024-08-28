'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of the context value
interface UserData {
    userId: string;
    // Add other properties you want to store in the user data, such as name, email, roles, etc.
}

interface AuthContextType {
    userData: UserData | null;
    setUserData: (data: UserData | null) => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
    userData: null,
    setUserData: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<UserData | null>(null);

    // You can add a useEffect here if you want to initialize userData from somewhere, like local storage

    const value = { userData, setUserData };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
