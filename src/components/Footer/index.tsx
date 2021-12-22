import React from 'react'

import { AiOutlineCompass, AiOutlineFolderOpen } from "react-icons/ai"
import { HiOutlineUserGroup } from "react-icons/hi"
import { MdOutlineVideoLibrary } from "react-icons/md"
import { IoGameControllerOutline } from "react-icons/io5"

const Footer = () => {
    return (
        <div className='fixed navbar bottom-0 h-12 w-full px-4 pt-2 z-50'>
            <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row space-x-2 mt-1 cursor-pointer  text-gray-600 hover:text-white">
                            <IoGameControllerOutline className="h-6 w-6" />
                        </div>
                        <div className="flex flex-row space-x-1 mt-1 cursor-pointer  text-gray-600 hover:text-white">
                            <AiOutlineCompass className="h-6 w-6" />
                        </div>
                        <div className="flex flex-row space-x-1 mt-1 cursor-pointer  text-gray-600 hover:text-white">
                            <HiOutlineUserGroup className="h-6 w-6" />
                        </div>
                        <div className="flex flex-row space-x-1 mt-1 cursor-pointer  text-gray-600 hover:text-white">
                            <MdOutlineVideoLibrary className="h-6 w-6" />
                        </div>
                        <div className="flex flex-row space-x-1 mt-1 cursor-pointer  text-gray-600 hover:text-white">
                            <AiOutlineFolderOpen className="h-6 w-6" />
                        </div>
                    </div>
        </div>
    )
}


export default Footer