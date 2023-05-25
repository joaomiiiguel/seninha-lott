import React, { useEffect } from 'react'
import { Calendar, Clock, Ticket, CaretRight, SignOut } from "@phosphor-icons/react";

import { CardComp } from '@/components/Card'
import { ChipComp } from '@/components/Chip'
import { IconButtonComp } from '@/components/IconButton'
import { CardTicket } from '@/components/CardTicket';
import Modal from '@mui/material/Modal';
import { useHomeScreen } from './hook/useHomeScreen';
import Link from 'next/link';
import { DetailsPage } from './Details';

export default function HomeScreen({ userData, serviceData, loading }) {
    const {
        userStore,
        valorPremio,
        dateLott,
        hourLott,
        tickets,
        modalDetails,
        setModalDetails,
        logoutUserSession,
        ticketSelected,
        handleTicketSelected
    } = useHomeScreen({ serviceData })

    return (
        <div className='flex flex-col pt-8 mb-24 space-y-4 justify-start items-center w-full' >
            <div className='flex flex-row justify-between w-full'>
                <p className='font-bold text-2xl text-green-900'>Olá, {userStore.displayName}!</p>
                <IconButtonComp onClick={() => logoutUserSession()}>
                    <p className='text-[11px] mr-2'>Sair</p>
                    <SignOut size={15} weight="bold" />
                </IconButtonComp>
            </div>
            <CardComp>

                <div className='w-full'>
                    <p className='font-semibold text-orange-400 w-full'>Premiação</p>
                    {loading ?
                        <div className='animate-pulse flex w-full h-full py-1'>
                            <div className="h-10 w-full bg-green-900 rounded" />
                        </div>
                        :
                        <div className='w-full text-center text-amber-100'>
                            <div className='flex flex-row justify-center items-start'>
                                <p className='text-md font-bold'>R$&nbsp;</p>
                                <p className='text-5xl font-black'>{Intl.NumberFormat("pt-BR", { maximumFractionDigits: 4, minimumFractionDigits: 2 }).format(valorPremio)}</p>
                            </div>
                            <p className='text-xs opacity-30'>Acertar 10 pontos</p>
                        </div>
                    }
                    {loading ?
                        <div className='animate-pulse flex w-full h-full py-1'>
                            <div className="h-10 w-full bg-green-900 rounded" />
                        </div>
                        :
                        <div className='w-full text-center mt-4 text-amber-100'>
                            <div className='flex flex-row justify-center opacity-60 items-start'>
                                <p className='text-md font-bold'>R$&nbsp;</p>
                                <p className='text-3xl font-black'>{Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(valorPremio / 3)}</p>
                            </div>
                            <p className='text-[10px] opacity-30'>Menos pontos</p>
                        </div>
                    }



                </div>
                <div className='w-full'>
                    <p className='text-xs font-semibold text-orange-400 w-full'>Próximo Sorteio</p>

                    <div className='flex flex-row justify-between items-center w-fit'>
                        {loading ?
                            <div className='animate-pulse bg-gray-400 rounded h-[18px] w-14'></div>
                            :
                            <>
                                <Calendar className=' text-amber-100' weight="bold" size={18} />
                                <p className='text-sm text-amber-100'>&nbsp;{dateLott}</p>
                                <p className='text-sm text-amber-100'>&nbsp; às {hourLott}</p>
                            </>
                        }
                    </div>
                </div>
            </CardComp>
            <CardComp>
                <div className='flex flex-row justify-between items-center w-full'>
                    <p className='font-semibold text-orange-400 w-full'>Game results</p>
                    <Link href={`/${userData?.uid}/new-ticket`}>
                        <IconButtonComp >
                            <p className='text-[15px] font-semibold'>+&nbsp;</p>
                            <Ticket size={20} weight="bold" />
                        </IconButtonComp>
                    </Link>
                </div>
                {loading ?
                    <>
                        <div className='animate-pulse flex w-full h-full py-1'>
                            <div className="h-52 w-full bg-green-900 rounded-lg" />
                        </div>
                    </>
                    :
                    tickets === undefined ?
                        <div className='w-full min-h-96'>
                            <p>Nenhum ticket cadastrado</p>
                        </div>
                        :
                        tickets?.map((ticket, index) =>
                            <div className='w-full' key={index}>
                                <CardTicket ticket={ticket} index={index} ticketLength={tickets?.length} onClickTicket={(e) => handleTicketSelected(ticket)} />
                            </div>
                        )
                }
            </CardComp>

            <Modal
                open={modalDetails}
                onClose={() => setModalDetails(false)}
                aria-labelledby="modal-Details-title"
                aria-describedby="modal-Details-description"
            >
                <DetailsPage ticket={ticketSelected} setModalDetails={setModalDetails}/>
            </Modal>
        </div>
    )
}
