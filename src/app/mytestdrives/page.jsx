import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
export default function MyTestDrives(params) {
    return(
        <>
            <Header />
            <div className="bg-zinc-400 bg-auto h-full w-full" >
                        <div
                            className="bg-no-repeat bg-cover bg-bottom bg-gray-200 py-32  flex justify-center items-center w-full h-full"
                            style={{ backgroundImage: "url('/static/images/lucano1.jpg')" }} 
                        >
                            <div className="rounded-lg w-fit h-auto backdrop-blur-3xl   flex justify-center items-center">
            <span
            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
            dir="rtl"
            >
            <span
                className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-lucano-productcolor via-lucano-color to-lucano-productcolor"
            ></span>
    
            <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                <h3 className="text-lg font-bold text-lucano-color sm:text-xl">
                   تست درایو های من
                </h3>
    
                <p className="mt-1 text-xs font-medium text-white">نمایندگی 729 لوکانو</p>
                </div>
    
                <div className="block">
                <img
                    alt=""
                    src="/static/images/lucanoAboutUs.png"
                    className="size-16 rounded-lg object-cover shadow-sm"
                />
                </div>
            </div>
            <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    علی
                    </dt>
                
                <dd className="text-xs text-white">نام</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    نیکو
                    </dt>
                
                <dd className="text-xs text-white">نام خانوادگی</dd>
                </div>
                </dl>
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    مرد
                    </dt>
                
                <dd className="text-xs text-white">جنسیت</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    برنامه نویس
                    </dt>
                
                <dd className="text-xs text-white">شغل</dd>
                </div>
                </dl>
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    2742642145
                    </dt>
                
                <dd className="text-xs text-white">کد ملی</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    09051383167
                    </dt>
                
                <dd className="text-xs text-white">تلفن همراه</dd>
                </div>
                </dl>
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    اکستریم VX
                    </dt>
                
                <dd className="text-xs text-white">خودرو</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    اروميه
                    </dt>
                
                <dd className="text-xs text-white">شهرستان</dd>
                </div>
                </dl>
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    دارد
                    </dt>
                
                <dd className="text-xs text-white">وضعیت گواهینامه</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    بود
                    </dt>
                
                <dd className="text-xs text-white">قبلا مشتری بود؟</dd>
                </div>
                </dl>
            
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    فونیکس
                    </dt>
                
                <dd className="text-xs text-white">خودروفعلی</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    0
                    </dt>
                
                <dd className="text-xs text-white">تعداد همراه </dd>
                </div>
                </dl>
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    1403-10-26
                    </dt>
                
                <dd className="text-xs text-white">تاریخ ثبت نام</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    انجام شده
                    </dt>
                
                <dd className="text-xs text-white">وضعیت تست درایو</dd>
                </div>
                </dl>
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    شیخ شلتوت روبروی میدان تره بار
                    </dt>
                
                <dd className="text-xs text-white">مکان برگزاری</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    انجام شده
                    </dt>
                
                <dd className="text-xs text-white">وضعیت تست درایو</dd>
                </div>
                </dl>
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm text-wrap max-w-96 font-medium text-lucano-color hover:text-white cursor-pointer">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident, nobis. Accusamus, aut exercitationem? Eum veniam libero delectus commodi rerum exercitationem sunt porro, tenetur doloremque mollitia labore nisi alias, voluptates hic!
                    </dt>
                
                <dd className="text-xs text-white">توضیحات </dd>
                </div>
                
                </dl>
            
            </span></div></div>
            </div>
            <Footer />
    
        </>
       ) 
}