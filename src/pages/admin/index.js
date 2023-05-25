import { BallNumber } from "@/components/BallNumber";
import { Skeleton } from "@/components/Skeleton";
import { useDataService } from "@/hooks/useDataService";
import Image from "next/image";

import BallImage from '../../../public/ballAdmin.png'
import CardImg1 from '../../../public/cardAdmin1.png'
import CardImg2 from '../../../public/cardAdmin2.png'
import CardImg3 from '../../../public/cardAdmin3.png'

const listNumbers = [1, 2, 3, 43, 54, 23]

export default function AdmHomePage() {
    const { serviceData } = useDataService()

    console.log(serviceData);

    return (
        <div className="bg-primary-dark h-fit text-white w-11/12 mx-auto mt-[5%] space-y-4">
            <p className="text-xl font-bold">Dashboard</p>
            <div className="flex flex-row justify-between items-stretch w-full rounded-full bg-primary py-6 px-10">
                <Image src={BallImage} alt="Ball cassino" />
                <div className=" flex flex-col flex-2">
                    <p className="text-xs text-primary-light">Rodadas</p>
                    {serviceData ?
                        <p className="text-2xl font-semibold">#1</p>
                        :
                        <Skeleton />
                    }
                </div>
                <div>
                    <p className="text-xs text-primary-light">Concurso</p>
                    {serviceData ?
                        <p className="text-xl font-semibold">2342</p>
                        :
                        <Skeleton />
                    }
                </div>
                <div>
                    <p className="text-xs text-primary-light">Números da Semana</p>
                    {serviceData ?
                        <div className="flex flex-row">
                            {listNumbers.map((item) => (
                                <BallNumber>{item}</BallNumber>
                            ))}
                        </div>
                        :
                        <Skeleton />
                    }
                </div>
                <div>
                    <p className="text-xs text-primary-light">Próximo Sorteio</p>
                    {serviceData ?
                        <p className="text-xl font-semibold">20 de maio</p>
                        :
                        <Skeleton />
                    }
                </div>
                <button className="bg-secondary flex px-10 items-center rounded-full font-semibold text-sm tracking-widest">
                    <p>Novo Sorteio</p>
                </button>
            </div>
            <div className="w-full flex flex-row justify-between items-stretch space-x-4">
                <div className="flex flex-row justify-between bg-primary p-6 w-1/3 rounded">
                    <div className="flex flex-col">
                        <p className="text-xs text-primary-light mb-4">Acumulado</p>
                        <p className="text-3xl font-semibold text-secondary-dark">R$15.000</p>
                    </div>
                    <Image src={CardImg1} alt="money card"/>
                </div>
                <div className="flex flex-row justify-between bg-primary p-6 w-1/3 rounded">
                    <div className="flex flex-col">
                        <p className="text-xs text-primary-light mb-4">Total de Tickets</p>
                        <p className="text-3xl font-semibold text-secondary-dark">14 <span className="text-base opacity-30">Tickets</span></p>
                    </div>
                    <Image src={CardImg2} alt="money card"/>
                </div>
                <div className="flex flex-row justify-between bg-primary p-6  w-1/3 rounded">
                    <div className="flex flex-col">
                        <p className="text-xs text-primary-light mb-4">Total de Usuários</p>
                        <p className="text-3xl font-semibold text-secondary-dark">8 <span className="text-base opacity-30">Usuários</span></p>
                    </div>
                    <Image src={CardImg3} alt="money card"/>
                </div>
                
            </div>
            <div className="w-full flex flex-row justify-between items-center space-x-4">
                <div className="flex w-full flex-col bg-primary p-6 rounded"><p>Transações</p></div>
                <div className="flex w-full flex-col bg-primary p-6 rounded"><p>Resultado</p></div>
            </div>
        </div>
    )
}