import Image from 'next/image'
import React from 'react'
import Video from '../Video'
import { AiOutlineMore, AiOutlineLike, AiOutlineMessage } from "react-icons/ai"
import { IoPaperPlaneOutline, IoBookmarkOutline } from "react-icons/io5"
import dayjs from 'dayjs'
import { Post } from '../../utils/types/post'
import DropdownMenu from '../DropdownMenu'

var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime)

interface Props {
    post: Post,
    loggedinUser?: {
        name: string
        email: string
        image: string
    },
    refreshData?: () => void
}

const Card = (props: Props) => {

    const handleEdit = () => {

    }

    const handleDelete = async(id: number) => {

        if(props.post.author?.name === props.loggedinUser?.name){ 
            fetch(`/api/post/${id}`, {method: 'DELETE'})
            .then(res =>{
                props.refreshData && props.refreshData();
            }
            )
        }
    }

    const postOptions =[
        {
            name: 'Edit',
            function: handleEdit
        },
        {
            name: 'Delete',
            function: handleDelete
        },
    ]
    return (
        <div className="card py-4">
            <div className="flex flex-row my-2 items-center relative">
                <div className="button h-10 w-10 border-2 border-gray-800 rounded-full">    
                    <Image src="/assets/user.png" height="40" width="40" className="rounded-full" alt="user" />
                </div>
                <div className="h-10 w-10 border-2 border-gray-800 rounded-full -ml-3 z-10">    
                    <Image src="/assets/game.png" height="40" width="40" className="rounded-full" alt="game" />
                </div>
                <div className='flex flex-col text-white ml-4'>
                    <p className='text-sm cursor-pointer'>{props.post.author?.name} <span className="text-gray-600 cursor-default">in</span> Valorant</p>
                    <p className="text-gray-600 text-xs">{dayjs().to(dayjs(props.post.createdAt))}</p>
                </div>
                {props.post.author?.name === props.loggedinUser?.name && 
                    <DropdownMenu className='absolute right-0 mr-2' options={postOptions} id={props.post.id}>
                        <AiOutlineMore className="text-gray-600 cursor-pointer"/>
                    </DropdownMenu>
                }
            </div>
            <div className='card-body'>  
                <Video src={props.post.video} />
                <div className="my-2 mx-2 lg:mx-6">
                    <h1 className='text-white font-semibold text-lg'>{props.post.title}</h1>
                    <div className='flex flex-row justify-between text-sm py-2'>
                        <div className="flex flex-row space-x-2 text-white items-center">
                            <AiOutlineLike className="text-blue-500 h-4 w-4"/>
                            <p>{props.post.likesCount}</p>
                        </div>
                        <div className="flex flex-row space-x-4 text-white items-center">
                            <div className="flex flex-row space-x-2 text-white items-center">
                                <p>{props.post.viewsCount}</p>
                                <p>Views</p>
                            </div>
                            <div className="flex flex-row space-x-2 text-white items-center">
                                <p>{props.post.commentsCount}</p>
                                <p>Comments</p>
                            </div>
                            <div className="flex flex-row space-x-2 text-white items-center">
                                <p>{props.post.sharesCount}</p>
                                <p>Shares</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer p-4">
                    <div className="flex flex-row justify-between lg:justify-evenly text-white text-sm">
                        <div className="flex flex-row items-center space-x-2 cursor-pointer">
                            <AiOutlineLike className="h-4 w-4"/>
                            <p>Like</p>
                        </div>
                        <div className="flex flex-row items-center space-x-2 cursor-pointer">
                            <AiOutlineMessage className="h-4 w-4"/>
                            <p>Comment</p>
                        </div>
                        <div className="flex flex-row items-center space-x-2 cursor-pointer">
                            <IoPaperPlaneOutline className="h-4 w-4"/>
                            <p>Share</p>
                        </div>
                        <div className="flex flex-row items-center space-x-2 cursor-pointer">
                            <IoBookmarkOutline className="h-4 w-4"/>
                            <p>Save</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card