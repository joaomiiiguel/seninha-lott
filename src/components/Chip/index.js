import React from 'react'

export const ChipComp = ({children}) => {
  return (
    <div className='flex flex-row bg-green-200 w-fit py-[5px] px-2 rounded-3xl'>
        {children}
    </div>
  )
}
