import React from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { signIn } from 'next-auth/react';

//Components
import Modal from '../Modal';

interface Props {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

 const AuthModal = (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen} title='SignIn' titleClassName="text-center">
        <button onClick={() => signIn('discord')} className='w-full h-10 rounded-2xl py-1.5 px-2.5 text-lg text-white font-bold tracking-wide bg-discordBlue'>
            Discord
        </button>
    </Modal>
  )
}

export default AuthModal;