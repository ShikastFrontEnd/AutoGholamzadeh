'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Remove the cookie
        Cookies.remove('user-cookie', { path: '' });
        
        // Redirect to the home page
        router.push('/');
    }, [router]);

    // Set loading to false after the effect runs
    useEffect(() => {
        setLoading(false);
    }, []);

    // Show a loading state while logging out
    if (loading) {
        return <div>Logging out...</div>;
    }

    return null; // or <div>Logging out...</div>
}