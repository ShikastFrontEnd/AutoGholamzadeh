'use client'
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import moment from "jalali-moment";
import { toast, ToastContainer } from "react-toastify";
import Breadcrumb from "../components/Breadcrumb";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import config from "/next.config";
const baseUrl=config.images.remotePatterns[0].hostname;
function MyDrives({infos}) {
    return(<>
    <div className="rounded-lg w-fit h-auto backdrop-blur-3xl   flex justify-center items-center">
            <span
            className="relative block overflow-hidden rounded-xl h-full border box p-4 sm:p-6 lg:p-8"
            dir="rtl"
            >
            <span
                className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-gholamzadeh-productcolor via-gholamzadeh-color to-gholamzadeh-productcolor"
            ></span>
    
            <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                <h3 className="text-lg font-bold text-gholamzadeh-color sm:text-xl">
                   تست درایو های من شماره {infos.Number}
                </h3>
    
                <p className="mt-1 text-xs font-medium text-white">نمایندگی 729 لوکانو</p>
                </div>
    
                <div className="block">
                <img
                    alt=""
                    src="/static/images/gxtrim.png"
                    className="size-16 rounded-lg object-cover shadow-sm"
                />
                </div>
            </div>
            <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {infos.firstName}
                    </dt>
                
                <dd className="text-xs text-white">نام</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                   {infos.lastName}
                    </dt>
                
                <dd className="text-xs text-white">نام خانوادگی</dd>
                </div>
                </dl>
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {infos.gender}
                    </dt>
                
                <dd className="text-xs text-white">جنسیت</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                   {infos.job}
                    </dt>
                
                <dd className="text-xs text-white">شغل</dd>
                </div>
                </dl>
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {infos.nationalCode}
                    </dt>
                
                <dd className="text-xs text-white">کد ملی</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {infos.phone}
                    </dt>
                
                <dd className="text-xs text-white">تلفن همراه</dd>
                </div>
                </dl>
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {infos.carModel}
                    </dt>
                
                <dd className="text-xs text-white">خودرو</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                   {infos.city}
                    </dt>
                
                <dd className="text-xs text-white">شهرستان</dd>
                </div>
                </dl>
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {infos.isDriveLicence?'دارد':'ندارد'}
                    </dt>
                
                <dd className="text-xs text-white">وضعیت گواهینامه</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {infos.isCustomer?'بود':'نخیر'}
                    </dt>
                
                <dd className="text-xs text-white">قبلا مشتری بود؟</dd>
                </div>
                </dl>
            
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {infos.customerCarModel}
                    </dt>
                
                <dd className="text-xs text-white">خودروفعلی</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {infos.howMany}
                    </dt>
                
                <dd className="text-xs text-white">تعداد همراه </dd>
                </div>
                </dl>
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {infos.created_at}
                    </dt>
                
                <dd className="text-xs text-white">تاریخ ثبت نام</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {infos.status}
                    </dt>
                
                <dd className="text-xs text-white">وضعیت تست درایو</dd>
                </div>
                </dl>
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {infos.address}
                    </dt>
                
                <dd className="text-xs text-white">مکان برگزاری</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {infos.eventPlace}
                    </dt>
                
                <dd className="text-xs text-white">ایونت</dd>
                </div>
                </dl>
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm text-wrap max-w-96 font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
               {infos.description}
                    </dt>
                
                <dd className="text-xs text-white">توضیحات </dd>
                </div>
                
                </dl>
            
            </span></div>
            </>)
}



export default function MyTestDrives(params) {
    const [allInfos, setAllInfos] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const token=Cookies.get('user-cookie');
    const fetchData = async () => {
        setLoading(true)
        try {
          const response = await axios.get(`${baseUrl}/api/web/testDrive/showTestDrive`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            setAllInfos(response.data.data);
            setLoading(false)
          } else {
            throw new Error('Network response was not ok');setLoading(false)
          }
        } catch (error) {
          if (error.response) {
            if (error.response.status === 401) {
              router.push('/loginRegister');
            } else {
             setLoading(false)
            }
          } else if (error.request) {
            setLoading(false)
          } else {
            setLoading(false)
          }
        }
      };
      
      useEffect(() => {
        fetchData(); // Call the fetchData function when the component mounts
      }, []);
      const breadcrumbLinks = [
        { url: '/mytestdrives', label: 'تست درایو های من' }
      ];
      return (
        <>
            <Header />
        <div className="z-50"><ToastContainer /></div>
        <div className="bg-zinc-400 bg-auto h-full w-full" >
                    <div
                        className={`bg-gradient-to-t from-gholamzadeh-productcolor to-zinc-900 bg-no-repeat bg-cover bg-bottom bg-gray-200 flex justify-center items-center w-full ${loading?'h-screen':'h-full'}`}
                        // style={{ backgroundImage: "url('/static/images/gxtrim.jpg')" }} 
                    >

                        <div className="pt-56">
                         
            {loading? <div className="w-full h-screen flex justify-center items-center">
              <BeatLoader
        color={'red'}
        size={'30 md:150'}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>:<><div className="mb-5 pb-5 mx-auto  w-full  max-w-full border-b-2 border-gray-100  md:top-6  lg:max-w-screen-lg">
      <div className="w-full flex flex-col md:flex-row justify-between px-5 md:px-0">
        <div className="w-full"><Breadcrumb links={breadcrumbLinks}
        /></div>
        <div className="flex justify-end items-center w-full"><h1 className="text-end">لیست خودرو های موجود و شرایط فروش نقدی و اقساطی</h1></div>
      </div>
      </div></>}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-[1200px] gap-10 px-5 my-5">
            {Array.isArray(allInfos) && allInfos.map((element) => (
                            <div key={element.Number} className="w-full flex justify-center ">
                                <MyDrives infos={element} />
                            </div>
                        ))}
</div>
                        </div>

                        </div>
        </div>
        <Footer />
        </>
    );
}