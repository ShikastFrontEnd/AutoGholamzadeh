import React from 'react';

export default function SearchBox({ value, setValue, onChange }) {
    return (
        <div className="relative w-full">
            <input
                dir="rtl"
                className="appearance-none border-2 box pr-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-gholamzadeh-color focus:border-gholamzadeh-color focus:shadow-outline"
                id="username"
                type="text"
                value={value}
                onChange={onChange}
                placeholder="جستجو..."
            />
            <div className="absolute left-0 inset-y-0 flex items-center">
                <i
                    className="bi bi-x-lg -mr-1 ml-3 h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer"
                    onClick={() => setValue('')} // Corrected this line
                ></i>
            </div>

            <div className="absolute right-0 inset-y-0 flex items-center">
                <i className="h-6 bi bi-search w-6 mr-3 text-gray-400 hover:text-gray-500"></i>
            </div>
        </div>
    );
}

// Usage example
