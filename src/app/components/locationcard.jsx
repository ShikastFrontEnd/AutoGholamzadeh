'use client'
import Link from 'next/link';
import React from 'react';

const LocationCard = (data) => {
    const handlerOpenMap = () => {
        window.open(data.data.LocationAddress, "_blank");
    }
    return (
        <div className="w-full">
            {/* Card start */}
            <div className="mx-auto border-white bg-gholamzadeh-color rounded-lg  overflow-hidden shadow-lg shadow-gholamzadeh-color border">
                <div className="border-b px-0 pb-6 w-full ">
                    <div className="text-center w-full">
                    <div className="w-full h-96">
                        
                        <iframe
                            className="w-full h-full border-0"
                            src={data.data.LocationAddress}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map"
                        ></iframe>
                    </div>
                        <div className="py-2">
                            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">{data.data.RepresentationName}</h3>
                            <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                <div className=""></div>
                                {data.data.LocationSyntax}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 px-2">
                        <button onClick={handlerOpenMap} className="flex-1 rounded-full bg-gholamzadeh-productcolor text-white dark:text-white antialiased font-bold hover:bg-zinc-900  px-4 py-2">
                            باز کردن نقشه
                        </button>
                        <Link href={`tel:${data.data.RepresentationPhone}`} className="flex justify-between rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
                        <div className="w-full"><span>{data.data.RepresentationPhone}</span> </div><div className="w-full pl-1"><i className='bi bi-telephone-fill text-gholamzadeh-productcolor'></i></div>
                        </Link>
                    </div>
                </div>
                
            </div>
            {/* Card end */}
        </div>
    );
};

export default LocationCard;