'use client'
'use client'
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const GetUserToken = () => {
    const [logined, setLogined] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    useEffect(() => {
        const userCookie = getCookie('user-cookie');
        if (userCookie) {
            setLogined(true);
        }
        setLoading(false); // Set loading to false after checking the cookie
    }, []);

    // Redirect only if not loading and not logged in
    if (!loading) {
        if (!logined) {
            redirect('/loginRegister');
        } else {
           
        }
    }

    return null; // Return null or a loading spinner while checking
}

export default GetUserToken;