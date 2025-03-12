'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LogoutPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Remove the cookie
        Cookies.remove('user-cookie', { path: '' });

        const retrievedRoute = localStorage.getItem('cameRoute');
        const routeToPush = retrievedRoute ? retrievedRoute : '/';

        // Set loading to false immediately after removing the cookie
        setLoading(false);

        // Set a timeout for the logout process
        const timeoutId = setTimeout(() => {
            router.push(routeToPush);
            localStorage.removeItem('cameRoute');
        }, 200); // 2000 milliseconds = 2 seconds

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
    }, [router]);

    // Show a loading state while logging out
    if (loading) {
        return (
            <div className="min-h-screen bg-gholamzadeh-productcolor flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 text-center border border-gholamzadeh-color p-3 rounded-3xl">
                    <div className="mb-8">
                        <h2 className="mt-6 text-6xl font-extrabold text-gray-900 dark:text-gholamzadeh-color">Logging out...</h2>
                        <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-gholamzadeh-color">Please wait</p>
                    </div>
                </div>
            </div>
        );
    }

    return null; // This will not be reached because of the redirect
}