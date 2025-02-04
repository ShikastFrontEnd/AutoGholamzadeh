
import Link from 'next/link';
import React from 'react';

const Breadcrumb = ({ links }) => {
  return (
    <div className="rounded-lg p-0 py-2 md:p-3 flex items-center flex-wrap PEYDA-REGULAR text-sm">
      <ul className="flex items-center">
      <li className="inline-flex items-center">
            <Link href="/">
          <span  className="text-gray-100 hover:text-blue-500 border md:border-0 rounded-lg">
            <i className="w-5 bi bi-house-door-fill h-auto fill-current mx-2 text-white hover:text-blue-500"></i>
          </span>
          <span className="mx-4 h-auto text-white font-medium">/</span>
            </Link>
        </li>
        {links.map((link, index) => (
          <li key={index} className={`inline-flex items-center  ${link.classNames} `}>
            <Link href={link.url}>
              <span className="text-gray-100 hover:text-blue-500">
                {link.label}
              </span>
            </Link>
            {index < links.length - 1 && (
              <span className="mx-4 h-auto text-white font-medium">/</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumb;