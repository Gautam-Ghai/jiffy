import React from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { signIn } from 'next-auth/react';
import { FaDiscord, FaTwitch } from 'react-icons/fa';

//Components
import Modal from '../Modal';

interface Props {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

 const AuthModal = (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen} title='SignIn' titleClassName="text-center">
        <button onClick={() => signIn('discord')} className='flex justify-center items-center w-full h-10 rounded-full py-1.5 px-2.5 text-lg text-white font-bold tracking-wide bg-discordBlue hover:-translate-y-0.5 hover:shadow-lg'>
            <FaDiscord className='h-6 w-8 mr-4'/>
            Discord
        </button>
        <button onClick={() => signIn('twitch')} className='flex justify-center items-center mt-4 w-full h-10 rounded-full py-1.5 px-2.5 text-lg text-white font-bold tracking-wide bg-twitchBlue hover:-translate-y-0.5 hover:shadow-lg'>
            <FaTwitch className='h-6 w-6 mr-4'/>
            Twitch
        </button>
    </Modal>
  )
}

export default AuthModal;