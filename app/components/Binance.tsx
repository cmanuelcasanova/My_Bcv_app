import Image from "next/image";
import { useState, useEffect } from "react";
import { useStore } from "@/app/store/useSection";
import { Consulta_Binance_Type } from "@/app/types/api_bcv";
import LoadingModal from "@/app/components/LoadingModal";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import Switch from "react-switch";
import { useForm, SubmitHandler } from "react-hook-form";

type Data_Comerciante = {
  precio: number;
  precio_min: number;
};

type BinanceType = {
  compra: number;
  venta: number;
};

type FormData = {
  cantidad: string;
};

export default function Binance() {
  const [Binance_Compras, setBinance_Compras] = useState<Data_Comerciante[]>(
    [],
  );
  const [Binance_Ventas, setBinance_Ventas] = useState<Data_Comerciante[]>([]);
  const [Binance, setBinance] = useState<BinanceType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [calculo, setCalculo] = useState<number>(0);
  const store = useStore((store) => store);
  const { register, handleSubmit, watch } = useForm<FormData>();
  const cantidad_divisas = watch("cantidad");
   const [prede, setPrede] = useState<boolean>(false);

    const Formatear_Moneda = (i: Number): string => {
    return i
      .toLocaleString("es-VE", {
        style: "currency",
        currency: "VES",
      })
      .replace(/Bs[\s\.]*S/, "Bs");
  };

  useEffect(() => {
    const consultar_binance = async () => {
      const response = await fetch(
        `/api/api_binance?monto_minimo=${store.Dolar ? store.Dolar * 30 : 0}`,
      );
      const data: Consulta_Binance_Type = await response.json();

      setBinance_Compras(
        data.Compra.map((i) => {
          return {
            precio: parseFloat(i.adv.price),
            precio_min:
              parseFloat(i.adv.minSingleTransAmount) / parseFloat(i.adv.price),
          };
        }),
      );
      setBinance_Ventas(
        data.Venta.map((i) => {
          return {
            precio: parseFloat(i.adv.price),
            precio_min:
              parseFloat(i.adv.minSingleTransAmount) / parseFloat(i.adv.price),
          };
        }),
      );
    };

    consultar_binance();
    setLoading(false);
  }, []);

  useEffect(() => {
    setBinance({
      compra:
        Binance_Compras.reduce(
          (acumulador, valorActual) => acumulador + valorActual.precio,
          0,
        ) / Binance_Compras.length,
      venta:
        Binance_Ventas.reduce(
          (acumulador, valorActual) => acumulador + valorActual.precio,
          0,
        ) / Binance_Ventas.length,
    });
  }, [Binance_Compras, Binance_Ventas]);



  useEffect( ()=>{

    if(Binance) {
     if (
        cantidad_divisas.length === 0 ||
        cantidad_divisas === "," ||
        cantidad_divisas === "."
      ) {
        setCalculo(0);
      } else {

        if( !prede ) {
        
          setCalculo(
            Math.round(
              ((parseFloat(cantidad_divisas.replace(",", ".")) *
                Math.round(Binance.venta * 100)) /
                100) *
                100,
            ) / 100,
          );

        }else{   setCalculo(
            Math.round(
              ((parseFloat(cantidad_divisas.replace(",", ".")) *
                Math.round(Binance.compra * 100)) /
                100) *
                100,
            ) / 100,
          ); }

        }
    }

  },[cantidad_divisas,prede]  )

   const handleChangePrede = () => {
    setPrede((prev) => {
      if (prev === true) localStorage.setItem("Default", "2");
      if (prev === false) localStorage.setItem("Default", "1");
      return !prev;
    });
  };



  const onSubmit = handleSubmit(async (data) => {
    //if(dataF) setCalculo(  Math.round((data.cantidad*dataF?.current.eur)*100) /100   )
  });


  if (loading && Binance?.venta===0)
    return <LoadingModal color={"#ff8903"} size={""} />;

  

  return (
    <div className="flex flex-col items-center justify-center w-full mt-4 mb-20">
      <div className="flex flex-wrap justify-center items-center ">
        <div className="flex flex-col justify-center items-center w-40 mr-2">
          <h1 className="font-bold text-3xl text-white">Compras</h1>

          <div className="w-35 flex flex-col items-center justify-center bg-black h-14 rounded-2xl text-2xl text-orange-400 text-center font-bold mt-1">
            <div>{Binance?.compra.toFixed(2)} Bs. </div>{" "}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-40 ml-2">
          <h1 className="font-bold text-3xl text-white">Ventas</h1>

          <div className="w-35 flex flex-col items-center justify-center bg-black h-14 rounded-2xl text-2xl text-orange-400  text-center font-bold mt-1">
            <div>{Binance?.venta.toFixed(2)} Bs. </div>{" "}
          </div>
        </div>
      </div>

       <Switch
                      onChange={handleChangePrede}
                      checked={prede}
                      className="react-switch ml-4 mt-4"
                      onColor="#000000"
                      onHandleColor="#FFFFFF"
                      offColor="#000000"
                      offHandleColor="#FFFFFF"
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
                          Comprar
                        </div>
                      }
                      width={90}
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
                            color: "white",
                            paddingRight: 8,
                          }}
                        >
                          Vender
                        </div>
                      }
                    ></Switch>


 <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-2 items-center justify- mt-4">
                <div className="flex flex-wrap items-center justify-center">
                  <input
                    type="text"
                    inputMode="decimal"
                    step="0.01"
                    pattern="[0-9]*"
                    placeholder="Ingrese Divisa"
                    className="bg-white w-60 font-bold py-2 text-black text-2xl text-center rounded-2xl shadow-2xl"
                    required
                    {...register("cantidad")}
                  />

                  <span>
                    
                      <RiMoneyDollarBoxFill size={55} className="text-white" />
                    
                    
                  </span>

                   <div className="bg-white text-black py-4 mb-4 font-bold mt-10 w-80 shadow rounded-2xl text-center text-4xl">
              {Formatear_Moneda(calculo)}
            </div>
            
                </div>
              </div>
            </form>

            <div className="flex flex-col items-center justify-center"> 
            
            <span>Aprox. {(calculo/store.Dolar).toFixed(2)} Dolar Bcv</span>  
            <span>Aprox. {(calculo/store.Euro).toFixed(2)} Euro Bcv      </span>
                
             </div>





    </div>
  );
}
