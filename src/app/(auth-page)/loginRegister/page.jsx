'use client'


import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Link from 'next/link';
import Image from "next/image";
import { ClipLoader } from 'react-spinners';
import 'animate.css/animate.min.css';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

function loginRegister() {
    const router = useRouter();
    const [newMobile, setNewMobile] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const sendRequest = async () => {
        setLoading(true);
        const url = `${process.env.BASE_URL}/api/auth/v1/loginRegister`;

        const data = {
            "register_phone": newMobile
        };

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            let verifyTime = response.data.time;
            if (verifyTime !== undefined) {
                Cookies.set('verifyTime', verifyTime * 60000)
            }
            Cookies.set('newMobile',newMobile)
            router.push('/verify');
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    className: 'max-w-[180] sm:max-w-[200] md:max-w-[200] lg:max-w-[360] lg:text-2xl PEYDA-REGULAR'
                });
            } else {
                toast.error("An unexpected error occurred", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    className: 'p-5 rounded-none'
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const getNumbError = (event) => {
        const value = event.target.value;
        const isValid = /^[0-9]*$/.test(value);
        setNewMobile(value);
        setIsError(!isValid);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        if (!isError && newMobile.length === 11) { // Check if the number is valid
            sendRequest();
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event); // Call handleSubmit instead of sendRequest
        }
    };
    const handleButtonClick = () => {
        const inputValue = inputRef.current.value.trim();
        if (inputValue === '') {
            setIsError(true); // Show error if input is empty
            return;
        }
        setIsError(false); // Clear error if input is valid
        sendRequest(); // Call sendRequest if input is not empty
    };
    return ( <>
    <div className="z-50">
    <ToastContainer />
    </div>
        
                        <div className="bg-zinc-400 bg-auto h-screen w-full " >
                    <div
                        className="bg-no-repeat bg-cover bg-bottom bg-gray-200 flex justify-center items-center w-full h-full"
                        style={{ backgroundImage: "url('/static/images/lucano2.jpg')" }} 
                    >
                        <div className="w-full h-full backdrop-blur-md flex items-center">
                        <main id="content" role="main" className="p-5 w-full mx-auto flex justify-center ">
    <div className="w-full h-full lg:w-[600px] lg:h-auto md:w-[400px] md:h-auto sm:w-full sm:h-full bg-lucano-productcolor rounded-[50px] shadow-2xl border-2 border-white">
        <div className="p-7">
            <div className="text-center">
                <div className="block text-2xl font-bold text-gray-800 dark:text-white">
                    <button className="p-2 transition">
                        <div className="flex justify-center items-center">
                            <img 
                                src="https://ecodalucano.com/wp-content/uploads/2024/07/Logo-final-01-scaled-e1735563656132-300x27.webp" 
                                alt="Logo" 
                                className="w-[350] h-auto" 
                            />
                        </div>
                    </button>
                    <h3 className="text-xs md:text-base lg:text-2xl">فرم پیش ثبت نام نمایندگی 729 لوکانو</h3>
                </div>
            </div>
            <div className="mt-5">
                <form action='/verify'>
                    <div className="grid gap-y-4">
                        <div>
                            <div className="relative flex items-center">
                                <input
                                    ref={inputRef}
                                    onChange={getNumbError}
                                    onKeyDown={handleKeyDown}
                                    placeholder="شماره موبایل"
                                    type="text"
                                    id="text"
                                    name="text"
                                    className="text-center lg:text-2xl text-black py-3 px-4 block w-full border-2 border-lucano-color rounded-md text-sm shadow-sm"
                                    required
                                    aria-describedby="phonenumber-error"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    maxLength={11}
                                    autoComplete="off"
                                />
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
                        <button onClick={handleButtonClick} type="button" className="animate__animated animate__fadeIn lg:text-2xl py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-lucano-color text-white hover:bg-white hover:text-lucano-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                            ورود / عضویت
                        </button>
                    </div>
                </form>
                <h3 className="text-sm text-center w-full py-3 lg:text-2xl">برای ورود و عضویت در سایت شماره همراه خود را وارد کنید</h3>
            </div>
        </div>
    </div>
</main>
                        </div>
                     
                    </div>
                            
                        </div>  
        </> );
    }

export default loginRegister;