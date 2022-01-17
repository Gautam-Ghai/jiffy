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
            <button className={`border-2 drop-shadow-lg border-gray-500 rounded-2xl h-8 w-16 text-xs text-white ${props.className}`} onClick={props.onClick}>
                {props.children}
            </button>
        )
    }

    return (
        <div>
            <button className={`button rounded-2xl drop-shadow-lg h-8 w-16 text-xs text-white ${props.className}`} onClick={props.onClick}>
                {props.children}
            </button>
        </div>
    )
}
