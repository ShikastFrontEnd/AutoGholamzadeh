'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Header from "@/app/components/header";
import SuggInputField from "@/app/components/SuggInputField";
import SuggSelectField from "@/app/components/SuggSelectField";
import Footer from "@/app/components/footer";
import "iran-license-plate/dist/License.css";
import IranLicensePlate from "iran-license-plate";
const baseUrl=process.env.NEXT_PUBLIC_API_BASE_URL;

const ImageGrid = ({beforeImages, images, onRemove }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {images.map((src, index) => (
        <div key={index} className="group cursor-pointer relative">
          <img
            src={src}
            alt={`Image ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center  transition-opacity">
          <button 
            className="bg-white text-gray-800 px-4 py-2 rounded-lg hoverbg-gray-200 transition-colors"
            onClick={(event) => {
              event.stopPropagation(); // Prevents the event from bubbling up
              onRemove(index); // Call the onRemove function with the index
            }}
          >
            پاک کردن
          </button>
          </div>
        </div>
      ))}
      {beforeImages.map((src, index) => (
        <div key={`${src}-${index}`} className="group cursor-pointer relative">
          <img
            src={`${baseUrl}${src}`}
            alt={`Image ${index + 1}`} // Changed to use index for better clarity
            className="w-full h-48 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center transition-opacity">
            {/* Uncomment and modify the button as needed */}
            {/* <button 
              className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={(event) => {
                event.stopPropagation(); // Prevents the event from bubbling up
                onRemove(index); // Call the onRemove function with the index
              }}
            >
              پاک کردن
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function ServiceOrder() {
    const car_id =17
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [chassisNumber, setChassisNumber] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [vehicleOperation, setVehicleOperation]=useState('');
    const [info, setInfo] = useState('');
    const [nationalCode, setNationalCode] = useState('');
    const [price, setPrice] = useState('');
    const [carColor, setCarColor] = useState('');
    const [carPlateNumber, setCarPlateNumber] = useState('');
    const hasWrongSerial = carPlateNumber === ''; 
    // const [isBrandselected, setIsBrandselected] = useState(false);
    // --------- value and nchange of the select
    const [selectedBrands, setSelectedBrands] = useState('');
    const [brands, setBrands] = useState([]); // Initialize as an empty array


    const handleSelectedBrands = async (selectedOption) => {
        setSelectedBrands(selectedOption);
        
        // Call the function to fetch data based on the selected brand
        await fetchServices(selectedOption);
      };
      
      const fetchServices = async (selectedBrand) => {
        try {
          const response = await axios.get(`${baseUrl}/api/web/serviceOrder/brandService/${selectedBrand}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {

            
            setService(response.data.data)
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
              const cameRoute = '/suggestions';
              localStorage.setItem('cameRoute', cameRoute);
            } else {
              // Handle other errors
            }
          } else if (error.request) {
            // Handle request errors
          } else {
            // Handle other errors
          }
        }
        setSelectedService(null);
        
      
        setErrors(prevErrors => ({
            ...prevErrors,
            brand: '',
            repairShop_id: ''
          }));
      };
    const [selectedService, setSelectedService] = useState('');
    const [service,setService] = useState([]);

    
    const handleSelectedService = (selectedOption) => {
      // Convert selectedOption to a number
      const selectedOptionId = Number(selectedOption);
      setSelectedService(selectedOption);
      // Use the selectedOptionId for comparison
      const selectedServiceData = service.find(agent => agent.id === selectedOptionId);
      if (selectedServiceData) {
          setPrice(selectedServiceData.price); // Assuming the service object has a 'price' property
      } else {
          setPrice(''); // Reset price if no service is selected
      } 
      setErrors(prevErrors => ({
          ...prevErrors,
          repairShop_id: '',
          dealerShip_id: '',
      }));
  };
    // --------- 
    // --------- 
    const [selectedfeedbackModels, setSelectedFeedbackModels] = useState('');
    const [feedbackModels,setFeedbackModels] = useState([]);

    const handleSelectedFeedbackModels = (event) => {
      setSelectedFeedbackModels(event);
      setErrors(prevErrors => ({
        ...prevErrors,
        model: ''
      }));
      };
    // --------- 
    // --------- 
    const [selectedFeedbackTypes, setSelectedFeedbackTypes] = useState('');
    const [feedbackTypes,setFeedbackTypes] = useState([]);

    const handleSelectedFeedbackTypes = (event) => {
      setSelectedFeedbackTypes(event);
      setErrors(prevErrors => ({
        ...prevErrors,
        type: ''
      }));
      };
    // --------- 
    const [errors, setErrors] = useState({
          brand_service_id:'',
          price:'',
          firstName:'',
          lastName:'',
          vehicleOperation:'',
          phone:'',
          nationalCode:'',
          carColor:'',
          carPlateNumber:'',
          description:'',
          chassisNumber:''
      

    });
    const token=Cookies.get('user-cookie');
    
    
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setCarPlateNumber(concatenatedString)
      
      try {
        const url = `${baseUrl}/api/web/serviceOrder/store`;
        const data = {
          brand_service_id:selectedService,
          price:price,
          firstName,
          lastName,
          vehicleOperation,
          phone,
          nationalCode,
          carColor,
          carPlateNumber:concatenatedString,
          paymentModel:'دستگاه پوز',
          description:info,
          chassisNumber
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
          setNextForm(true)
          setOrderdServicesId(response.data.data.id)
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
    const handleImageSubmit = async (event) => {
      event.preventDefault();
      setCarPlateNumber(concatenatedString);
    
      // Create a FormData object
      const formData = new FormData();
      formData.append('image', uploadedImagesNotUrl); // Append the image file
     // const url = `${baseUrl}/api/web/serviceOrder/addImage/${orderedServicesId}`; // Use the correct orderedServicesId
      try {
        const url = `${baseUrl}/api/web/serviceOrder/addImage/${orderedServicesId}`; // Use the correct orderedServicesId
        const response = await axios.post(url, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
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
          setBeforeImages(response.data.data)
          setUploadedImages([])
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
          console.log(error.request);
        } else {
          console.log(error.message);
        }
      }
    };
    
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/web/serviceOrder/viewData`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (response.status === 200) {
          setBrands(response.data.data.brands)

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
              const cameRoute = '/serviceorder'
              localStorage.setItem('cameRoute', cameRoute);
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
    
    const [inputValues, setInputValues] = useState({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };
  
    const concatenatedString =`${inputValues.input4}-${inputValues.input1}-ایران-${inputValues.input3}-${inputValues.input2}`;
    // ----------------------------------------- Open Next Form For Uploading The Images ------------------------ //
    const [nextForm,setNextForm]=useState(false)
    const [beforeImages,setBeforeImages]=useState([])
    const [orderedServicesId,setOrderdServicesId]=useState(null)
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploadedImagesNotUrl, setUploadedImagesNotUrl] = useState([]);
    const [getImages, setGetImages] = useState([]);
    const handleFileChange = (event) => {
      const file = event.target.files[0]; // Get the first file only
      if (file) {
        const newImageUrl = URL.createObjectURL(file); // Create a URL for the file
        setUploadedImages([newImageUrl]); // Set the uploaded image to an array with one image
        setUploadedImagesNotUrl(file); // Set the uploaded image to an array with one image
      }
    };
    const handleRemoveImage = (index) => {
      setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };
    
    const fetchDataGetCars = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/web/serviceOrder/services`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (response.status === 200) {
          setGetImages(response.data.data);
        } else {
          console.log('Network response was not ok');
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
            const cameRoute = '/serviceorder';
            localStorage.setItem('cameRoute', cameRoute);
          } else {
            console.log('Error response:', error.response);
          }
        } else if (error.request) {
          console.log('Request error:', error.request);
        } else {
          console.log('Error message:', error.message);
        }
      }
    };
    
    useEffect(() => {
      fetchDataGetCars(); // Call the fetchData function when the component mounts
    }, []);
    
    // Log getImages whenever it changes
    useEffect(() => {
      // Find the item with the matching id
      const foundItem = getImages.find(item => item.id ===orderedServicesId);
      // Check if foundItem is defined
      if (foundItem) {
          setBeforeImages(foundItem.images);
      } else {
          // console.log('No item found with id ');
      }
  }, [getImages, orderedServicesId]);

    useEffect(() => {
      
      console.log(concatenatedString)


    },[concatenatedString])
  
    return(<>
        <Header />
        <ToastContainer />
        <div className="min-h-screen  bg-gradient-to-r from-gholamzadeh-productcolor to-zinc-900 flex flex-col justify-center py-12 sm:py-12 md:py-24 lg:py-32">
          <div className="relative py-3 sm:max-w-xl lg:min-w-full mdlg:px-96 lg:px-20 md:w-full sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r  lg:mx-96 from-gholamzadeh-color to-gholamzadeh-productcolor shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="text-white relative px-3 py-10 bg-gradient-to-tr from-stone-300 via-stone-200 to-stone-100 shadow-lg md:p-3 lg:p-20 sm:rounded-3xl  sm:p-20">

                    <div className="text-center pb-6">
                    <h1 className="w-auto lg:w-full  text-center h-auto text-6xl BeutyFont text-gholamzadeh-productcolor" >Gholamzadeh</h1>
                        <p className="text-gray-600">
                       ثبت تصاویر خودرو
                        </p>
                    </div>
                    {nextForm
                    ?
                      (<form onSubmit={handleImageSubmit} className="mx-auto mb-0 mt-8 max-w-lg lg:max-w-full space-y-4">
                      <div className="relative z-30 space-y-4">
                       
                        <div className="w-full flex justify-between">
                          <div className="w-full">
                          <ImageGrid beforeImages={beforeImages} images={uploadedImages} onRemove={handleRemoveImage} />
                          </div>
                          
                        </div>
                        
                      
                <div className="flex justify-between space-x-3">
                        </div>
                        <div className="flex justify-between space-x-3">
                        
                        <div className="w-full">
                        {errors?.image && (
                          <div className="w-full  z-30"><h6 className="text-red-600 w-full text-center h-full">{errors.image}</h6></div>
                        )}
                        
                        <label dir="rtl" className="block pb-5 PEYDA-BOLD text-sm font-medium text-gholamzadeh-color backdrop-blur-sm ">
                            تصاویر خودرو
                          </label>
                          <div className="py-5 bg-white rounded-lg px-2">
                            <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                                <div className="md:flex">
                                    <div className="w-full p-3">
                                        <div className="relative border-dotted h-24 rounded-lg  border-2 border-gholamzadeh-color bg-stone-300 flex justify-center items-center">
                                            <div className="absolute">
                                                <div className="flex flex-col items-center">
                                                    <i className="bi bi-image text-4xl text-gholamzadeh-color"></i>
                                                    <span className="block text-gray-400 font-normal">انتخاب تصاویر برای اپلود</span>
                                                </div>
                                            </div>
                                            <input 
                                              type="file" 
                                              className="h-full w-full opacity-0" 
                                              accept=".jpg, .jpeg, .png, .webp" 
                                              onChange={handleFileChange} 
                                            /> 
                                        </div>
                                    </div>
                                   
                      
                                </div>
                            </div>
                        </div>
                         
                          </div>
                          </div>
                        
                      </div>
                
                      <div className="flex items-center justify-between ">
                      <button type="submit" style={{ backgroundColor: '#111827' }} className="rounded-lg px-5 py-3 text-sm text-white">
                          اپلود تصویر انتخاب شده
                      </button>
                      <button onClick={() => {router.push('/serviceorder')}} style={{ backgroundColor: '#111827' }} className="rounded-lg px-5 py-3 text-sm text-white">
                          خروج
                      </button>
                      </div>
                    </form>)

                    :


                    (<form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-lg lg:max-w-full space-y-4">
                      <div className="relative z-30 space-y-4">
                        <div className="w-full flex justify-between">
                          <div className="w-full "><SuggInputField
                        label='نام خانوادگی'
                      placeholder="نام خانوادگی مشتری را وارد کنید"
                      iconClass="bi-person-badge"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      error={errors?.lastName} 
                    /></div>
                          <div className="w-full ps-5 lg:ps-20">
                          <SuggInputField
                          label='نام'
                          placeholder="نام مشتری را وارد کنید"
                          iconClass="bi-person-badge-fill"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          error={errors?.firstName} 
                        />
                          </div>
                        </div>
                        <div className="w-full flex justify-between">
                          <div className="w-full "></div>
                          
                        </div>
                        <div className="w-full flex justify-between">
                          <div className="w-full">        <SuggInputField
                          label='شماره تماس'
                          placeholder="شماره تماس مشتری را وارد کنید"
                          iconClass="bi-telephone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          error={errors?.phone} 
                        /></div>
                          <div className="w-full ps-5 lg:ps-20">
                          <SuggInputField
                            label='کد ملی'
                          placeholder="کد ملی مشتری را وارد کنید"
                          iconClass="bi-person-vcard"
                          value={nationalCode}
                          onChange={(e) => setNationalCode(e.target.value)}
                          error={errors?.nationalCode} 
                        />
                          </div>
                        </div>
                        <div className="w-full flex justify-between">
                          <div className="w-full">        <SuggInputField
                          label='کارکرد خودرو'
                          placeholder="کارکرد خودروی مشتری را وارد کنید"
                          iconClass="bi-car-front"
                          value={vehicleOperation}
                          onChange={(e) => setVehicleOperation(e.target.value)}
                          error={errors?.vehicleOperation} 
                        /></div>
                          <div className="w-full ps-5 lg:ps-20">
                          <SuggInputField
                        label='رنگ خودرو'
                        placeholder="رنگ خودروی مشتری را وارد کنید"
                        iconClass="bi-palette"
                        value={carColor}
                        onChange={(e) => setCarColor(e.target.value)}
                        error={errors?.carColor} 
                      />
                          </div>
                        </div>
                        
                      <div className="w-full">
                      <div className="flex justify-between">
                      <div className="w-full ">
                      <SuggSelectField
                            label='خدمات انجام شده'
                            options={service && service.length > 0 ? service.map(agent => ({
                                value: agent.id, label: agent.name
                            })) : []} // Ensure brands is an array before mapping
                            placeholder="خدمات انجام شده را ثبت کنید"
                            value={selectedService}
                            onChange={handleSelectedService}
                            error={errors?.brand_service_id}
                            isDisabled={!selectedBrands} // Enable if a brand is selected
                        />
                
                        </div>
                        <div className="w-full ps-5 lg:ps-20">
                        <SuggSelectField
                            options={brands && brands.length > 0 ? brands.map(agent => ({
                                value: agent.id, label: agent.carName
                            })) : []} // Ensure brands is an array before mapping
                            label={'خودروی مورد نظر'}
                            placeholder="خودروی مورد نظر"
                            value={selectedBrands}
                            onChange={handleSelectedBrands}
                            error={errors?.brands}
                            // isDisabled={!selectedService} // Enable if a repair shop is selected
                        />
                        </div>
                        
                
                      </div>
                      
                     
                    </div>
                    
                      
                    <div className="w-full">
                  <div className="flex flex-col gap-y-5  md:flex-row w-full justify-between">
                    <div className="w-full">
                    <div className="w-full">
                          <SuggInputField
                          label='شماره شاسی'
                          placeholder="لطفا شماره شاسی خودروی مشتری را وارد کنید"
                          iconClass="bi-person-badge-fill"
                          value={chassisNumber}
                          onChange={(e) => setChassisNumber(e.target.value)}
                          error={errors?.chassisNumber} 
                        />
                          </div>
                    </div>
                
                    <div className="w-full md:w-full ps-0 md:ps-5 lg:ps-20">
                    <label dir="rtl" className="block PEYDA-BOLD text-sm font-medium text-gholamzadeh-color backdrop-blur-sm pb-1 ">
                        پلاک خودرو
                      </label>
                      <div className="w-full relative h-full max-h-22 py-3 border-2 bg-white rounded-lg border-black text-black">
                        <div dir="rtl" className="w-full flex justify-evenly h-full py-2 px-20">
                          <input
                            type="text"
                            name="input1"
                            dir="rtl"
                            maxLength={3}
                            placeholder="--------"
                            value={inputValues.input1}
                            onChange={handleChange}
                            className="w-20 p-2 text-black text-2xl text-center rounded-md border-0 focus:outline-none focus:ring-0 hover:ring-0"
                          />
                          <input
                            type="text"
                            name="input2"
                            dir="rtl"
                            maxLength={1}
                            placeholder="--------"
                            value={inputValues.input2}
                            onChange={handleChange}
                            className="w-20 p-2 text-black text-2xl text-center rounded-md border-0 focus:outline-none focus:ring-0 hover:ring-0"
                          />
                          <input
                            type="text"
                            name="input3"
                            dir="rtl"
                            maxLength={2}
                            placeholder="--------"
                            value={inputValues.input3}
                            onChange={handleChange}
                            className="w-20 p-2 text-black text-2xl text-center rounded-md border-0 focus:outline-none focus:ring-0 hover:ring-0"
                          />
                        </div>
                        <div className="w-12 h-full absolute bg-blue-800 left-0 top-0 rounded-l-md flex flex-col">
                          <div className="p-0.5 max-w-full max-h-8">
                            <img src="/static/images/flag_of_iran.svg.png" className="max-h-8" alt="" />
                          </div>
                          <div className="flex flex-col justify-end items-start h-full ms-0.5 mt-1">
                            <div className="flex justify-start items-end">
                              <span className="text-[12px] PEYDA-BOLD text-white">I.R.</span>
                            </div>
                            <div className="flex justify-start items-end">
                              <span className="text-[10px] PEYDA-BOLD text-white">IRAN</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-20 border-s-2 border-black h-full absolute top-0 right-0">
                          <div className="w-full flex justify-center items-center">
                            <img src="/static/images/iranFont.png" className="max-h-8 p-1" alt="" />
                          </div>
                          <div className="p-1 pb-1">
                            <input
                              type="text"
                              name="input4"
                              dir="rtl"
                              maxLength={2}
                              placeholder="--------"
                              value={inputValues.input4}
                              onChange={handleChange}
                              className="w-full pb-1 p-2 text-2xl text-center text-black border-black rounded-md border-0 focus:outline-none focus:ring-0 hover:ring-0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between space-x-3">
                        </div>
                        <div className="flex justify-between space-x-3">
                        
                        <div className="w-full">
                        <label dir="rtl" className="block PEYDA-BOLD text-sm font-medium text-gholamzadeh-color backdrop-blur-sm ">
                        توضیحات
                      </label>
                        <textarea 
                            placeholder="توضیحاتی راجب پروژه"
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                            dir="rtl"
                            rows="5" 
                            maxLength={1000}
                            className="min-h-20 max-h-80 appearance-none w-full rounded-lg border focus:outline-none focus:ring-0.5 focus:ring-gholamzadeh-color focus:border-gholamzadeh-color transition duration-150 ease-in-out border-gray-300 text-black  p-4 pe-12 text-sm shadow-sm">
                
                         </textarea>
                         {errors?.description && (
                        <div className="w-full  z-30"><h6 className="text-red-600 w-full text-center h-full">{errors.info}</h6></div>
                      )}
                          </div>
                          </div>
                        
                      </div>
                
                      <div className="flex items-center justify-between ">
                      <button type="submit" style={{ backgroundColor: '#111827' }} className="rounded-lg px-5 py-3 text-sm text-white">
                          ثبت سفارش
                      </button>
                      <button 
                        type="button" // Change this to type="button"
                        onClick={() => { router.push('/serviceorder'); }} 
                        style={{ backgroundColor: '#111827' }} 
                        className="rounded-lg px-5 py-3 text-sm text-white"
                      >
                        خروج
                      </button>
                      </div>
                    </form>)
                    
                    }
                    
                </div>
            </div>
        </div>
        <Footer />  
    </>)
}