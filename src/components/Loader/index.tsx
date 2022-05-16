import { Fragment, ReactElement, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import Button from "../Button"
import ClipLoader from 'react-spinners/ClipLoader'


interface Props {
    active: boolean
    spinner?: ReactElement
    text?: string
}

export default function Loader(props: Props) {
    const [ isOpen, setIsOpen ] = useState(false)

  useEffect(() => {

    if(props.active) setIsOpen(true)
    else setIsOpen(false)

  }, [props.active])

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0" onClose={() => null}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block text-center overflow-hidden transform transition-all align-middle w-full h-auto">
                <div>
                    {props.spinner ? props.spinner : <ClipLoader color='#13192a' size={50}/>}
                    <p className='text-white text-xl'>{props.text}</p>
                </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}