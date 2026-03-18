import Image from "next/image";
import { useState, useEffect } from "react";
import { useStore } from "@/app/store/useSection";
import { Consulta_Binance_Type } from "@/app/types/api_bcv";
import LoadingModal from "@/app/components/LoadingModal";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import Switch from "react-switch";
import { useForm, SubmitHandler } from "react-hook-form";



type BinanceType = {
  compra: number;
  venta: number;
};

type FormData = {
  cantidad: string;
};

export default function Binance() {

  const [Binance, setBinance] = useState<BinanceType>({compra:0,venta:0});
  const [loading, setLoading] = useState<boolean>(true);
  const [calculo, setCalculo] = useState<number>(0);
  const store = useStore((store) => store);
  const { register, handleSubmit, watch, setValue } = useForm<FormData>();
  const cantidad_divisas = watch("cantidad");
  const [predeB, setPredeB] = useState<boolean>(store.checkBinance);

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

      const PromedioCompra =  data.Compra.reduce(
          (acumulador, valorActual) => acumulador + parseFloat(valorActual.adv.price),
          0,
        ) / data.Compra.length;
      
      const PromedioVenta=  data.Venta.reduce(
          (acumulador, valorActual) => acumulador + parseFloat(valorActual.adv.price),
          0,
        ) / data.Venta.length;


      setBinance({ compra: PromedioCompra, venta: PromedioVenta });
      store.setBinanceBuy(PromedioCompra)
      store.setBinanceSell(PromedioVenta)

    };

    if ( store.BinanceBuy  ===0 && store.BinanceSell===0  ) { 
      consultar_binance()
    }else{

      setBinance({compra: store.BinanceBuy , venta:store.BinanceSell}  )

    }

   setValue("cantidad",store.inputDivisa)
   
  }, []);

  
  useEffect (()=>{

    
 if(Binance.venta!==0 && Binance.compra!==0){
  setLoading(false)
  
}

  },[Binance]   )



  useEffect(() => {
    
    store.setinputDivisa(cantidad_divisas)
   
    if (Binance && cantidad_divisas) {
     
      if (
        cantidad_divisas.length === 0 ||
        cantidad_divisas === "," ||
        cantidad_divisas === "." || !parseFloat(cantidad_divisas.replace(",", "."))
      ) {
       
        setCalculo(0);
      } else {
        if (!predeB) {
          setCalculo(
            Math.round(
              ((parseFloat(cantidad_divisas.replace(",", ".")) *
                Math.round(Binance.venta * 100)) /
                100) *
                100,
            ) / 100,
          );
        } else {
          setCalculo(
            Math.round(
              ((parseFloat(cantidad_divisas.replace(",", ".")) *
                Math.round(Binance.compra * 100)) /
                100) *
                100,
            ) / 100,
          );
        }
      }
    }else {setCalculo(0)}
  }, [cantidad_divisas, predeB]);

  const handleChangePredeB = () => {
    setPredeB((prevB) => !prevB);
    store.setcheckBinance()
    
  };



  const onSubmit = handleSubmit(async (data) => {
    
  });

  useEffect(() => {
    
    if(cantidad_divisas){
    if(cantidad_divisas===',' || cantidad_divisas==='.')setValue("cantidad","0.")
    if(cantidad_divisas.length>1){setValue ("cantidad" ,cantidad_divisas.replace(/([,.])\1+/g, '$1'))   }}

    
  }, [cantidad_divisas]);
 


  if (loading)
    return <LoadingModal color={"#ff8903"} size={""} />;

  return (
    <div className="flex flex-col items-center justify-center w-full mt-4 mb-20">
      <div className="flex flex-wrap justify-center items-center ">
        <div className="flex flex-col justify-center items-center w-40 mr-2">
          <h1 className="font-bold text-3xl text-white">Compras</h1>

          <div className="w-40 flex flex-col items-center justify-center bg-black h-14 rounded-2xl text-2xl text-orange-400 text-center font-bold mt-1">
            <div>{Binance?.compra.toFixed(2)} Bs. </div>{" "}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-40 ml-2">
          <h1 className="font-bold text-3xl text-white">Ventas</h1>

          <div className="w-40 flex flex-col items-center justify-center bg-black h-14 rounded-2xl text-2xl text-orange-400  text-center font-bold mt-1">
            <div>{Binance?.venta.toFixed(2)} Bs. </div>{" "}
          </div>
        </div>
      </div>

      <Switch
        onChange={handleChangePredeB}
        checked={predeB}
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

      <div className="flex flex-col items-center justify-center text-white">
        <span>Aprox. <span className="text-xl">{(calculo / store.Dolar).toFixed(2)}</span> {" "} Dolar Bcv</span>
        <span>Aprox. <span className="text-xl">{(calculo / store.Euro).toFixed(2)}</span> {" "} Euro Bcv </span>
      </div>
    </div>
  );
}
