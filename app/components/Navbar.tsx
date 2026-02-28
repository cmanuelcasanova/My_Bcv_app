'use client'

import Link from 'next/link';
import { usePathname , useSelectedLayoutSegment } from 'next/navigation';

export default function Navbar() {

    const pathname = usePathname();
    //const isActive = pathname === href;
  


return (

<nav className='w-full h-10 flex flex-wrap justify-around items-center text-xl font-bold' >

   

    <Link 
        href="/"
        className={`${pathname=== "/" && `underline` }` }
    >
        Home
    </Link>
    <Link 
        href="/binance"
        className={`${pathname.startsWith("/binance") && `underline` }` }
    >
        Binance
    </Link>

    <Link 
        href="/configuracion"
        className={`${pathname.startsWith("/configuracion") && `underline` }` }
    >
        Configuracion
    </Link>


</nav>


)}