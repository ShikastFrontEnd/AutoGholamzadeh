'use client'
import { ToastContainer } from "react-toastify";
import Footer from "../components/footer";
import Header from "../components/header";
import { BeatLoader } from "react-spinners";
import { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";


function Product({ car , keyProp}) {

    return (
        <>
        <Link href={`/preregisterform/${car.id}`} className={`relative overflow-hidden rounded-2xl shadow-lg group ${[0, 10, 20 , 27].includes(keyProp) ? 'md:col-span-2 md:row-span-2' : ''}`}>
            <img src={`${baseUrl}${car.imageUrl}`} alt={car.CarName} className="w-full h-full object-cover"></img>
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div dir="rtl" className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-2xl font-bold text-white">{car.CarName}</h3>
                    <p className="text-white">{car.company}</p>
                </div>
            </div>
        </Link>
        </>
    );
}


const baseUrl=process.env.NEXT_PUBLIC_API_BASE_URL;;
export default function PhotoGallery() {
    const [loading,setLoading] = useState(false)
    const [allcars,setAllCars] = useState([])
    const router = useRouter();
    const fetchData = async () => {
        setLoading(true)
        try {
          const response = await axios.get(`${baseUrl}/api/web/brands`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            setLoading(false)
            setAllCars(response.data.data)
            console.log(response.data.data)
          } else {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          if (error.response) {
            if (error.response.status === 401) {
              router.push('/loginRegister');
              const cameRoute = '/photogallery'
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
    console.log('-----------------')
    console.log(allcars)
    console.log('-----------------')
    const breadcrumbLinks = [
        { url: '/photogallery', label: 'گالری ماشین ها' },
      ];
    return(
        <>
    
        
    <Header />
        <div className="z-50"><ToastContainer /></div>
        <div className="bg-zinc-400 bg-auto h-full w-full" >
                    <div
                        className={`bg-gradient-to-t from-gholamzadeh-productcolor to-zinc-900 bg-no-repeat bg-cover bg-bottom bg-gray-200 flex justify-center items-center w-full ${loading?'h-screen':'h-full'}`}
                        // style={{ backgroundImage: "url('/static/images/gxtrim.jpg')" }} 
                    >

                        <div className="pt-56 w-full">
                         
            {loading? <div className="w-full h-screen flex justify-center items-center">
              <BeatLoader
        color={'red'}
        size={'30 md:150'}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>:<><div className="mb-5 pb-5 mx-auto  w-full  max-w-full border-b-2 border-gray-100  md:top-6  lg:max-w-screen-lg">
      <div className="w-full flex flex-col md:flex-row justify-between px-5 md:px-0">
        <div className="w-full"><Breadcrumb links={breadcrumbLinks}
        /></div>
        <div className="flex justify-end items-center w-full"><h1 className="text-end text-white">گالری ماشین ها</h1></div>
      </div>
      </div>
      <div className="">
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8"></h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.isArray(allcars) && allcars.length > 0 ? (
                    allcars.map((element, index) => {
                        console.log(element); // Check each element
                        return <Product key={index} car={element} keyProp={index} />; // Pass the key or any other property
                    })
                ) : (
                    <p className="w-full h-full text-center col-span-4">گالری خودرو ها خالی میباشد</p>
                )}
            
            
        </div>
    </div>
</div>
      </>}
            
                        </div>

                        </div>
        </div>
        <Footer />
        </>
    )
}