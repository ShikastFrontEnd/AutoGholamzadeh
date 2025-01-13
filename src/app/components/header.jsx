'use client'

import Link from "next/link";
import { useState } from "react";

const Header = () => {
    const [changeColor, setChangeColor] = useState(true);

    return (
        <header className={`fixed inset-x-0 top-0 z-30 mx-auto w-screen max-w-screen border border-gray-100 bg-black/50 py-3 shadow backdrop-blur-sm md:top-6 md:rounded-3xl lg:max-w-screen-lg`}>
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        {/* Logo visible only on small screens */}
                        
                        {/* Full header content visible on larger screens */}
                        <Link href="/" passHref>
                            <span aria-current="page" className="hidden md:flex lg:flex items-center">
                                <div className="flex justify-center items-center">
                                    <img 
                                        src="/static/images/ecodalucano.png" 
                                        alt="Logo" 
                                        className="w-auto min-w-72 max-w-[350px] h-auto filter invert brightness-200" 
                                    />
                                </div>
                                <p className="sr-only">LUCANO729</p>
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center justify-center gap-5 md:flex md:items-center md:justify-center md:gap-5">
    <Link href="/aboutus" passHref>
        <span className="text-nowrap inline-block rounded-lg px-2 py-1 text-xs sm:text-sm font-medium text-white transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
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
</div>
                    <div className="flex items-center justify-end gap-3 text-nowrap">
                        <a
                            className={` items-center justify-center rounded-xl ${changeColor ? 'bg-lucano-productcolor' : 'bg-lucano-color'} px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 focus-visible:outline 
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:inline-flex`}
                            href="/loginRegister"
                            onMouseEnter={() => setChangeColor(true)}
                            onMouseLeave={() => setChangeColor(false)}
                        >
                            ثبت نام / ورود
                        </a>
                        <a
                            className={`hidden md:flex items-center justify-center rounded-xl ${changeColor ? 'bg-lucano-color' : 'bg-lucano-productcolor'} px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 focus-visible:outline 
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:inline-flex`}
                            href="/loginRegister"
                        >
                        رادین تجارت
                                        </a>
                        
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;