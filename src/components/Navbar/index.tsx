import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Button from "../Button"

import { useSession, signOut } from "next-auth/react"

import { AiOutlineSearch } from "react-icons/ai"
import { IoNotificationsOutline } from "react-icons/io5"
import Modal from '../Modal'
import DropdownMenu from "../DropdownMenu"
import {useDropzone} from 'react-dropzone';
import { useRouter } from 'next/router'
import AuthModal from '../AuthModal'
import Menu from '../Menu'

interface Props {
    showNavbarMenu?: boolean
}

const Navbar = (props: Props) => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [ isOpen, setIsOpen ] = useState(false)

    const postOptions =[
        {
            name: 'View Profile',
            function: () => router.push(`/user/${session?.user?.name}`)
        },
        {
            name: 'Edit Profile',
            function: () => router.push(`/user/edit/${session?.user?.name}`)
        },
        {
            name: 'Sign Out',
            function: signOut
        },
    ]

    return (
        <header className="bg-cardBlue-100 h-12 w-full relative flex justify-center">
            <div className="max-w-7xl w-full flex flex-row justify-between pt-1.5 md:justify-between mx-4 xl:mx-0">
                <div className='flex items-center cursor-pointer'>
                    <Image src="/assets/whoops_logo.png" height={20} width={40} />
                    <p className='ml-2 text-btnBlue hidden sm:block fredoka-font text-2xl'>whoops</p>
                </div>
                {props.showNavbarMenu && 
                    <div className='hidden sm:block'>
                        <Menu showNavbarMenu={props.showNavbarMenu} />  
                    </div>
                }
                <div className="hidden md:block">
                    <form className="relative">    
                        <input placeholder='Search' className="input-color w-96 p-1.5 pl-10 border-none rounded-2xl caret-gray-500 text-gray-500 placeholder-gray-500" />
                        <AiOutlineSearch className="absolute top-1.5 left-2 h-6 w-6 text-gray-500" />
                    </form>
                </div>
                    {session ? (
                        <div className='flex flex-row mt-1 space-x-4'>
                            <IoNotificationsOutline className="h-6 w-6 text-gray-500 hover:text-white cursor-pointer"/>
                            <DropdownMenu options={postOptions}>
                                <div className="h-8 w-8 cursor-pointer bg-btnBlue rounded-full border-borderBlue border-2 -mt-0.5">
                                    <Image src={session.user?.profileImage || session.user?.image || "/assets/avatar.png" }alt="image" height="28" width="28" className="rounded-full" layout='responsive'/>
                                </div>
                            </DropdownMenu>
                        </div>  
                    ) : (
                        <div className='flex flex-row space-x-1 lg:space-x-4'>
                            <Button onClick={() => setIsOpen(true)}>
                                SignIn
                            </Button>
                        </div>
                    )}
            </div>
            
            <AuthModal isOpen={isOpen} setIsOpen={setIsOpen}/>
        </header>
    )
}

export default Navbar