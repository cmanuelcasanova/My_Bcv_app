import { QRCodeSVG } from 'qrcode.react';

interface Props {

    onClosed: () => void,
    message: string


}

export default function QrModal({ onClosed , message }: Props) {



    return (


        <div className="h-full w-full flex flex-col items-center justify-center bg-white">
            <div role="status" className="w-dvw sm:w-175 h-200 flex flex-col items-center justify-center z-10">

                <QRCodeSVG
                    value={JSON.stringify("Text aqui")}
                    size={300}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="M"
                    includeMargin={false}
                />

                <h1 className='text-black'> {message}</h1>

                <button
                    className='bg-blue-500 w-24 rounded-xl mt-12 mx-auto p-2'
                    onClick={() => onClosed()}

                > Cerrar
                </button>

            </div>
        </div>
    )
}