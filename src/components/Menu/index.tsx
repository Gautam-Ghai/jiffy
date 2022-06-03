import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { AiOutlineCompass, AiOutlineHome } from "react-icons/ai"
import { MdOutlineVideoLibrary } from "react-icons/md"
import { IoGameControllerOutline } from "react-icons/io5"

interface Props {
    showNavbarMenu?: boolean
}

const Menu = (props: Props) => {
    
    const { data: session, status } = useSession()
    
  return (
    <div className={`flex ${props.showNavbarMenu ? 'flex-row space-x-4' : 'w-full flex-col p-2'} items-center`}>
        <Link href="/"> 
            <div className={`${props.showNavbarMenu ? 'w-auto space-x-2 h-10' : 'w-full space-x-6 h-8'} flex flex-row justify-center lg:justify-start my-2 lg:my-1 cursor-pointer border-transparent border-b-4 p-0  text-gray-500 hover:border-btnBlue hover:text-white`}>
                <AiOutlineCompass className="h-6 w-6" />
                <p className='hidden lg:block'>Explore</p>
            </div>
        </Link>
        <div className={`${props.showNavbarMenu ? 'w-auto space-x-2 h-10' : 'w-full space-x-6 h-8'} flex flex-row justify-center lg:justify-start lg:my-1 cursor-pointer border-transparent border-b-4 p-0  text-gray-500 hover:border-btnBlue hover:text-white`}>
            <AiOutlineHome className="h-6 w-6" />
            <p className='hidden lg:block'>Home</p>
        </div>
        <Link href="/games"> 
            <div className={`${props.showNavbarMenu ? 'w-auto space-x-2 h-10' : 'w-full space-x-6 h-8'} flex flex-row justify-center lg:justify-start my-2 lg:my-1 cursor-pointer border-transparent border-b-4 p-0  text-gray-500 hover:border-btnBlue hover:text-white`}>
                <IoGameControllerOutline className="h-6 w-6" />
                <p className='hidden lg:block'>Games</p>
            </div>
        </Link>
        {session && 
            <Link href="/upload"> 
                <div className={`${props.showNavbarMenu ? 'w-auto space-x-2 h-10' : 'w-full space-x-6 h-8'} flex flex-row justify-center lg:justify-start my-2 lg:my-1 cursor-pointer border-transparent border-b-4 p-0  text-gray-500 hover:border-btnBlue hover:text-white`}>
                    <MdOutlineVideoLibrary className="h-6 w-6" />
                    <p className='hidden lg:block'>Upload</p>
                </div>
            </Link>
        }
    </div>
  )
}

export default Menu