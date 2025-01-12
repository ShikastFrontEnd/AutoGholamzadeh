import Image from "next/image";
import Header from "./components/header";
import Footer from "./components/footer";
import MainSection from "./components/mainsection";


export default function Home() {
  return (<div>
     <Header />
     <MainSection />
     <Footer />
    </div>
  );
}
