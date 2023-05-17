

export const ButtonComp = ({ children, disabled, ...rest }) => {
    return (
        <>
            {disabled ?
                <button disabled className="flex flex-row items-center font-semibold justify-center h-10 bg-black bg-opacity-20 w-full rounded-xl uppercase text-white" {...rest}>
                    {children}
                </button>
                :
                <button className="flex flex-row items-center font-semibold justify-center h-10 text-green-900 bg-amber-100 hover:bg-opacity-60 w-full rounded-xl uppercase hover:shadow transition ease-in-out duration-300 delay-150" {...rest}>
                    {children}
                </button>
            }
        </>
    )
}