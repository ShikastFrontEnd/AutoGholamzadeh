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
import LazyLoad from "react-lazyload";
import PN from "persian-number";
import { BeatLoader } from "react-spinners";
import Breadcrumb from "../components/Breadcrumb";

function Cars({ car }) {
    const router = useRouter(); 

    const handlePreRegisterButton = () => {
        router.push(`/preregisterform/${car.id}`)
    }
    const handleCarConditions = () => {
        router.push(`carconditions/${car.id}`)
    }

    const formatNumberWithDots = (input) => {
        // Check if the input is a number or a string
        if (typeof input === 'string') {
            const parsedNumber = parseFloat(input);
            if (isNaN(parsedNumber)) {
                
                return '';
            }
            input = parsedNumber;
        } else if (typeof input !== 'number') {
            
            return '';
        }
        return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
        <>
            <div className={`mx-auto relative rounded-xl w-full max-w-full border box bg-black/50 shadow backdrop-blur-sm lg:max-w-screen-lg`}>
                <div className="flex flex-col justify-between h-full">
                    <div className="relative w-full">
                        <LazyLoad height={200} offset={100} className="size-72 rounded-xl object-cover shadow-sm w-full h-full border-gray-100">
                            <img
                                alt=""
                                src={`${process.env.BASE_URL}${car.imageUrl}`}
                                className="size-72 rounded-xl object-cover shadow-sm w-full h-full  md:h-44 border-gray-100"
                            />
                        </LazyLoad>
                        <div className="absolute bottom-0 flex items-center justify-center w-full">
                            <span className="text-white pb-3 border-gray-100 text-xl bg-gradient-to-t from-black to-transparent p-2 pt-5 w-full">
                                {car.carName}
                            </span>
                        </div>
                    </div>
                    <div className="w-full space-y-4 p-3">
                        <div className="flex justify-between border-b-2 pb-4 border-gray-100">
                            <div className="w-full text-center text-xl flex">
                                <span className="pe-1">تومان</span>
                                <span className="PEYDA-BOLD">{PN.convertEnToPe(formatNumberWithDots(car.carPrice))}</span>
                            </div>
                            <div className="w-full text-center text-xl flex justify-end">قیمت</div>
                        </div>
                        {car.is_installments !== 0 ? (
            <>
                <div className="flex justify-center">
                    <div className="w-full text-center text-base flex justify-center hover:text-white text-gholamzadeh-color">شرایط اقساط</div>
                </div>
                <div className="flex justify-between">
                    <div className="w-full text-center text-base flex justify-start"><span className="pe-1">ماه</span>
                        <span>{car.maxMonth}</span></div>
                    <div className="w-full text-center text-base flex justify-end">حداکثر طول اقساط</div>
                </div>
                <div className="flex justify-between">
                    <div className="w-full text-center text-base flex justify-start">
                        <span>{car.minInstallmentsPercentage}</span>
                        <span className="pe-1">٪</span>
                    </div>
                    <div className="w-full text-center text-base text-nowrap flex justify-end">حداقل اقساط درصد</div>
                </div>
                <div className="flex justify-between">
                    <div className="w-full text-center text-base flex justify-start">
                        <span>{car.maxInstallmentsPercentage}</span>
                        <span className="pe-1">٪</span>
                    </div>
                    <div className="w-full text-center text-base text-nowrap flex justify-end">حداکثر اقساط درصد</div>
                </div>
            </>
        ) : car.conditionals !== null && car.conditionals.isMultiStage !== 0 ? (
            <>
                <div className="flex justify-evenly">
                    <div className="w-full text-center text-base flex justify-start"></div>
                    <div className="w-full text-center text-base flex justify-end text-nowrap text-gholamzadeh-color hover:text-white">شرایط پرداخت چند مرحله ای</div>
                    <div className="w-full text-center text-base flex justify-start"></div>
                </div>
                <div className="flex justify-between">
                    <div className="w-full text-center text-base flex justify-start"><span className="pe-1">تومان</span>
                    <span>{PN.convertEnToPe(formatNumberWithDots(car.conditionals.stageOne))}</span></div>
                    <div className="w-full text-center text-base flex justify-end">مرحله اول</div>
                </div>
                <div className="flex justify-between">
                    <div className="w-full text-center text-base flex justify-start">
                        <span className="pe-1">تومان</span>
                        
                    </div>
                    <div className="w-full text-center text-base text-nowrap flex justify-end">مرحله دوم</div>
                </div>
                <div className="flex justify-between">
                    <div className="w-full text-center text-base flex justify-start">
                        <span className="pe-1">تومان</span>
                        <span>{PN.convertEnToPe(formatNumberWithDots(car.conditionals.stageTow))}</span>
                    </div>
                    <div className="w-full text-center text-base text-nowrap flex justify-end">مرحله سوم</div>
                </div>
            </>
        ) : (
            <div className="flex justify-center items-center h-36">
                <h1 className="text-center text-3xl text-gholamzadeh-color">فروش به صورت نقدی</h1>
            </div>
        )}
                            <div className="flex justify-between">
                                <div className="w-full text-center text-base flex justify-start">
                                    <button className="border text-gray-100 border-gray-100 hover:border-gholamzadeh-color hover:text-gholamzadeh-color px-2 py-1 rounded-xl" onClick={handleCarConditions}>شرایط فروش</button>
                                </div>
                                <div className="w-full text-center text-base text-nowrap flex justify-end">
                                    <button className="border text-gray-100 border-gray-100 hover:border-gholamzadeh-color hover:text-gholamzadeh-color  px-2 py-1 rounded-xl" onClick={handlePreRegisterButton}>پیش ثبت نام</button>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default function PreRegisterForm(params) {
    const token=Cookies.get('user-cookie');
    const [loading,setLoading]=useState(false)
    const [allcars,setAllCars] = useState([])
    const router = useRouter();
    const fetchData = async () => {
        setLoading(true)
        try {
          const response = await axios.get(`${process.env.BASE_URL}/api/web/carRegister/createView2`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            setLoading(false)
            setAllCars(response.data.data)
          } else {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          if (error.response) {
            if (error.response.status === 401) {
              router.push('/loginRegister');
              const cameRoute = '/preregisterform'
              localStorage.setItem('cameRoute', cameRoute);
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
        fetchData();
    }, []);

    const breadcrumbLinks = [
        { url: '/preregisterform', label: 'لیست خودرو ها' },
      ];
    return(
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
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:max-w-[1200px] gap-10 px-5 my-5">
    {Array.isArray(allcars) && allcars.length > 0 ? (
        allcars.map((element, index) => (
            <Cars key={index} car={element} />
        ))
    ) : (<></>)}
</div>
                        </div>

                        </div>
        </div>
        <Footer />
        </>
    )
}