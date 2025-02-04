'use client'

import React, { useEffect, useRef, useState } from 'react';
import 'animate.css'; // Import Animate.css
import Link from 'next/link';

export default function FifthSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Stop observing once the section is visible
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the section is visible
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            className={`w-full bg-gradient-to-b to-zinc-900 from-gholamzadeh-productcolor ${isVisible ? 'animate__animated animate__fadeIn' : ''}`}
        >
            <div className="relative flex flex-col items-center max-w-screen-2xl px-4 mx-auto md:flex-row sm:px-6 p-8">
                <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pr-10">
                    <div className="text-left">
                    <h2 className="text-4xl leading-10 PEYDA-BOLD tracking-tight text-gholamzadeh-productcolor sm:text-5xl sm:leading-none md:text-6xl">
    <span className="pr-2 text-gray-100">نمایندگی</span> {/* Add padding-right */}
    <span className="text-gholamzadeh-color">غلامزاده</span>
</h2>
                        <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        هلدینگ خودرویی غلامزاده قدیمی ترین و بزرگترین نمایندگی خودروهای چینی در ارومیه
                        </p>
                        <div className="mt-5 sm:flex md:mt-8">
                            <div className="rounded-md shadow">
                                <Link href={'/testdrive'}
                                    className="flex items-center justify-center w-full px-8 py-3 text-base  leading-6 text-white transition duration-150 ease-in-out bg-gholamzadeh-color border border-transparent rounded-md hover:bg-white hover:text-gholamzadeh-color focus:outline-none focus:shadow-outline-blue md:py-4 md:text-lg md:px-10">
                                    ثبت تست درایو
                                </Link>
                            </div>
                            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                <Link href={'/preregisterform'}
                                    className="flex items-center justify-center w-full px-8 py-3 text-base  leading-6 text-gholamzadeh-color transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-white hover:bg-gholamzadeh-color focus:outline-none focus:shadow-outline-blue md:py-4 md:text-lg md:px-10">
                                    پیش ثبت نام
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pl-10">
                    <div className="relative w-full p-3 rounded">
                        <div className={`rounded-lg ${isVisible ? 'animate__animated animate__bounceInRight' : ''} text-black w-full`}>
                            <img src="/static/images/tiggo.png" className="w-full" alt="Random" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}