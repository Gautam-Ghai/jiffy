import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'

interface Props {
  children: any,
  className?: any,
  options: {
    name: string,
    function: (() => void) | ((id: string | undefined) => void)
  }[],
  id?: number
}

export default function DropdownMenu(props: Props) {
  return (
    <div className={props.className}>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center">
            {props.children}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-card divide-y divide-gray-800 rounded-md shadow-lg z-50">
              {props.options.map((opt, key) => 
                <Menu.Item 
                  key={key}
                >
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-blue-600 text-white' : 'text-gray-500'
                      } text-center w-full px-2 py-2 text-sm rounded-md`}
                      onClick={props.id ? () => opt.function(props.id) : () => opt.function}
                    >
                      {opt.name}
                    </button>
                  )}
                </Menu.Item>
              )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}