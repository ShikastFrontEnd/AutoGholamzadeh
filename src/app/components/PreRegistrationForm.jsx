'use client'

import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import Link from 'next/link';
import Image from "next/image";
import { BeatLoader, ClipLoader } from 'react-spinners';
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
import SelectField from './SelectField';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PreInputField from './preInputField';
import Breadcrumb from './Breadcrumb';
import ColorSelectField from './ColorSelectField';




function PreRegistrationForm({carid}) {
  const baseUrl=process.env.NEXT_PUBLIC_API_BASE_URL;;
  const [loading,setLoading] = useState(false)
  const [buttonLoading,setButtonLoading] = useState(false)
  const car_id =carid
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
  const [selectedPercentage, setSelectedPercentage] = useState('');
  const [carName, setCarName] = useState('');
  const [regModel, setRegModal] = useState('');
  const [maxMonth, setMaxMonth] = useState('');
  const [imageUrl, setImageUrl] = useState();
  const [carscolors,setCarsColors] = useState([])
  const [startPercentage,setStartPercentage] =useState(null);
  const [endPercentage,setEndPercentage] = useState(null);
  const [isInstallments,setIsInstallments] = useState(null);
  const generatePercentageOptions = () => {
    const options = [];
    const start = parseInt(startPercentage, 10);
    const end = parseInt(endPercentage, 10);

    if (!isNaN(start) && !isNaN(end) && start <= end) {
      for (let i = start; i <= end; i += 10) {
        options.push({ value: i, label: `${i}%` });
      }
    }

    return options;
  };
  const [startMonth,setStartMonth] =useState(1);
  const [endMonth,setEndMonth] = useState(null);
  const generateMonth = () => {
    const options = [];
    const start = parseInt(startMonth, 10); // Corrected here
    const end = parseInt(endMonth, 10); // Corrected here

    if (!isNaN(start) && !isNaN(end) && start <= end) {
        for (let i = start; i <= end; i++) {
            options.push({ value: i, label: `${i}` }); // Changed label to just i
        }
    }

    return options;
};
  const [errors, setErrors] = useState({
    firstName:"",
    lastName: "",
    fatherName:"",
    nationalCode:"" ,
    address: "",
    selectedOption:"",
    phone: "",
    color: "",
    installmentsPercentage:"",
    installmentsMonth:"",
    selectedPercentage: "" ,
    regModel:""
  });
  const token=Cookies.get('user-cookie');
  const handleSelectedPercentage = (event) => {
    setSelectedPercentage(event.target.value);
  };
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
  const handleMaxMonth = (event) => {
    setMaxMonth(event.target.value);
  };

  const handleSubmit = async (event) => {
    setButtonLoading(true)
    event.preventDefault();
  
  
    try {
      const url = `${baseUrl}/api/web/carRegister/store`;
      const data = {
        firstName,
        lastName,
        fatherName,
        phone: mobile,
        nationalCode,
        carModel: carName,
        regModel,
        color: selectedColor,
        installmentsPercentage:selectedPercentage,
        installmentsMonth:maxMonth,
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
        setButtonLoading(false)
      } else if (error.request) {
        router.push('/')
      } else {
        router.push('/')
      }
    }
  };
  

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${baseUrl}/api/web/carRegister/carConditional/${car_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
      setCarName(response.data.data.carName)
      setImageUrl(response.data.data.imageUrl)
      setIsInstallments(response.data.data.is_installments)
      setCarsColors(response.data.data.colors)
      setStartPercentage(response.data.data.minInstallmentsPercentage)
      setEndPercentage(response.data.data.maxInstallmentsPercentage)
      setEndMonth(response.data.data.maxMonth)
      setLoading(false)
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          
          const cameRoute = `/preregisterform/${car_id}`
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
    fetchData(); // Call the fetchData function when the component mounts
  }, []);
  
  const breadcrumbLinks = [
    { url: '/preregisterform', label: 'لیست خودرو ها' },
    { url: `/preregisterform/${car_id}`, label: `${carName}`,classNames:'hidden md:block' }
  ];
    return ( <>
    <div className="z-50">
    <div className=""><ToastContainer className={`z-50 px-5`} /></div>
    </div>
        
                        <div className="bg-zinc-400 bg-auto h-auto w-full " >
                    <div
                        className="bg-no-repeat bg-cover bg-bottom bg-gray-200   flex justify-center items-center w-full h-auto min-h-screen "
                        style={{ backgroundImage: "url('/static/images/gxtrim.jpg')" }} 
                    >
                        <div className="w-full h-full backdrop-blur-md flex  py-32">
                        {loading ? (
                      <div className="w-full h-screen flex justify-center items-center">
                          <BeatLoader
                              color={'red'}
                              size={'30 md:150'}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                          />
                      </div>
                  ) : (
                        <main id="content" role="main" className=" w-full h-full md:mx-auto flex justify-center items-center p-5  ">
                        <div dir="rtl" className=" px-5 py-16 bg-gholamzadeh-productcolor lg:max-w-[1700px] sm:w-screen w-full h-full md:h-full  rounded-3xl shadow-2xl border border-white">
                        <div dir='ltr' className="mb-5 pb-5 mx-auto  w-full  max-w-full border-b-2 border-gray-100  md:top-6  lg:max-w-screen-lg">
            <div className="w-full flex flex-col md:flex-row justify-between px-5 md:px-0">
              <div className="flex items-center"><Breadcrumb links={breadcrumbLinks}/></div>
              <div className="flex items-center justify-end"><h1 className="text-end">پیش ثبت نام</h1></div>
            </div>
            </div><section className="relative flex h-full justify-center items-center">
    <div className="w-full md:max-h-full lg:w-1/2 flex flex-col justify-center">
      <div className="mx-auto max-w-lg text-center">
      {/* <button className="p-2 transition hidden md:block">
                        <div className="flex justify-center items-center">
                                <img 
                                    src="/static/images/sss.png" 
                                    alt="Logo" 
                                    className="w-auto max-w-[360px] h-auto filter invert brightness-200" 
                                />
                        </div>
                    </button> */}
                          <Link href={'/'}><h1 className="w-auto max-w-[360px] text-center h-auto text-6xl BeutyFont text-gholamzadeh-color" >Gholamzadeh</h1></Link>
      <h1 className="text-base md:text-xl text-center text-wrap w-72 md:w-full text-white font-bold">فرم پیش ثبت نام نمایندگی <span className="text-gholamzadeh-color">غلامزاده</span></h1>

    </div>

    <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
      <div className="relative z-30 space-y-4">
        <PreInputField
          placeholder="نام خود را وارد کنید"
          iconClass="bi-person-badge-fill"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={errors.firstName} 
        />
        <PreInputField
          placeholder="نام خانوادگی خود را وارد کنید"
          iconClass="bi-person-badge"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={errors.lastName} 
        />
        <PreInputField
          placeholder="نام پدر خود را وارد کنید"
          iconClass="bi-person-bounding-box"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
          error={errors.fatherName} 
        />
        
        <PreInputField
          placeholder="کدملی خود را وارد کنید"
          iconClass="bi-person-vcard-fill"
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
          error={errors.nationalCode} 
        />
        <PreInputField
          placeholder="ادرس محل سکونت"
          iconClass="bi-geo-alt"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={errors.address} 
        />
        <div className="flex justify-between">
          <div className="w-full">
          <div className="relative z-30">
          <label className="block text-sm font-medium text-gholamzadeh-color mb-1  backdrop-blur-sm">خودروی مورد نظر</label>
            <div className="w-full flex justify-center text-center items-center text-wrap"><h1 className='pt-2 text-center text-xl'>{carName}</h1></div>
          </div>
          </div>
          <div className="ms-2 w-full">
          <ColorSelectField
            label="رنگ مورد نظر"
            options={(carscolors || []).map(color => ({
                value: color.name,
                label: color.name,
                colorCode: color.color
            }))}
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
              label="شیوه اشنایی "
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
              options={isInstallments !== 0 ? [
                { value: 'اقساطی', label: 'اقساطی' },
                { value: 'نقدی', label: 'نقدی' },
              ] : [
                { value: 'نقدی', label: 'نقدی' },
              ]}
              placeholder="روش پرداخت"
              value={regModel}
              onChange={handleRegChange}
              error={errors.regModel} 
            />
          </div>
        </div>
        {isInstallments !==0?(<div className="flex justify-between">
            <div className="w-full">
            <SelectField
                label="درصد پیش پرداخت"
                options={startPercentage !== null && endPercentage !== null ? generatePercentageOptions() : []}
                placeholder="درصد پیش پرداخت"
                value={selectedPercentage}
                onChange={handleSelectedPercentage}
                error={errors.installmentsPercentage}
              />
            </div>
          <div className="ms-2 w-full">
          <SelectField
                label="تعداد اقساط"
                
                options={startMonth !== null && endMonth !== null ? generateMonth() : []}
                placeholder="تعداد اقساط"
                value={maxMonth}
                onChange={handleMaxMonth}
                error={errors.installmentsMonth} 
            />
          </div>
        </div>):(<></>)}
        <div className="">
            
          </div>
      </div>

      <div className="flex items-center justify-between">
      <button type="submit" className="inline-block rounded-lg bg-gholamzadeh-color px-5 py-3 text-sm font-medium text-white">
  <div className="flex items-center justify-between w-full">
    <span>پیش ثبت نام</span>
    {buttonLoading && (
      <div className="flex items-center mr-2"> {/* Add margin to space it from the text */}
        <ClipLoader
          color={'red'}
          size={'15'}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )}
  </div>
</button>
      </div>
    </form>
  </div>

  <div className="relative flex justify-center items-center w-full md:h-[700px] lg:h-[800px] lg:w-1/2 overflow-hidden py-4 hidden  md:block ">
  <div className="relative h-full w-full  p-12 md:p-0  ">
    <img src={`${baseUrl}${imageUrl}`} className='w-full rounded-xl h-full' />
  </div>
</div>
</section>
</div>
</main>)}
                        </div>
                     
                    </div>
                            
                        </div>  
        </> );
    }

export default PreRegistrationForm;