'use client'
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import SuggInputField from "../components/SuggInputField";
import SuggSelectField from "../components/SuggSelectField";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Suggestions() {
    const car_id =17
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [content, setContent] = useState('');
    const [complainantName, setComplainantName] = useState('');
    // const [isDealerShipSelected, setIsDealerShipSelected] = useState(false);
    // --------- value and nchange of the select
    const [selectedDealerShips, setSelectedDealerShips] = useState('');
    const [dealerShips,setDealerShips] = useState([]);



    const handleSelectedDealerShips = (selectedOption) => {
      setSelectedDealerShips(selectedOption);
      setSelectedRepairShops(null);
      setErrors(prevErrors => ({
        ...prevErrors,
        dealerShip_id: '',
        repairShop_id: ''
      }));
    };
    // --------- 
    // --------- 
    const [selectedRepairShops, setSelectedRepairShops] = useState('');
    const [repairShops,setRepairShops] = useState([]);

    const handleSelectedRepairShops = (selectedOption) => {
      setSelectedRepairShops(selectedOption);
      setSelectedDealerShips(null);
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
      dealerShip_id:'',
      repairShop_id:'',
      model:'',
      type:'',
      content:'',
      firstName:'',
      lastName:'',
      complainantName:'',
      phone:''
      

    });
    const token=Cookies.get('user-cookie');
    
    
  
    const handleSubmit = async (event) => {
      event.preventDefault();
    
    
      try {
        const url = `${process.env.BASE_URL}/api/web/feedback/feedbackStore`;
        const data = {
          dealerShip_id:selectedDealerShips,
          repairShop_id:selectedRepairShops,
          model:selectedfeedbackModels,
          type:selectedFeedbackTypes,
          content,
          firstName,
          lastName,
          complainantName,
          phone
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
        const response = await axios.get(`${process.env.BASE_URL}/api/web/feedback/feedbackCreateView`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (response.status === 200) {
          setDealerShips(response.data.data.dealerShips)
          setRepairShops(response.data.data.repairShops)
          setFeedbackModels(response.data.data.feedbackModels)
          setFeedbackTypes(response.data.data.feedbackTypes)
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
              const cameRoute = '/suggestions'
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
    return(<>
        <Header />
        <ToastContainer />
        <div className="min-h-screen  bg-gradient-to-r from-gholamzadeh-productcolor to-zinc-900 flex flex-col justify-center py-12 sm:py-12 md:py-24 lg:py-32">
            <div className="relative py-3 sm:max-w-xl lg:min-w-full lg:px-96 md:w-full sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r  lg:mx-96 from-gholamzadeh-color to-gholamzadeh-productcolor shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="text-white relative px-3 py-10 bg-gradient-to-tr from-gray-300 via-gray-200 to-gray-100 shadow-lg md:p-3 lg:p-20 sm:rounded-3xl  sm:p-20">

                    <div className="text-center pb-6">
                    <h1 className="w-auto lg:w-full  text-center h-auto text-6xl BeutyFont text-gholamzadeh-productcolor" >Gholamzadeh</h1>
                        <p className="text-gray-600">
                        ثبت انتقادات و پیشنهادات خود
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-lg lg:max-w-full space-y-4">
      <div className="relative z-30 space-y-4">
        <div className="w-full flex justify-between">
          <div className="w-full "><SuggInputField
        label='نام خانوادگی (اختیاری)'
      placeholder="نام خانوادگی خود را وارد کنید"
      iconClass="bi-person-badge"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      error={errors.lastName} 
    /></div>
          <div className="w-full ps-5 lg:ps-20">
          <SuggInputField
          label='نام (اختیاری)'
          placeholder="نام خود را وارد کنید"
          iconClass="bi-person-badge-fill"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={errors.firstName} 
        />
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-full">        <SuggInputField
          label='شماره تماس (اجباری)'
          placeholder="شماره تماس خود را وارد کنید"
          iconClass="bi-person-badge"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone} 
        /></div>
          <div className="w-full ps-5 lg:ps-20">
          <SuggInputField
            label='نام فرد مورد انتقاد (اختیاری)'
          placeholder="نام یا فامیلی فرد مورد انتقاد را وارد کنید"
          iconClass="bi-person-badge"
          value={complainantName}
          onChange={(e) => setComplainantName(e.target.value)}
          error={errors.complainantName} 
        />
          </div>
        </div>
        
        

      
      <div className="w-full">
      <label dir="rtl" className="block PEYDA-BOLD text-sm font-medium text-gholamzadeh-color backdrop-blur-sm ">
        تعمیرگاه یا نمایندگی مورد انتقاد را وارد کنید
      </label>
      <div className="flex justify-between">
        <div className="w-full ">
          <SuggSelectField
            options={dealerShips.map(agent => ({
              value: agent.id, label: agent.agentName
            }))}
            placeholder="نمایندگی های فعلی"
            value={selectedDealerShips}
            onChange={handleSelectedDealerShips}
            error={errors.dealerShip_id}
            isDisabled={!!selectedRepairShops} // Disable if a repair shop is selected
          />
        </div>
        <div className="w-full ps-5 lg:ps-20">
          <SuggSelectField
            options={repairShops.map(agent => ({
              value: agent.id, label: agent.name
            }))}
            placeholder="تعمیرگاه های فعلی"
            value={selectedRepairShops}
            onChange={handleSelectedRepairShops}
            error={errors.repairShop_id}
            isDisabled={!!selectedDealerShips} // Disable if a dealer ship is selected
          />
        </div>
      </div>
    </div>
        <div className="flex justify-between space-x-3">
        <div className="w-full">
    <SuggSelectField
      label='مدل بازخورد'
      options={feedbackModels.map(agent => ({
        value: agent, label: agent
      }))}
      placeholder='مدل بازخورد'
      value={selectedfeedbackModels}
      onChange={handleSelectedFeedbackModels}
      error={errors.model} 
    />
  </div>
</div>
<div className="flex justify-between space-x-3">
  <div className="w-full">
    <SuggSelectField
      label='نوع بازخورد'
      options={feedbackTypes.map(agent => ({
        value: agent, label: agent
      }))}
      placeholder='نوع بازخورد'
      value={selectedFeedbackTypes}
      onChange={handleSelectedFeedbackTypes}
      error={errors.type} 
    />
  </div>
        </div>
        <div className="flex justify-between space-x-3">
        
        <div className="w-full">
        <label dir="rtl" className="block PEYDA-BOLD text-sm font-medium text-gholamzadeh-color backdrop-blur-sm ">
        انتقادات , پیشنهادات و ... خود
      </label>
        <textarea 
            placeholder="نمایندگی های فعلی"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            dir="rtl"
            rows="5" 
            maxLength={1000}
            className="min-h-20 max-h-80 appearance-none w-full rounded-lg border focus:outline-none focus:ring-0.5 focus:ring-gholamzadeh-color focus:border-gholamzadeh-color transition duration-150 ease-in-out border-gray-300 text-black  p-4 pe-12 text-sm shadow-sm">

         </textarea>
         {errors.content && (
        <div className="w-full  z-30"><h6 className="text-red-600 w-full text-center h-full">{errors.content}</h6></div>
      )}
          </div>
          </div>
        
      </div>

      <div className="flex items-center justify-between">
        <button type="submit" className="inline-block rounded-lg bg-gholamzadeh-productcolor hover:bg-zinc-900 px-5 py-3 text-sm font-medium text-white">
          پیش ثبت نام
        </button>
      </div>
    </form>
                </div>
            </div>
        </div>
        <Footer />  
    </>)
}