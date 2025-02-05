import Accordion from "./Accordion";

const accordionData = [
    { RepresentationName: 'اکستریم' ,RepresentationPhone:'09397925115',RepresentationInstagram:'xtrim306'},
    { RepresentationName: 'ام وی ام', RepresentationPhone:'09921113685',RepresentationInstagram:'mvm306.gholamzadeh'},
    { RepresentationName: 'فونیکس'  ,RepresentationPhone:'09396925115',RepresentationInstagram:'fownix306'},
    { RepresentationName: 'لاماری',RepresentationPhone:'09144660596',RepresentationInstagram:'lamari_gholamzadeh'},
    { RepresentationName: "کرمان موتور",RepresentationPhone:'09144661508',RepresentationInstagram:'kermanmotor1107'},
    { RepresentationName: 'میتسوبیشی',RepresentationPhone: '09144660715',RepresentationInstagram:'arianmotor'},
];

export default function FourthSection() {
    return (
        <div className="bg-gradient-to-t from-gholamzadeh-productcolor to-zinc-900">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3  lg:grid-cols-6  mx-auto max-w-screen-2xl md:gap-6 xl:gap-8">
                {accordionData.map((item, index) => (
                    <Accordion 
                        key={index} 
                        RepresentationName={item.RepresentationName} 
                        RepresentationPhone={item.RepresentationPhone} 
                        RepresentationInstagram={item.RepresentationInstagram} 
                        index={index} 
                    />
                ))}
            </div>
        </div>
    );
}