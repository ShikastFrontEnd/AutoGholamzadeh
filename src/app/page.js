import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Your existing imports
import Image from "next/image";
import Header from "./components/header";
import Footer from "./components/footer";
import MainSection from "./components/mainsection";
import SecondSection from "./components/secondsection";
import ThirdSection from "./components/thirdsection";
import FourthSection from "./components/fourthsection";
import FifthSection from "./components/fifthsection";
import SixSection from "./components/sixsection";
import Icon from "react-multi-date-picker/components/icon";

// Define metadata for the page
export const metadata = {
  title: "هلدینگ خودرویی غلامزاده",
  description: "هلدینگ خودرویی غلامزاده",
  author: "09051383167",
  // You can add more metadata as needed
};

export default function Home() {
  return (
    <div>
      <Header />
      <MainSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixSection />
      <SecondSection />
      <Footer />
      <ToastContainer /> {/* Add this line */}
    </div>
  );
}