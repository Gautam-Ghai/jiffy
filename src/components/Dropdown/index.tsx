import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react' 
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"

interface Props {
  data: {
    id: number,
    name: string,
    logoImage: string
  }[],
  setSelected: any
  selected: any
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown(props: Props) {

  return (
    <Listbox value={props.selected} onChange={props.setSelected}>
      {({ open }) => (
        <div className='flex flex-row space-x-2 mt-2'>
          <Listbox.Label className="pt-2 block text-sm font-medium text-gray-500">Game</Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative w-full bg-card-2 border-none rounded-md shadow-sm px-3 py-2 text-left cursor-pointer  sm:text-sm bg-bgBlue-200">
              <span className="flex items-center">
                <img src={props.selected.logoImage} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                <span className="ml-3 block truncate text-gray-500">{props.selected.name}</span>
                <span className='ml-4 text-gray-500 h-4'>
                  {open ? <AiOutlineUp /> : <AiOutlineDown />}
                </span>
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-card-2 shadow-lg max-h-56 rounded-md py-1 text-base overflow-auto sm:text-sm">
                {props.data.map((data) => (
                  <Listbox.Option
                    key={data.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-blue-600' : 'text-gray-500',
                        'cursor-pointer select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={data}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img src={data.logoImage} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {data.name}
                          </span>
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}