'use client'; // Ensure this is at the top of your file

import Breadcrumb from "@/app/components/Breadcrumb";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import PN from "persian-number";
import Modal from 'react-modal';
import ReactPaginate from "react-paginate";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Product() {
    const token = Cookies.get('user-cookie');
    const [services, setServices] = useState([]);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const formatNumberWithDots = (input) => {
        if (typeof input === 'string') {
            const parsedNumber = parseFloat(input);
            if (isNaN(parsedNumber)) {
                return '';
            }
            input = parsedNumber;
        } else if (typeof input !== 'number') {
            return '';
        }
        return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/web/serviceOrder/services?page=${currentPage}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Access-Control-Allow-Origin' : '*',
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                setServices(response.data.data);
                setTotalPages(response.data.meta.last_page);
            } else {
                
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error(error.response.data.message || 'Unauthorized access', {
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
                    const cameRoute = '/serviceorder';
                    localStorage.setItem('cameRoute', cameRoute);
                } else {
                    toast.error(error.response.data.message || 'An error occurred', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            } else {
                toast.error('Network error', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
    };
    const handlePageChange = (data) => {
        const selectedPage = data.selected + 1; // React Paginate uses zero-based index
        setCurrentPage(selectedPage);
        fetchData(selectedPage); // Fetch data for the selected page
      };
    useEffect(() => {
        fetchData(currentPage);
      }, [currentPage]);

    const breadcrumbLinks = [
        { url: '/serviceorder', label: 'خدمات' },
        { url: '/serviceorder/editorder', label: 'سرویس های انجام شده' },
    ];
    const truncateDescription = (description) => {
        if (!description) return '--';
        return description.length > 30 ? description.slice(0, 30) + '...' : description;
    };
    const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Function to check window size
    const checkScreenSize = () => {
        if (typeof window !== 'undefined') {
            setIsSmallScreen(window.innerWidth < 768);
        }
    };

    // Check screen size on mount
    checkScreenSize();

    // Add resize event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup event listener on unmount
    return () => {
        window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
const getModalWidth = () => {
    if (isSmallScreen) {
        return '40%'; // Adjust as needed for small screens
    } else {
        return '70%'; // Adjust as needed for larger screens
    }
  };
    const [isOpen,setIsOpen] = useState(false)
    const openModal = (serviceId) => {
        setSelectedServiceId(serviceId); // Set the selected service ID
        setIsOpen(true);
    };
    
    const closeModal = () => {
        setIsOpen(false);
        setShowInput(false)
    };
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
                maxHeight: isSmallScreen ? '100%' : '60%',
                width: 'auto',
                maxWidth: '500px', // Set a max width to prevent overflow
                padding: '0px',
                margin: 'auto',
                zIndex: 999,
                border: '0px',
                borderRadius: isSmallScreen ? '0px' : '15px',
                overflow: 'hidden',
            },
        };
    };
     const modalRootRef = useRef(null);
            useEffect(() => {
              Modal.setAppElement('#preroot'); // Set the app element to #preroot
          }, []);

     const [selectedDescription, setSelectedDescription] = useState('');
     const [selectedName, setSelectedName] = useState('');
     const [checkboxStates, setCheckboxStates] = useState({});
     const handleCheckboxChange = async (serviceId) => {
        const newCheckedState = !checkboxStates[serviceId]; // Toggle the state for the specific service
         // Update local state
    
        // Make the Axios POST request
        try {
            const response = await axios.post(`${baseUrl}/api/web/serviceOrder/showService/${serviceId}`, {}, { // Removed isChecked
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if(response.status === 200){
                setCheckboxStates(prev => ({ ...prev, [serviceId]: newCheckedState }));
                fetchData(currentPage)
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

            }
            
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };
    const [editServicerDescription,setEditServicerDescription]=useState(false)
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [showInput, setShowInput] = useState(false);
    const handleAddButtonClick = () => {
        setShowInput(prev => !prev); // Toggle the input field
        setInputValue(selectedDescription || ''); // Ensure it's never null
    };
    const handleAddDescription = async ({serviceId}) => {
        try {
            const response = await axios.post(`${baseUrl}/api/web/serviceOrder/storeDescription/${serviceId}`, {
                servicerDescription: inputValue,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                toast.success('توضیحات با موفقیت اضافه شد!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setInputValue(''); // Clear the input field
                setSelectedDescription(response.data.data); // Update the selected description
                setShowInput(false); // Hide the input field
                fetchData(currentPage);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'خطا در افزودن توضیحات', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };
    return (
        <>
            <Header />
            <div className="z-50">
                <ToastContainer />
            </div>
            <div className="bg-zinc-400 bg-auto h-full w-full">
                <div className={`bg-gradient-to-t from-gholamzadeh-productcolor to-zinc-900 bg-no-repeat bg-cover bg-bottom bg-gray-200 flex justify-center items-center w-full h-full`}>
                    <div className="pt-56 w-full">
                        {services.length === 0 ?(

                    <div className="py-4 w-full h-screen flex justify-center items-center text-center text-gholamzadeh-color">
                    <p className="">هیچ سرویسی برای نمایش وجود ندارد.</p>
                    </div>

                        ):(
                           <>
                           
                           <div className="mb-5 pb-5 mx-auto w-full max-w-full border-b-2 border-gray-100 md:top-6 lg:max-w-screen-lg">
                            <div className="w-full max-w-full flex flex-col md:flex-row justify-between px-5 md:px-0">
                                <div className="w-full max-w-full">
                                    <Breadcrumb links={breadcrumbLinks} />
                                </div>
                                <div className="flex justify-end items-center w-full max-w-full">
                                    <h1 className="text-start text-white max-w-full text-sm px-5">سرویس پنل</h1>
                                </div>
                            </div>
                        </div>
                        
                        <div className="w-screen max-w-[1400px] mx-auto bordersize:w-full px-5 my-5  overflow-x-auto">
                            <div dir="rtl" className="shadow-lg w-full max-w-full border rounded-lg relative overflow-x-auto ">
                                <table dir="rtl" className="  table-auto   border-stone-300 ">
                                    <thead>
                                        <tr className="bg-stone-300">
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">ایدی</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">توضیخات</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">شماره پذیرش</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">نام مشتری</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">نام سرویس دهنده</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">وضعیت مشاهده سرویس دهنده</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">توضیحات سرویس دهنده</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">قیمت</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">نام</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">نام خانوادگی</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">شماره تماس</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">کدملی</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">نام خودرو</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">شماره شاسی خودرو</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">رنگ خودرو</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">پلاک خودرو</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">کارکرد خودرو</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">وضعیت</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">توضیحات تکمیلی</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap text-center text-gray-600 uppercase">نوع پرداخت</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm  text-nowrap md:text-wrap text-center text-gray-600 uppercase">وضعیت پرداخت</th>
                                            <th className="py-4 px-6 PEYDA-BOLD text-sm text-nowrap md:text-wrap    text-center text-gray-600 uppercase">تصاویر خودرو</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gradient-to-r from-gholamzadeh-productcolor to-zinc-900">
                                        {services.map(service => (
                                            <tr key={service.id} className="">
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200">{service.id || '--'}</td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200 truncate"><button onClick={() => {setSelectedDescription(service.description);setSelectedName('توضیحات');setEditServicerDescription(false);openModal(service.id)}} className="w-full p-2 rounded-lg h-full relative border text-stone-300 border-stone-300 hover:text-gholamzadeh-color hover:border-gholamzadeh-color truncate ">{'مشاهده توضیحات' || '--'}...</button></td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200 truncate">{service.reception_number || '--'}</td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200">{service.user || '--'}</td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200">{service.servicer || '--'}</td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200">
                                                    {!service.showInServicer && (
                                                        <input
                                                            checked={checkboxStates[service.id] || false} // Use service ID to manage state
                                                            onChange={() => handleCheckboxChange(service.id)} // Call the new function
                                                            id={`checkbox-${service.id}`} // Unique ID for each checkbox
                                                            type="checkbox"
                                                            className="w-4 h-4 text-gholamzadeh-color bg-gray-100 border-gray-300 rounded-sm focus:ring-gholamzadeh-color"
                                                        />
                                                    )}
                                                    
                                                    {service.showInServicer ? (
                                                        <span>مشاهده شده</span>
                                                    ) : <span>مشاهده نشده</span>}
                                                </td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200 truncate">
                                                <button onClick={() => {
                                                    setSelectedDescription(service.servicerDescription);
                                                    setSelectedName('توضیحات سرویس دهنده');
                                                    setEditServicerDescription(true); // Correctly update the state
                                                    openModal(service.id);
                                                }} className="w-full p-2 rounded-lg h-full relative border text-stone-300 border-stone-300 hover:text-gholamzadeh-color hover:border-gholamzadeh-color truncate ">
                                                    {'مشاهده توضیحات' || '--'}...
                                                </button>
                                                </td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200">{PN.convertEnToPe(formatNumberWithDots(service.price)) || '--'}</td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200">{service.firstName || '--'}</td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200">{service.lastName || '--'}</td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200">{service.phone || '--'}</td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200 ">{service.nationalCode || '--'}</td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200 ">{service.carName || '--'}</td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200 ">{service.chassisNumber || '--'}</td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200">{service.carColor || '--'}</td>
                                                <td className="py-4 px-6 text-center text-nowrap              border-b text-xs text-white border-gray-200 ">{service.carPlateNumber || '--'}</td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200">{service.vehicleOperation || '--'}</td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200">{service.status || '--'}</td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200 truncate"><button onClick={() => {setSelectedDescription(service.finalDescription);setSelectedName('توضیحات تکمیلی');openModal(service.id);setEditServicerDescription(false)}} className="w-full p-2 rounded-lg h-full relative border text-stone-300 border-stone-300 hover:text-gholamzadeh-color hover:border-gholamzadeh-color truncate ">{'مشاهده توضیحات' || '--'}</button></td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200">{service.paymentModel}</td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200">{service.paymentStatus}</td>
                                                <td className="py-4 px-6 text-center text-nowrap md:text-wrap border-b text-xs text-white border-gray-200">
                                                    {service.image.length > 0 ? (
                                                        <button 
                                                        onClick={() => { router.push(`/serviceorder/addorder/${service.id}`) }} 
                                                        className="w-full h-full bg-transparent border-none cursor-pointer"
                                                    >
                                                        <span className="bg-green-500 hover:bg-green-600 transition duration-200 text-white py-1 px-2 rounded-full text-nowrap text-sm user-select-none pointer-events-none flex justify-center items-center">
                                                            تصاویر موجود<i className="bi bi-check-circle px-1 flex justify-center items-center"></i>
                                                        </span>
                                                    </button>
                                                    ) : (
                                                        <button 
                                                        onClick={() => { router.push(`/serviceorder/addorder/${service.id}`) }} 
                                                        className="w-full h-full bg-transparent border-none cursor-pointer"
                                                    >
                                                        <span className="bg-red-500 hover:bg-red-600 transition duration-200 text-white py-1 px-2 rounded-full text-nowrap text-sm user-select-none pointer-events-none flex justify-center items-center">
                                                            افزودن تصویر<i className="bi bi-plus-circle px-1 flex justify-center items-center"></i></span>
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                           <div className="h-16 w-full  flex justify-center items-center">
                           <ReactPaginate
  previousLabel={'قبلی'}
  nextLabel={'بعدی'}
  breakLabel={'...'}
  breakClassName={'cursor-pointer px-1 py-1 border border-gholamzadeh-color rounded hover:bg-gholamzadeh-color  text-gholamzadeh-color  hover:text-white'}
  pageCount={totalPages}
  marginPagesDisplayed={2}
  pageRangeDisplayed={5}
  onPageChange={handlePageChange}
  containerClassName={'flex justify-center items-center space-x-3'}
  pageClassName={'cursor-pointer px-3 py-1 border border-gholamzadeh-color rounded hover:bg-gholamzadeh-color text-gholamzadeh-color hover:text-white'}
  previousClassName={'cursor-pointer me-1 px-3 py-1 border border-gholamzadeh-color rounded hover:bg-gholamzadeh-color text-gholamzadeh-color hover:text-white'}
  nextClassName={'cursor-pointer px-3 py-1 border border-gholamzadeh-color rounded hover:bg-gholamzadeh-color text-gholamzadeh-color hover:text-white'}
  activeClassName={'bg-gholamzadeh-productcolor px-1 text-white'}
  disabledClassName={'opacity-50 cursor-not-allowed px-1'}                               
/>

                           </div>
                           </>
                        )}
                        <div id="preroot" className="">
            <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            appElement={modalRootRef.current || undefined} // This can be used if you want to set it dynamically
            contentLabel="Example Modal"
            shouldCloseOnOverlayClick={true}
            style={getModalStyles()}
        >
          
          <div className="bg-gradient-to-t absolute md:border md:rounded-2xl from-gholamzadeh-productcolor to-zinc-900 w-full h-full">
    <div className="flex w-full justify-center items-center">
        <div className="w-full relative flex-col justify-center items-center">
            <button onClick={closeModal} className="text-gholamzadeh-color hover:text-zinc-900 hover:border-zinc-900 absolute top-5 right-5 border hover:bg-gholamzadeh-color border-gholamzadeh-color rounded-lg px-5">خروج</button>
        </div>
    </div>
    <div className="flex w-full justify-center items-center">
        <div className="w-full relative flex-col justify-center items-center">
            {editServicerDescription && (
                <div className="flex justify-center items-center">
                    {selectedDescription
                    ?
                    (<button onClick={handleAddButtonClick} className="text-gholamzadeh-color flex justify-center items-center hover:text-zinc-900 hover:border-zinc-900 absolute top-5 left-5 border hover:bg-gholamzadeh-color border-gholamzadeh-color rounded-lg px-5">
                        <i className="bi bi-pencil-square px-1 flex justify-center items-center"></i>
                        ویرایش
                    </button>)
                    :
                    (<button onClick={handleAddButtonClick} className="text-gholamzadeh-color flex justify-center items-center hover:text-zinc-900 hover:border-zinc-900 absolute top-5 left-5 border hover:bg-gholamzadeh-color border-gholamzadeh-color rounded-lg px-5">
                        <i className="bi bi-plus  px-1 flex justify-center items-center"></i>
                        افزودن
                    </button>)}
                    
                    
                </div>
            )}
        </div>
    </div>
    <div className="w-full max-w-md mx-auto"> {/* Set a max-width for the content */}
        <h1 className="text-gholamzadeh-color p-5 w-full text-center rounded-lg text-nowrap">{selectedName || 'ندارد'}</h1>
        <div className="mx-auto flex justify-center items-center">
        <h1 dir="rtl" className="text-gray-200 border-t py-5">{selectedDescription || 'ندارد'}</h1>
        </div>
        {showInput && (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                        <textarea
                            value={inputValue || ''} // Ensure it's never null
                            dir="rtl"
                            onChange={(e) => setInputValue(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 mt-2 text-black w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                            placeholder="توضیحات جدید"
                        />
                        <button 
                            onClick={() => handleAddDescription({ serviceId: selectedServiceId })} // Pass the selected service ID
                            className="mt-2 bg-gholamzadeh-color w-full text-white rounded-lg px-4 py-2"
                        >
                            ارسال
                        </button>
                    </div>
                    )}
    </div>
</div>
               
            </Modal>
            </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}