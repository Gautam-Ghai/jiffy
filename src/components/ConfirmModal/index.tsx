import React from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { signIn } from 'next-auth/react';

//Components
import Modal from '../Modal';
import Button from '../Button';

interface Props {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    children: string
    onClick: () => void
}

const ConfirmModal = (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen} title='' titleClassName="text-center" footer={<Button className='mr-4' onClick={props.onClick}>Confirm</Button>}>
      <div className="text-white">
        {props.children}
      </div>
    </Modal>
  )
}

export default ConfirmModal;