import React from 'react'
import Image from 'next/image'

import Card from '../Card'

import { Post } from '../../utils/types/post'

interface Props {
    posts: Post[]
}

const Main = (props: Props) => {
    return (
        <div>
            <div className="stats w-full h-12 rounded-lg">
                <div className="flex flex-row space-x-6 md:space-x-3 lg:space-x-8 items-center px-2 pt-3 text-sm">
                    <div className="flex flex-row h-9 cursor-pointer border-transparent border-b-2 p-0  text-gray-600 hover:border-blue-600 hover:text-white">
                        <p className=''>Home</p>
                    </div>
                    <div className="flex flex-row h-9 cursor-pointer border-transparent border-b-2 p-0  text-gray-600 hover:border-blue-600 hover:text-white">
                        <p className=''>Clips</p>
                    </div>
                    <div className="flex flex-row h-9 cursor-pointer border-transparent border-b-2 p-0  text-gray-600 hover:border-blue-600 hover:text-white">
                        <p className=''>Communities</p>
                    </div>
                    <div className="flex flex-row h-9 cursor-pointer border-transparent border-b-2 p-0  text-gray-600 hover:border-blue-600 hover:text-white">
                        <p className=''>Friends</p>
                    </div>
                    <div className="flex flex-row h-9 cursor-pointer border-transparent border-b-2 p-0  text-gray-600 hover:border-blue-600 hover:text-white">
                        <p className=''>Following</p>
                    </div>
                </div>
            </div>

            <div className="h-12 w-full mt-4">
                <div className="flex flex-row space-x-4 items-center px-2 md:px-0">
                    <div className="flex flex-row border space-x-2 border-gray-800 rounded-3xl p-1.5 items-center px-2.5 text-gray-600 cursor-pointer hover:text-white hover:bg-blue-600">
                            <Image src="/assets/valorant.svg" width="24" height="24" alt="game" className="rounded-full" />
                        <p className="hidden md:block truncate ">Valorant</p>
                    </div>
                    <div className="flex flex-row border space-x-2 border-gray-800 rounded-3xl p-1.5 items-center px-2.5 text-gray-600 cursor-pointer hover:text-white hover:bg-blue-600">
                        <Image src="/assets/league.svg" width="24" height="24" alt="game" className="rounded-full" />
                        <p className="hidden md:block truncate ">League of Legends</p>
                    </div>
                    <div className="flex flex-row border space-x-2 border-gray-800 rounded-3xl p-1.5 items-center px-2.5 text-gray-600 cursor-pointer hover:text-white hover:bg-blue-600">
                        <Image src="/assets/rocket-league.svg" width="24" height="24" alt="game" className="rounded-full" />
                        <p className="hidden md:block truncate ">Rocket League</p>
                    </div>
                    <div className="flex flex-row border space-x-2 border-gray-800 rounded-3xl p-1.5 items-center px-2.5 text-gray-600 cursor-pointer hover:text-white hover:bg-blue-600">
                        <Image src="/assets/apex.svg" width="24" height="24" alt="game" className="rounded-full" />
                        <p className="hidden md:block truncate ">Apex Legends</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                {props.posts.map((data, key) => {
                    return ( 
                    <Card post={data} key={key} />
                    )
                })}
            </div>
        </div>
    )
}

export default Main