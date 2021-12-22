import React from 'react'
import Image from 'next/image'

import { AiOutlineCompass, AiOutlineSearch, AiOutlineFolderOpen, AiOutlineSetting } from "react-icons/ai"
import { HiOutlineUserGroup } from "react-icons/hi"
import { MdOutlineVideoLibrary } from "react-icons/md"
import { IoGameControllerOutline, IoNotificationsOutline } from "react-icons/io5"

const Navbar = () => {
    return (
        <header className="navbar h-12 w-full">
            <div className="flex flex-row justify-between pt-1.5 md:justify-evenly mx-4 md:mx-0">
                <h1 className="text-white font-bold text-xl pt-1 cursor-pointer">JIFFY</h1>
                <div className="hidden md:block">
                    <div className="flex flex-row space-x-6 items-center">
                        <div className="flex flex-row space-x-2 mt-1 h-10 cursor-pointer border-transparent border-b-4 p-0  text-gray-600 hover:border-blue-600 hover:text-white">
                            <IoGameControllerOutline className="h-6 w-6" />
                            <p className='hidden lg:block'>Home</p>
                        </div>
                        <div className="flex flex-row space-x-1 mt-1 h-10 cursor-pointer border-transparent border-b-4 p-0  text-gray-600 hover:border-blue-600 hover:text-white">
                            <AiOutlineCompass className="h-6 w-6" />
                            <p className='hidden lg:block'>Explore</p>
                        </div>
                        <div className="flex flex-row space-x-1 mt-1 h-10 cursor-pointer border-transparent border-b-4 p-0  text-gray-600 hover:border-blue-600 hover:text-white">
                            <HiOutlineUserGroup className="h-6 w-6" />
                            <p className='hidden lg:block'>Communities</p>
                        </div>
                        <div className="flex flex-row space-x-1 mt-1 h-10 cursor-pointer border-transparent border-b-4 p-0  text-gray-600 hover:border-blue-600 hover:text-white">
                            <MdOutlineVideoLibrary className="h-6 w-6" />
                            <p className='hidden lg:block'>Upload Clips</p>
                        </div>
                        <div className="flex flex-row space-x-1 mt-1 h-10 cursor-pointer border-transparent border-b-4 p-0  text-gray-600 hover:border-blue-600 hover:text-white">
                            <AiOutlineFolderOpen className="h-6 w-6" />
                            <p className='hidden lg:block'>Local Clips</p>
                        </div>
                    </div>
                </div>
                <div className="hidden md:block">
                    <form className="relative">    
                        <input placeholder='Search' className="input-color w-56 p-1.5 pl-10 border-none rounded-2xl caret-gray-600 text-gray-600 placeholder-gray-600" />
                        <AiOutlineSearch className="absolute top-1.5 left-2 h-6 w-6 text-gray-600" />
                    </form>
                </div>
                <div className='flex flex-row mt-1 space-x-4'>
                    <IoNotificationsOutline className="h-6 w-6 text-gray-600 hover:text-white cursor-pointer"/>
                    <AiOutlineSetting className="h-6 w-6 text-gray-600 hover:text-white cursor-pointer"/>
                    <div className="h-7 w-7 cursor-pointer">
                        <Image src="/assets/avatar.png" alt="image" height="100" width="100" className="rounded-full" layout='responsive'/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar