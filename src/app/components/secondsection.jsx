export default function SecondSection() {
    const logos = [
        { src: "/static/images/logo/chery.png", alt: "Chery", width: 99, height: 69 },
        { src: "/static/images/logo/Fownix.png", alt: "Logo 2", width: 99, height: 69 },
        { src: "/static/images/logo/kmc.png", alt: "Logo 3", width: 99, height: 69 },
        { src: "/static/images/logo/Lamari.png", alt: "Logo 4", width: 99, height: 69 },
        { src: "/static/images/logo/mitsubishi.png", alt: "Logo 5", width: 99, height: 69 },
        { src: "/static/images/logo/xtrim.png", alt: "Logo 6", width: 99, height: 69 },
        { src: "/static/images/logo/mvm.png", alt: "Logo 7", width: 99, height: 69 },
        { src: "/static/images/logo/tigard.png", alt: "Logo 8", width: 99, height: 69 },
        { src: "/static/images/logo/gac.png", alt: "Logo 8", width: 99, height: 69 },
        { src: "/static/images/logo/suzuki.png", alt: "Logo 8", width: 99, height: 69 },
        { src: "/static/images/logo/toyota.png", alt: "Logo 8", width: 99, height: 69 },
        { src: "/static/images/logo/mercedes.png", alt: "Logo 8", width: 99, height: 69 },
    ];

    return (
        <>
            <div className="w-full h-full  bg-gradient-to-t to-gholamzadeh-productcolor from-zinc-900 flex justify-center">
                <section className="py-base container w-full">
                    <div className="grid gap-8 grid-cols-2 md:gap-y-16 md:grid-cols-6 w-full py-10 px-6">
                        {logos.map((logo, index) => (
                            <span key={index} className="w-full border-gray-100 box flex items-center justify-center rounded-xl py-3">
                                <span className="sr-only">{logo.alt} logo.</span>
                                <div aria-hidden="true">
                                    <img className="" src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
                                </div>
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}