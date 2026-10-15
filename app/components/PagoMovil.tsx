import Select, { SingleValue } from 'react-select';
import { Bancos } from '@/app/store/Cod_Bancos'
import { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";


interface Bancos_Types {

    value: string,
    label: string
}

interface PagoMovil_Types {

    Banco: {
        value: string,
        label: string
    }
    Telefono: string,
    Cedula: string
}


export default function PagoMovil() {




    const [opcionSeleccionada, setOpcionSeleccionada] = useState<Bancos_Types | null>(null);
    const [Cedula, setCedula] = useState<string>("")
    const [Telefono, setTelefono] = useState<string>("")
    const notify = () => toast("Datos Guardados!");


    const manejarCambio = (opcion: SingleValue<Bancos_Types>) => {
        setOpcionSeleccionada(opcion); // 'opcion' es un objeto { value, label }

    };

    const guardar = () => {

        const PagoMovil = { Banco: opcionSeleccionada, Telefono: Telefono, Cedula: Cedula };
        localStorage.setItem('PagoMovil', JSON.stringify(PagoMovil));
        notify();


    }

    
    const limpiar = () => {

       
        setCedula("")
        setTelefono("")
        setOpcionSeleccionada(null)
        localStorage.removeItem('PagoMovil');
       


    }

    useEffect(() => {

        const Datos: PagoMovil_Types = JSON.parse(localStorage.getItem('PagoMovil')!)

        if (Datos) {

            setTelefono(Datos.Telefono)
            setCedula(Datos.Cedula)
            if (Datos.Banco) setOpcionSeleccionada({ value: Datos.Banco.value, label: Datos.Banco.label })


        }


    }, []);


    return (


        <div className="my-6 bg-gray-800 w-full inset-x-0 top-full py-4 px-2 rounded-lg"> Datos Pago Movil:


            <div className="gap-2 flex flex-col mt-4">



                <Select

                    className='text-black'
                    value={opcionSeleccionada}
                    onChange={manejarCambio}
                    options={Bancos}
                    placeholder="Buscar Bancos..."


                />

                <label htmlFor=""> Telefono: </label>
                <input
                    type="text"
                    className="border-white bg-white text-black p-2 rounded-lg"
                    placeholder='Ej: 04241231212'
                    value={Telefono}
                    onChange={(e) => setTelefono(e.target.value)}

                />



                <label htmlFor=""> Cedula: </label>
                <input
                    type="text"
                    className="border-white bg-white text-black p-2 rounded-lg"
                    placeholder='Ej: V12345678'
                    value={Cedula}
                    onChange={(e) => setCedula(e.target.value)}

                />

                <div className='flex flex-wrap justify-around items-center'>
                    <button
                        className='bg-amber-200 text-black w-24 rounded-xl mt-4 mx-auto p-2'
                        onClick={() => limpiar()}

                    > Limpiar
                    </button>
                    <button
                        className='bg-blue-500 w-24 rounded-xl mt-4 mx-auto p-2'
                        onClick={() => guardar()}

                    > Guardar
                    </button>
                </div>

            </div>

        </div>

    )


}