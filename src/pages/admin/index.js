import { BallNumber } from "@/components/BallNumber";
import { Skeleton } from "@/components/Skeleton";
import { userAdminHook } from "./hook/userAdminHook";
import Image from "next/image";

import BallImage from '../../../public/ballAdmin.png'
import CardImg1 from '../../../public/cardAdmin1.png'
import CardImg2 from '../../../public/cardAdmin2.png'
import CardImg3 from '../../../public/cardAdmin3.png'
import { IconButtonComp } from "@/components/IconButton";
import { SignOut } from "@phosphor-icons/react";


const listNumbers = [1, 2, 3, 43, 54, 23]

export default function AdmHomePage() {
    const { dataService, loadingService, logoutUserSession } = userAdminHook();

    return (

        <div className="bg-primary-dark h-fit text-white w-11/12 mx-auto mt-[5%] space-y-4">
            <div className="flex flex-row justify-between">
                <p className="text-xl font-bold">Dashboard</p>
                <IconButtonComp onClick={() => logoutUserSession()}>
                    <p className='text-[11px] mr-2'>Sair</p>
                    <SignOut size={15} weight="bold" />
                </IconButtonComp>
            </div>
            <div className="flex flex-row justify-between items-stretch w-full rounded-full bg-primary py-6 px-10">
                <Image src={BallImage} alt="Ball cassino" />
                <div className=" flex flex-col flex-2">
                    <p className="text-xs text-primary-light">Rodadas</p>
                    {!loadingService ?
                        <p className="text-2xl font-semibold">#{dataService?.currentSorteio[0].rodada}</p>
                        :
                        <Skeleton />
                    }
                </div>
                <div>
                    <p className="text-xs text-primary-light">Concurso</p>
                    {!loadingService ?
                        <p className="text-xl font-semibold">{dataService?.currentSorteio[0].concurso}</p>
                        :
                        <Skeleton />
                    }
                </div>
                <div className="flex flex-col w-3/12">
                    <p className="text-xs text-primary-light">Números da Semana</p>
                    {!loadingService ?
                        <div className="flex flex-row space-x-2">
                            {dataService?.currentSorteio[0].listaNumeros.map((item) => (
                                <div className="w-[40px] text-center rounded-full p-2 bg-gradient-to-r from-secondary-dark to-secondary-light">{item}</div>
                            ))}
                        </div>
                        :
                        <Skeleton />
                    }
                </div>
                <div>
                    <p className="text-xs text-primary-light">Próximo Sorteio</p>
                    {!loadingService ?
                        <p className="text-xl font-semibold">20 de maio</p>
                        :
                        <Skeleton />
                    }
                </div>
                <button className="bg-gradient-to-r from-secondary-dark to-secondary-light flex px-10 items-center rounded-full font-semibold text-sm tracking-widest">
                    <p>Novo Sorteio</p>
                </button>
            </div>
            <div className="w-full flex flex-row justify-between items-stretch space-x-4">
                <div className="flex flex-row justify-between bg-primary p-6 w-1/3 rounded">
                    <div className="flex flex-col">
                        <p className="text-xs text-primary-light mb-4">Acumulado</p>
                        <p className="text-3xl font-semibold text-secondary-dark">{Intl.NumberFormat("pt-BR", {style: 'currency', currency: 'BRL', maximumFractionDigits: 4, minimumFractionDigits: 2 }).format(dataService?.valorPremio)}</p>
                    </div>
                    <Image src={CardImg1} className="w-[70px] h-fit" alt="money card" />
                </div>
                <div className="flex flex-row justify-between bg-primary p-6 w-1/3 rounded">
                    <div className="flex flex-col">
                        <p className="text-xs text-primary-light mb-4">Total de Tickets</p>
                        <p className="text-3xl font-semibold text-secondary-dark">{dataService?.TotalTicket} <span className="text-base opacity-30">Tickets</span></p>
                    </div>
                    <Image src={CardImg2} className="w-[70px] h-fit" alt="money card" />
                </div>
                <div className="flex flex-row justify-between bg-primary p-6  w-1/3 rounded">
                    <div className="flex flex-col">
                        <p className="text-xs text-primary-light mb-4">Total de Usuários</p>
                        <p className="text-3xl font-semibold text-secondary-dark">{dataService?.TotalUser} <span className="text-base opacity-30">Usuários</span></p>
                    </div>
                    <Image src={CardImg3} className="w-[70px] h-fit" alt="money card" />
                </div>

            </div>
            <div className="w-full flex flex-row justify-between items-center space-x-4">
                <div className="flex w-full flex-col bg-primary p-6 rounded">
                    <div className="flex flex-row justify-between w-full">
                        <p className="w-fit pb-4">Transações</p>
                        <button className="bg-gradient-to-r from-secondary-dark to-secondary-light rounded-full py-2 px-6">
                            Ver Tabela
                        </button>
                    </div>
                    <div className="opacity-30">
                        <div className="flex flex-row justify-around border-b text-center text-xs tracking-wider uppercase">
                            <p className="w-full py-2">nome</p>
                            <p className="w-full py-2">horário</p>
                            <p className="w-full py-2">valor</p>
                            <p className="w-full py-2">confirmação</p>
                        </div>
                        <div>
                            <div className="flex flex-row justify-around border-b-2 text-center border-primary-dark font-light text-sm ">
                                <div className="w-full py-2 px-2 h-[40px]">
                                    <Skeleton />
                                </div>
                            </div>
                            <div className="flex flex-row justify-around border-b-2 text-center border-primary-dark font-light text-sm ">
                                <div className="w-full py-2 px-2 h-[40px]">
                                    <Skeleton />
                                </div>
                            </div>
                            <div className="flex flex-row justify-around border-b-2 text-center border-primary-dark font-light text-sm ">
                                <div className="w-full py-2 px-2 h-[40px]">
                                    <Skeleton />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="flex relative w-full flex-col bg-primary p-6 rounded">
                    <div className="flex flex-row justify-between w-full">
                        <p className="w-fit pb-4">Resultado</p>
                        <button className="bg-gradient-to-r from-secondary-dark to-secondary-light rounded-full py-2 px-6">
                            Ver Tabela
                        </button>
                    </div>
                    <div className="opacity-30">
                        <div className="flex flex-row justify-around border-b text-center text-xs tracking-wider uppercase">
                            <p className="w-full py-2">nome</p>
                            <p className="w-full py-2">horário</p>
                            <p className="w-full py-2">valor</p>
                            <p className="w-full py-2">confirmação</p>
                        </div>
                        <div>
                            <div className="flex flex-row justify-around border-b-2 text-center border-primary-dark font-light text-sm ">
                                <div className="w-full py-2 px-2 h-[40px]">
                                    <Skeleton />
                                </div>
                            </div>
                            <div className="flex flex-row justify-around border-b-2 text-center border-primary-dark font-light text-sm ">
                                <div className="w-full py-2 px-2 h-[40px]">
                                    <Skeleton />
                                </div>
                            </div>
                            <div className="flex flex-row justify-around border-b-2 text-center border-primary-dark font-light text-sm ">
                                <div className="w-full py-2 px-2 h-[40px]">
                                    <Skeleton />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}