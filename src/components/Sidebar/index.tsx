import React, { useState } from 'react'
import { signIn } from 'next-auth/react'

import Button from '../Button'
import Modal from '../Modal'
import AuthModal from '../AuthModal'

export default function Sidebar() {
    const [ isOpen, setIsOpen ] = useState(false)

    return (
        <div className="bg-cardBlue-100 text-white rounded-md drop-shadow-lg h-auto w-72 lg:w-80 xl:w-96 pb-6 hidden lg:block">
            <div className='flex flex-col items-center'>
                <h1 className='text-gray-500 font-bold text-2xl px-6 py-4'><span className="text-white">Jiffy</span> is a community of 767,250 amazing gamers</h1>
                <p className='text-gray-500 px-6 pr-12 py-4'>We're a place where gamers share, connect and grow their audience.</p>
                <Button className='w-72 h-10 mr-8' onClick={() => setIsOpen(true)}>
                    Join
                </Button>
            </div>

            <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )   
}
