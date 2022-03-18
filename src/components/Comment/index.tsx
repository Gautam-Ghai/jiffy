import React from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import Link from 'next/link'

var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime)

interface Props {
    comment?: string,
    image?: string,
    profileImage?: string,
    username?: string,
    date?: string,
    className?: string
}

const Comment = (props: Props) => {
    return (
        <div className='mt-2 flex flex-row items-start text-white space-x-2 mx-2 h-auto'>
            <div className="button h-10 w-10 border-2 border-gray-800 rounded-full min-w-max">    
                <Image src={props.profileImage || props.image || '/assets/user.png'} height="40" width="40" className="rounded-full" alt="user" />
            </div>
            <span className='flex flex-col min-w-max'>
                <Link href={`/user/${props.username}`}>
                    <p className='text-sm cursor-pointer'>{props.username}</p>
                </Link>
                <p className='text-gray-500 text-xs'>{dayjs().to(dayjs(props.date))}</p>
            </span>
            <div className={`mb-2 ${ props.className || "max-w-xs" }`}>  
                <p className='text-sm break-words'>{props.comment}</p>
            </div>
        </div>
    )
}

export default Comment