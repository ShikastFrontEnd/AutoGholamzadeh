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
import SearchBox from "../components/searchbox";
import Modal from 'react-modal';
import ColorSelectField from "../components/ColorSelectField";
import SelectField from "../components/SelectField";
const baseUrl=process.env.NEXT_PUBLIC_API_BASE_URL;;
function Cars({ car , handlePreRegisterButton , }) {
    const router = useRouter(); 
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
            <div className={`mx-auto relative rounded-xl w-full max-w-full border border-gray-100 box bg-black/50 shadow backdrop-blur-sm lg:max-w-screen-lg`}>
                <div className="flex flex-col justify-between h-full">
                    <div className="relative w-full">
                        <LazyLoad height={200} offset={100} className="size-72 rounded-xl object-cover shadow-sm w-full h-full border-gray-100">
                            <img
                                alt=""
                                src={`${baseUrl}${car.imageUrl}`}
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
                            <div className="w-full text-white text-center text-xl flex">
                                <span className="pe-1">تومان</span>
                                <span className="PEYDA-BOLD">{PN.convertEnToPe(formatNumberWithDots(car.carPrice))}</span>
                            </div>
                            <div className="w-full text-white text-center text-xl flex justify-end">قیمت</div>
                        </div>
                        {car.is_installments !== 0 ? (
            <>
                <div className="flex justify-center">
                    <div className="w-full text-center text-base flex justify-center hover:text-white text-gholamzadeh-color">شرایط اقساط</div>
                </div>
                <div className="flex justify-between text-white">
                    <div className="w-full text-center text-base flex justify-start"><span className="pe-1">ماه</span>
                        <span>{car.maxMonth}</span></div>
                    <div className="w-full text-center text-base flex justify-end">حداکثر طول اقساط</div>
                </div>
                <div className="flex justify-between text-white">
                    <div className="w-full text-center text-base flex justify-start">
                        <span>{car.minInstallmentsPercentage}</span>
                        <span className="pe-1">٪</span>
                    </div>
                    <div className="w-full text-center text-base text-nowrap flex justify-end">حداقل اقساط درصد</div>
                </div>
                <div className="flex justify-between text-white">
                    <div className="w-full text-center text-base flex justify-start">
                        <span>{car.maxInstallmentsPercentage}</span>
                        <span className="pe-1">٪</span>
                    </div>
                    <div className="w-full text-center text-base text-nowrap flex justify-end">حداکثر اقساط درصد</div>
                </div>
            </>
        ) : car.conditionals !== null && car.conditionals.isMultiStage !== 0 ? (
            <>
                <div className="flex justify-evenly text-white">
                    <div className="w-full text-center text-base flex justify-start"></div>
                    <div className="w-full text-center text-base flex justify-end text-nowrap text-gholamzadeh-color hover:text-white">شرایط پرداخت چند مرحله ای</div>
                    <div className="w-full text-center text-base flex justify-start"></div>
                </div>
                <div className="flex justify-between text-white">
                    <div className="w-full text-center text-base flex justify-start"><span className="pe-1">تومان</span>
                    <span>{PN.convertEnToPe(formatNumberWithDots(car.conditionals.stageOne))}</span></div>
                    <div className="w-full text-center text-base flex justify-end">مرحله اول</div>
                </div>
                <div className="flex justify-between text-white">
                    <div className="w-full text-center text-base flex justify-start">
                        <span className="pe-1">تومان</span>
                        
                    </div>
                    <div className="w-full text-center text-base text-nowrap flex justify-end">مرحله دوم</div>
                </div>
                <div className="flex justify-between text-white">
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
    <button className="border text-gray-100 border-gray-100 hover:border-gholamzadeh-color hover:text-gholamzadeh-color  px-2 py-1 rounded-xl" onClick={() => handlePreRegisterButton(car.id,car.carName)}>پیش ثبت نام</button>
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
    const [isOpen,setIsOpen] = useState(false)
    const closeModal = (e) => {
        if (e.target === e.currentTarget) {
            setIsOpen(false);
        }
    };
    const router = useRouter();
    
    const fetchData = async () => {
        setLoading(true)
        try {
          const response = await axios.get(`${baseUrl}/api/web/carRegister/createView2`, {
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

    // search box api and const stuff

    const [data,setData] =useState('')
    const [error,setError] =useState()
    const [searchLoading,setSearchLoading] =useState()
    const [results,setResults] = useState()
    useEffect(() => {
      setResults(allcars.filter((item) => {return item.carName.includes(data)}))},[allcars,data])





    // end search box
    const [oldRegister,setOldRegister] = useState({})
    const [changable,setChangable] = useState('')

    const fetchMyRegisterData = async () => {
        try {
          const response = await axios.get(`${baseUrl}/api/web/carRegister/show`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            setOldRegister(response.data.data) 
            
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
              
            }
          } else if (error.request) {
           
          } else {
            
          }
        }
      };
      useEffect(() => {
        fetchMyRegisterData();
    }, []);
    const handlePreRegisterButton = async (carid, carModal) => {
        await fetchMyRegisterData();
        await fetchDataProperty(carid);
        setLoading(false);
    
        if (oldRegister && Object.keys(oldRegister).length > 0) {
            setChangable(carModal);
            setIsOpen(true);
        } else {
            router.push(`/preregisterform/${carid}`);
        }
    };





    // ----------------------------------

    const handlechangeRegister = async (event) => {
        event.preventDefault();
      
      
        try {
          const url = `${baseUrl}/api/web/carRegister/update/${oldRegister.id}`;
          
          const data = {
            firstName:oldRegister.firstName,
            lastName:oldRegister.lastName,
            fatherName:oldRegister.fatherName,
            phone: oldRegister.phone,
            nationalCode:oldRegister.nationalCode,
            carModel: carName,
            regModel,
            color: selectedColor,
            installmentsPercentage:selectedPercentage,
            installmentsMonth:maxMonth,
            knowMySite: selectedCat,
            address:oldRegister.address,
          };
          const response = await axios.post(url, data, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
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
            setIsOpen(false);
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
          } else if (error.request) {
            // router.push('/')
            console.log(error)
          } else {
            // router.push('/')
            console.log(error)
          }
        }
      };







    // ----------------------------------

// ---------------------------------------------- color fields and aother things
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
  const fetchDataProperty = async (car_id) => {
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

// ---------------------------------------------- color fields and aother things

    const getModalWidth = () => {
        if (window.innerWidth < 576) { // Small screens (sm)
            return '40%'; // Adjust as needed
        } else if (window.innerWidth < 768) { // Medium screens (md)
            return '70%'; // Adjust as needed
        } else { // Large screens (lg)
            return '70%'; // Adjust as needed
        }
    };
    const breadcrumbLinks = [
        { url: '/preregisterform', label: 'لیست خودرو ها' },
      ];

      const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

      useEffect(() => {
          const handleResize = () => {
              setIsSmallScreen(window.innerWidth < 768);
          };
  
          window.addEventListener('resize', handleResize);
          return () => {
              window.removeEventListener('resize', handleResize);
          };
      }, []);
  
      const getModalStyles = () => {
          return {
              overlay: {
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.5))',
                  zIndex: 1000,
              },
              content: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'linear-gradient(#ffff, #ffff, #ffff, #ffff, #ffff)',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  transform: 'none',
                  position: 'fixed',
                  height: isSmallScreen ? '100%' : 'auto',
                  maxHeight: isSmallScreen ? '100%' : '60%', // Adjust as needed
                  width: '100%',
                  maxWidth: isSmallScreen ? '100%' : '80%', // Adjust as needed
                  padding: '0px',
                  margin: 'auto',
                  zIndex: 999,
                  border: '0px',
                  borderRadius: '15px',
              },
          };
      };
      return (
        <>
            <Header />
            <div className="z-50">
                <ToastContainer />
            </div>
            <div className="bg-zinc-400 bg-auto h-full w-full">
                <div
                    className={`bg-gradient-to-t from-gholamzadeh-productcolor to-zinc-900 bg-no-repeat bg-cover bg-bottom bg-gray-200 flex justify-center items-center w-full ${loading ? 'h-screen' : 'h-full'}`}
                >
                    <div className="pt-56">
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
                            <>
                                <div className="mb-5 pb-5 mx-auto w-full max-w-full border-b-2 border-gray-100 md:top-6 lg:max-w-screen-lg">
                                    <div className="w-full flex flex-col md:flex-row justify-between px-5 md:px-0">
                                        <div className="w-full">
                                            <Breadcrumb links={breadcrumbLinks} />
                                        </div>
                                        <div className="flex justify-center items-center w-full">
                                            <SearchBox
                                                value={data}
                                                setValue={setData}
                                                onChange={(e) => {
                                                    setData(e.target.value);
                                                    // Log the new value instead of data
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="flex justify-center items-center w-full">
                            <h1 className="text-center text-white">لیست خودرو های موجود و شرایط فروش نقدی و اقساطی</h1>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:max-w-[1200px] gap-10 px-5 my-5">
                            {Array.isArray(results) && results.length > 0 ? (
                                results.map((element, index) => (
                                    <Cars handlePreRegisterButton={handlePreRegisterButton} key={index} car={element} />
                                ))
                            ) : Array.isArray(allcars) && allcars.length > 0 ? (
                                allcars.map((element, index) => (
                                    <Cars handlePreRegisterButton={handlePreRegisterButton} key={index} car={element} />
                                ))
                            ) : (
                                <p className="text-center text-white">هیچ ماشینی </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div id="preroot" className="">
            <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            appElement={document.getElementById('preroot')}
            contentLabel="Example Modal"
            shouldCloseOnOverlayClick={true}
            style={getModalStyles()}
        >
                <div className="w-full h-full box rounded-[15px]">
                <div className="w-full h-full flex flex-col md:flex-row justify-evenly">
                    <div className="flex w-full md:h-full justify-center items-center">
                        <div className="rounded-lg w-fit h-auto backdrop-blur-3xl   flex justify-center items-center">
                            
            <span
            className="relative block overflow-hidden border-r sm:w-full border-gray-100 p-4 sm:p-6 lg:p-8"
            dir="rtl"
            >
            <div className="text-gray-100">پیش ثبت نام قبلی شما</div>
    
            <div>
            </div>
            <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {oldRegister.firstName}
                    </dt>
                
                <dd className="text-xs text-white">نام</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {oldRegister.lastName}
                    </dt>
                
                <dd className="text-xs text-white">نام خانوادگی</dd>
                </div>
                </dl>
                <dl className="mt-6 flex ">
                
                
                </dl>
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm px-2 font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {oldRegister.nationalCode}
                    </dt>
                
                <dd className="text-xs text-white">کد ملی</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {oldRegister.phone}
                    </dt>
                
                <dd className="text-xs px-2 text-white">تلفن همراه</dd>
                </div>
                </dl>
                <dl className="mt-6 flex ">
                <div className="flex flex-col-reverse space-x-2 text-center w-full">
                
                    <dt className="text-sm font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {oldRegister.carModel}
                    </dt>
                
                <dd className="text-xs text-white">خودرو</dd>
                </div>
                <div className="flex flex-col-reverse  space-x-2 text-center w-full">
               
                    <dt className="text-sm  font-medium text-gholamzadeh-color hover:text-white cursor-pointer">
                    {oldRegister.color}
                    </dt>
                
                <dd className="text-xs text-white">رنگ</dd>
                </div>
                </dl>
            
            </span></div></div> 
                    <div className="w-full md:h-full flex justify-center items-center ">
                    <div className=" relative ">
                    <div dir="rtl" className="text-start p-5">
    <h1 dir="rtl" className="text-start inline">
        شما قبلا پیش ثبت نام دیگری برای خودرو {oldRegister.carModel} انجام داده اید چنانچه قصد تغییر خودرو
    </h1>
    <h1 dir="rtl" className="text-gholamzadeh-color text-start inline">
        ( {oldRegister.carModel} )
    </h1>
    <h1 dir="rtl" className="text-start inline">
        به
    </h1>
    <h1 dir="rtl" className="text-start inline">
        {changable}
    </h1>
    <h1 dir="rtl" className="text-start inline">
        را دارید تایید کنید
    </h1>
</div>
        <div dir="rtl" className="w-full flex justify-center items-center px-5">
            
        <div className="w-full">

        <div className="flex justify-between">
          <div className="w-full">
          <div className="relative z-30">
          <label className="block text-sm font-medium text-gholamzadeh-color mb-1  backdrop-blur-sm">خودروی مورد نظر</label>
            <div className="w-full flex justify-center text-center text-gray-100 items-center text-wrap"><h1 className='pt-2 text-center text-xl'>{changable}</h1></div>
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
        </div>
                        <div className=" p-5 pb-5 w-full">
                    
                        <div className="flex justify-between w-full">
                                <div className="w-full text-center text-base flex justify-start">
                                    <button className="border text-gray-100 border-gray-100 hover:border-gholamzadeh-color hover:text-gholamzadeh-color px-2 py-1 rounded-xl" >خروج</button>
                                </div>
                                <div className="w-full text-center text-base text-nowrap flex justify-end">
    <button className="border text-gray-100 border-gray-100 hover:border-gholamzadeh-color hover:text-gholamzadeh-color  px-2 py-1 rounded-xl" onClick={handlechangeRegister} >تایید</button>
</div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </Modal>
            </div>
        
            <Footer />
        </>
    );
}