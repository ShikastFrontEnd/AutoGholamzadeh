export default function MainSection() {
    return (
        <>
            <div
                className="bg-no-repeat bg-cover bg-bottom bg-gray-200 flex justify-center items-center w-screen h-screen"
                style={{ backgroundImage: "url('/static/images/lucano3.jpg')" }}
            >
                <div className="backdrop-blur-sm w-full h-full flex justify-center items-center sm:w-full">
                    <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-10 sm:w-full">
                        {[
                            "پیش ثبت نام لوکانو",
                            "تست درایو",
                            "تست درایو های من",
                            "نمایش پیش ثبت نام لوکانو",
                            "شرایط فروش لوکانو"
                        ].map((text, index) => (
                            <div key={index} className="relative inline-flex group">
                                <div
                                    className="sm:w-full absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-lucano-color via-lucano-productcolor to-lucano-color rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"
                                ></div>
                                <a
                                    href="#"
                                    title="Get quote now"
                                    className="w-full relative inline-flex items-center justify-center px-6 py-3 text-base md:text-lg font-bold text-white transition-all duration-200 border border-gray-100 bg-black/50 shadow backdrop-blur-sm font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                    role="button"
                                >
                                    {text}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}