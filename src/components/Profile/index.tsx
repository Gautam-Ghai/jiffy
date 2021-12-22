import Image from 'next/image'
import React from 'react'

import { AiOutlineLink, AiOutlinePlus } from "react-icons/ai"
import { BiUserPlus } from "react-icons/bi"

const Profile = () => {
    return (
        <div className="profile text-white rounded-md drop-shadow-lg h-auto w-72 lg:w-80 xl-96 pb-6 hidden lg:block">
            <div className="w-full relative">
                <Image src="/assets/banner.jpg" alt='banner' height='64' width="384" className="rounded-t-md"/> 
                <div className="absolute left-4 top-9 lg:top-12">
                    <Image src="/assets/user.png" alt="user" height="68" width="68" className="rounded-full user-dp" />
                </div>
            </div>
            <div className="ml-28 pb-2">
                <h1 className="font-bold text-xl">Tenz</h1>
                <div className="flex flex-row space-x-0 items-center cursor-pointer text-gray-600 hover:text-white">
                    <AiOutlineLink className="h-3 w-3" />
                    <p className="text-xs">https://gautamghai.com</p>
                </div>
            </div>
            <div className="stats flex flex-row justify-evenly h-16 pt-4 my-4">
                <div className="flex flex-col items-center">
                    <p>231</p>
                    <p className='text-xs text-gray-600'>Clips</p>
                </div>
                <div className="flex flex-col items-center">
                    <p>3.4k</p>
                    <p className='text-xs text-gray-600'>Followers</p>
                </div>
                <div className="flex flex-col items-center">
                    <p>54</p>
                    <p className='text-xs text-gray-600'>Following</p>
                </div>
            </div>
            <div className="flex flex-row justify-evenly mb-4">
                    <button className="button flex flex-row justify-evenly items-center rounded-2xl h-8 w-28 px-4 py-2 text-xs drop-shadow-lg">
                        <BiUserPlus className="h-4 w-4"/>
                        Add friend
                    </button>
                    <button className="flex flex-row justify-evenly items-center border-2 border-gray-500 rounded-2xl h-8 w-20 px-2 py-2 text-xs">
                        <AiOutlinePlus />
                        Follow
                    </button>
            </div>
            <div className="px-6">
                <h1 className="uppercase my-2 text-sm">
                    About
                </h1>
                <p className="text-gray-600 text-xs my-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo, metus ac porttitor convallis, magna urna molestie est, ut luctus justo arcu nec odio. Maecenas tempor iaculis condimentum. Etiam augue lacus, consequat ac eleifend cursus, aliquet in enim. Nulla est ante, dignissim tincidunt sollicitudin ac, auctor quis libero.
                </p>
            </div>
            <div className='flex flex-col px-6 text-xs'>
                <div className='flex flex-row justify-between border-b-2 border-gray-800 py-2'>
                    <p className="text-gray-600">Views</p>
                    <p>1.1k</p>
                </div>
                <div className='flex flex-row justify-between py-2'>
                    <p className="text-gray-600">Joined</p>
                    <p>August 11,2020</p>
                </div>
            </div>
        </div>
    )
}

export default Profile