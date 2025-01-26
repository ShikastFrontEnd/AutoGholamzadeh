'use client'
import Link from "next/link";
import Footer from "../components/footer";
import Header from "../components/header";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import moment from "jalali-moment";
import { useRouter } from "next/navigation";



function Events({event}) {
    const jalaliStartDate = moment(event.start_date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
    return (
        <>
            <Link  href={`/testdrive/${event.id}`}>
                <div className="rounded-3xl w-72 h-auto backdrop-blur-3xl flex justify-center items-center">
                    <span
                        className="relative block overflow-hidden rounded-3xl border w-full border-gray-100 p-4 sm:p-6 lg:p-8"
                        dir="rtl"
                    >
                        <span
                            className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-lucano-productcolor via-lucano-color to-lucano-productcolor"
                        ></span>

                        <div className="flex w-full justify-center">
                            <div className="hidden sm:block sm:shrink-0">
                                <img
                                    alt=""
                                    src={`${process.env.BASE_URL}${event.imageUrl}`}
                                    className="size-56 w-64 rounded-3xl object-cover shadow-sm"
                                />
                            </div>
                        </div>
                       
                        <div className="text-center">
                            <div>
                                <h3 className="text-lg font-bold text-lucano-color sm:text-xl">
                                   {event.name}
                                </h3>
                                <p className="mt-1 text-xs font-medium text-white">{event.capacity}</p>
                            </div>
                        </div>
                        <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse text-center w-full">
                
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    
                    {jalaliStartDate}
                    </dt>
                
                <dd className="text-xs text-white">تاریخ شروع</dd>
                </div>
                <div className="flex flex-col-reverse  text-center w-full">
               
                    <dt className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                    {event.start_time}
                    </dt>
                
                <dd className="text-xs text-white">ساعت شروع</dd>
                </div>
                </dl>
                        <div className="mt-4 text-center">
                            <p className="text-pretty text-lg text-white">
                            {event.description}
                            </p>
                        </div>
                        <dl className="mt-6 flex text-center ">
                            <div className="flex flex-col-reverse min-w-full">
                                <span className="text-sm font-medium text-lucano-color hover:text-white cursor-pointer">
                                   {event.place}
                                </span>
                                <dd className="text-xs text-gray-500">ادرس</dd>
                            </div>
                        </dl>
                    </span>
                </div>
            </Link>
        </>
    );
}



export default function TestDrive(params) {
    const token=Cookies.get('user-cookie');
    const [allevents,setAllEvents] = useState([])
    const router = useRouter();
    const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.BASE_URL}/api/web/testDrive/createView`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            setAllEvents(response.data.data.events)
          } else {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          if (error.response) {
            if (error.response.status === 401) {
              toast.error(error.response.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                className: 'w-full sm:w-[200] md:min-w-[450] lg:min-w-[600px] lg:text-2xl PEYDA-REGULAR'
              });
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
        fetchData();
    }, []);


    return(
        <>
    
        
    <Header />
        <div className="z-50"><ToastContainer /></div>
        <div className="bg-zinc-400 bg-auto h-screen w-screen" >
                    <div
                        className="bg-no-repeat bg-cover bg-bottom rounded-lg bg-gray-200 flex justify-center items-center w-full h-full"
                        style={{ backgroundImage: "url('/static/images/lucano6.jpg')" }} 
                    >
                        <div className="w-full flex justify-evenly">
                            {allevents.map((element, index) => (
                                <Events key={index} event={element} />
                            ))}
                            
                        </div>

                        </div>
        </div>
        <Footer />
        </>
    )
}