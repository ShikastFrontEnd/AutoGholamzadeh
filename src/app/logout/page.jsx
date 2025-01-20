'use client';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        // Remove the cookie
        Cookies.remove('user-cookie', { path: '' });
        
        // Redirect to the home page
        router.push('/');
    }, [router]);

    // Optionally, you can return a loading state or null
    return null; // or <div>Logging out...</div>
}