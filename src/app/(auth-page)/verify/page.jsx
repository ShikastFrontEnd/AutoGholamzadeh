"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import VerificationInput from "react-verification-input";
import Link from "next/link";
import Countdown from 'react-countdown';
import 'animate.css/animate.min.css';
import Cookies from 'js-cookie';
import config from "/next.config";
const Completionist = () => <span className="text-red-600 text-xl">کد وارد شده منقضی شده است</span>;



export default function Verify() {


    const baseUrl=config.images.remotePatterns[0].hostname;

    const [newMobile, setNewMobile] = useState(null);
    const [verifyTime, setVerifyTime] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [timeLoading, setTimeLoading] = useState(true);
    useEffect(() => {
        

        const mobile =Cookies.get('newMobile')
        if (mobile) {
            setNewMobile(mobile);
        }
        setIsLoading(false);
    }, []);

    

    if (!isLoading && newMobile === null) {
        redirect('/loginRegister');
    }
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [code, setCode] = useState('');
    const [error, setError] = useState(null);
    const inputRefs = useRef([]);
    const [values, setValues] = useState('');
    const phoneNumber =newMobile
    const [verifyFaild,setVerifyFaild]=useState(false)
    const handleChange = (newValues) => {
        setValues(newValues);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const fullCode = values
        setCode(fullCode);
        sendRequest(fullCode);
    };
    
    const sendCodeAgain = async () => {
        const url = `${baseUrl}/api/auth/v1/loginRegister`;
    
        const data = {
            "register_phone": phoneNumber
        };
    
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            let verifyTimeAgain = response.data.time;
            if (verifyTimeAgain !== undefined) {
                const newVerifyTime = verifyTimeAgain * 60000;
                Cookies.set('verifyTime',newVerifyTime, { expires: 7 })
                setTime(newVerifyTime);
                setCountdownDate(Date.now() + newVerifyTime);

            }
            setVerifyFaild(false)
            toast.success(response.data.message, {
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
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "An error occurred", {
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
            }
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            const remainingTime =Cookies.get('verifyTime');
            if (remainingTime) {
                const newTime = parseInt(remainingTime, 10) - 1000; // Decrement by 1 second
                if (newTime <= 0) {
                    clearInterval(interval);
                    Cookies.remove('verifyTime')
                    setVerifyFaild(true);
                } else {
                    Cookies.set('verifyTime', newTime, { expires: 1 });
                    setTime(newTime);
                    setCountdownDate(Date.now() + newTime); // Update countdown date
                }
            }
        }, 1000);
    
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);
    async function sendRequest(fullCode) {
        const url = `${baseUrl}/api/auth/v1/verify`;
        const formData = new FormData();
        formData.append('phone', phoneNumber);
        formData.append('code', fullCode);

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });

            if (response.status === 200) {
               let my_response_status=response.data.data.status 
               let my_response_message=response.data.data.message
               
                if(my_response_status =='error'){
                   
                    Cookies.remove('verifyTime');
                    toast.error(my_response_message, {position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        className:'w-full sm:w-[200] md:min-w-[450] lg:min-w-[600px] lg:text-2xl PEYDA-REGULAR'
                    });
                }else{
                    
                    Cookies.remove('verifyTime');
                    toast.success('شما با موفقیت وارد شدید', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        className:'w-full sm:w-[200] md:min-w-[450] lg:min-w-[600px] lg:text-2xl PEYDA-REGULAR'
                    });
                    Cookies.set('user-cookie',response.data.data.token, { expires: 7 })
                    setTimeout(() => {
                        const retrievedRoute = localStorage.getItem('cameRoute');
                        const routeToPush = retrievedRoute ? retrievedRoute : '/';
                        router.push(`${routeToPush}`);
                        localStorage.removeItem('cameRoute')
                    }, 1000);
                }
                
            } else {
                
                Cookies.remove('verifyTime');
                toast.error(error.response.data.message, {
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
            }
        } catch (error) {
            
            Cookies.remove('verifyTime'); 
            toast.error(error, {
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
        }
    }

    const [time,setTime] =useState(Cookies.get('verifyTime'));
    const [countdownDate, setCountdownDate] = useState(Date.now() + (time ? parseInt(time, 10) : 0));

    useEffect(() => {
        setCountdownDate(Date.now() + (time ? parseInt(time, 10) : 0));
    }, [time]);

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        } else {
            return <span>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>;
        }
    };
    const handleCountdownComplete = () => {
        Cookies.remove('verifyTime');
        setVerifyFaild(true);
    };
    return (
        <>
        <div className="z-50">
    <ToastContainer />
    </div>
        
                        <div className="bg-zinc-400 bg-auto h-screen w-full " >
                        <div
                        className="bg-no-repeat bg-cover bg-bottom bg-gray-200 flex justify-center items-center w-full h-full"
                        style={{ backgroundImage: "url('/static/images/gxtrim.jpg')" }} 
                    >
                        <div className="w-full h-full backdrop-blur-md flex items-center">
                      <main id="content" role="main" className="p-5 w-full mx-auto flex justify-center">
    <div className="w-full h-full lg:w-[600px] lg:h-auto md:w-[400px] md:h-auto sm:w-full sm:h-full bg-gholamzadeh-productcolor rounded-[50px] shadow-2xl border-2 border-white">
        <div className="p-7">
            <div className="text-center">
                <div className="block text-2xl font-bold text-gray-800 dark:text-white">
                <button className="p-2 transition">
                        <div className="flex justify-center items-center">
                            {/* <img 
                                src="https:/Imasgsad.com/wp-content/uploads/2024/07/Logo-final-01-scaled-e1735563656132-300x27.webp" 
                                alt="Logo" 
                                className="w-[350] h-auto" 
                            /> */}
                            <div className="BeutyFont text-6xl lg:text-7xl text-gholamzadeh-color">
                                        <h1 className="w-auto min-w-full max-w-[350px] h-auto ">Gholamzadeh</h1>
                                    </div>
                        </div>
                    </button>
                    <h3 className=" md:text-base text-xl lg:text-2xl text-white">هلدینگ خودرویی غلامزاده</h3>
                </div>
            </div>
            <div className="mt-5">
                    <form onSubmit={submitHandler}>
                        <div className="grid gap-y-2">
                        <div className="flex justify-center flex-col">
                            <div className="flex justify-center">
                            <h3 className=" text-gray-300 PEYDA-REGULAR text-xs md:text-xs lg:text-xs text-center w-full lg:w-[240px] md:w-[150px] sm:w-full">کد تایید برای شماره <span>{phoneNumber}</span> ارسال شده است</h3>
                            </div>
                            

                        </div>
                            <div className="flex justify-center gap-3">
                                <VerificationInput
                                    onComplete={sendRequest}
                                    values={values}
                                    onChange={handleChange}
                                    length={4} 
                                    placeholder=""
                                    validChars="0-9"
                                    classNames={{
                                        container: "flex justify-center w-full lg:w-[240px] md:w-[150px] sm:w-full",
                                        input: " w-12 h-12 text-center border border-gray-300 rounded-2xl",
                                        character:' rounded-lg',
                                        characterSelected:'text-gholamzadeh-color '
                                    }}
                                    autoFocus={true}
                                />
                            </div>
                            <div className="animate__animated animate__fadeIn flex justify-center lg:text-2xl text-white ">
                            <Countdown date={countdownDate} renderer={renderer} onComplete={handleCountdownComplete} />
                            </div>
                            <div>
                                <div className="relative flex items-center">
                                    {loading && (
                                        <ClipLoader 
                                            color={'#236160'}
                                            loading={loading}
                                            cssOverride={{ marginLeft: '10px' }} // Add some space between the input and the loader
                                            size={20} // Adjust size as needed
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                            className="absolute"
                                        />
                                    )}
                                </div>
                                <p className={`text-sm py-1 h-auto text-center text-red-600 mt-2 lg:text-2xl ${isError ? '' : 'hidden'}`} id="phonenumber-error">
                                    لطفاً یک شماره موبایل معتبر وارد کنید
                                </p>
                            </div>
                            <div className={`w-full grid  ${verifyFaild?"grid-cols-2 gap-2":"grid-cols-3 gap-3"}`}>
    <button type="button" onClick={sendCodeAgain} className="animate__animated animate__fadeIn w-full text-xs lg:text-2xl py-2 inline-flex justify-center items-center gap-2 rounded-xl border border-transparent border-white text-white hover:bg-white hover:text-gholamzadeh-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800">
        ارسال مجدد کد
    </button>
    <Link href="/loginRegister" replace>
    <button type="button" className="animate__animated animate__fadeIn w-full text-xs lg:text-2xl py-2 inline-flex justify-center items-center gap-2 rounded-xl border border-transparent  border-white text-white hover:bg-white hover:text-gholamzadeh-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all  dark:focus:ring-offset-gray-800">
        ویرایش شماره
    </button>
    </Link>
    {verifyFaild
    ?
    <button type="submit" className=" animate__animated invisible animate__jackInTheBox w-full text-xs lg:text-2xl py-2 inline-flex justify-center items-center gap-2 rounded-xl border border-transparent bg-gholamzadeh-color text-white hover:bg-white hover:text-gholamzadeh-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800">
        ورود/عضویت
    </button>
    :
    <button type="submit" className="animate__animated  animate__jackInTheBox w-full text-xs lg:text-2xl py-2 inline-flex justify-center items-center gap-2 rounded-xl border border-transparent  bg-gholamzadeh-color text-white hover:bg-white hover:text-gholamzadeh-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800">
    ورود/عضویت
    </button>  }
    
</div>
                        </div>
                    </form>
            
            </div>
        </div>
    </div>
</main> 
</div>  
                    </div>
                            
                        </div>
        </>
    );
}