'use client'

import Image from "next/image";
import { useEffect , useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { RiMoneyDollarBoxFill } from "react-icons/ri";

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
  cantidad: number;
  
};

export default function Home() {

   const [dataF, setDataF] = useState<Api | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [calculo, setCalculo] = useState<number>(0);
   const { register, handleSubmit, watch} = useForm<FormData>()
   
   const cantidad_divisas = watch('cantidad'); 

   const onSubmit = handleSubmit(async (data) => {

      
      if(dataF) setCalculo(  Math.round((data.cantidad*dataF?.current.eur)*100) /100   )

   

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

   if(dataF) setCalculo(  Math.round((cantidad_divisas*dataF?.current.eur)*100) /100   )


   }, [cantidad_divisas]); 
    
    



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
          className="mb-30 rounded-2xl w-50"
        />
        <span>Fecha Actualizacion: {dataF.current.date}</span>
        <span>Valor EurBcv:  {Math.round(dataF.current.eur*100)/100} Bs. </span>
   
        
            
           


          <form onSubmit={onSubmit}>
          
          <div className="flex flex-col gap-2 items-center justify- mt-10">
          
          <div className="flex flex-wrap items-center justify-center">
          <input 
            type="number" 
            pattern="[0-9]*" 
            className="bg-white w-50 font-bold text-black text-2xl text-center rounded-2xl"
            required
            {...register('cantidad')} />

            <span> <RiMoneyDollarBoxFill size={40} /> </span>
          </div>

          <button type="submit">Calcular</button>
          </div>
        </form>

         <div className="bg-white text-black font-bold mt-20 w-60 shadow rounded-2xl text-center text-3xl"> {calculo} Bs. </div>



     </div>
     }
    </div>
  );
}
