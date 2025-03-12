'use client'
import Cookies from "js-cookie"; 
import Link from "next/link"; 
import { ToastContainer } from "react-toastify";

export default function MainSection() { 
    const token = Cookies.get('user-cookie'); 
    const isAdmin = Cookies.get('isAdmin'); 

    const adminItems = [
        { text: "انتقادات و پیشنهادات", href: "/suggestions" },
        { text: "پیگیری انتقادات و پیشنهادات", href: "/followupsuggestions" },
        { text: "پیش ثبت نام خودروها", href: "/preregisterform" },
        { text: "تست درایو", href: "/testdrive" },
        { text: "تست درایو های من", href: "/mytestdrives" },
        { text: " پیش ثبت نام های من", href: "/showpreregisterform" },
        { text: " محصولات", href: "/products" },
        { text: "شرایط فروش خودروها", href: "/carsalesconditions" },
        { text: "ثبت سفارش خدمات", href: "/serviceorder" }
    ];

    const userItems = [
        { text: "انتقادات و پیشنهادات", href: "/suggestions" },
        { text: "پیگیری انتقادات و پیشنهادات", href: "/followupsuggestions" },
        { text: "پیش ثبت نام خودروها", href: "/preregisterform" },
        { text: "تست درایو", href: "/testdrive" },
        { text: "تست درایو های من", href: "/mytestdrives" },
        { text: " پیش ثبت نام های من", href: "/showpreregisterform" },
        { text: " محصولات", href: "/products" },
        { text: "شرایط فروش خودروها", href: "/carsalesconditions" },
    ];

    return ( 
        <>
            <ToastContainer />
            <div
                className="bg-no-repeat bg-cover bg-bottom bg-gray-200 flex justify-center items-center w-full h-screen"
                style={{ backgroundImage: "url('/static/images/Xtrim.png')" }}
            >
                <div className="backdrop-blur-sm w-full h-full flex justify-center items-center sm:w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-4 max-w-screen">
                        {(token ? (isAdmin ? adminItems : userItems) : userItems).map((item, index) => (
                            <div 
                                key={index} 
                                className={`relative inline-flex ${index === 2 && token && isAdmin ? 'md:col-span-2' : ''}`}
                            >
                                <div
                                    className={`sm:w-full absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-gholamzadeh-color via-gholamzadeh-productcolor to-gholamzadeh-color rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt`}
                                ></div>
                                <Link href={item.href} passHref className="w-full">
                                    <span
                                        title={item.text}
                                        className="w-full text-nowrap relative inline-flex items-center justify-center px-6 py-3 text-base md:text-lg font-bold text-white transition-all duration-200 border border-gray-100 bg-black/50 shadow backdrop-blur-sm font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                        role="button"
                                    >
                                        {item.text}
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div> 
                </div> 
            </div> 
        </>
    ); 
}