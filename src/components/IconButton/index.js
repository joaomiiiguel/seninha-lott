import { Children } from "react"

export const IconButtonComp = ({children, ...rest}) => {
    return(
        <button className="flex flex-row items-center rounded-full p-2 hover:shadow hover:bg-black hover:bg-opacity-10 transition ease-in-out duration-300 delay-150 " {...rest}>
            {children}
        </button>
    )
}