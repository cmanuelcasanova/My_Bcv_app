'use client'

import Image from "next/image";
import { useEffect , useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import Link from 'next/link';
import dayjs from 'dayjs';
import Switch from "react-switch";
import { RiMoneyEuroBoxFill } from "react-icons/ri";
import { FaRegCopy } from "react-icons/fa";
import weekday from 'dayjs/plugin/weekday';
import localizedFormat from 'dayjs/plugin/localizedFormat'; 
import toast, { Toaster } from 'react-hot-toast';
import { Api_Bcv } from "@/app/types/api_bcv"
import 'dayjs/locale/es';
import { BiMessageRoundedError } from "react-icons/bi";


dayjs.extend(weekday); 
dayjs.extend(localizedFormat);
dayjs.locale('es');


type FormData = {
  cantidad: string;
  
};



export default function Home() {

  

   const [dataF, setDataF] = useState<Api_Bcv | null >(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [calculo, setCalculo] = useState<number>(0);
   const { register, handleSubmit, watch} = useForm<FormData>()
   const cantidad_divisas = watch('cantidad'); 
   const [fecha, setFecha] = useState<Date | null>(null);
   const [dia, setDia] = useState<String | null>(null);
   const [checked, setChecked] = useState(false);
   const notify = () => toast('📋​ Copiado ✔️');
    const handleChange = () => {
    setChecked(prev => !prev);
  };


  useEffect(() => {
  const getData = async () => {
    const response = await fetch('/api/api_bcv'); 
    const data = await response.json();

    if (data.status === 200) { setDataF(data.data); } else { setDataF(null);}
    
   
  };

  getData();
}, []);


   const onSubmit = handleSubmit(async (data) => {

      
      //if(dataF) setCalculo(  Math.round((data.cantidad*dataF?.current.eur)*100) /100   )

   

   })

    



 useEffect(() => {

   if(dataF) { 

    setDia(dayjs(dataF.current.date).format('dddd, L'))
    
    if(cantidad_divisas.length===0 || cantidad_divisas===',' || cantidad_divisas==='.'  ) {setCalculo(0)

    }else{
      if(checked){
        setCalculo(  Math.round((parseFloat(cantidad_divisas.replace(',', '.'))*    Math.round(dataF?.current.usd*100)/100       )*100) /100   )
      }else{
        setCalculo(  Math.round((parseFloat(cantidad_divisas.replace(',', '.'))*    Math.round(dataF?.current.eur*100)/100       )*100) /100   )

      }
  
  
  }
  }
   

   }, [cantidad_divisas,checked]); 
    
    
 useEffect(() => {
   if(dataF) setFecha(  new Date(dataF?.current.date));
   }, [dataF]); 





const Formatear_Moneda = (i :Number): string => {

  return (i.toLocaleString('es-VE', {
              style: 'currency',
              currency: 'VES'}).replace(/Bs[\s\.]*S/, 'Bs'))

}

//if (!dataF ) return <BiMessageRoundedError size={50}/>;



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
          className="mb-6 rounded-2xl w-50 shadow h-50 mt-8"
        />

        
         <Switch
            onChange={handleChange}
            checked={checked}
            className="react-switch"
            onColor="#1e8420"    
            onHandleColor="#084f09"
            offColor="#ffe5b4"   
            offHandleColor="#fecd07"  
            checkedIcon={
              <div style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "100%",
                fontSize: 12,
                color: "white",
                paddingLeft: 8
                }}>
                USD
              </div>

        }
        
          width={70}            
          height={35}          
          handleDiameter={22}
          uncheckedIcon={
          <div style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "100%",
              fontSize: 12,
              color: "black",
              paddingRight: 8
          }}>
            EUR
          </div>
        }

        
        />


        <span className="text-white text-2xl mt-4">Fecha Actualizacion:</span>
        
         {/*dataF &&  <span className="text-white text-2xl">{dataF.current.date}</span> */}
        
        {dia &&  <span className="text-white text-2xl">{dia}</span>}
        
        
        <div className="text-white text-2xl mt-6">
          
          { checked ? 
           <div> Valor Bcv Dolar:   <span className="font-extrabold text-3xl"> {dataF.current.usd.toFixed(2)} Bs. </span> </div>
            :
           <div> Valor Bcv Euro:   <span className="font-extrabold text-3xl"> {dataF.current.eur.toFixed(2)} Bs. </span>  </div> 
          }
        </div>
   

        
            
           
           


          <form onSubmit={onSubmit}>
          
          <div className="flex flex-col gap-2 items-center justify- mt-10">
          
          <div className="flex flex-wrap items-center justify-center">
          <input 
            type="text" 
            inputMode="decimal" 
            step="0.01"
            pattern="[0-9]*" 
            placeholder="Ingrese Divisa"
            className="bg-white w-60 font-bold py-2 text-black text-3xl text-center rounded-2xl shadow-2xl"
            required
            {...register('cantidad')} />

            <span > { checked ? <RiMoneyDollarBoxFill size={55} className="text-white"/> : <RiMoneyEuroBoxFill size={55} className="text-white"/> }</span>
          </div>

          
          </div>
        </form>

         <div className="bg-white text-black py-4 font-bold mt-10 w-80 shadow rounded-2xl text-center text-4xl"> 
          
          { Formatear_Moneda(calculo) }
          
         </div>

         <div className="flex flex-wrap justify-center items-center mt-4">

            <FaRegCopy className="text-white"/>
            <button 
              className=" text-white rounded-xl px-2"
              onClick={()=> {
                navigator.clipboard.writeText( Formatear_Moneda(calculo) ) 
              ; notify()}}> 
              Copiar 
              </button>

         </div>


        <Toaster />


            




      <p className="text-white mt-10">
          <Link href="https://www.bcv.org.ve/"> 🌐 Pagina Oficial Bcv </Link>
      </p>




     </div>
     }



    </div>
  );
}
