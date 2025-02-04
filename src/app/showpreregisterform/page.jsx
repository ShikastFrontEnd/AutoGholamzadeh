'use client'
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
export default function MyTestDrives(params) {
    const [infos, setInfos] = useState({});
    const router = useRouter()
    const [loading,setLoading] =useState(false)
    const token=Cookies.get('user-cookie');
    const fetchData = async () => {
        setLoading(true)
        try {
          const response = await axios.get(`${process.env.BASE_URL}/api/web/carRegister/show`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            setInfos(response.data.data);
            setLoading(false)
          } else {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          if (error.response) {
            if (error.response.status === 401) {
              router.push('/loginRegister');
            } else {
              console.log('Error:', error.response.data.message);
            }
          } else if (error.request) {
            console.log('No response received:', error.request);
          } else {
            console.log('Error:', error.message);
          }
        }
      };
      
      useEffect(() => {
        fetchData(); // Call the fetchData function when the component mounts
      }, []);
    return(
        <>
            <Header />
            {loading? <div className="w-full h-screen flex justify-center items-center">
              <BeatLoader
        color={'red'}
        size={'30 md:150'}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>:<>
      <div className="bg-zinc-400 bg-auto h-full w-full" >
                        <div
                            className="bg-no-repeat bg-cover bg-gradient-to-t to-gholamzadeh-productcolor from-zinc-900 bg-bottom bg-gray-200 py-32  flex justify-center items-center w-full h-screen"
                            // style={{ backgroundImage: "url('/static/images/lucano1.jpg')" }} 
                        >
                            <div className="rounded-lg w-fit h-auto backdrop-blur-3xl   flex justify-center items-center">
            <span
            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
            dir="rtl"
            >
            <span
                className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-gholamzadeh-productcolor via-gholamzadeh-color to-gholamzadeh-productcolor"
            ></span>
    
            <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                <h3 className="text-lg font-bold text-gholamzadeh-color sm:text-xl">
                   پیش ثبت نام های من
                </h3>
    
                <p className="mt-1 text-xs font-medium text-white">نمایندگی 729 لوکانو</p>
                </div>
    
                <div className="block w-16">
               
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
                    {infos.regModel}
                    </dt>
                
                <dd className="text-xs text-white">شیوه پرداخت</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                   {infos.knowMySite}
                    </dt>
                
                <dd className="text-xs text-white">شیوه اشنایی </dd>
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
                    {infos.color}
                    </dt>
                
                <dd className="text-xs text-white">رنگ</dd>
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
            
            </span></div></div>
            </div></>}
            
            <Footer />
    
        </>
       ) 
}