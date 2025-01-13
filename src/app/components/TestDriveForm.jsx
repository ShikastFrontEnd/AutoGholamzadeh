'use client'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

// import styles bundle
import 'swiper/css/bundle';
import InputField from './InputField';
import SelectField from './SelectField';


function TestDriveForm() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [phone, setPhone] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [address, setAddress] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCat, setSelectedCat] = useState('');

  const handleSelectedCat = (event) => {
    setSelectedCat(event.target.value);
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      firstName,
      lastName,
      fatherName,
      phone,
      nationalCode,
      address,
      selectedOption,
      selectedColor,
    };
    console.log(formData);
    // You can send formData to your server or handle it as needed
  };


  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.lucano729.com/api/web/carRegister/createView', {
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers your API requires here
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log(data); // Log the data received from the API
    } catch (error) {
      console.log('Fetch error:', error); // Log the error for debugging
    }
  };

  useEffect(() => {
    fetchData(); // Call the fetchData function when the component mounts
  }, []); // 
    return ( <>
    <div className="z-50">
    <ToastContainer />
    </div>
        
                        <div className="bg-zinc-400 bg-auto h-screen w-screen" >
                    <div
                        className="bg-no-repeat bg-cover bg-bottom bg-gray-200 flex justify-center items-center w-full h-full"
                        style={{ backgroundImage: "url('/static/images/lucano2.jpg')" }} 
                    >
                        <div className="w-full h-full backdrop-blur-md flex  pt-32">
                        <main id="content" role="main" className=" w-full mx-auto flex justify-center items-center p-5  ">
<div dir="rtl" className="px-5 bg-lucano-productcolor sm:w-screen w-full h-full max-w-[1800] rounded-3xl shadow-2xl border border-white">
<section className="relative flex flex-wrap h-full ">
  <div className="w-full  lg:w-1/2 flex flex-col justify-center">
    <div className="mx-auto max-w-lg text-center">
      <button className="p-2 transition">
                        <div className="flex justify-center items-center">
                        <img 
                src="https://ecodalucano.com/wp-content/uploads/2024/07/Logo-final-01-scaled-e1735563656132-300x27.webp" 
                alt="Logo" 
                className="hidden md:block w-[330px] h-auto" 
            />
                        </div>
                    </button>
      <h1 className="text-xl text-white font-bold text-nowrap">فرم ثبت نام تست درایو  <span className="text-lucano-color">729</span> رادین تجارت</h1>

    </div>

    <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
      <div className="relative z-30 space-y-4">
        <InputField
          placeholder="نام خود را وارد کنید"
          iconClass="bi-person-badge-fill"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputField
          placeholder="نام خانوادگی خود را وارد کنید"
          iconClass="bi-person-badge"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputField
          placeholder="نام پدر خود را وارد کنید"
          iconClass="bi-person-bounding-box"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
        />
        <InputField
          placeholder="تلفن همراه خود را وارد کنید"
          iconClass="bi-telephone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <InputField
          placeholder="کدملی خود را وارد کنید"
          iconClass="bi-person-vcard-fill"
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
        />
        <InputField
          placeholder="ادرس محل سکونت"
          iconClass="bi-geo-alt"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="flex justify-between">
          <div className="">
            <SelectField
              label="خودرو مورد نظر"
              options={[
                { value: 'لوکانو L7', label: 'لوکانو L7' },
              ]}
              placeholder="خودروهای موجود فعلی"
              value={selectedOption}
              onChange={handleSelectChange}
            />
          </div>
          <div className="ms-2">
            <SelectField
              label="رنگ مورد نظر"
              options={[
                { value: 'سیاه', label: 'سیاه' },
                { value: 'سفید', label: 'سفید' },
              ]}
              placeholder="رنگ های موجود فعلی"
              value={selectedColor}
              onChange={handleColorChange}
            />
          </div>
        </div>
        <div className="">
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
            />
          </div>
      </div>

      <div className="flex items-center justify-between">
        <button type="submit" className="inline-block rounded-lg bg-lucano-color px-5 py-3 text-sm font-medium text-white">
          پیش ثبت نام
        </button>
      </div>
    </form>
  </div>

  <div className="relative flex justify-center items-center w-full sm:h-96 lg:h-full lg:w-1/2 overflow-hidden py-4 hidden  md:block ">
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

export default TestDriveForm;