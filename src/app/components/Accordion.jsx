'use client'
import Link from 'next/link';
import React, { useState } from 'react';

const Accordion = ({ RepresentationName,RepresentationPhone,RepresentationInstagram, index }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8 py-12">
            <div className="overflow-hidden w-full shadow-md rounded-2xl bg-gholamzadeh-productcolor box border-gray-100">
                <div
                    className="bg-gholamzadeh-color p-4 w-full cursor-pointer flex justify-between items-center rounded-2xl"
                    onClick={() => toggleAccordion(index)}
                >
                    <h3 className=" text-lg w-full">{RepresentationName}</h3>
                    <span className={`bi bi-chevron-down ${openIndex === index ? 'bi bi-chevron-up' : ''}`}>
                    </span>
                </div>
                <div className={`p-4 ${openIndex === index ? '' : 'hidden'} text-center w-full flex justify-between`}>
                    <Link href={`tel:${RepresentationPhone}`} className="flex w-full justify-center items-center"><i className="bi bi-telephone text-white hover:text-gholamzadeh-color"></i></Link>
                    <div className="w-full"><i className="border border-white text-white"></i></div>
                    <Link href={`https://www.instagram.com/${RepresentationInstagram}`} className="flex w-full justify-center items-center"><i className="bi bi-instagram text-white hover:text-gholamzadeh-color"></i></Link>
                
                
                
                </div>
            </div>
        </div>
    );
};

export default Accordion;