"use client";

import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Switch from "react-switch";
import { useStore } from "@/app/store/useSection"  ;
import { SiBinance } from "react-icons/si";

export default function Navbar() {

    const store = useStore((store) => store);
    const [menu, setMenu] = useState<Boolean>(false);
    const [prede, setPrede] = useState<boolean>(false);
 
  


  const handleChangePrede = () => {
    setPrede((prev) => {
      if (prev === true) localStorage.setItem("Default", "2");
      if (prev === false) localStorage.setItem("Default", "1");
      return !prev;
    });
  };


   useEffect(() => {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("Default") === null || localStorage.getItem("Default")==="1"  ) {
          localStorage.setItem("Default", "1");
          setPrede(true);
          store.setviewDolar(true)
        
        } else {
       
          if (localStorage.getItem("Default") === "2") {
            (setPrede(false), store.setviewDolar(false));
          }
        
      }
    }
    }, []);

     const handleChangeBinance = () => {
    
    store.setOption();
    
  };

 

  return (
    <div className="flex flex-wrap items-center justify-between w-full px-2 my-2">
      {!menu ? (
        <IoMenu
          size={40}
          onClick={() => setMenu((prev) => !prev)}
          className="text-white mr-auto  ml-4"
        />
      ) : (
        <IoIosCloseCircleOutline
          size={40}
          onClick={() => setMenu((prev) => !prev)}
          className="text-white mr-auto  ml-4"
        />
      )}

  {/* Switch Cambio a Binance */}

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
            <SiBinance size={20} className="text-orange-500" />
          </div>
        }
      ></Switch>

      {menu && (
        <div className="bg-blue-950 w-full inset-x-0 top-full h-20 p-4 pt-4 my-4 text-white font-bold">
          
          { /* Switch Moneda PRederterminada */ }

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


     
    </div>
  );
}
