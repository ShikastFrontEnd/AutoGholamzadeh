import Image from "next/image";
import Header from "./components/header";
import Footer from "./components/footer";
import MainSection from "./components/mainsection";
import SecondSection from "./components/secondsection";
import ThirdSection from "./components/thirdsection";
import FourthSection from "./components/fourthsection";
import FifthSection from "./components/fifthsection";
import SixSection from "./components/sixsection";


export default function Home() {
  return (<div>
     <Header />
     <MainSection />
     <ThirdSection />
     <FourthSection />
     <FifthSection />
     <SixSection />
     <SecondSection />
     <Footer />
    </div>
  );
}
