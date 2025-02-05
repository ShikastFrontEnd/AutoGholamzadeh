'use client'

import Cookies from "js-cookie";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
    const token = Cookies.get('user-cookie');
    const [changeColor, setChangeColor] = useState(true);
    const [buttonText, setButtonText] = useState('');
    const [nextButtonText, setNextButtonText] = useState('');

    useEffect(() => {
        if (token) {
            setButtonText('خروج از حساب');
            setNextButtonText('تغییر شماره');
        } else {
            setButtonText('ثبت نام / ورود');
            setNextButtonText('رادین تجارت');
        }
    }, [token]); 
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        <header className={` fixed inset-x-0 top-0 z-50 mx-auto w-screen max-w-screen border border-gray-100 bg-black/50 py-3 shadow backdrop-blur-sm md:top-6 md:rounded-3xl lg:max-w-screen-lg`}>
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        <Link href="/" passHref>
                            <span aria-current="page" className="flex lg:flex items-center">
                                <div className="flex justify-center items-center">
                                    {/* <img 
                                        src="/static/images/s.png" 
                                        alt="Logo" 
                                        className="w-auto min-w-72 max-w-[350px] h-auto filter invert brightness-200" 
                                    /> */}
                                    <div className="BeutyFont text-2xl lg:text-5xl text-gholamzadeh-color">
                                        <h1 className="w-auto min-w-full max-w-[350px] h-auto ">Gholamzadeh</h1>
                                    </div>
                                </div>
                                <p className="sr-only">Gholamzadeh</p>
                            </span>
                        </Link>
                    </div>
                    {/* <div className="flex md:hidden text-center"><Link href="/followupsuggestions" passHref>
                            <span className="text-nowrap inline-block rounded-lg px-2 py-1 text-xs sm:text-sm font-medium text-white transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                            پیگیری انتقادات
                            </span>
                        </Link></div> */}
                    <div className=" items-center hidden md:flex justify-center gap-5 md:items-center md:justify-center md:gap-5">
                        <Link href="/aboutus" passHref>
                            <span className=" text-nowrap inline-block rounded-lg px-2 py-1 text-xs sm:text-sm font-medium text-white transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                               درباره ما
                            </span>
                        </Link>
                        <Link href="/preregisterform" passHref>
                            <span className="text-nowrap inline-block rounded-lg px-2 py-1 text-xs sm:text-sm font-medium text-white transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                                پیش ثبت نام 
                            </span>
                        </Link>
                        <Link href="/testdrive" passHref>
                            <span className="text-nowrap inline-block rounded-lg px-2 py-1 text-xs sm:text-sm font-medium text-white transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                                تست درایو
                            </span>
                        </Link>
                        <Link href="/suggestions" passHref>
                            <span className="text-nowrap inline-block rounded-lg px-2 py-1 text-xs sm:text-sm font-medium text-white transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                                انتقادات و پیشنهادات
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center justify-end  gap-3 text-nowrap">
                    <Link href={token ? "/logout" : "/loginRegister"}>
        <span
            className={`items-center justify-center rounded-xl ${isMounted && changeColor ? 'bg-gholamzadeh-productcolor' : 'bg-gholamzadeh-color'} px-3 py-2 text-sm PEYDA-REQULAR text-white shadow-sm transition-all duration-150 focus-visible:outline 
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:inline-flex`}
            onMouseEnter={() => setChangeColor(true)}
            onMouseLeave={() => setChangeColor(false)}
        >
            {buttonText}
        </span>
    </Link>
<Link href={token ? "/loginRegister" : "/loginRegister"} passHref>
    <span
        className={`hidden md:flex items-center justify-center rounded-xl ${changeColor ? 'bg-gholamzadeh-color' : 'bg-gholamzadeh-productcolor'} px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 focus-visible:outline 
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:inline-flex`}
    >
        {nextButtonText}
        {/* You can add another button text here if needed */}
    </span>
</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;