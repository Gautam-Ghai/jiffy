import React from 'react'

interface Props {
    variant?: true,
    children: JSX.Element | string;
    className?: any,
    onClick?: () => void
    type?: string
}

export default function Button(props: Props) {

    if(props.variant){
        return (
            <button className={`rounded-md py-1 px-2.5 w-auto text-md text-gray-500 font-semibold border-2 border-solid border-gray-500 tracking-wide hover:text-white hover:border-white hover:-translate-y-1 ${props.className}`} onClick={props.onClick}>
                {props.children}
            </button>
        )
    }

    return (
        <div>
            <button className={`button rounded-md py-1.5 px-2.5 w-auto text-md font-semibold text-white tracking-wide ${props.className}`} onClick={props.onClick}>
                {props.children}
            </button>
        </div>
    )
}
