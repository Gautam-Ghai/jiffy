import Image from 'next/image'
import React from 'react'
import dayjs from 'dayjs'
import Button from '../Button'
import Link from 'next/link'

import { AiOutlineLink, AiOutlinePlus } from "react-icons/ai"
import { BiUserPlus } from "react-icons/bi"
import { User } from '../../utils/types/user'
import { Session } from '@/utils/types/session'
interface Props {
    user: User,
    session?: Session
}

const Profile = (props: Props) => {
    return (
        <div className={`bg-cardBlue-100 text-white rounded-md drop-shadow-lg h-auto pb-6 w-full md:w-96`}>
            <div className="w-full relative">
                <Image src={`${props.user.bannerImage || "/assets/default_banner_image.png"}`} alt='banner' height={'126'} width={'380'} className="rounded-t-md" layout='responsive'/> 
                <div className={`absolute left-4 top-3/4 rounded-full border-4 border-solid border-borderBlue bg-btnBlue h-20 w-20`}>
                    <Image src={`${props.user.profileImage || props.user.user.image || "/assets/user.png"}`} alt="user" height="80" width="80" className='rounded-full'/>
                </div>
            </div>
            <div className="ml-28 pb-2">
                <Link href={`/user/${props.user.username}`}>
                    <h1 className="font-bold text-xl cursor-pointer ">{props.user.username}</h1>
                </Link>
                {props.user.website &&
                    <div className="flex flex-row space-x-0 items-center cursor-pointer text-gray-500 hover:text-white">
                        <AiOutlineLink className="h-4 w-4 mr-0.5" />
                        <a className="text-sm" href={props.user.website} target="_blank">{props.user.website}</a>
                    </div>
                }
            </div>
            <div className="bg-bgBlue-200 flex flex-row justify-evenly h-16 pt-2.5 my-4 mt-6">
                <div className="flex flex-col items-center">
                    <p>{props.user._count?.posts ? props.user._count.posts : 0}</p>
                    <p className='text-xs text-gray-500'>Clips</p>
                </div>
                <div className="flex flex-col items-center">
                    <p>3.4k</p>
                    <p className='text-xs text-gray-500'>Followers</p>
                </div>
                <div className="flex flex-col items-center">
                    <p>54</p>
                    <p className='text-xs text-gray-500'>Following</p>
                </div>
            </div>
            {props.session &&
                <div className="flex flex-row justify-evenly mb-4">
                    <Button>
                        <div className="flex flex-row justify-between items-center">
                            <BiUserPlus className="h-4 w-4 mr-1"/>
                            Add friend
                        </div>
                    </Button>
                    <Button variant={true}>
                        <div className="flex flex-row justify-between items-center px-2">
                            <AiOutlinePlus className="h-4 w-4 mr-1"/>
                            Follow
                        </div>
                    </Button>
                </div>
            }
            {props.user.description && 
                <div className="px-6">
                    <h1 className="uppercase mt-2 mb-1 text-xs font-medium">
                        About
                    </h1>
                    <p className="text-gray-500 text-sm mb-2 w-80 break-words">
                        {props.user.description}
                    </p>
                </div>
            }
            <div className='flex flex-col px-6 text-xs'>
                <div className='flex flex-row justify-between border-b-2 border-gray-800 py-2'>
                    <p className="text-gray-500">Views</p>
                    <p>{props.user.viewsCount || 0}</p>
                </div>
                <div className='flex flex-row justify-between py-2'>
                    <p className="text-gray-500">Joined</p>
                    <p>{dayjs(props.user.createdAt).format('MMMM D, YYYY')}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile