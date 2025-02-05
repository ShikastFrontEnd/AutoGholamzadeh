'use client'
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
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import Breadcrumb from './Breadcrumb';
import config from "/next.config";

function TestDriveForm({eventId}) {
    const baseUrl=config.images.remotePatterns[0].hostname;
    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [currentCar, setCurrentCar] = useState('');
    const mobile =Cookies.get('newMobile')
    const [nationalCode, setNationalCode] = useState('');
    const [yourJob, setYourJob] = useState('');
    const [howMany, setHowMany] = useState('');
    const [description, setDescription] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [gender, setGender] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [isCustomer, setIsCustomer] = useState('');
    const [isDriveLicence, setIsDriveLicence] = useState('');
    const [selectedCat, setSelectedCat] = useState('');
    const [carsList, setCarsList] = useState([]);
    const [regModel, setRegModal] = useState('');
    const [dateValue, setDateValue] = useState(null);
    const [formattedDate,setFormattedDate] = useState('')
    const handleDateChange = (date) => {
    setDateValue(date);
    setFormattedDate(date.format('YYYY/MM/DD')); // Correctly update the state variable
};
  const event_id =eventId
  const [errors, setErrors] = useState({
    firstName:"",
    lastName: "",
    CurrentCar:"",
    yourJob:"",
    birth_date:"",
    nationalCode:"",
    howMany: "",
    selectedOption:"",
    selectedCity:"",
    gender:"",
    isCustomer:"",
    phone: "",
    color: "",
    selectedCat: "" ,
    isDriveLicence:"",
    regModel:""
  });
  const token=Cookies.get('user-cookie');
  const handleSelectedCat = (event) => {
    setSelectedCat(event.target.value);
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleGender = (event) => {
    setGender(event.target.value);
  };
  const handleSelectedCity = (event) => {
    setSelectedCity(event.target.value);
  };
  const handleIsCustomer = (event) => {
    setIsCustomer(event.target.value);
  };
  const handleIsDriveLicence = (event) => {
    setIsDriveLicence(event.target.value);
  };

  const handleCustomer = (event) => {
    setIsCustomer(event.target.value);
  };
  const handleRegChange = (event) => {
    setRegModal(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate form data here if necessary
  
    try {
      const url = `${baseUrl}/api/web/testDrive/storeTestDrive`;
      const data = {
        firstName,
        lastName,
        phone: mobile,
        nationalCode,
        city_id: selectedCity,
        eventPlace_id: event_id,
        carName: selectedOption,
        birth_date: formattedDate,
        gender,
        job: yourJob,
        isCustomer,
        isDriveLicence,
        knowMySite: selectedCat,
        customerCarModel: currentCar,
        howMany,
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
        router.push('/mytestdrives')
      } else {
        
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred.";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
        
        setErrors(error.response.data.errors || {});
      } else if (error.request) {
       
      } else {
        
      }
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
    }
  };

  const fetchData = async () => {
    try {
        const response = await axios.post(
            `${baseUrl}/api/web/testDrive/carModel/${event_id}`,
            {}, // Empty data object
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 200) {
            setCarsList(response.data.data)
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
              const cameRoute = `/testdrive/${event_id}`
              localStorage.setItem('cameRoute', cameRoute);
              router.push('/loginRegister');
               
            } else {
              
            }
        } else if (error.request) {
          
        } else {
            
        }
    }
};

useEffect(() => {
    fetchData(); 
}, []);
const breadcrumbLinks = [
  { url: '/testdrive', label: 'ایونت های تست درایو' },
  { url: `/testdrive/${event_id}`, label: `تست درایو` }
];
    return ( <>
    <div className="z-50">
    <div className=""><ToastContainer className={`z-50 px-5`} /></div>
    </div>
        
                        <div className="bg-zinc-400 bg-auto h-auto w-screen " >
                    <div
                        className="bg-no-repeat bg-cover bg-bottom bg-gray-200   flex justify-center items-center w-full h-auto min-h-screen "
                        style={{ backgroundImage: "url('/static/images/extrim.png')" }} 
                    >
                        <div className="w-full h-full backdrop-blur-md flex  pt-28 pb-96">
                        <main id="content" role="main" className=" w-full h-full md:mx-auto flex justify-center items-center p-5  ">
                        <div dir="rtl" className=" px-5 py-16 bg-gholamzadeh-productcolor lg:max-w-[1700px] sm:w-screen w-full h-full lg:h-full md:h-screen  rounded-3xl shadow-2xl border border-white">
                        <div dir='ltr' className="mb-5 pb-5 mx-auto  w-full  max-w-full border-b-2 border-gray-100  md:top-6  lg:max-w-screen-lg">
            <div className="w-full flex flex-col md:flex-row justify-between px-5 md:px-0">
              <div className="flex items-center"><Breadcrumb links={breadcrumbLinks}/></div>
              <div className="flex items-center justify-end"><h1 className="text-end">تست درایو</h1></div>
            </div>
            </div>  
  <section className="relative flex h-full justify-center items-center">
    <div className="w-full h-full lg:w-1/2 flex flex-col">
      <div className="mx-auto max-w-lg text-center">
      {/* <button className="p-2 transition hidden md:block">
                        <div className="flex justify-center items-center">
                                <img 
                                    src="/static/images/s.png" 
                                    alt="Logo" 
                                    className="w-auto max-w-[360px] h-auto filter invert brightness-200" 
                                />
                        </div>
                    </button> */}
                                <h1 className="w-auto max-w-[360px] text-center h-auto text-6xl BeutyFont text-gholamzadeh-color" >Gholamzadeh</h1>
                                <h1 className="text-base md:text-2xl text-center text-wrap w-72 md:w-full text-white font-bold">فرم تست درایو<span className="text-gholamzadeh-color">غلامزاده</span></h1>

    </div>

    <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
      <div className="relative z-30 space-y-4">
        <div className="w-full flex justify-center">
          <div className="w-full">
          <InputField
          label="نام خود را وارد کنید"
          placeholder="نام خود را وارد کنید"
          iconClass="bi-person-badge-fill"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={errors.firstName} 
        />
          </div>
          <div className="w-full ms-2">
          <InputField
          label="نام خانوادگی را وارد کنید"
          placeholder="نام خانوادگی خود را وارد کنید"
          iconClass="bi-person-badge"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={errors.lastName} 
        />
          </div>
        </div>
        
        <div className="w-full flex justify-between">
          <div className="w-full">
          <InputField
          label="خودروی فعلی شما"
          placeholder="خودروی فعلی شما"
          iconClass="bi-car-front-fill"
          value={currentCar}
          onChange={(e) => setCurrentCar(e.target.value)}
          error={errors.CurrentCar} 
        />
          </div>
          <div className="w-full ms-2">
          <InputField
          label="کدملی شما"
          placeholder="کدملی شما"
          iconClass="bi-person-vcard-fill"
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
          error={errors.nationalCode} 
        />
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-full">
            <InputField
          label="شغل شما"
          placeholder="شغل شما"
          iconClass="bi-graph-down"
          value={yourJob}
          onChange={(e) => setYourJob(e.target.value)}
          error={errors.yourJob} 
        /></div>
          <div className="w-full ms-2">
          <InputField
          label="تعداد همراه"
          placeholder="تعداد همراه"
          iconClass="bi-person-plus-fill"
          value={howMany}
          onChange={(e) => setHowMany(e.target.value)}
          error={errors.howMany} 
        />
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-full">
          <InputField
          label={"توضیحات"}
          placeholder="توضیحات"
          iconClass="bi-three-dots"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.howMany} 
        />
          </div>
          <div className="w-full ms-2">
          <div className="text-black w-full text-sm">
          <label className="block text-sm font-medium text-gholamzadeh-color mb-1  backdrop-blur-sm">تاریخ تولد</label>
          <DatePicker
      value={dateValue}
      onChange={handleDateChange}
      calendar={persian}
      locale={persian_fa}
      placeholder='تاریخ تولد'
      style={{
        backgroundColor: 'white',
        width: '100%',
        paddingInlineStart: '15px',
        paddingInlineEnd: '50px',
        paddingBlock: '25px',
      }}
      className='w-full p-5 m-5'
      calendarPosition="bottom-right"
    />
        </div>
          </div>
        </div>
        
        
        <div className="flex justify-between">
          <div className="w-full">
            <SelectField
                label="خودرو مورد نظر"
                options={carsList.map(car => ({
                  value: car.carName, label:car.carName
                }))}
                placeholder="خودروهای موجود فعلی"
                value={selectedOption}
                onChange={handleSelectChange}
                error={errors.selectedOption} 
              />
          </div>
          <div className="ms-2 w-full">
            <SelectField
              label="شهرستان"
              options={[
                { value: '1', label: 'اذرشهر' },
                { value: '2', label: 'ارومیه' },
              ]}
              placeholder="شهرستان"
              value={selectedCity}
              onChange={handleSelectedCity}
              error={errors.selectedCity} 
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-full">
            <SelectField
                label="جنسیت"
                options={[
                  { value: 'مرد', label: 'مرد' },
                  { value: 'زن', label: 'زن' },
                ]}
                placeholder="جنسیت"
                value={gender}
                onChange={handleGender}
                error={errors.gender} 
              />
          </div>
          <div className="ms-2 w-full">
            <SelectField
              label="قبلا مشتری ما بودید؟"
              options={[
                { value: '1', label: 'بله' },
                { value: '0', label: 'خیر' },
              ]}
              placeholder="مشتری بودید؟"
              value={isCustomer}
              onChange={handleCustomer}
              error={errors.color} 
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-full">
            <SelectField
              label="شیوه اشنایی"
              options={[
                { value: 'گوگل', label: 'گوگل' },
                { value: 'اینستاگرام', label: 'اینستاگرام' },
                { value: 'معرفی دوستان', label: 'معرفی دوستان' },
                { value:  'تلگرام', label: 'تلگرام' },
                { value:  'سایر', label: 'سایر' },
              ]}
              placeholder="شیوه اشنایی با نمایندگی"
              value={selectedCat}
              onChange={handleSelectedCat}
              error={errors.selectedCat} 
            />
          </div>
          <div className="ms-2 w-full">
          <SelectField
              label="گواهینامه دارید؟"
              options={[
                { value: 1, label: 'بله' },
                { value: 0, label: 'خیر' },
                
              ]}
              placeholder="شیوه اشنایی"
              value={isDriveLicence}
              onChange={handleIsDriveLicence}
              error={errors.isDriveLicence} 
            />
          </div>
        </div>
        <div className="">
            
          </div>
      </div>

      <div className="flex items-center justify-between">
        <button type="submit" className="inline-block rounded-lg bg-gholamzadeh-color px-5 py-3 text-sm font-medium text-white">
          پیش ثبت نام
        </button>
      </div>
    </form>
  </div>

  <div className="relative flex justify-center items-center w-full lg:h-full max-h-[850px] lg:w-1/2 overflow-hidden py-4 hidden md:block" style={{ height: '100vh' }}>
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
          backgroundImage: "url('/static/images/g.jpg')",
        }}
      />
      <SwiperSlide
        className="bg-center bg-cover"
        style={{
          backgroundImage: "url('/static/images/gs.jpg')",
        }}
      />
      <SwiperSlide
        className="bg-center bg-cover"
        style={{
          backgroundImage: "url('/static/images/gss.jpg')",
        }}
      />
      <SwiperSlide
        className="bg-center bg-cover"
        style={{
          backgroundImage: "url('/static/images/gsss.jpg')",
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