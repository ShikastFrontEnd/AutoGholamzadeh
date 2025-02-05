'use client'
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Cookies from "js-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import PN from "persian-number";
import LazyLoad from "react-lazyload";
import { BeatLoader, ClipLoader } from "react-spinners";
import Breadcrumb from "../components/Breadcrumb";

function Conditioncars({condition}) {
  const formatNumberWithDots = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

  
    return(<>
        <div className={`mx-auto rounded-xl w-full max-w-full border box bg-black/50  shadow backdrop-blur-sm md:top-6 md:rounded-3xl lg:max-w-screen-lg`}>
       <div className="md:p-3">
       <div className="flex flex-col md:flex-row justify-evenly md:space-x-5">
       <div className="relative w-full ">
       <LazyLoad height={200} offset={100} className="size-72 rounded-xl md:rounded-3xl object-cover shadow-sm w-full h-full md:border border-gray-100">
    <img
        alt=""
        src={`${process.env.BASE_URL}${condition.imageUrl}`}
        className="size-72 rounded-xl md:rounded-3xl object-cover shadow-sm w-full h-full md:border border-gray-100"
    />
</LazyLoad>
       <div className="absolute bottom-0 flex items-center justify-center w-full">
           <span className="text-white pb-3 md:pb-6 md:border md:border-t-0 border-gray-100  text-xl md:text-3xl bg-gradient-to-t from-black to-transparent p-2 pt-5  md:rounded-b-3xl w-full">
           {condition.carName}
           </span>
       </div>
   </div>
           <div className="w-full space-y-4 p-3 md:p-0">
            <div className="flex justify-between border-b-2 pb-4 border-gholamzadeh-color ">
                <div className="w-full text-center text-xl flex "><span className="pe-1">تومان</span><span>{PN.convertEnToPe(formatNumberWithDots(condition.price))}</span></div>
                <div className="w-full text-center text-xl flex justify-end">قیمت</div>
            </div>
            {condition.percentage != null ? (
            <>
                <div className="flex justify-between">
                    <div className="w-full text-center text-base flex justify-start"></div>
                    <div className="w-full text-center text-base flex justify-end">شرایط اقساط</div>
                </div>
                <div className="flex justify-between">
                    <div className="w-full text-center text-base flex justify-start">{condition.percentage}%</div>
                    <div className="w-full text-center text-base flex justify-end">درصد اقساط</div>
                </div>
                <div className="flex justify-between">
                    <div className="w-full text-center text-base flex justify-start">
                        <span className="pe-1">تومان</span>
                        <span>{PN.convertEnToPe(formatNumberWithDots(condition.advance))}</span>
                    </div>
                    <div className="w-full text-center text-base flex justify-end">پیش پرداخت</div>
                </div>
                
                    <div className="flex justify-between">
                        <div className="w-full text-center text-base flex justify-start">
                            <span className="pe-1">تومان</span>
                            <span>{PN.convertEnToPe(formatNumberWithDots(condition.twelveMonth))}</span>
                        </div>
                        <div className="w-full text-center text-base flex justify-end">
                            <span className="pe-1">ماهه</span>
                            <span>12</span>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-full text-center text-base flex justify-start">
                            <span className="pe-1">تومان</span>
                            <span>{PN.convertEnToPe(formatNumberWithDots(condition.twentyFourMonth))}</span>
                        </div>
                        <div className="w-full text-center text-base flex justify-end">
                            <span className="pe-1">ماهه</span>
                            <span>24</span>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-full text-center text-base flex justify-start">
                            <span className="pe-1">تومان</span>
                            <span>{PN.convertEnToPe(formatNumberWithDots(condition.thirtySixMonth))}</span>
                        </div>
                        <div className="w-full text-center text-base flex justify-end">
                            <span className="pe-1">ماهه</span>
                            <span>36</span>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-full text-center text-base flex justify-start">
                            <span className="pe-1">تومان</span>
                            {PN.convertEnToPe(formatNumberWithDots(condition.fortyEightMonth))}
                        </div>
                        <div className="w-full text-center text-base flex justify-end">
                            <span className="pe-1">ماهه</span>
                            <span>48</span>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-full text-center text-base flex justify-start">
                            <span className="pe-1">تومان</span>
                            <span>{PN.convertEnToPe(formatNumberWithDots(condition.sixtyMonth))}</span>
                        </div>
                        <div className="w-full text-center text-base flex justify-end">
                            <span className="pe-1">ماهه</span>
                            <span>60</span>
                        </div>
                    </div>
            </>
        ) : (<div className="flex justify-center items-center h-72">
          <h1 className="text-center text-3xl text-red-600">فروش به صورت نقدی</h1>
        </div>)}
          <div className="w-full flex justify-between">
            <div className="w-full flex justify-center items-center"></div>
            <div className="w-full flex justify-center items-center"><button className="text-center w-1/2 border rounded-2xl hover:border-gholamzadeh-color hover:text-gholamzadeh-color">ثبت نام</button></div>
          </div>
            
            
           </div>
       </div>
       </div>
       </div>
       </>)
}

export default function carsalesconditions() {
    const [conditions, setConditions] = useState([]);
    const [loading,setLoading] = useState(false)
    const token=Cookies.get('user-cookie');
    const fetchData = async () => {
      setLoading(true)
        try {
          const response = await axios.get(`${process.env.BASE_URL}/api/web/registerCondition/show`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            setLoading(false)
            setConditions(response.data.data)
          } else {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          if (error.response) {
            if (error.response.status === 401) {
              const cameRoute = `/carsalesconditions`
              localStorage.setItem('cameRoute', cameRoute);
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
      const breadcrumbLinks = [
        { url: '/carsalesconditions', label: 'شرایط فروش خودروها' }
      ];
    return(<>
    <Header />
    <div className="h-full  py-60 w-full bg-gradient-to-t from-gholamzadeh-productcolor to-zinc-900">
            <ToastContainer />
            <div className="mb-5 pb-5 mx-auto  w-full  max-w-full border-b-2 border-gray-100  md:top-6  lg:max-w-screen-lg">
            <div className="w-full flex flex-col md:flex-row justify-between px-5 md:px-0">
              <div className=""><Breadcrumb links={breadcrumbLinks} /></div>
              <div className=""><h1 className="text-end">لیست خودرو های موجود و شرایط فروش نقدی و اقساطی</h1></div>
            </div>
            </div>
           {loading? <div className="w-full flex justify-center items-center">
              <BeatLoader
        color={'red'}
        size={'30 md:150'}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>:<></>}
            <div className="mx-5 md:mx-0 space-y-9">
            
            {Array.isArray(conditions) && conditions.map((element) => (
                            <div key={element.id} className="w-full flex justify-center">
                                <Conditioncars  condition={element} />
                            </div>
                        ))}
            </div>
    </div>
    <Footer />
    
    
    
    </>)
}