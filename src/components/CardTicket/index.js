import { IconButtonComp } from "../IconButton"
import { CaretRight } from "@phosphor-icons/react";
import { BallNumber } from "../BallNumber";

export const CardTicket = ({ ticket, index, ticketLength }) => {
    return (
        <div className={`flex flex-col border ${ticket.statusPayment ? 'border-amber-50 bg-transparent border-opacity-30' : 'border-red-500'}  rounded-xl w-full p-4 space-y-4 mb-4`}>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center'>
                    <p className='text-sm'>Ticket {index + 1} &nbsp;</p>
                    <p className='text-sm opacity-30'>de {ticketLength} -</p>
                    {ticket.statusPayment ?
                        <p className='text-sm font-bold text-green-500'>&nbsp;Ativo</p>
                        :
                        <p className='text-sm font-bold text-red-500'>&nbsp;Inativo</p>
                    }
                </div>
                <IconButtonComp>
                    <p className='text-[11px]'>Detalhes</p>
                    <CaretRight size={15} weight="bold" />
                </IconButtonComp>
            </div>
            <div className='grid grid-cols-5 gap-y-4 gap-x-6'>
                {ticket.listNumbs?.map((number, index) => (
                    <div key={index}>
                        <BallNumber >{number}</BallNumber>
                    </div>
                )
                )}
            </div>
        </div>
    )
}