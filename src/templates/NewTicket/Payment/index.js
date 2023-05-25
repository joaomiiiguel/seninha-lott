import { ButtonDarkComp } from "@/components/ButtonDark"
import { IconButtonComp } from "@/components/IconButton";
import { Copy, X } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from 'next/router';

import QrCode from '../../../../public/QrCode.jpeg'

export const PaymentPage = ({ setModalPayment, onClick }) => {
    const router = useRouter();
    return (
        <div className="flex flex-col justify-start w-full h-screen mx-auto bg-amber-100 px-8 md:pt-8 max-w-lg space-y-4">
            <div className="flex flex-col ">
                <div className="flex flex-row items-center justify-between">
                    <p className='text-lg font-bold tracking-wider text-green-900'>Como você quer fazer o pagamento?</p>
                    <IconButtonComp onClick={() => setModalPayment(false)}>
                        <X size={20} />
                    </IconButtonComp>
                </div>
                <p className='text-xs text-green-900 mt-4'>Aponte a camera para o QR Code ou copie o código para reazlizar o pagamento</p>
            </div>

            <div className="flex flex-col items-center mx-auto space-y-2 border-4 bg-gray-300 bg-opacity-30 border-green-800 p-4 rounded-lg">
                <Image src={QrCode} className="h-[30vh] w-auto"  alt="qrCodepayment"/>
                <p className="text-xs w-full text-center">ou</p>
                <ButtonDarkComp onClick={() => {}}><Copy size={18} /><p className="text-xs font-light">Copiar Código</p></ButtonDarkComp>
            </div>

            <div className="flex flex-col justify-center items-start space-y-2 text-green-800">
                <div className="w-full flex flex-col justify-center items-center">
                    <p className='text-sm font-semibold'>Valor a ser pago</p>
                    <p className='text-4xl font-bold'>{Intl.NumberFormat("pt-BR", { style: "currency",currency: "BRL", }).format(5)}</p>
                </div>
                <div className="flex w-full justify-between">
                    <p className='text-xs'>Destinatário</p>
                    <p className='text-xs font-bold'>João Miguel de Farias Silva</p>
                </div>
                <div className="flex w-full justify-between">
                    <p className='text-xs'>Instituição</p>
                    <p className='text-xs font-bold'>Nubank</p>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-xs w-full text-center text-green-800">Confirme o pagamento e aguarde</p>
                <ButtonDarkComp onClick={onClick}>Já paguei</ButtonDarkComp>
            </div>

        </div>
    )
}