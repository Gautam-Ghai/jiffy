import React from 'react'

import { AiOutlineCompass, AiOutlineFolderOpen } from "react-icons/ai"
import { HiOutlineUserGroup } from "react-icons/hi"
import { MdOutlineVideoLibrary } from "react-icons/md"
import { IoGameControllerOutline } from "react-icons/io5"
import Link from 'next/link'
import { useSession } from 'next-auth/react'


const Footer = () => {
    const { data: session, status } = useSession()

    return (
        <div className='bg-cardBlue-100 fixed navbar bottom-0 h-12 w-full pt-2 z-50'>
            <div className="flex flex-row justify-around items-center">
                <Link href='/'>
                    <div className="flex flex-row space-x-2 mt-1 cursor-pointer  text-gray-500 hover:text-white">
                        <IoGameControllerOutline className="h-6 w-6" />
                    </div>
                </Link>
                <div className="flex flex-row space-x-1 mt-1 cursor-pointer  text-gray-500 hover:text-white">
                    <AiOutlineCompass className="h-6 w-6" />
                </div>
                <div className="flex flex-row space-x-1 mt-1 cursor-pointer  text-gray-500 hover:text-white">
                    <HiOutlineUserGroup className="h-6 w-6" />
                </div>
                {session && 
                    <Link href='/upload'>
                        <div className="flex flex-row space-x-1 mt-1 cursor-pointer  text-gray-500 hover:text-white">
                            <MdOutlineVideoLibrary className="h-6 w-6" />
                        </div>
                    </Link>
                }
            </div>
        </div>
    )
}


export default Footer