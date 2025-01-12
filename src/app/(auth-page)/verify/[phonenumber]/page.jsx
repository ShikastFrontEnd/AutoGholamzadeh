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


const Completionist = () => <span className="text-red-600 text-xl">کد وارد شده منقضی شده است</span>;



export default function Verify({ params }) {
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [code, setCode] = useState('');
    const [error, setError] = useState(null);
    const inputRefs = useRef([]);
    const [values, setValues] = useState('');
    const unwrappedParams = React.use(params); // Unwrap params
    const phoneNumber = unwrappedParams.phonenumber; 
    

    const setCookie = (name, value, days) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    };

    const handleChange = (newValues) => {
        setValues(newValues);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const fullCode = values
        setCode(fullCode);
        sendRequest(fullCode); // Pass the full code to sendRequest
    };
    
    const sendCodeAgain = async () => {
        const url = 'https://api.shikast.com/api/auth/v1/loginRegister';
    
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
            toast.success(response.data.message, {position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                className:'w-full sm:w-[200] md:min-w-[450] lg:min-w-[600px] lg:text-2xl PEYDA-REGULAR'
            });
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
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
            } else {
                // Network error or other issues
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
        }
    };
    async function sendRequest(fullCode) {
        
        const url = 'https://api.shikast.com/api/auth/v1/verify';
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
                    toast.success('شما با موفقیت وارد شدید', {
                        position: "top-center"
                    });
                    setCookie('user-cookie',response.data.data.token, 7)
                    setTimeout(() => {
                        router.push('/user_panel')
                    }, 1000);
                }
                
            } else {
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


    const [countdownDate, setCountdownDate] = useState(Date.now() + 120000);

    useEffect(() => {
        setCountdownDate(Date.now() + 120000);
    }, []);

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        } else {
            return <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>;
        }
    };
    return (
        <>
        <div className="z-50">
    <ToastContainer />
    </div>
        
                        <div className="bg-zinc-400 bg-auto h-screen w-full " >
                    <div
                        className="bg-no-repeat bg-cover bg-bottom bg-gray-200 flex justify-center items-center w-full h-full"
                        style={{ backgroundImage: "url('/static/images/authback.jpg')" }} // Update the URL to your image
                    >
                      <main id="content" role="main" className="p-5 w-full mx-auto flex justify-center">
    <div className="w-full h-full lg:w-[600px] lg:h-auto md:w-[400px] md:h-auto sm:w-full sm:h-full bg-[#194848] rounded-[50px] shadow-2xl border-2 border-white">
        <div className="p-7">
            <div className="text-center">
                <div className="block text-2xl font-bold text-gray-800 dark:text-white">
                    <button className="p-2 transition">
                                    <img
                            src="/static/images/whitelogo.png"
                            alt="شیکاست"
                            className="w-24 h-15 sm:w-24 md:w-36 lg:w-60" // Tailwind classes for width and height
                        />
                    </button>
                    <h3 className="text-xs md:text-base lg:text-2xl">به شیکاست خوش امدید</h3>
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
                                        characterSelected:'text-shikast-color '
                                    }}
                                    autoFocus={true}
                                />
                            </div>
                            <div className="animate__animated animate__fadeIn flex justify-center lg:text-2xl ">
                            <Countdown date={countdownDate} renderer={renderer} onComplete={() => console.log('Countdown completed!')} />
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
                            <div className=" w-full grid grid-cols-3 gap-3 ">
    <button type="button" onClick={sendCodeAgain} className="animate__animated animate__fadeIn w-full text-xs lg:text-2xl py-2 inline-flex justify-center items-center gap-2 rounded-xl border border-transparent border-white text-white hover:bg-white hover:text-shikast-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800">
        ارسال مجدد کد
    </button>
    <Link href="/loginRegister" replace>
    <button type="button" className="animate__animated animate__fadeIn w-full text-xs lg:text-2xl py-2 inline-flex justify-center items-center gap-2 rounded-xl border border-transparent  border-white text-white hover:bg-white hover:text-shikast-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all  dark:focus:ring-offset-gray-800">
        ویرایش شماره
    </button>
    </Link>
    
    <button type="submit" className="animate__animated  animate__jackInTheBox w-full text-xs lg:text-2xl py-2 inline-flex justify-center items-center gap-2 rounded-xl border border-transparent  bg-shikast-color text-white hover:bg-white hover:text-shikast-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800">
        ورود/عضویت
    </button>
</div>
                        </div>
                    </form>
            
            </div>
        </div>
    </div>
</main>   
                    </div>
                            
                        </div>
        </>
    );
}