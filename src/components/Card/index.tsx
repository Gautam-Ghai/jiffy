import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Video from '../Video'
import { AiOutlineMore, AiOutlineLike, AiOutlineMessage, AiOutlineDislike } from "react-icons/ai"
import { IoPaperPlaneOutline, IoBookmarkOutline, IoBookmark } from "react-icons/io5"
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
    handleDelete: (id: number) => void,
    option: number
}

const Card = (props: Props) => {
    const [ isLiked, setIsLiked ] = useState(props.option === 1 ? true : props.post.likedBy?.some(user => user.name === props.loggedinUser?.name))
    const [ likes, setLikes ] = useState(props.post._count?.likedBy || 0)
    const [ isSaved, setIsSaved ] = useState(props.option === 3 ? true : props.post.savedBy?.some(user => user.name === props.loggedinUser?.name))

    const handleEdit = () => {

    }

    const handleLike = async(id: number) => {

        if(props.loggedinUser){ 
            fetch(`/api/like/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'name': props.loggedinUser.name
                })
            })
            .then(res =>{
                let abc: number = likes + 1
                setIsLiked(true)
                setLikes(abc)
            }
            )
        }
    }

    const handleDislike = async(id: number) => {

        if(props.loggedinUser){ 
            fetch(`/api/like/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'name': props.loggedinUser.name
                })
            })
            .then(res =>{
                let abc: number = likes - 1
                setIsLiked(false)
                setLikes(abc)
            }
            )
        }   
    }

    const handleSave = async(id: number) => {
        if(props.loggedinUser){ 
            fetch(`/api/save/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'name': props.loggedinUser.name
                })
            })
            .then(res =>{
                setIsSaved(true)
            }
            )
        }
    }

    const handleUnSave = async(id: number) => {

        if(props.loggedinUser){ 
            fetch(`/api/save/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'name': props.loggedinUser.name
                })
            })
            .then(res =>{
                setIsSaved(false)
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
            function: props.handleDelete
        },
    ]

    return (
        <div className="card py-4">
            <div className="flex flex-row my-2 items-center relative">
                <div className="button h-10 w-10 border-2 border-gray-800 rounded-full">    
                    <Image src={`${props.post.author?.profileImage ? "/assets/user.png" : props.post.author?.image}`} height="40" width="40" className="rounded-full" alt="user" />
                </div>
                <div className="h-10 w-10 border-2 border-gray-800 rounded-full -ml-3 z-10">    
                    <Image src="/assets/game.png" height="40" width="40" className="rounded-full" alt="game" />
                </div>
                <div className='flex flex-col text-white ml-4'>
                    <Link href={`/user/${props.post.author?.name}`}>
                        <p className='text-sm cursor-pointer'><span className='border-b border-white border-opacity-0 hover:border-opacity-100'>{props.post.author?.name}</span><span className="text-gray-500 cursor-default"> in </span>Valorant</p>
                    </Link>
                    <p className="text-gray-500 text-xs">{dayjs().to(dayjs(props.post.createdAt))}</p>
                </div>
                {props.post.author?.name === props.loggedinUser?.name && 
                    <DropdownMenu className='absolute right-0 mr-2' options={postOptions} id={props.post.id}>
                        <AiOutlineMore className="text-gray-500 cursor-pointer"/>
                    </DropdownMenu>
                }
            </div>
            <div className='card-body'>  
                <Video src={props.post.url} />
                <div className="my-2 mx-2 lg:mx-6">
                    <h1 className='text-white font-semibold text-lg'>{props.post.title}</h1>
                    <div className='flex flex-row justify-between text-sm py-2'>
                        <div className="flex flex-row space-x-2 text-white items-center">
                            <AiOutlineLike className="text-blue-500 h-4 w-4"/>
                            <p>{likes}</p>
                        </div>
                        <div className="flex flex-row space-x-4 text-white items-center">
                            <div className="flex flex-row space-x-2 text-white items-center">
                                <p>{props.post.viewsCount}</p>
                                <p>Views</p>
                            </div>
                            <div className="flex flex-row space-x-2 text-white items-center">
                                <p>{props.post._count?.comments || 0}</p>
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
                        {props.loggedinUser ? 
                            isLiked ? 
                                <div className="flex flex-row items-center space-x-2 cursor-pointer" onClick={() => handleDislike(props.post.id)}>
                                    <AiOutlineDislike className="h-4 w-4" />
                                    <p>Dislike</p>
                                </div>
                                :
                                
                                <div className="flex flex-row items-center space-x-2 cursor-pointer" onClick={() => handleLike(props.post.id)}>
                                    <AiOutlineLike className="h-4 w-4"/>
                                    <p>Like</p>
                                </div>
                        : 
                            <div className="flex flex-row items-center space-x-2 cursor-pointer">
                                <AiOutlineLike className="h-4 w-4"/>
                                <p>Like</p>
                            </div>
                        }
                        
                        <div className="flex flex-row items-center space-x-2 cursor-pointer">
                            <AiOutlineMessage className="h-4 w-4"/>
                            <p>Comment</p>
                        </div>
                        <div className="flex flex-row items-center space-x-2 cursor-pointer">
                            <IoPaperPlaneOutline className="h-4 w-4"/>
                            <p>Share</p>
                        </div>
                        {props.loggedinUser ? 
                            isSaved ? 
                                <div className="flex flex-row items-center space-x-2 cursor-pointer" onClick={() => handleUnSave(props.post.id)}>
                                    <IoBookmark className="h-4 w-4" />
                                    <p>Unsave</p>
                                </div>
                                :
                                <div className="flex flex-row items-center space-x-2 cursor-pointer" onClick={() => handleSave(props.post.id)}>
                                    <IoBookmarkOutline className="h-4 w-4" />
                                    <p>Save</p>
                                </div>
                        : 
                                <div className="flex flex-row items-center space-x-2 cursor-pointer">
                                    <IoBookmarkOutline className="h-4 w-4"/>
                                    <p>Save</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card