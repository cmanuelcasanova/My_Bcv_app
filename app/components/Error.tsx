import Image from "next/image";
import { MdOutlineError } from "react-icons/md";

export default function Error() {

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
    

    )




}