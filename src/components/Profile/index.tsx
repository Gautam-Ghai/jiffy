import Image from 'next/image'
import React from 'react'
import dayjs from 'dayjs'
import Button from '../Button'

import { AiOutlineLink, AiOutlinePlus } from "react-icons/ai"
import { BiUserPlus } from "react-icons/bi"
import { User } from '../../utils/types/user'
interface Props {
    user: User
}

const Profile = (props: Props) => {
    return (
        <div className="bg-card text-white rounded-md drop-shadow-lg h-auto w-72 lg:w-80 xl:w-96 pb-6 hidden lg:block">
            <div className="w-full relative">
                <Image src="/assets/banner.jpg" alt='banner' height='64' width="384" className="rounded-t-md"/> 
                <div className="absolute left-4 top-9 lg:top-12">
                    <Image src="/assets/user.png" alt="user" height="68" width="68" className="rounded-full user-dp" />
                </div>
            </div>
            <div className="ml-28 pb-2">
                <h1 className="font-bold text-xl">{props.user.name}</h1>
                {props.user.website &&
                    <div className="flex flex-row space-x-0 items-center cursor-pointer text-gray-600 hover:text-white">
                        <AiOutlineLink className="h-3 w-3" />
                        <p className="text-xs">{props.user.website}</p>
                    </div>
                }
            </div>
            <div className="bg-card-2 flex flex-row justify-evenly h-16 pt-4 my-4">
                <div className="flex flex-col items-center">
                    <p>{props.user.postsCount}</p>
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
                <Button className="h-8 w-28 px-4">
                    <div className="flex flex-row justify-evenly items-center">
                        <BiUserPlus className="h-4 w-4"/>
                        Add friend
                    </div>
                </Button>
                <Button className="h-8 w-20" variant={true}>
                    <div className="flex flex-row justify-evenly items-center px-2">
                        <AiOutlinePlus />
                        Follow
                    </div>
                </Button>
            </div>
            <div className="px-6">
                <h1 className="uppercase my-2 text-sm">
                    About
                </h1>
                <p className="text-gray-600 text-xs my-2">
                    {props.user.description}
                </p>
            </div>
            <div className='flex flex-col px-6 text-xs'>
                <div className='flex flex-row justify-between border-b-2 border-gray-800 py-2'>
                    <p className="text-gray-600">Views</p>
                    <p>{props.user.viewsCount}</p>
                </div>
                <div className='flex flex-row justify-between py-2'>
                    <p className="text-gray-600">Joined</p>
                    <p>{dayjs(props.user.createdAt).format('MMMM D, YYYY')}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile