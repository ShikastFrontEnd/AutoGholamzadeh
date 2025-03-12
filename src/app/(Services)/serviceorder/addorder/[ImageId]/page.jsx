'use client'
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Header from "@/app/components/header";
import SuggInputField from "@/app/components/SuggInputField";
import SuggSelectField from "@/app/components/SuggSelectField";
import Footer from "@/app/components/footer";
const baseUrl=process.env.NEXT_PUBLIC_API_BASE_URL;

const ImageGrid = ({ beforeImages = [], images = [], onRemove }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {images.map((src, index) => (
        <div key={index} className="group cursor-pointer relative">
          <img
            src={src}
            alt={`Image ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center transition-opacity">
            <button 
              className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
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

export default function ServiceOrder(props) {
    const params = use(props.params);
    const { ImageId } = params;
    const router = useRouter();
    
     
        
    
    
    const [errors, setErrors] = useState({
          images:''
    });
    const token=Cookies.get('user-cookie');
    const handleImageSubmit = async (event) => {
      
      event.preventDefault();
      const formData = new FormData();
      formData.append('image', uploadedImagesNotUrl); // Append the image file
     // const url = `${baseUrl}/api/web/serviceOrder/addImage/${ImageId}`; // Use the correct ImageId
      try {
        const url = `${baseUrl}/api/web/serviceOrder/addImage/${ImageId}`; // Use the correct ImageId
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
    const [beforeImages,setBeforeImages]=useState([])
    const [orderedServicesId,setOrderedServicesId]=useState([])
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
      const NumberId = Number(ImageId)
      const foundItem = getImages.find(item => item.id === NumberId);
      
      // Check if foundItem is defined
      if (foundItem) {
          setBeforeImages(foundItem.image);
          console.log('Before Images:', foundItem.image);
      } else {
          console.log('No item found with id 1');
      }
  }, [getImages, ImageId]);

  
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
                    <form onSubmit={handleImageSubmit} className="mx-auto mb-0 mt-8 max-w-lg lg:max-w-full space-y-4">
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
                      <button 
                        type="button" // Change this to type="button"
                        onClick={() => { router.push('/serviceorder'); }} 
                        style={{ backgroundColor: '#111827' }} 
                        className="rounded-lg px-5 py-3 text-sm text-white"
                      >
                        خروج
                      </button>
                      </div>
                    </form>
                </div>
            </div>
        </div>
        <Footer />  
    </>)
}