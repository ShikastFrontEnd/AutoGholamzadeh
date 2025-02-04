import LocationCard from "./locationcard";

const LocationData = [
    { RepresentationName: 'اکستریم' ,RepresentationPhone:'09397925115',LocationSyntax:'ارومیه مولوی نبش خیابان امام رضا نمایندگی اکستریم غلامزاده',LocationAddress:'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d395.4987236657471!2d45.05105393772528!3d37.53173797424273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzfCsDMxJzU0LjIiTiA0NcKwMDMnMDMuMyJF!5e0!3m2!1sfa!2s!4v1738658514349!5m2!1sfa!2s'},
    { RepresentationName: 'ام وی ام', RepresentationPhone:'09921113687',LocationSyntax:'ارومیه بلوار شیخ شلتوت روبروی میدان تره بار',LocationAddress:'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d197.71239796935362!2d45.106006858265545!3d37.54567716717933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfa!2s!4v1738673692113!5m2!1sfa!2s'},
    { RepresentationName: 'فونیکس'  ,RepresentationPhone:'09305786517',LocationSyntax:'ارومیه دانشکده نرسیده به بیمارستان شمس نبش کوی 18',LocationAddress:'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3163.9909760484134!2d45.050905!3d37.53171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzfCsDMxJzU0LjIiTiA0NcKwMDMnMDMuMyJF!5e0!3m2!1sfa!2s!4v1738658785123!5m2!1sfa!2s'},
    { RepresentationName: 'لاماری',RepresentationPhone:'09144660715',LocationSyntax:'ارومیه بلوار امام علی مجتمع بزرگ بازار مبل پالم سنتر ,نمایندگی 4401 لاماری غلامزاده',LocationAddress:'https://maps.google.com/maps?width=600&height=400&hl=en&q=مبلمان%20کلکسیونر%20ساختمان%20پالم%20سنتر&t=&z=15&ie=UTF8&iwloc=B&output=embed'},
    { RepresentationName: 'کرمان موتور',RepresentationPhone:'09144661508',LocationSyntax:'ارومیه بلوار شیخ شلتوت روبروی خیابان پیروزی نمایندگی 1107 غلامزاده',LocationAddress:'https://maps.google.com/maps?width=600&height=400&hl=en&q=مبلمان%20کلکسیونر%20ساختمان%20پالم%20سنتر&t=&z=15&ie=UTF8&iwloc=B&output=embed'},
    { RepresentationName: 'میتسوبیشی',RepresentationPhone: '09144660596',LocationSyntax:'ارومیه بلوار امام علی مجتمع بزرگ بازار مبل پالم سنتر ,نمایندگی 4401 لاماری غلامزاده',LocationAddress:'https://maps.google.com/maps?width=600&height=400&hl=en&q=مبلمان%20کلکسیونر%20ساختمان%20پالم%20سنتر&t=&z=15&ie=UTF8&iwloc=B&output=embed'},
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