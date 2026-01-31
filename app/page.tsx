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
import { Api_Bcv , Consulta_Binance_Type } from "@/app/types/api_bcv"
import 'dayjs/locale/es';
import { MdOutlineError } from "react-icons/md";
import LoadingModal from "./components/LoadingModal";
import { SiBinance } from "react-icons/si";


dayjs.extend(weekday); 
dayjs.extend(localizedFormat);
dayjs.locale('es');


type FormData = {
  cantidad: string;
  
};



export default function Home() {

  

   const [dataF, setDataF] = useState<Api_Bcv | null >(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<boolean>(false);
   const [calculo, setCalculo] = useState<number>(0);
   const [Binance_Compras, setBinance_Compras] = useState<string[]>([]);
   const [Binance_Ventas, setBinance_Ventas] = useState<string[]>([]);
   const { register, handleSubmit, watch} = useForm<FormData>()
   const cantidad_divisas = watch('cantidad'); 
   const [fecha, setFecha] = useState<Date | null>(null);
   const [dia, setDia] = useState<String | null>(null);
   const [checked, setChecked] = useState<boolean>(false);
   const [Modal_Biance, setModalBinance] = useState<boolean>(false);
   const notify = () => toast('📋​ Copiado ✔️');

  
   const handleChange = () => {
    setChecked(prev => !prev);
  };


  useEffect(() => {
  const getData = async () => {
    const response = await fetch('/api/api_bcv'); 
    const data = await response.json();

    if (data.status === 200) { setDataF(data.data); setError(false)

    } else { 
      setError(true)
      setDataF(null);
    }
    
   
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

const consultar_binance = async () => {




  
    const response = await fetch('/api/api_binance'); 
    const data : Consulta_Binance_Type = await response.json();

    setBinance_Compras( data.Compra.map( i => i.adv.price)  ) 
    setBinance_Ventas( data.Venta.map( i => i.adv.price)  ) 


     

    



}


//if (!dataF ) return <BiMessageRoundedError size={50}/>;

if(!dataF) return <LoadingModal/>


if(error) return (

<div className=" h-screen flex flex-col justify-start items-center mt-20">

  <div  className="flex flex-col justify-center items-center">
     <Image 
          src="/logobcv.png" 
          alt="Picture of the author" 
          width={200} 
          height={200} 
          loading="eager"
          className="mb-6 rounded-2xl w-50 shadow h-50 mt-8"
        />
    <MdOutlineError  size={100}/>
    <h1>Error en Consulta</h1>
  </div>
</div>
)


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


      <SiBinance size={40} className="text-orange-400 my-10" onClick={()=> {consultar_binance(),  setModalBinance(true)}}/>

       {Modal_Biance && (




            <div 
              className="fixed inset-0 bg-blue-950 flex flex-col items-center justify-center z-50"
            onClick={()=>{setModalBinance(false)}}
            >

              <Image 
              src="/Binance.png" 
              alt="Picture of the author" 
              width={200} 
              height={200} 
              loading="eager"
              className="mb-2 rounded-2xl w-50 shadow h-30 mt-4"
            />



              <h1 className="font-bold text-3xl text-white">Compras</h1>
             {Binance_Compras.map( (i, index_Compras) =>  <div key={index_Compras} className="flex flex-col items-center justify-center bg-black w-70 h-10 rounded-2xl text-2xl text-orange-400 text-center font-bold mt-2">  <div>{  (Math.round(Number(i)*100)/100*100 /100).toFixed(2)   } Bs. </div> </div>    )     }
             
              <h1 className="font-bold text-3xl text-white">Ventas</h1>
             {Binance_Ventas.map( (i, index_Ventas) =>  <div key={index_Ventas} className="flex flex-col items-center justify-center bg-black w-70 h-10 rounded-2xl text-2xl text-orange-400  text-center font-bold mt-2"> <div>{ (Math.round(Number(i)*100)/100*100 /100).toFixed(2)  } Bs. </div> </div>    )     }
             

              </div>
              )}


     </div>
     }



    </div>
  );
}
