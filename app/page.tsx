"use client";

import Image from "next/image";
//import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import Link from "next/link";
import dayjs from "dayjs";
import Switch from "react-switch";
import { RiMoneyEuroBoxFill } from "react-icons/ri";
import { FaRegCopy } from "react-icons/fa";
import weekday from "dayjs/plugin/weekday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import toast, { Toaster } from "react-hot-toast";
import { Api_Bcv, Consulta_Binance_Type } from "@/app/types/api_bcv";
import "dayjs/locale/es";
import { MdOutlineError } from "react-icons/md";
import LoadingModal from "./components/LoadingModal";
import { SiBinance } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoIosInformationCircle } from "react-icons/io";
import SegmentedControl from "@/app/components/SegmentedControl";
import SC_Type_Convertion from "@/app/components/SC_Type_Convertion";
import { useStore } from "./store/useSection";
import Binance from "@/app/components/Binance"


dayjs.extend(weekday);
dayjs.extend(localizedFormat);
dayjs.locale("es");

type FormData = {
  cantidad: string;
};

type Data_Comerciante = {
  precio: number;
  precio_min: number;
};

export default function Home() {
  const store = useStore((store) => store);
  const [dataF, setDataF] = useState<Api_Bcv | null>(null);
  const [Api_Response, setApiResponse] = useState<Number>();
  const [loading, setLoading] = useState(true);
  const [money,setMoney]=useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [calculo, setCalculo] = useState<number>(0);
  const [Binance_Compras, setBinance_Compras] = useState<Data_Comerciante[]>(
    [],
  );
  const [Binance_Ventas, setBinance_Ventas] = useState<Data_Comerciante[]>([]);
  const { register, handleSubmit, watch, setValue} = useForm<FormData>();
  const cantidad_divisas = watch("cantidad");
  const [fecha, setFecha] = useState<Date | null>(null);
  const [dia, setDia] = useState<String | null>(null);
  //const searchParams = useSearchParams()
  const [checked, setChecked] = useState<boolean>(false);
  const [prede, setPrede] = useState<boolean>(false);
  const [Modal_Biance, setModalBinance] = useState<boolean>(false);
  const notify = () => toast("📋​ Copiado ✔️");
  //const option = searchParams.get('option')
  const [menu, setMenu] = useState<Boolean>(false);
  

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  
  const handleChangeBinance = () => {
    
    store.setOption();
    
  };

  const handleChangePrede = () => {
    setPrede((prev) => {
      if (prev === true) localStorage.setItem("Default", "2");
      if (prev === false) localStorage.setItem("Default", "1");
      return !prev;
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("Default") === null) {
        localStorage.setItem("Default", "1");
        setPrede(true);
        setChecked(true);
      } else {
        if (localStorage.getItem("Default") === "1") {
          (setPrede(true), setChecked(true));
        }
        if (localStorage.getItem("Default") === "2") {
          (setPrede(false), setChecked(false));
        }
      }
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/api_bcv");
      const data = await response.json();

      if (data.status === 200) {
        setDataF(data.data);
        setError(false);
        setApiResponse(data.api);
      } else {
        setError(true);
        setDataF(null);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (dataF) {
      store.setDolar(dataF.current.usd);
      store.setEuro(dataF.current.eur);
    }
  }, [dataF]);

  const onSubmit = handleSubmit(async (data) => {
    //if(dataF) setCalculo(  Math.round((data.cantidad*dataF?.current.eur)*100) /100   )
  });

  useEffect(() => {

    
    if (dataF) {
      if (Api_Response === 2) {
        setDia(dayjs(dataF.current.date).format("dddd, L"));
      } else {
        setDia(dataF.current.date);
      }

      if (
        cantidad_divisas.length === 0 ||
        cantidad_divisas === "," ||
        cantidad_divisas === "." || !parseFloat(cantidad_divisas)
      ) {
        setCalculo(0);
      } else {

        if(store.OptionConvertion==='1'){
       
          setCalculo(
            Math.round(
              ((parseFloat(cantidad_divisas.replace(",", ".")) *
                Math.round( ( checked ? dataF?.current.usd : dataF?.current.eur) * 100)) /
                100) *
                100,
            ) / 100,
          );
       
      }else {

        
        
         setCalculo(
            
              ((parseFloat(cantidad_divisas.replace(",", ".")) /
                ( checked ? dataF?.current.usd : dataF?.current.eur) )   ));



      } 
      }
    }
  }, [dataF,cantidad_divisas, checked, store.OptionConvertion]);


   useEffect(() => {
    setValue("cantidad","")
    
  }, [store.OptionConvertion]);


  useEffect(() => {
    if (dataF) setFecha(new Date(dataF?.current.date));
  }, [dataF]);

  const Formatear_Moneda = (i: Number): string => {
    return ( store.OptionConvertion==='1' ?   i
      .toLocaleString("es-VE", {
        style: "currency",
        currency: "VES",
      })
      .replace(/Bs[\s\.]*S/, "Bs") : (checked ? i.toLocaleString('en-US', { style: 'currency', currency: 'USD' }): i.toLocaleString('en-IE', { style: 'currency', currency: 'EUR' }))   );
  };

 const toogle_Money = () => {

  setMoney( prev => {
    if(prev===2) return 0
    return prev+1
  }  )
 }


  


 
  

  //if (!dataF ) return <BiMessageRoundedError size={50}/>;

  if (!dataF) return <LoadingModal color={"#0b1493"} size={"full"}/>;
  if (Modal_Biance && !Binance_Ventas.length)
    return <LoadingModal color={"#ff8903"} size={"full"} />;

  if (error)
    return (
      <div className=" h-screen flex flex-col justify-start items-center mt-20">
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/logobcv.png"
            alt="Picture of the author"
            width={200}
            height={200}
            loading="eager"
            className="mb-6 rounded-2xl w-50 shadow h-50 mt-8"
          />
          <MdOutlineError size={100} />
          <h1>Error en Consulta</h1>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen items-start justify-center bg-linear-to-b from-blue-950 via-blue-900 to-black">
      {dataF && (
        <div className="flex flex-col items-center justify-center w-full">


          <div className="flex flex-wrap items-center justify-between w-full px-2">



         
          {!menu ? (
            <IoMenu
              size={40}
              onClick={() => setMenu((prev) => !prev)}
              className="text-white mr-auto mt-2 ml-4"
            />
          ) : (
            <IoIosCloseCircleOutline
              size={40}
              onClick={() => setMenu((prev) => !prev)}
              className="text-white mr-auto mt-2 ml-4"
            />
          )}
          {menu && (
            <div className="bg-blue-950 w-full inset-x-0 top-full h-40 p-4 pt-4 text-white font-bold">
              Moneda por Defecto:
              <Switch
                onChange={handleChangePrede}
                checked={prede}
                className="react-switch ml-4"
                onColor="#1e8420"
                onHandleColor="#084f09"
                offColor="#ffe5b4"
                offHandleColor="#fecd07"
                checkedIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 12,
                      color: "white",
                      paddingLeft: 8,
                    }}
                  >
                    Dolar
                  </div>
                }
                width={70}
                height={35}
                handleDiameter={22}
                uncheckedIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 12,
                      color: "black",
                      paddingRight: 8,
                    }}
                  >
                    Eur
                  </div>
                }
              ></Switch>
            </div>
          )}


          <Switch
                onChange={handleChangeBinance}
                checked={store.Option}
                className="react-switch ml-4"
                onColor="#1e8420"
                onHandleColor="#084f09"
                offColor="#ffe5b4"
                offHandleColor="#fecd07"
                checkedIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 14,
                      color: "white",
                      paddingLeft: 8,
                    }}
                  >
                    Bcv
                  </div>
                }
                width={65}
                height={35}
                handleDiameter={22}
                uncheckedIcon={
                  <div
                  
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 12,
                      color: "black",
                      paddingRight: 8,
                      
                    }}
                  >
                  <SiBinance size={20} className="text-orange-500"/>
                  </div>
                }
              ></Switch>




        </div>

          <Image
            src="/logobcv.png"
            alt="Picture of the author"
            width={150}
            height={150}
            loading="eager"
            className="mb-4 rounded-2xl w-25 shadow-l h-25"
          />

     


          { store.Option ?

          <div className="flex flex-col items-center justify-center w-full mt-4">
            <Switch
              onChange={handleChange}
              checked={checked}
              className="react-switch"
              onColor="#1e8420"
              onHandleColor="#084f09"
              offColor="#ffe5b4"
              offHandleColor="#fecd07"
              checkedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "white",
                    paddingLeft: 8,
                  }}
                >
                  USD
                </div>
              }
              width={70}
              height={35}
              handleDiameter={22}
              uncheckedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "black",
                    paddingRight: 8,
                  }}
                >
                  EUR
                </div>
              }
            />

            <span className="text-white text-2xl mt-4">
              Fecha Actualizacion:
            </span>

            {/*dataF &&  <span className="text-white text-2xl">{dataF.current.date}</span> */}

            <div className="flex flex-wrap items-center justify-center gap-2">
              <IoIosInformationCircle
                className={
                  Api_Response === 1 ? ` text-green-500` : `text-white`
                }
                size={20}
              />
              {dia && <span className="text-white text-2xl">{dia}</span>}
            </div>

            <div className="text-white text-2xl my-6">
              {checked ? (
                <div>
                  {" "}
                  Valor Bcv Dolar:{" "}
                  <span className="font-extrabold text-3xl">
                    {" "}
                    {dataF.current.usd.toFixed(2)} Bs.{" "}
                  </span>{" "}
                </div>
              ) : (
                <div>
                  {" "}
                  Valor Bcv Euro:{" "}
                  <span className="font-extrabold text-3xl">
                    {" "}
                    {dataF.current.eur.toFixed(2)} Bs.{" "}
                  </span>{" "}
                </div>
              )}
            </div>

            <SC_Type_Convertion/>

              

            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-2 items-center justify- mt-10">
                <div className="flex flex-wrap items-center justify-center">
                  <input
                    type="text"
                    inputMode="decimal"
                    step="0.01"
                    pattern="[0-9]*"
                    placeholder={ store.OptionConvertion==='1' ? "Ingrese Divisa" : "Ingrese Bs."}
                    className="bg-white w-60 font-bold py-2 text-black text-3xl text-center rounded-2xl shadow-2xl"
                    required
                    {...register("cantidad")}
                  />

                  <span>


                    {" "}
                    
                    {store.OptionConvertion==='1' ? 
                    
                    checked ? (
                      <RiMoneyDollarBoxFill size={55} className="text-white" onClick={()=>toogle_Money()}/>
                    ) : (
                      <RiMoneyEuroBoxFill size={55} className="text-white" onClick={()=>toogle_Money()} />
                    ) :   <Image
            src="/bs.png"
            alt="Picture of the author"
            width={150}
            height={150}
            loading="eager"
            className=" border-2 border-black ml-1 w-14 h-14 bg-white rounded-full"
          />}
                  </span>
                </div>
              </div>
            </form>

            <div className="bg-gray-300 text-gray-800 py-4 font-bold mt-10 w-80 shadow rounded-2xl text-center text-4xl">
              {Formatear_Moneda(calculo)}
            </div>

            <div className="flex flex-wrap justify-center items-center mt-4">
              <FaRegCopy className="text-white" />
              <button
                className=" text-white rounded-xl px-2"
                onClick={() => {
                  navigator.clipboard.writeText(Formatear_Moneda(calculo));
                  notify();
                }}
              >
                Copiar
              </button>
            </div>

            <Toaster />

            <p className="text-white my-10">
              <Link href="https://www.bcv.org.ve/">
                {" "}
                🌐 Pagina Oficial Bcv{" "}
              </Link>
            </p>

           
          </div>

          : <Binance/> }
        </div>

        
      )}
    </div>
  );
}
