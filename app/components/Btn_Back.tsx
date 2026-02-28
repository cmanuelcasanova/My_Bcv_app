import Link from 'next/link';

export default function Btn_Back() {




    return (

        <Link
            href="/"
            className="sm:flex sm:items-center mt-10 bg-white text-black p-2 rounded-2xl px-4 gap-2 hover:underline"
        >
            Home
        </Link>


    )
}

//import Btn_Back from "@/app/components/Btn_Back"