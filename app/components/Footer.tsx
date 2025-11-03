import Image from 'next/image';
import logo from "@/public/logo.svg";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="flex h-[200px] bg-[#FFDB63] justify-around items-center mt-4">
        <div className="flex items-center gap-4">
            <Image src={logo} alt="Recipe App Logo" width={50} height={50} />
            <span className="text-2xl font-bold">Delícias à Mesa</span>
        </div>
        <div className="flex flex-col items-center gap-2">
            <h3 className='font-bold text-xl'>Redes sociais:</h3>
            <div className="flex gap-4">
                <FaFacebookF size={24} />
                <FaInstagram size={24} />
                <FaTwitter size={24} />
                <FaLinkedinIn size={24} />
            </div>
        </div>
        </footer>
    )
}