'use client'

import Image from "next/image";
import { useEffect , useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import Link from 'next/link';
import dayjs from 'dayjs';

import weekday from 'dayjs/plugin/weekday';
import localizedFormat from 'dayjs/plugin/localizedFormat'; 

// Importar el idioma (Importación de efecto secundario)
import 'dayjs/locale/es';


dayjs.extend(weekday); 
dayjs.extend(localizedFormat);// Extensión del plugin

dayjs.locale('es');

export interface Api {
  current: Current
  previous: Previous
  changePercentage: ChangePercentage
}

interface Current {
  usd: number
  eur: number
  date: string
}

interface Previous {
  usd: number
  eur: number
  date: string
}

interface ChangePercentage {
  usd: number
  eur: number
}

type FormData = {
  cantidad: string;
  
};

const opcionesFormato = {
    weekday: 'long', // Nombre completo del día de la semana (e.g., "viernes")
    year: 'numeric', // Año completo (e.g., "2025")
    month: 'long',   // Nombre completo del mes (e.g., "diciembre")
    day: 'numeric'   // Número del día (e.g., "5")
};


export default function Home() {

  

   const [dataF, setDataF] = useState<Api | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [calculo, setCalculo] = useState<number>(0);
   const { register, handleSubmit, watch} = useForm<FormData>()
   const cantidad_divisas = watch('cantidad'); 
   const [fecha, setFecha] = useState<Date | null>(null);
   const [dia, setDia] = useState<String | null>(null);

   const onSubmit = handleSubmit(async (data) => {

      
      //if(dataF) setCalculo(  Math.round((data.cantidad*dataF?.current.eur)*100) /100   )

   

   })

    


 useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://api.dolarvzla.com/public/exchange-rate');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          setDataF(result);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();

      
    }, []); 

 useEffect(() => {

   if(dataF) { 

    setDia(dayjs(dataF.current.date).format('dddd, L'))
    
    if(cantidad_divisas.length===0 || cantidad_divisas===',' || cantidad_divisas==='.'  ) {setCalculo(0)

    }else{
    setCalculo(  Math.round((parseFloat(cantidad_divisas.replace(',', '.'))*    Math.round(dataF?.current.eur*100)/100       )*100) /100   )
    }
  }
   

   }, [cantidad_divisas]); 
    
    
 useEffect(() => {
   if(dataF) setFecha(  new Date(dataF?.current.date));
   }, [dataF]); 



    return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-blue-950 via-blue-900 to-black">
     {dataF && 
     
      <div className="flex flex-col items-center justify-center">
  
        <Image 
          src="/logobcv.png" 
          alt="Picture of the author" 
          width={200} 
          height={200} 
          loading="eager"
          className="mb-6 rounded-2xl w-50 shadow h-50"
        />
        <span className="text-white text-2xl mt-4">Fecha Actualizacion:</span>
        
         {/*dataF &&  <span className="text-white text-2xl">{dataF.current.date}</span> */}
        
        {dia &&  <span className="text-white text-2xl">{dia}</span>}
        
        
        <span className="text-white text-2xl mt-6">Valor Bcv Euro €:  {dataF.current.eur.toFixed(2) } Bs. </span>
   
        
            
           


          <form onSubmit={onSubmit}>
          
          <div className="flex flex-col gap-2 items-center justify- mt-10">
          
          <div className="flex flex-wrap items-center justify-center">
          <input 
            type="text" 
            inputMode="decimal" 
            step="0.01"
            pattern="[0-9]*" 
            placeholder="Ingrese Divisa"
            className="bg-white w-50 font-bold py-2 text-black text-2xl text-center rounded-2xl shadow-2xl"
            required
            {...register('cantidad')} />

            <span> <RiMoneyDollarBoxFill size={55} className="text-white"/> </span>
          </div>

          
          </div>
        </form>

         <div className="bg-white text-black py-4 font-bold mt-10 w-70 shadow rounded-2xl text-center text-3xl"> 
          {calculo.toLocaleString('es-VE', {
              style: 'currency',
              currency: 'VES'}).replace(/Bs[\s\.]*S/, 'Bs')}
         </div>


            




      <p className="text-white mt-20">
          <Link href="https://www.bcv.org.ve/"> Bcv pagina Oficial</Link> page.
      </p>




     </div>
     }



    </div>
  );
}
