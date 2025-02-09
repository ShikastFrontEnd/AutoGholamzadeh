'use client'
import { ToastContainer } from "react-toastify";
import Footer from "../components/footer";
import Header from "../components/header";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";



export default function photogallery() {
    const [loading,setLoading] = useState(false)
    
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
            <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl shadow-lg group">
                <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHwwfHx8MTcyMTA0MjYwMXww&ixlib=rb-4.0.3&q=80&w=1080" alt="Nature" className="w-full box h-full object-cover"></img>
                <div
                    className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div dir="rtl" className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-2xl font-bold text-white">اکسپلور کن</h3>
                        <p className="text-white">در دامان طبیعت دنبال گردشگر</p>
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHwwfHx8MTcyMTA0MjYwMXww&ixlib=rb-4.0.3&q=80&w=1080" alt="Nature" className="w-full box h-full object-cover"></img>
                <div
                    className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div dir="rtl" className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-2xl font-bold text-white">اکسپلور کن</h3>
                    <p className="text-white">در دامان طبیعت دنبال گردشگر</p>
                    </div>
                </div>
            </div>
           
            
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHx0ZWNobm9sb2d5fGVufDB8MHx8fDE3MjEwNDI2Mjh8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Technology" className="w-full box h-full object-cover"></img>
                <div
                    className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div dir="rtl" className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-xl font-bold text-white">پروزه ساخت سرور میزبان</h4>
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
            <img src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHx0cmF2ZWx8ZW58MHwwfHx8MTcyMTA0MjY0MXww&ixlib=rb-4.0.3&q=80&w=1080" alt="Travel" className="w-full box h-full object-cover"></img>
            <div
                    className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div dir="rtl" className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-xl font-bold text-white">Travel Adventures</h4>
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxhcnR8ZW58MHwwfHx8MTcyMTA0MjY5Nnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Art" className="w-full box h-full object-cover"></img>
                <div
                    className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div dir="rtl" className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-xl font-bold text-white">Artistic Expressions</h4>
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img src="https://images.unsplash.com/photo-1530549387789-4c1017266635?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxzd2ltbWluZ3xlbnwwfDB8fHwxNzIxMDQzMjkxfDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Sport" className="w-full box h-full object-cover"></img>
                <div
                    className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div dir="rtl" className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-xl font-bold text-white">Swimming</h4>
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img src="https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8Y2hlc3N8ZW58MHwwfHx8MTcyMTA0MzI0Nnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Sport" className="w-full box h-full object-cover"></img>
                <div
                    className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div dir="rtl" className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-xl font-bold text-white">Chess</h4>
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img src="https://images.unsplash.com/photo-1553778263-73a83bab9b0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxmb290YmFsbHxlbnwwfDB8fHwxNzIxMDQzMjExfDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Sport" className="w-full box h-full object-cover"></img>
                <div
                    className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div dir="rtl" className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-xl font-bold text-white">Football</h4>
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img src="https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxjcmlja2V0fGVufDB8MHx8fDE3MjEwNDMxNTh8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Sport" className="w-full box h-full object-cover"></img>
                <div
                    className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div dir="rtl" className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-xl font-bold text-white">Cricket</h4>
                    </div>
                </div>
            </div>
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