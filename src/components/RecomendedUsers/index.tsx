import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'

//Components
import Button from '../Button'

//Utils
import { User } from '@/utils/types/user'
import { Session } from '@/utils/types/session'

var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime)

interface Props{
    recomendedUsers: User[]
    session: Session
}

const RecomendedUsers = (props: Props) => {
  return (
    <div className='bg-cardBlue-100 rounded-md drop-shadow-lg h-auto w-72 p-4 hidden xl:block'>
        <h1 className='text-gray-500 font-bold text-2xl'>New Users</h1>
        {props.recomendedUsers && 
            props.recomendedUsers.map((recomendedUser, index) => {
                return(
                    <div className='pt-4 flex flex-row justify-between text-white h-auto' key={`recomendedUser-${index}`}>
                        <div className="flex">
                            <div className="bg-btnBlue h-10 w-10 border-2 border-gray-800 rounded-full min-w-max">    
                                <Image src={recomendedUser.profileImage || recomendedUser.user.image || '/assets/user.png'} height="36" width="36" className="rounded-full" alt="user" />
                            </div>
                            <span className='flex flex-col min-w-max ml-4'>
                                <Link href={`/user/${recomendedUser.username}`}>
                                    <p className='text-sm cursor-pointer border-b border-white border-opacity-0 hover:border-opacity-100'>{recomendedUser.username}</p>
                                </Link>
                                <p 
                                className='text-gray-500 text-xs'>joined {dayjs().to(dayjs(recomendedUser.createdAt))}</p>
                            </span>
                        </div>
                        {props.session && 
                            <Button className="text-sm font-normal mt-1">
                                Follow
                            </Button>
                        }
                    </div>
                )
            })
        }
    </div>
  )
}

export default RecomendedUsers