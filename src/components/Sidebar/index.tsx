import React, { useState } from 'react'
import { useSession } from 'next-auth/react'

import Button from '../Button'
import AuthModal from '../AuthModal'

import { FaTwitter, FaDiscord, FaInstagram } from 'react-icons/fa'
import { BiSupport } from "react-icons/bi"
import { AiOutlineInfoCircle, AiOutlineBulb, AiOutlineLock } from "react-icons/ai"
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
                        <p className='text-gray-500 pt-3 tracking-wide'>A fun place to share your `such a hard whiff` and `what a flick`</p>
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
                <h3 className='text-white text-sm font-semibold text-center lg:text-left'> Other</h3>
                <div className='w-full flex flex-col p-2 items-center'>
                    <div className={`w-full space-x-6 h-8 flex flex-row justify-center lg:justify-start my-2 lg:my-1 cursor-pointer border-transparent border-b-4 p-0  text-gray-500 hover:border-btnBlue hover:text-white`}>
                        <AiOutlineBulb className="h-6 w-6" />
                        <p className='hidden lg:block'>FAQs</p>
                    </div>
                    <div className={`w-full space-x-6 h-8 flex flex-row justify-center lg:justify-start my-2 lg:my-1 cursor-pointer border-transparent border-b-4 p-0  text-gray-500 hover:border-btnBlue hover:text-white`}>
                        <AiOutlineInfoCircle className="h-6 w-6" />
                        <p className='hidden lg:block'>About</p>
                    </div>
                    <div className={`w-full space-x-6 h-8 flex flex-row justify-center lg:justify-start my-2 lg:my-1 cursor-pointer border-transparent border-b-4 p-0  text-gray-500 hover:border-btnBlue hover:text-white`}>
                        <BiSupport className="h-6 w-6" />
                        <p className='hidden lg:block'>Support</p>
                    </div>
                    <div className={`w-full space-x-6 h-8 flex flex-row justify-center lg:justify-start my-2 lg:my-1 cursor-pointer border-transparent border-b-4 p-0  text-gray-500 hover:border-btnBlue hover:text-white`}>
                        <AiOutlineLock className="h-6 w-6" />
                        <p className='hidden lg:block truncate'>Privacy Policy</p>
                    </div>
                </div>
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
