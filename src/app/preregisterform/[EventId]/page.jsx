'use client'
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import PreRegistrationForm from "@/app/components/PreRegistrationForm";
import { useRouter } from "next/navigation";
import { use } from 'react'; // Import use from React

export default function TestDrive(props) {
    const params = use(props.params);
    const { EventId } = params;

    return (
        <>
            <Header />
            <PreRegistrationForm carid={EventId} /> {/* Pass EventId to TestDriveForm if needed */}
            <Footer />
        </>
    );
}