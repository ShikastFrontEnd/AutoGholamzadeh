'use client'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import Link from 'next/link';
import Image from "next/image";
import { ClipLoader } from 'react-spinners';
import 'animate.css/animate.min.css';
import { useRouter } from 'next/navigation';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SwiperCore, { Pagination, EffectCube } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/bundle';
import 'swiper/css/bundle';
import InputField from './InputField';
import SelectField from './SelectField';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';





function PreRegistrationForm() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const mobile =Cookies.get('newMobile')
  const [nationalCode, setNationalCode] = useState('');
  const [address, setAddress] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [carsList, setCarsList] = useState([]);
  const [regModel, setRegModal] = useState('');
  const [errors, setErrors] = useState({
    firstName:"",
    lastName: "",
    fatherName:"",
    nationalCode:"" ,
    address: "",
    selectedOption:"",
    phone: "",
    color: "",
    selectedCat: "" ,
    regModel:""
  });
  const token=Cookies.get('user-cookie');
  const handleSelectedCat = (event) => {
    setSelectedCat(event.target.value);
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };
  const handleRegChange = (event) => {
    setRegModal(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
  
    try {
      const url = 'https://api.gholamzadeh.com/api/web/carRegister/store';
      const data = {
        firstName,
        lastName,
        fatherName,
        phone: mobile,
        nationalCode,
        carModel: selectedOption,
        regModel,
        color: selectedColor,
        knowMySite: selectedCat,
        address,
      };
  
      const response = await axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          className: 'w-full sm:w-[200] md:min-w-[450] lg:min-w-[600px] lg:text-2xl PEYDA-REGULAR'
        });
        router.push('/showpreregisterform');
      } else {
        router.push('/')
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          className: 'w-full sm:w-[200] md:min-w-[450] lg:min-w-[600px] lg:text-2xl PEYDA-REGULAR'
        });
        setErrors(error.response.data.errors);
      } else if (error.request) {
        router.push('/')
      } else {
        router.push('/')
      }
    }
  };
  

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.gholamzadeh.com/api/web/carRegister/createView', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        setCarsList(response.data.data.brands);
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
    fetchData(); // Call the fetchData function when the component mounts
  }, []);
  
  // Log carsList whenever it changes
    return ( <>
    <div className="z-50">
    <div className=""><ToastContainer className={`z-50 px-5`} /></div>
    </div>
        
                        <div className="bg-zinc-400 bg-auto h-auto w-screen " >
                    <div
                        className="bg-no-repeat bg-cover bg-bottom bg-gray-200   flex justify-center items-center w-full h-auto min-h-screen "
                        style={{ backgroundImage: "url('/static/images/lucano2.jpg')" }} 
                    >
                        <div className="w-full h-full backdrop-blur-md flex  py-32">
                        <main id="content" role="main" className=" w-full h-full md:mx-auto flex justify-center items-center p-5  ">
                        <div dir="rtl" className=" px-5 py-16 bg-lucano-productcolor lg:max-w-[1700px] sm:w-screen w-full h-full md:h-screen  rounded-3xl shadow-2xl border border-white">
  <section className="relative flex h-full">
    <div className="w-full h-full lg:w-1/2 flex flex-col justify-center">
      <div className="mx-auto max-w-lg text-center">
      <button className="p-2 transition hidden md:block">
                        <div className="flex justify-center items-center">
                                <img 
                                    src="/static/images/ecodalucano.png" 
                                    alt="Logo" 
                                    className="w-auto max-w-[360px] h-auto filter invert brightness-200" 
                                />
                        </div>
                    </button>
      <h1 className="text-base md:text-xl text-center text-wrap w-72 md:w-full text-white font-bold">فرم پیش ثبت نام نمایندگی <span className="text-lucano-color">729</span> رادین تجارت</h1>

    </div>

    <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
      <div className="relative z-30 space-y-4">
        <InputField
          placeholder="نام خود را وارد کنید"
          iconClass="bi-person-badge-fill"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={errors.firstName} 
        />
        <InputField
          placeholder="نام خانوادگی خود را وارد کنید"
          iconClass="bi-person-badge"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={errors.lastName} 
        />
        <InputField
          placeholder="نام پدر خود را وارد کنید"
          iconClass="bi-person-bounding-box"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
          error={errors.fatherName} 
        />
        
        <InputField
          placeholder="کدملی خود را وارد کنید"
          iconClass="bi-person-vcard-fill"
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
          error={errors.nationalCode} 
        />
        <InputField
          placeholder="ادرس محل سکونت"
          iconClass="bi-geo-alt"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={errors.address} 
        />
        <div className="flex justify-between">
          <div className="w-full">
            <SelectField
                label="خودرو مورد نظر"
                options={carsList.map(element => ({
                  value: element,
                  label: element
                }))}
                placeholder="خودروهای موجود فعلی"
                value={selectedOption}
                onChange={handleSelectChange}
                error={errors.selectedOption} 
              />
          </div>
          <div className="ms-2 w-full">
            <SelectField
              label="رنگ مورد نظر"
              options={[
                { value: 'سیاه', label: 'سیاه' },
                { value: 'سفید', label: 'سفید' },
              ]}
              placeholder="رنگ های موجود فعلی"
              value={selectedColor}
              onChange={handleColorChange}
              error={errors.color} 
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-full">
            <SelectField
              label="شیوه اشنایی با نمایندگی"
              options={[
                { value: 'گوگل', label: 'گوگل' },
                { value: 'اینستاگرام', label: 'اینستاگرام' },
                { value: 'معرفی دوستان', label: 'معرفی دوستان' },
                { value:  'تلگرام', label: 'تلگرام' },
                { value:  'سایر', label: 'سایر' },
              ]}
              placeholder="شیوه اشنایی"
              value={selectedCat}
              onChange={handleSelectedCat}
              error={errors.selectedCat} 
            />
          </div>
          <div className="ms-2 w-full">
            <SelectField
              label="روش پرداخت"
              options={[
                { value: 'اقساطی', label: 'اقساطی' },
                { value: 'نقدی', label: 'نقدی' },
              ]}
              placeholder="روش پرداخت"
              value={regModel}
              onChange={handleRegChange}
              error={errors.regModel} 
            />
          </div>
        </div>
        <div className="">
            
          </div>
      </div>

      <div className="flex items-center justify-between">
        <button type="submit" className="inline-block rounded-lg bg-lucano-color px-5 py-3 text-sm font-medium text-white">
          پیش ثبت نام
        </button>
      </div>
    </form>
  </div>

  <div className="relative flex justify-center items-center w-full lg:h-full lg:w-1/2 overflow-hidden py-4 hidden  md:block ">
  <div className="relative h-full w-full  p-12 md:p-0  ">
    <Swiper
      pagination={{ clickable: true }}
      effect='coverflow'
      centeredSlides
      className="w-full  h-full rounded-xl" // Use Tailwind classes for full size
    >
      <SwiperSlide
        className="bg-center bg-cover"
        style={{
          backgroundImage: "url('/static/images/lucano5.jpg')",
        }}
      />
      <SwiperSlide
        className="bg-center bg-cover"
        style={{
          backgroundImage: "url('/static/images/lucano23.jpg')",
        }}
      />
      <SwiperSlide
        className="bg-center bg-cover"
        style={{
          backgroundImage: "url('/static/images/lucano3.jpg')",
        }}
      />
      <SwiperSlide
        className="bg-center bg-cover"
        style={{
          backgroundImage: "url('/static/images/lucano4.jpg')",
        }}
      />
    </Swiper>
  </div>
</div>
</section>
</div>
</main>
                        </div>
                     
                    </div>
                            
                        </div>  
        </> );
    }

export default PreRegistrationForm;