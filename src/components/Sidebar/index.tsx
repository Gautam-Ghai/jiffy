import React, { useState } from 'react'
import { useSession } from 'next-auth/react'

import Button from '../Button'
import AuthModal from '../AuthModal'

import { FaTwitter, FaDiscord, FaInstagram } from 'react-icons/fa'
import { AiOutlineCompass, AiOutlineHome } from "react-icons/ai"
import { MdOutlineVideoLibrary } from "react-icons/md"
import { IoGameControllerOutline } from "react-icons/io5"
import Menu from "../Menu"

interface Props {
    showInfo?: boolean
}

export default function Sidebar(props: Props) {
    const { data: session, status } = useSession()
    const [ isOpen, setIsOpen ] = useState(false)

    return (
        <div className='flex flex-col items-start sm:ml-4 xl:ml-0'>
            {props.showInfo &&
                <div className="bg-cardBlue-100 rounded-md drop-shadow-lg h-auto w-52 hidden lg:block mb-6">
                    <div className='flex flex-col items-start p-4'>
                        <h1 className='text-gray-500 font-bold text-xl pb-3'><span className="text-white">Whoops</span> is a community of 767,250 amazing gamers</h1>
                        <p className='text-gray-500 pt-3 tracking-wide'>We're a place where gamers share, connect and grow their audience.</p>
                    </div>
                    {!session &&
                        <Button className='w-48 h-10 m-2 mb-4' onClick={() => setIsOpen(true)}>
                            Join
                        </Button>
                    }
                </div>
            }
            <div className="rounded-md h-auto w-20 lg:w-auto hidden sm:block sm:bg-cardBlue-100 lg:bg-transparent">
                <Menu />
            </div>

            <div className='hidden lg:block'>
                <div className='w-full flex justify-start items-center py-3 space-x-2 lg:space-x-4'>
                    <a href='https://twitter.com/whoops_gg' target="_blank"><FaTwitter className='h-6 w-6 text-gray-500 hover:text-white'/></a>
                    <a href='https://discord.gg/FDykHF9MQR' target="_blank"><FaDiscord className='h-6 w-6 text-gray-500 hover:text-white'/></a>
                    <a href='https://instagram.com/_whoops.gg' target="_blank"><FaInstagram className='h-6 w-6 text-gray-500 hover:text-white'/></a>
                </div> 
            </div>

            <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )   
}
