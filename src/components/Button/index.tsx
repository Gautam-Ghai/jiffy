import React from 'react'

interface Props {
    variant?: true,
    children: JSX.Element | string;
    className?: any,
    onClick?: () => void
}

export default function Button(props: Props) {

    if(props.variant){
        return (
            <button className={`rounded-2xl py-1 px-2.5 w-auto text-sm text-gray-500 font-semibold border-2 border-solid border-gray-500 ${props.className}`} onClick={props.onClick}>
                {props.children}
            </button>
        )
    }

    return (
        <div>
            <button className={`button rounded-2xl py-1.5 px-2.5 w-auto text-sm text-white ${props.className}`} onClick={props.onClick}>
                {props.children}
            </button>
        </div>
    )
}
