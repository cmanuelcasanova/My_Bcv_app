import Link from 'next/link';

export default function Home() {

    return (

        <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-blue-950 via-blue-900 to-black">
     
            <h1>Binance Calculos</h1>

               <Link
                        href="/"
                        className="sm:flex sm:items-center gap-2 hover:underline"
                      >
                         Volver
                      </Link>
              
        </div>
    )

}