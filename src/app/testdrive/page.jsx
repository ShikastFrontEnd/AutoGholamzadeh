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
import Breadcrumb from "../components/Breadcrumb";
import { BeatLoader } from "react-spinners";



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
                            className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-gholamzadeh-productcolor via-gholamzadeh-color to-gholamzadeh-productcolor"
                        ></span>

                        <div className="flex w-full justify-center">
                            <div className="block shrink-0">
                                <img
                                    alt=""
                                    src={`${process.env.BASE_URL}${event.imageUrl}`}
                                    className="size-56 w-64 rounded-3xl object-cover shadow-sm"
                                />
                            </div>
                        </div>
                       
                        <div className="text-center">
                            <div>
                                <h3 className="text-lg font-bold text-gholamzadeh-color sm:text-xl">
                                   {event.name}
                                </h3>
                                <p className="mt-1 text-xs font-medium text-white">{event.capacity}</p>
                            </div>
                        </div>
                        <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse text-center w-full">
                
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    
                    {jalaliStartDate}
                    </dt>
                
                <dd className="text-xs text-white">تاریخ شروع</dd>
                </div>
                <div className="flex flex-col-reverse  text-center w-full">
               
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
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
                                <span className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
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
    const [loading,setLoading] = useState(false)
    const router = useRouter();
    const fetchData = async () => {
        setLoading(true)
        try {
          const response = await axios.get(`${process.env.BASE_URL}/api/web/testDrive/createView`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            setLoading(false)
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
              console.log('Error:', error.response.data.message);setLoading(false)
            }
          } else if (error.request) {
            console.log('No response received:', error.request);setLoading(false)
          } else {
            console.log('Error:', error.message);setLoading(false)
          }
        }
      };
    useEffect(() => {
        fetchData();
    }, []);
    const breadcrumbLinks = [
      { url: '/testdrive', label: 'ایونت های تست درایو' },
    ];

    return(
      <>
      <Header />
      <div className="z-50"><ToastContainer /></div>
      <div className="bg-zinc-400 bg-auto h-full w-full">
          <div
              className={`bg-gholamzadeh-productcolor bg-no-repeat bg-cover bg-bottom flex justify-center items-center w-full ${loading ? 'h-screen' : 'h-full'}`}
          >
              <div className="pt-56">
                  {loading ? (
                      <div className="w-full h-screen flex justify-center items-center">
                          <BeatLoader
                              color={'red'}
                              size={'30 md:150'}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                          />
                      </div>
                  ) : (
                      <>
                          <div className="mb-5 pb-5 mx-auto w-full max-w-full border-b-2 border-gray-100 md:top-6 lg:max-w-screen-lg">
                              <div className="w-full flex flex-col md:flex-row justify-between px-5 md:px-0">
                                  <div className="w-full">
                                      <Breadcrumb links={breadcrumbLinks} />
                                  </div>
                                  <div className="flex justify-end items-center w-full">
                                      <h1 className="text-end">لیست خودرو های موجود و شرایط فروش نقدی و اقساطی</h1>
                                  </div>
                              </div>
                          </div>
                      </>
                  )}
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:max-w-[1200px] gap-10 px-5 my-5">
                      <div className="w-full flex justify-center items-center ">
                          {allevents.map((element, index) => (
                              <Events key={index} event={element} />
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <Footer />
  </>
        
    )
}