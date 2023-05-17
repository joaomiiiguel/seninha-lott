import { CheckCircle } from "@phosphor-icons/react";

export const BallNumber = ({ marked, outlined, children }) => {
    return (
        <>
            {outlined ?
                <div className="flex relative items-center justify-center bg-orange-400  rounded-full w-[35px] h-[35px]">
                    <p className="text-green-900 font-bold text-sm">{children}</p>
                    {marked && <CheckCircle className='absolute right-[-5px] top-[-5px] text-orange-400 bg-green-800 rounded-full' weight="fill" size={18} />}
                </div>
                :
                <div className="flex relative items-center justify-center bg-amber-100  rounded-full w-[35px] h-[35px]">
                    <p className="text-green-900 font-bold text-sm">{children}</p>
                    {marked && <CheckCircle className='absolute right-[-5px] top-[-5px] text-orange-400 bg-green-800 rounded-full' weight="fill" size={18} />}
                </div>
            }
        </>
    )
}