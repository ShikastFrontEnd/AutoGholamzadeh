import LocationCard from "./locationcard";

const LocationData = [
    { RepresentationName: 'اکستریم' ,RepresentationPhone:'09397925115',LocationSyntax:'ارومیه مولوی نبش خیابان امام رضا نمایندگی اکستریم غلامزاده',LocationAddress:'https://neshan.org/maps/iframe/places/_bLx8SWAqUuh#c37.526-45.062-20z-0p/37.52624540852845/45.06241352790116'},
    { RepresentationName: 'ام وی ام', RepresentationPhone:'09921113687',LocationSyntax:'ارومیه بلوار شیخ شلتوت روبروی میدان تره بار',LocationAddress:'https://neshan.org/maps/iframe/places/_bLGmNWANR6-#c37.545-45.107-19z-0p/37.54545984774636/45.106755703875905'},
    { RepresentationName: 'فونیکس'  ,RepresentationPhone:'09305786517',LocationSyntax:'ارومیه دانشکده نرسیده به بیمارستان شمس نبش کوی 18 نمایندگی 306 غلامزاده',LocationAddress:'https://neshan.org/maps/iframe/places/_bLxNW0AqJnQ#c37.532-45.051-19z-0p/37.53168776699289/45.05100361640535 '},
    { RepresentationName: 'لاماری',RepresentationPhone:'09144660715',LocationSyntax:'ارومیه بلوار امام علی مجتمع بزرگ بازار مبل پالم سنتر ,نمایندگی 4401 لاماری غلامزاده',LocationAddress:'https://neshan.org/maps/iframe/places/_bLxVYIAqq15#c37.530-45.059-20z-0p/37.52960155796774/45.05860121044134'},
    { RepresentationName: 'کرمان موتور',RepresentationPhone:'09144661508',LocationSyntax:'ارومیه بلوار شیخ شلتوت روبروی خیابان پیروزی نمایندگی 1107 غلامزاده',LocationAddress:'https://neshan.org/maps/iframe/places/_bLjBv2AN_d-#c37.549-45.094-19z-0p/37.54857800420791/45.09390459989555'},
    { RepresentationName: 'میتسوبیشی',RepresentationPhone: '09144660596',LocationSyntax:'ارومیه بلوار امام علی مجتمع بزرگ بازار مبل پالم سنتر ,نمایندگی 4401 لاماری غلامزاده',LocationAddress:'https://neshan.org/maps/iframe/places/_bLx-tQAq3uq#c37.530-45.059-20z-0p/37.52979731299639/45.05914140326763'},
];
export default function SixSection(params) {
    return(<>
    <div className="bg-gradient-to-t from-gholamzadeh-productcolor to-zinc-900">
            <div className="relative px-4 sm:px-6 p-8 grid grid-cols-1 gap-4 md:grid-cols-2  lg:grid-cols-3  mx-auto max-w-screen-2xl md:gap-6 xl:gap-8">
                {LocationData.map((item, index) => (
                    <LocationCard 
                        data={item}
                        key={index}
                    />
                ))}
            </div>
    </div>
        </>)}