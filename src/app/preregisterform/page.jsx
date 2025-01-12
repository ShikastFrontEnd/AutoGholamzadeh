import Image from "next/image";
import GetUserToken from "../components/GetUserToken";
import PreRegistrationForm from "../components/PreRegistrationForm";
import Header from "../components/header";
import Footer from "../components/footer";


export default function Home() {
  return (<div>
      <Header />
      <GetUserToken />
      <PreRegistrationForm />
      <Footer />
    </div>
  );
}
