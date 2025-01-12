'use client'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Link from 'next/link';
import Image from "next/image";
import { ClipLoader } from 'react-spinners';
import 'animate.css/animate.min.css';
import { useRouter } from 'next/navigation';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SwiperCore, { Navigation, Pagination, EffectCube } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const ColorRadioOption = ({ id, label, selectedOption, handleChange }) => (
  <div className="flex justify-evenly">
    <input
      className="form-check-input ml-2"
      type="radio"
      name="flexRadioDefault"
      id={id}
      checked={selectedOption === id}
      onChange={handleChange}
    />
    <label className="form-check-label ml-2" htmlFor={id}>
      {label}
    </label>
  </div>
);

// InputField Component
const InputField = ({ placeholder, iconClass }) => (
  <div className="relative z-30">
    <input
      type="text"
      className="w-full rounded-lg text-black border-gray-200 p-4 pe-12 text-sm shadow-sm"
      placeholder={placeholder}
    />
    <span className="absolute inset-y-0 end-0 grid place-content-center justify-center items-center px-4">
      <i className={`bi pt-2 ${iconClass} text-lucano-color text-2xl`}></i>
    </span>
  </div>
);

const SelectField = ({ label, options, placeholder, value, onChange }) => {
  return (
    <div className="relative text-black">
      {label && <label className="block text-sm font-medium text-lucano-color mb-1  backdrop-blur-sm">{label}</label>}
      <select
        className="form-select block w-full mt-1 py-3 rounded-lg"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

function PreRegistrationForm() {
  const [selectedItem, setSelectedItem] = useState(null);
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value); // Corrected line
    };
  
    return ( <>
    <div className="z-50">
    <ToastContainer />
    </div>
        
                        <div className="bg-zinc-400 bg-auto h-screen w-full" >
                    <div
                        className="bg-no-repeat bg-cover bg-bottom bg-gray-200 flex justify-center items-center w-full h-full"
                        style={{ backgroundImage: "url('/static/images/lucano2.jpg')" }} 
                    >
                        <div className="w-full h-full backdrop-blur-md flex  pt-32">
                        <main id="content" role="main" className=" w-full mx-auto flex justify-center items-center p-5  ">
<div dir="rtl" className="px-5 bg-lucano-productcolor  w-full h-full max-w-[1800] rounded-3xl">
<section className="relative flex flex-wrap h-full ">
  <div className="w-full  lg:w-1/2 flex flex-col justify-center">
    <div className="mx-auto max-w-lg text-center">
      <button className="p-2 transition">
                        <div className="flex justify-center items-center">
                            <img 
                                src="https://ecodalucano.com/wp-content/uploads/2024/07/Logo-final-01-scaled-e1735563656132-300x27.webp" 
                                alt="Logo" 
                                className="w-[350] h-auto" 
                            />
                        </div>
                    </button>
      <h1 className="text-xl text-white font-bold text-nowrap">فرم پیش ثبت نام نمایندگی <span className="text-lucano-color">729</span> رادین تجارت</h1>

    </div>

    <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
    <div className="relative z-30 space-y-4">
    
      <InputField placeholder="نام خود را وارد کنید" iconClass="bi-person-badge-fill" />
      <InputField placeholder="نام خانوادگی خود را وارد کنید" iconClass="bi-person-badge" />
      <InputField placeholder="نام پدر خود را وارد کنید" iconClass="bi-person-bounding-box" />
      <InputField placeholder="تلفن همراه خود را وارد کنید" iconClass="bi-telephone" />
      <InputField placeholder="کدملی خود را وارد کنید" iconClass="bi-person-vcard-fill" />
      <InputField placeholder="ادرس محل سکونت" iconClass="bi-geo-alt" />
      <div className="flex justify-between">
                                                    <div className="">
                                                        <SelectField
                                                            label="خودرو مورد نظر"
                                                            options={[
                                                                { value: 'option1', label: 'LUCANO L6' },
                                                                { value: 'option2', label: 'LUCANO L7' },
                                                                { value: 'option3', label: 'LUCANO L8' },
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
                                                                { value: 'optionblack', label: 'سیاه' },
                                                                { value: 'optionwhite', label: 'سفید' }
                                                            ]}
                                                            placeholder="رنگ های موجود فعلی"
                                                            value={selectedColor}
                                                            onChange={handleColorChange}
                                                        />
                                                    </div>
                                                </div>
      
    </div>
    

    <div className="flex items-center justify-between">
      <button type="submit" className="inline-block rounded-lg bg-lucano-color px-5 py-3 text-sm font-medium text-white">
        پیش ثبت نام
      </button>
    </div>
  </form>
  </div>

  <div className="relative flex justify-center items-center w-full sm:h-96 lg:h-full lg:w-1/2 overflow-hidden py-4">
  <Swiper
      pagination={{ clickable: true }}
      navigation
      effect="cube"
      centeredSlides
    >
      <SwiperSlide
        style={{
          backgroundImage: "url(https://swiperjs.com/demos/images/nature-1.jpg)"
        }}
      />
      <SwiperSlide
        style={{
          backgroundImage: "url(https://swiperjs.com/demos/images/nature-2.jpg)"
        }}
      />
      <SwiperSlide
        style={{
          backgroundImage: "url(https://swiperjs.com/demos/images/nature-3.jpg)"
        }}
      />
      <SwiperSlide
        style={{
          backgroundImage: "url(https://swiperjs.com/demos/images/nature-4.jpg)"
        }}
      />
      <SwiperSlide
        style={{
          backgroundImage: "url(https://swiperjs.com/demos/images/nature-5.jpg)"
        }}
      />
      <style jsx>
        {`
          body {
            position: relative;
            height: 100%;
            width: 100%;
          }

          .swiper-container {
            width: 300px;
            height: 300px;
            position: absolute;
            left: 10%;
            top: 50%;
          }
          .swiper-slide {
            background-position: center;
            background-size: cover;
          }
        `}
      </style>
    </Swiper>
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