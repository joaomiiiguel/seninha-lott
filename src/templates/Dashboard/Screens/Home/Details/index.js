import { BallNumber } from "@/components/BallNumber";
import { IconButtonComp } from "@/components/IconButton";
import { X } from "@phosphor-icons/react";

export const DetailsPage = ({ ticket, setModalDetails }) => {
    return (
        <div className="flex flex-col justify-start mx-auto border bg-green-900 rounded-lg p-8 w-11/12 md:pt-8 max-w-lg space-y-6 mt-[50%]">
            <div className='flex flex-row justify-between w-full text-amber-100 items-center'>
                <p className='font-bold text-lg '>Detalhes da Aposta</p>
                <IconButtonComp onClick={() => setModalDetails(false)}>
                    <X size={20} />
                </IconButtonComp>
            </div>
            <div>
                <p className='text-sm text-amber-100 mb-2'>Números selecionados da Aposta</p>
                <div className='grid grid-cols-5 gap-y-4 gap-x-6'>
                    {ticket?.listNumbs.map((number, index) => (
                        <div key={index}>
                            <BallNumber >{number}</BallNumber>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-sm text-amber-100 mb-2">Status do Pagamento</p>
                {ticket.statusPayment ?
                    <p className='text-sm font-semibold tracking-widest bg-green-500 bg-opacity-70  text-amber-100 text-center p-2 rounded'>Pago</p>
                    :
                    <p className='text-sm font-semibold tracking-widest bg-red-500 bg-opacity-70  text-amber-100 text-center p-2 rounded'>Não realizado</p>
                }
            </div>
        </div>
    )
}