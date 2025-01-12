'use client'
import Link from "next/link";
import { useRef } from "react";

const Footer = () => {
    // Create a ref for the address paragraph
    const addressRef = useRef(null);

    // Function to scroll to the address paragraph
    const scrollToAddress = () => {
        if (addressRef.current) {
            addressRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="mx-auto w-full relative text-center bg-gradient-to-r from-lucano-color to-lucano-productcolor text-white">
            <div className="px-6 py-8 md:py-14 xl:pt-20 xl:pb-12">
                <h2 className="font-bold text-3xl xl:text-4xl leading-snug">
                    لوکانو فراتر از کلاسیک
                </h2>
                <Link
                    className="mt-8 xl:mt-12 px-12 py-5 text-lg font-medium leading-tight inline-block bg-lucano-color rounded-full shadow-xl border border-transparent hover:bg-lucano-productcolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-999 focus:ring-sky-500"
                    href="/preregisterform"
                >
                    پیش ثبت نام
                </Link>
                <div className="mt-14 xl:mt-20">
                    <nav className="flex flex-wrap justify-center text-lg font-medium">
                        <div className="px-5 py-2">
                            <a href="#" onClick={scrollToAddress}>ادرس ما<i className="pl-1 bi bi-geo-alt-fill"></i></a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="#">درباره ما<i className="pl-1 bi bi-info-circle"></i></a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="tel:09361411566">تلفن : 09361411566 <i className="pl-1 bi bi-telephone"></i></a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="https://instagram.com/lucano.729">اینستاگرام<i className="pl-1 bi bi-instagram"></i></a>
                        </div>
                    </nav>
                    <p ref={addressRef} className="mt-7 text-base">آدرس : ارومیه - خیابان امام علی جنب مسجد امام علی پالم سنتر (در حال استاندارد سازی) بزودی افتتاح خواهد شد</p>
                    <p className="mt-7 text-base">© 2025 Lucano Radin Tejarat 729</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;