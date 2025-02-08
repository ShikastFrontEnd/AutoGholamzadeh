'use client'

import Cookies from "js-cookie";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
    const token = Cookies.get('user-cookie');
    const [changeColor, setChangeColor] = useState(true);
    const [buttonText, setButtonText] = useState('');
    const [nextButtonText, setNextButtonText] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // State for mobile nav

    useEffect(() => {
        if (token) {
            setButtonText('خروج از حساب');
            setNextButtonText('تغییر شماره');
        } else {
            setButtonText('ثبت نام / ورود');
            setNextButtonText('غلامزاده');
        }
    }, [token]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    return (
        <header className={`fixed inset-x-0 top-0 z-50 mx-auto  max-w-screen w-full border border-gray-100 bg-black/50 py-3 shadow backdrop-blur-sm md:top-6 md:rounded-3xl lg:max-w-screen-lg`}>
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        <Link href="/" passHref>
                            <span aria-current="page" className="flex lg:flex items-center">
                                <div className="flex justify-center items-center">
                                    <div className="BeutyFont text-2xl lg:text-5xl text-gholamzadeh-color">
                                        <h1 className="w-auto min-w-full max-w-[350px] h-auto ">Gholamzadeh</h1>
                                    </div>
                                </div>
                                <p className="sr-only">Gholamzadeh</p>
                            </span>
                        </Link>
                    </div>
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
                    <div className="flex items-center justify-end gap-3 text-nowrap">
                    <Link href={token ? "/logout" : "/loginRegister"}>
                        <span
                            className={`hidden md:block items-center justify-center rounded-xl ${isMounted && changeColor ? 'bg-gholamzadeh-productcolor' : 'bg-gholamzadeh-color'} px-3 py-2 text-sm PEYDA-REQULAR text-white shadow-sm transition-all duration-150 focus-visible:outline 
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
                            onMouseEnter={() => setChangeColor(true)}
                            onMouseLeave={() => setChangeColor(false)}
                        >
                            {buttonText}
                        </span>
                    </Link>

                    {/* Button for mobile view */}
                    <button className="flex md:hidden" onClick={toggleMobileNav}>
                        <i className="bi bi-list text-white" alt="Menu" />
                    </button>

                    {/* Second link for medium and larger screens */}
                    <Link href={token ? "/loginRegister" : "/loginRegister"} passHref>
                        <span
                            className={`hidden md:flex items-center justify-center rounded-xl ${changeColor ? 'bg-gholamzadeh-color' : 'bg-gholamzadeh-productcolor'} px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 focus-visible:outline 
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
                        >
                            {nextButtonText}
                        </span>
                    </Link>
                    </div>
                    
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileNavOpen && (
                <div dir="rtl" id="mobile-nav" className="w-screen md:hidden  h-screen absolute z-40">
                    {/* <div className="inset-0  fixed w-full h-full" onClick={toggleMobileNav}></div> */}
                    <div className="w-full h-full bg-black  absolute right-0 top-3 border border-x-0 border-b-0 border-gray-100   bg-opacity-50" onClick={toggleMobileNav}>
                    <div dir="rtl" className="w-64 z-20 border border-gray-100 border-t-0 bg-gradient-to-r from-gholamzadeh-productcolor to-zinc-900 shadow flex-col justify-between transition duration-150 ease-in-out h-full">
                        <div className="flex flex-col justify-between h-full">
                            <div className="px-6 pt-4 overflow-y-auto">
                                <div className="flex items-center justify-between border-b-2 border-gholamzadeh-color">
                                    <div aria-label="Home" role="img" className="flex items-center">
                                                    <div className="flex justify-center items-center">
                                                    <div className="BeutyFont text-2xl lg:text-5xl text-gholamzadeh-color">
                                                        <h1 className="w-auto min-w-full max-w-[350px] h-auto ">Gholamzadeh</h1>
                                                    </div>
                                                </div>
                                    </div>
                                    <button className="text-gholamzadeh-color focus:outline-none" onClick={toggleMobileNav}>
                                        <i className="bi bi-x-lg text-gholamzadeh-color" alt="Close"></i>
                                    </button>
                                </div>
                                <ul className="f-m-m border-b-2 border-gholamzadeh-color pb-2">
                                    <li className="text-gray-800 pt-8">
                                        <Link href="/aboutus" passHref>
                                            <span className="text-gholamzadeh-color">درباره ما</span>
                                        </Link>
                                    </li>
                                    <li className="text-gray-800 pt-8">
                                        <Link href="/preregisterform" passHref>
                                            <span className="text-gholamzadeh-color">پیش ثبت نام خودرو</span>
                                        </Link>
                                    </li>
                                    <li className="text-gray-800 pt-8">
                                        <Link href="/showpreregisterform" passHref>
                                            <span className="text-gholamzadeh-color">پیش ثبت نام های من</span>
                                        </Link>
                                    </li>
                                    <li className="text-gray-800 pt-8">
                                        <Link href="/testdrive" passHref>
                                            <span className="text-gholamzadeh-color">تست درایو</span>
                                        </Link>
                                    </li>
                                    <li className="text-gray-800 pt-8">
                                        <Link href="/mytestdrives" passHref>
                                            <span className="text-gholamzadeh-color">تست درایو های من</span>
                                        </Link>
                                    </li>
                                    <li className="text-gray-800 pt-8">
                                        <Link href="/suggestions" passHref>
                                            <span className="text-gholamzadeh-color">انتقادات و پیشنهادات</span>
                                        </Link>
                                    </li>
                                    <li className="text-gray-800 pt-8">
                                        <Link href="/followupsuggestions" passHref>
                                            <span className="text-gholamzadeh-color">پیگیری انتقادات و پیشنهادات</span>
                                        </Link>
                                    </li>
                                </ul>
                                <div className="p-5 flex justify-center items-center">
                                <div className="flex items-center justify-end gap-3 text-nowrap">
                    <Link href={token ? "/logout" : "/loginRegister"}>
                        <span
                            className={` items-center justify-center rounded-xl ${isMounted && changeColor ? 'bg-gholamzadeh-productcolor' : 'bg-gholamzadeh-color'} px-3 py-2 text-sm PEYDA-REQULAR text-white shadow-sm transition-all duration-150 focus-visible:outline 
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
                            onMouseEnter={() => setChangeColor(true)}
                            onMouseLeave={() => setChangeColor(false)}
                        >
                            {buttonText}
                        </span>
                    </Link>

                    {/* Button for mobile view */}
                    

                    {/* Second link for medium and larger screens */}
                    <Link href={token ? "/loginRegister" : "/loginRegister"} passHref>
                        <span
                            className={`items-center justify-center rounded-xl ${changeColor ? 'bg-gholamzadeh-color' : 'bg-gholamzadeh-productcolor'} px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 focus-visible:outline 
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
                        >
                            {nextButtonText}
                        </span>
                    </Link>
                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;