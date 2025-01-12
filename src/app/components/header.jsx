'use client'

import { useState } from "react";

const Header = () => {
    // Move useState inside the Header component
    const [changeColor, setChangeColor] = useState(true);

    return (
        <header className={`fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-black/50 py-3 shadow backdrop-blur-sm md:top-6 md:rounded-3xl lg:max-w-screen-lg`}>
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        <a aria-current="page" className="flex items-center" href="/">
                            <div className="flex justify-center items-center">
                                <img 
                                    src="https://ecodalucano.com/wp-content/uploads/2024/07/Logo-final-01-scaled-e1735563656132-300x27.webp" 
                                    alt="Logo" 
                                    className="w-auto maw-w-[350] h-auto" 
                                />
                            </div>
                            <p className="sr-only">Website Title</p>
                        </a>
                    </div>
                    <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                        <a
                            aria-current="page"
                            className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                            href="#"
                        >
                            درباره ما
                        </a>
                        <a
                            className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                            href="#"
                        >
                            پیش ثبت نام
                        </a>
                        <a
                            className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                            href="#"
                        >
                            تست درایو
                        </a>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <a
                            className={`hidden items-center justify-center rounded-xl ${changeColor?'bg-lucano-productcolor':'bg-lucano-color'} px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150  focus-visible:outline 
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:inline-flex`}
                            href="/loginRegister"
                            onMouseEnter={() => setChangeColor(true)}
                            onMouseLeave={() => setChangeColor(false)}
                        >
                            ثبت نام / ورود
                        </a>
                        <a
                            className={`inline-flex items-center justify-center rounded-xl ${changeColor?'bg-lucano-color':'bg-lucano-productcolor'}   px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
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