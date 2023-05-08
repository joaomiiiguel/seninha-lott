import React from 'react'

export const CardComp = ({ children }) => {
    return (
        <div className='flex flex-col justify-around items-center p-6 space-y-4 w-full bg-green-800 text-white rounded-xl shadow'>
            {children}
        </div>
    )
}