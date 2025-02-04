import Link from "next/link";

// NotFound.js
export default function NotFound() {
    return (
        <div className="min-h-screen  bg-gholamzadeh-productcolor flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center border border-gholamzadeh-color p-3 rounded-3xl">
          <div className="mb-8">
            <h2 className="mt-6 text-6xl font-extrabold text-gray-900 dark:text-gholamzadeh-color">404</h2>
            <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-gholamzadeh-color">Page not found</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">متأسفیم، ما نتوانستیم پیچ مورد نظر را پیدا کنیم.</p>
          </div>
          <div className="mt-2">
            <Link href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gholamzadeh-color hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg className="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18m-9-9l9 9-9 9" />
              </svg>
              صفحه اصلی
            </Link>
          </div>
        </div>
        <div className="mt-2 w-full max-w-2xl">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-gray-100 dark:bg-gray-600 p-2 text-sm text-gray-500 dark:text-gray-400">
              اگر فکر می کنید این یک اشتباه است، لطفا با پشتیبانی تماس بگیرید
              </span>
            </div>
          </div>
        </div>
      </div>
    );
}