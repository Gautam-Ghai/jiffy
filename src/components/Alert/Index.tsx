import React, { useEffect, useState } from 'react'
import { BiError } from 'react-icons/bi'
import { Transition } from '@headlessui/react'

interface Props {
    alertText: string
}

export default function Alert(props: Props) {

    const [ isShowing, setIsShowing ] = useState(false)

    useEffect(() => { 
        if(props.alertText.length > 0) setIsShowing(true)
        else if(props.alertText.length == 0) setIsShowing(false)

        let timer1 = setTimeout(() => setIsShowing(false), 2000);
        return () => {
            clearTimeout(timer1);
        };
    }, [props.alertText])

  return (
    <Transition
        show={isShowing}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
    >
        <div className='absolute bottom-8 sm:bottom-4 left-0 right-0 mr-auto ml-auto w-96'>
            <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
                <span className="text-xl inline-block mr-5 align-middle">
                    <BiError />
                </span>
                <span className="inline-block align-middle mr-8">
                    {props.alertText}
                </span>
                <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" onClick={() => setIsShowing(false)}>
                    <span>×</span>
                </button>
            </div>
        </div>
      </Transition>
  )
}
