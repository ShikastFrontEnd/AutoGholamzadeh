'use client'
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify"; 
import axios from "axios"; 
import ClipLoader from "react-spinners/ClipLoader"; 
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";

export default function FollowupSuggestions() {
    const router = useRouter();
    const [trackingCode, setTrackingCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');
    const [data, setData] = useState([]);
    const [datasuccess, setDataSuccess] = useState(false);

    const sendRequest = async (inputValue) => {
        setLoading(true);
        const url = `${process.env.BASE_URL}/api/web/feedback/feedbackShow`;

        const data = {
            "trackingCode": inputValue
        };

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
           
            
            setData(response.data.data);
            setDataSuccess(true)
        } catch (error) {
            if (error.response) {
                
                
                setErrorMessage(error.response.data.errors.trackingCode);
            } else {
                
            }
        } finally {
            setLoading(false);
        }
    };

    const handleButtonClick = () => {
        const inputValue = code.trim();
        if (inputValue === '') {
            setErrorMessage(''); // Clear error message if input is empty
            return;
        }
        setErrorMessage(''); // Clear previous error message
        setTrackingCode(inputValue);
        sendRequest(inputValue); // Pass the input value directly
    };

    const onChangeHandler = (e) => {
        setCode(e.target.value);
        setErrorMessage('');
    };
    const changeCodeHandler = () => {
        setCode('');
        setErrorMessage('');
        setDataSuccess(false)
    }
    return (
        <>
            <div className="z-50">
                <ToastContainer />
            </div>
            <Header />
            {datasuccess ?(<div className="bg-zinc-400 bg-auto h-screen w-full">
                <div
                    className="bg-no-repeat bg-cover bg-bottom bg-gray-200 flex justify-center items-center w-full h-full"
                    style={{ backgroundImage: "url('/static/images/extrim.png')" }}
                >
                    <div className="w-full h-full backdrop-blur-md flex items-center">
                        {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

<section dir="rtl" className="bg-gholamzadeh-productcolor min-w-0 mx-auto max-w-7xl rounded-lg shadow">
  <div className="lg:grid lg:min-h-full lg:grid-cols-12">
    <section className="relative flex h-32 items-end bg-gholamzadeh-productcolor lg:col-span-5 rounded-lg  lg:h-full xl:col-span-6">
      <img
        alt=""
        src="/static/images/Arrizo6GT.png"
        className="absolute inset-0 h-full w-full rounded-r-lg object-cover opacity-80"
      />

      <div  className="hidden lg:relative lg:block lg:p-12">
        <Link href={'/'} className="block text-white">
        <div className="BeutyFont text-4xl lg:text-7xl text-white">
                                                        <h1 className="w-auto min-w-full max-w-[350px] h-auto ">Gholamzadeh</h1>
                                                    </div>
        </Link>

        <h2 className="mt-6 text-2xl  text-white sm:text-3xl md:text-4xl">
           پیگیری انتقادات و پیشنهادات
        </h2>

        <p className="mt-4 leading-relaxed text-lg text-white/90">
         از اینکه در بهبود عملکرد مجموعه یاری گرمان بودید سپاس گذاریم
        </p>
      </div>
    </section>

    <main
      
      className="flex items-center m-20 justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
        <Link href={'/'} className="block text-white">
        <div className="BeutyFont text-4xl lg:text-7xl text-white">
                                                        <h1 className="w-auto min-w-full max-w-[350px] h-auto text-center ">Gholamzadeh</h1>
                                                    </div>
        </Link>

        <h2 className="mt-6 text-2xl text-center text-nowrap  text-white sm:text-3xl md:text-4xl">
           پیگیری انتقادات و پیشنهادات
        </h2>
        </div>

        <div dir="rtl" className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              dir="rtl"
              htmlFor="FirstName"
              className="block text-sm font-medium border-b  text-white"
            >
                نام 
            </label>

            <h1 className="ps-2 mt-1 w-full rounded-md  text-sm  shadow-xs text-gray-200">{data.firstName}</h1>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="LastName"
              className="block text-sm font-medium border-b text-white"
            >
              نام خانوادگی
            </label>

            <h1 className="ps-2 mt-1 w-full rounded-md  text-sm  shadow-xs text-gray-200">{data.lastName}</h1>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              dir="rtl"
              htmlFor="FirstName"
              className="block text-nowrap text-sm font-medium border-b text-white"
            >
               تعمیرگاه یا نمایندگی مورد انتقاد
            </label>

            <h1 className="ps-2 mt-1 w-full rounded-md  text-sm  shadow-xs text-gray-200">{data.dealerShip_id}{data.repairShop_id}</h1>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="LastName"
              className="block text-sm font-medium border-b text-white"
            >
             مدل بازخورد
            </label>

            <h1 className="ps-2 mt-1 w-full rounded-md  text-sm  shadow-xs text-gray-200">{data.model}</h1>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              dir="rtl"
              htmlFor="FirstName"
              className="block text-nowrap text-sm font-medium border-b text-white"
            >
               نوع بازخورد
            </label>

            <h1 className="ps-2 mt-1 w-full rounded-md  text-sm  shadow-xs text-gray-200">{data.type}</h1>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="LastName"
              className="block text-sm font-medium border-b text-white"
            >
             نام فرد مورد انتقاد
            </label>

            <h1 className="ps-2 mt-1 w-full rounded-md  text-sm  shadow-xs text-gray-200">{data.complainantName}</h1>
          </div>
          <div className="col-span-12 sm:col-span-6">
            <label
              dir="rtl"
              htmlFor="FirstName"
              className="block text-nowrap text-sm font-medium border-b text-white"
            >
               توضیحات
            </label>

            <h1 className="ps-2 mt-1 w-full rounded-md  text-sm  shadow-xs text-gray-200">{data.content}</h1>
          </div>
          { data.adminAnswer && <div className="col-span-12 sm:col-span-6">
            <label
              dir="rtl"
              htmlFor="FirstName"
              className="block text-nowrap text-sm font-medium border-b text-white"
            >
               جواب ادمین
            </label>

            <h1 className="ps-2 mt-1 w-full rounded-md  text-sm  shadow-xs text-gray-200">فروش</h1>
          </div> }
         


          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <Link
             href={'/'}
              className="inline-block shrink-0 rounded-md border border-gholamzadeh-color bg-gholamzadeh-color px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent  focus:ring-3 focus:outline-hidden dark:hover:bg-zinc-900 hover:text-white"
            >
              خروج
            </Link>

            <p className="mt-4 text-sm  sm:mt-0 text-gray-400">
              پیگیری انتقادات
              <button onClick={changeCodeHandler} className="hover:text-gray-400 underline text-gray-200"> دیگر </button>.
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</section>
                    </div>
                </div>
            </div>):(<div className="bg-zinc-400 bg-auto h-screen w-full">
                <div
                    className="bg-no-repeat bg-cover bg-bottom bg-gray-200 flex justify-center items-center w-full h-full"
                    style={{ backgroundImage: "url('/static/images/extrim.png')" }}
                >
                    <div className="w-full h-full backdrop-blur-md flex items-center">
                        <main className="p-5 w-full mx-auto flex justify-center ">
                            <div className="w-full h-full lg:w-[600px] lg:h-auto md:w-[400px] md:h-auto sm:w-full sm:h-full bg-gholamzadeh-productcolor rounded-[50px] shadow-2xl border-2 border-white">
                                <div className="p-7">
                                    <div className="text-center">
                                        <div className="block text-2xl font-bold text-gray-800 dark:text-white">
                                            <Link href={'/'} className="p-2 transition">
                                                <div className="flex justify-center items-center">
                                                    <div className="BeutyFont text-4xl lg:text-7xl text-gholamzadeh-color">
                                                        <h1 className="w-auto min-w-full max-w-[350px] h-auto ">Gholamzadeh</h1>
                                                    </div>
                                                </div>
                                            </Link>
                                            <h3 className="text-xs md:text-base lg:text-2xl">پیگیری انتقادات و پیشنهادات</h3>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <div className="grid gap-y-4">
                                            <div>
                                                <div className="relative flex items-center">
                                                    <input
                                                        value={code}
                                                        onChange={onChangeHandler}
                                                        placeholder="کد پیگیری"
                                                        type="text"
                                                        id="text"
                                                        name="text"
                                                        className="text-center lg:text-2xl text-black py-3 px-4 block w-full border-2 border-gholamzadeh-color rounded-md text-sm shadow-sm"
                                                        required
                                                        aria-describedby="phonenumber-error"
                                                        maxLength={12}
                                                        autoComplete="off"
                                                    />
                                                    {loading && (
                                                        <ClipLoader
                                                            color={'#C38065'}
                                                            loading={loading}
                                                            cssOverride={{ marginLeft: '10px' }}
                                                            size={20}
                                                            aria-label="Loading Spinner"
                                                            data-testid="loader"
                                                            className="absolute"
                                                        />
                                                    )}
                                                </div>
                                                {errorMessage && <p className={`text-sm py-1 h-auto text-center text-red-600 mt-2 lg:text-2xl `} id="phonenumber-error">
                                                    {errorMessage}
                                                </p>}
                                            </div>
                                            <button onClick={handleButtonClick} type="button" className="animate__animated animate__fadeIn lg:text-2xl py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gholamzadeh-color text-white hover:bg-white hover:text-gholamzadeh-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                                پیگیری انتقاد
                                            </button>
                                        </div>
                                        <h3 className="text-sm text-center w-full py-3 lg:text-xl">برای پیگیری انتقادات , پیشنهادات و ... کد پیگیری خود را وارد کنید</h3>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>)}
            <Footer />
        </>
    );
}