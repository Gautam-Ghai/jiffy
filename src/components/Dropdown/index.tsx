import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react' 
import { AiOutlineDown, AiOutlineUp, AiOutlineClose } from "react-icons/ai"

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
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOptions = searchTerm
    ? props.data.filter((item) => item.name.toLowerCase().includes(searchTerm))
    : props.data;

  return (
    <Listbox value={props.selected} onChange={props.setSelected}>
      {({ open }) => (
        <div className='flex flex-row space-x-2 my-2 w-96'>
          <Listbox.Label className="pt-2 block text-sm font-medium text-gray-500">Game</Listbox.Label>
          <div className="relative w-full">
            <Listbox.Button className="relative w-full border-gray-500 border border-solid rounded-md shadow-sm px-3 py-2 text-left cursor-pointer  sm:text-sm bg-bgBlue-200">
              <span className="flex items-center">
                <img src={props.selected.logoImage} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                <span className="ml-3 block truncate text-gray-500">{props.selected.name}</span>
                <span className='absolute right-4 text-gray-500 h-4'>
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
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-bgBlue-200 shadow-lg max-h-56 rounded-md py-1 text-base overflow-auto sm:text-sm">
                <div className="relative">
                  <div className="sticky top-0 z-20  px-1">
                    <div className="mt-1 block items-center">
                      <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder='search'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full mb-2 border-gray-500 border border-solid bg-bgBlue-200 px-3 py-2 rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500 focus:text-white"
                      />
                      <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5 ">
                        {searchTerm && <AiOutlineClose className='cursor-pointer text-white h-6 w-6' onClick={() => setSearchTerm('')}/>}
                      </div>
                    </div>
                  </div>

                  {filteredOptions.map((data) => (
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
                </div>
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}