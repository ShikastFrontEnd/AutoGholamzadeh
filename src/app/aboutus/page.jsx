import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";

export default function AboutUs(params) {
   return(
    <>
        <Header />
        <div className="bg-zinc-400 bg-auto h-screen w-screen" >
                    <div
                        className="bg-no-repeat bg-cover bg-bottom bg-gray-200 flex justify-center items-center w-full h-full"
                        style={{ backgroundImage: "url('/static/images/lucano1.jpg')" }} 
                    >
                        <div className="w-96 h-auto backdrop-blur-3xl flex justify-center items-center">
        <span
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
        dir="rtl"
        >
        <span
            className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
        ></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
            <div>
            <h3 className="text-lg font-bold text-lucano-color sm:text-xl">
               نمایندگی 729 لوکانو
            </h3>

            <p className="mt-1 text-xs font-medium text-white">رادین تجارت</p>
            </div>

            <div className="hidden sm:block sm:shrink-0">
            <img
                alt=""
                src="/static/images/lucanoAboutUs.png"
                className="size-16 rounded-lg object-cover shadow-sm"
            />
            </div>
        </div>

        <div className="mt-4">
            <p className="text-pretty text-lg text-white">
            گروه خودرویی رادین تجارت، نامی آشنا برای دارندگان خودرو های چینی در ارومیه به عنوان مرجعی قابل اعتماد در این زمینه شناخته می شود.ما در گروه خودرویی رادین تجارت با تعهد در به ارائه بهترین ها، همواره در تلاشیم تا نیاز های مشتریان خود را به نحو احسن برآورده سازیم.
            </p>
        </div>

        <dl className="mt-6 flex ">
            <div className="flex flex-col-reverse min-w-full">
            <dt className="text-sm font-medium text-lucano-color hover:text-white"> ارومیه - خیابان امام علی جنب مسجد امام علی پالم سنتر (در حال استاندارد سازی) بزودی افتتاح خواهد شد</dt>
            <dd className="text-xs text-gray-500">ادرس</dd>
            </div>
        </dl>
        <dl className="mt-6 flex ">
            <div className="flex flex-col-reverse min-w-full">
            <dt className="text-sm font-medium text-lucano-color"><a className="hover:text-white" href="tel:09361411566">09361411566</a></dt>
            <dd className="text-xs text-gray-500">تلفن</dd>
            </div>
        </dl>
        </span></div></div>
        </div>
        <Footer />

    </>
   ) 
}