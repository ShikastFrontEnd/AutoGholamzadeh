'use client'
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import { use, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import PN from "persian-number";
import LazyLoad from "react-lazyload";
import { BeatLoader, ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/app/components/Breadcrumb";
import SwiperCore, { Pagination, EffectCube } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/bundle';
import 'swiper/css/bundle';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

function Conditioncars({ condition }) {
    return (
        <>
            <div className={`mx-auto rounded-xl w-full max-w-full border border-gray-100 bg-black/50 shadow backdrop-blur-sm md:top-6 md:rounded-3xl lg:max-w-screen-lg`}>
                <div className="md:p-3">
                    <div className="flex flex-col md:flex-row justify-evenly md:space-x-5">
                        <div className=" w-full ">
                        <Swiper className="w-full md:w-[500px]" spaceBetween={50} slidesPerView={1}>
                                                {condition.gallery && condition.gallery.length > 0 ? (
                            condition.gallery.map((image, index) => (
                                <SwiperSlide key={index} style={{ width: '100%', height: '300px' }}> {/* Set a fixed height */}
                                    <img
                                        alt=""
                                        src={`${baseUrl}${image.image_url}`}
                                        className="size-72 rounded-xl md:rounded-3xl object-cover shadow-sm w-full h-full md:border border-gray-100"
                                        style={{ height: '100%', width: '100%', objectFit: 'cover' }} // Ensure the image covers the slide
                                    />
                                </SwiperSlide>
                            ))
                        ) : (
                          <img
                          alt=""
                          src={`${baseUrl}${condition.imageUrl}`}
                          className="size-72 rounded-xl md:rounded-3xl object-cover shadow-sm w-full h-full md:border border-gray-100"
                      /> // Changed to a div for better semantics
                        )}
                    </Swiper>
                            
                        </div>
                        
                        <div className="w-full space-y-4 p-3 md:p-0">
                                    <div className="flex justify-between border-b-2 pb-4 border-gray-100">
                                        <div className="w-full text-center text-xl flex text-gray-100 ">{condition.CarName}</div>
                                        <div className="w-full text-center text-xl flex text-gray-100 justify-end">نام خودرو</div>
                                    </div>
                                    <div className="flex justify-between border-b-2 pb-4 border-gray-100">
                                        <div className="w-full text-center text-xl flex text-gray-100 ">{condition.company}</div>
                                        <div className="w-full text-center text-xl flex text-gray-100 justify-end">کمپانی</div>
                                    </div>
                                    
                                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function carsalesconditions(props) {
    const params = use(props.params);
    const { EventId } = params;
    const [conditions, setConditions] = useState([]);
    const [loading,setLoading] = useState(false)
    const token=Cookies.get('user-cookie');
    const router = useRouter('/')
    const [carName,setCarName] = useState('')
    const fetchData = async () => {
      setLoading(true)
        try {
          const response = await axios.get(`${baseUrl}/api/web/brand/${EventId}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            setLoading(false);
      // Set conditions to an array containing the single car object
      setConditions([response.data.data]); // Wrap the object in an array
      setCarName(response.data.data.CarName);
      console.log(response.data.data);
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
              const cameRoute = `/products/${EventId}`
              localStorage.setItem('cameRoute', cameRoute);
              router.push('/loginRegister');
            } else {
                setLoading(false);
            }
          } else if (error.request) {
            setLoading(false);
          } else {
            setLoading(false);
          }
        }
      };
      
      useEffect(() => {
        fetchData(); // Call the fetchData function when the component mounts
      }, []);

      const breadcrumbLinks = [
        { url: '/products', label: 'مشخصات خودرو' },
        { url: `/products/${EventId}`, label: `${carName} مشخصات` }
      ];
    return(<>
    <Header />
    <div className="h-full  py-60 w-full bg-gradient-to-t from-gholamzadeh-productcolor to-zinc-900">
            <ToastContainer />
            <div className="mb-5 pb-5 mx-auto  w-full  max-w-full border-b-2 border-gray-100  md:top-6  lg:max-w-screen-lg">
            <div className="w-full flex flex-col md:flex-row justify-between px-5 md:px-0">
              <div className="flex items-center text-gray-100 "><Breadcrumb links={breadcrumbLinks}/></div>
              <div className="flex items-center text-gray-100 justify-end"><h1 className="text-end">مشخصات خودرو</h1></div>
            </div>
            </div>
           {loading? <div className="w-full flex justify-center items-center">
              <BeatLoader
        color={'red'}
        size={'30 md:150'}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>:<></>}
            <div className="mx-5 md:mx-0 space-y-9">
            
                            {conditions.length > 0 ? (
                    conditions.map((element) => (
                        <div key={element.id} className="w-full flex justify-center">
                            <Conditioncars condition={element} />
                        </div>
                    ))
                ) : (
                    <div className="flex w-full h-full text-center justify-center items-center">هیچ محصولی به این نام وجود ندارد</div>
                )}
            </div>
    </div>
    <Footer />
    
    
    
    </>)
}