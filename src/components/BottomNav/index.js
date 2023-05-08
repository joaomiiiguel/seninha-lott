import { SquaresFour, User, ChartBar } from "@phosphor-icons/react";
import { useState } from "react";


export const BottomNav = ({tabSelected, setTabSelected}) => {
    return (
        <div className=" fixed bottom-4 flex flex-row items-center justify-between bg-[#E4CEAC] w-full rounded-full overflow-hidden  max-w-lg shadow" >
            <button onClick={() => setTabSelected(0)} className={`flex flex-col items-center w-1/3 py-4 rounded-l-full ${tabSelected !== 0 && 'opacity-40'}`}>
                <SquaresFour size={20} weight="fill" className="text-[#3F3B37]" />
                <p className="text-[#3F3B37] text-[12px]">Home</p>
            </button>
            <button onClick={() => setTabSelected(1)} className={`flex flex-col items-center w-1/3 py-4 ${tabSelected !== 1 && 'opacity-40'}`}>
                <ChartBar size={20} weight="fill" className="text-[#3F3B37]"/>
                <p className="text-[#3F3B37] text-[12px]">Resultados</p>
            </button>
            <button onClick={() => setTabSelected(2)} className={`flex flex-col items-center w-1/3 py-4 rounded-r-full ${tabSelected !== 2 && 'opacity-40'}`}>
                <User size={20} weight="fill" className="text-[#3F3B37]"/>
                <p className="text-[#3F3B37] text-[12px]">Perfil</p>
            </button>
        </div>
    )
}