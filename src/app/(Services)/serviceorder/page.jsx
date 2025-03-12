import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

export default function MainSection() {

    return (
        <>    
        <Header />
        <div
                className="bg-no-repeat bg-cover bg-bottom bg-gray-200 flex justify-center items-center w-full  h-screen"
                style={{ backgroundImage: "url('/static/images/Xtrim.png')" }}
            >
                <div className="backdrop-blur-sm w-full h-full flex justify-center items-center sm:w-full">
                <div className="grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-2 gap-4 max-w-screen">
                {[
                    { text: "ثبت سفارش و خدمات جدید", href: "/serviceorder/addorder" },
                    { text: "پیگیری سفارشات قبلی", href: "/serviceorder/editorder" }
                ].map((item, index) => (
                    <div 
                        key={index} 
                        className={`relative inline-flex ${index === 2 ? 'md:col-span-2' : ''}`}
                    >
                        <div
                            className={`sm:w-full absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-gholamzadeh-color via-gholamzadeh-productcolor to-gholamzadeh-color rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt`}
                        ></div>
                        <Link href={item.href} passHref className="w-full">
                            <span
                                title={item.text}
                                className="w-full text-nowrap relative inline-flex items-center justify-center px-6 py-3 text-base md:text-lg font-bold text-white transition-all duration-200 border border-gray-100 bg-black/50 shadow backdrop-blur-sm font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                role="button"
                            >
                                {item.text}
                            </span>
                        </Link>
                    </div>
                ))}
</div>
                </div>
            </div>
            <Footer />
        </>
    );
}