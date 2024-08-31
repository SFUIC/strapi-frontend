"use client";
import { useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import Link from 'next/link'; // Adjust according to your routing library
import { useAuth } from '../contexts/AuthContext';

export default function SessionLink({ loginText, logoutText }: { loginText: string, logoutText: string }) {
    const { userData, setUserData } = useAuth();
    const linkText = userData ? logoutText : loginText;

    const handleLoginClick = (e: any) => {
        e.preventDefault();
        const url = userData
            ? "https://cas.sfu.ca/cas/logout"
            : `https://cas.sfu.ca/cas/login?service=${window.location.href}`;
        if (userData) {
            setUserData(null); // Clear the auth context
            localStorage.removeItem('userData');
            window.location.href = url; // Redirect to CAS logout URL

        } else {
            window.location.href = url; // Redirect to CAS login URL
        }
    };

    useEffect(() => {
        const validateTicket = async () => {
            try {
                const queryParams = new URLSearchParams(window.location.search);
                const ticket = queryParams.get('ticket');
                if (ticket) {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/proxy/validateTicket`, {
                        params: { serviceUrl: window.location.origin + window.location.pathname, ticket: ticket }
                    });

                    const newUserData = response.data;
                    if (newUserData && newUserData.status !== 401) {
                        setUserData(newUserData); // Set the auth context with new user data
                        localStorage.setItem('userData', JSON.stringify(userData))
                    } else {
                        console.error('Failed to authenticate');
                    }
                }
            } catch (error) {
                console.error('Error validating ticket:', error);
            }
            window.history.replaceState(null, '', window.location.origin + window.location.pathname);
        };

        validateTicket();
    }, []);

    return (
        <li className="flex">
            <Link
                href={"/"}
                className={`flex items-center mx-4 -mb-1 border-b-2 dark:border-transparent ${userData ? "dark:text-sfuDarkRed dark:border-sfuLightRed" : "dark:text-sfuDarkRed"}`}
                onClick={handleLoginClick}
            >
                {linkText}
            </Link>
        </li>
    );
}
