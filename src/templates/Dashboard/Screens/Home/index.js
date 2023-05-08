import React from 'react'
import { Calendar, Clock, User, Ticket, BookBookmark, CaretRight } from "@phosphor-icons/react";

import { CardComp } from '@/components/Card'
import { ChipComp } from '@/components/Chip'
import { IconButtonComp } from '@/components/IconButton'
import { CardTicket } from '@/components/CardTicket';

import { useHomeScreen } from './hook/useHomeScreen';

export default function HomeScreen() {
    const { 
        userData, 
        loading, 
        userStore, 
        serviceData, 
        valorPremio, 
        dateLott, 
        hourLott,
        tickets
    } = useHomeScreen()

    return (
        <div className='flex flex-col pt-8 mb-24 space-y-4 justify-start items-center w-full' >
            <div className='flex flex-row justify-between w-full'>
                <p className='font-bold text-2xl text-green-900'>Olá, {userStore.displayName}!</p>
            </div>
            <CardComp>
                <p className='font-semibold text-orange-400 w-full'>Premiação</p>
                <div className='flex flex-row justify-center items-start'>
                    <p className='text-md font-bold'>R$&nbsp;</p>
                    <p className='text-5xl font-black'>{Intl.NumberFormat("pt-BR", { maximumFractionDigits: 3 }).format(valorPremio)},00</p>
                </div>
                <div className='flex flex-row justify-between items-center w-full'>
                    <ChipComp>
                        <Calendar className=' text-green-900' weight="bold" size={18} />
                        <p className='text-[12px] font-semibold text-green-900'>&nbsp;{dateLott}</p>
                    </ChipComp>
                    <ChipComp>
                        <Clock className=' text-green-900' weight="bold" size={18} />
                        <p className='text-[12px] font-semibold text-green-900'>&nbsp;{hourLott}</p>
                    </ChipComp>
                </div>
            </CardComp>
            <CardComp>
                <div className='flex flex-row justify-between items-center w-full'>
                    <p className='font-semibold text-orange-400 w-full'>Game results</p>
                    <IconButtonComp>
                        <p className='text-[15px] font-semibold'>+&nbsp;</p>
                        <Ticket size={20} weight="bold" />
                    </IconButtonComp>
                </div>
                {tickets?.map((ticket, index) => 
                    <CardTicket ticket={ticket} index={index} ticketLength={tickets.length}/>
                )}
            </CardComp>
        </div>
    )
}
