import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import Card from '../Card'

import { Post } from '../../utils/types/post'

interface Props {
    posts: Post[],
    loggedinUser?: {
        name: string
        email: string
        image: string,
    }
}

const options = [
    {
        id: 0,
        name: 'Home'
    },
    {
        id: 1,
        name: 'Liked'
    },
    {
        id: 2,
        name: 'Comments'
    },
    {
        id: 3,
        name: 'Saved'
    }
]

const Main = (props: Props) => {
    const [ option, setOption ] = useState(0)
    const [ posts, setPosts ] = useState(props.posts)

    useEffect(() =>{
        
        if(props.loggedinUser){
            switch(option){
                case 0: setPosts([])
                        fetch(`/api/allPosts`)
                        .then(async(res) => {
                            let json = await res.json();
                            return json
                        })
                        .then(result =>{
                            const allPosts = JSON.parse(result.data)
                            setPosts(allPosts)
                        });
                        break;

                case 1: setPosts([])
                        fetch(`/api/likedPosts/${props.loggedinUser?.name}`)
                        .then(async(res) => {
                            let json = await res.json();
                            return json
                        })
                        .then(result =>{
                            const likedPosts = JSON.parse(result.data)
                            setPosts(likedPosts.likedPosts)
                        });
                        break;

                case 2: setPosts([])
                        fetch(`/api/postsWithComment/${props.loggedinUser?.name}`)
                        .then(async(res) => {
                            let json = await res.json();
                            return json
                        })
                        .then(result =>{
                            const comments = JSON.parse(result.data)
                            setPosts(comments)
                        });
                        break;

                case 3: setPosts([])
                        fetch(`/api/savedPosts/${props.loggedinUser?.name}`)
                        .then(async(res) => {
                            let json = await res.json();
                            return json
                        })
                        .then(result =>{
                            const savedPosts = JSON.parse(result.data)
                            setPosts(savedPosts.savedPosts)
                            console.log('saved posts',savedPosts.savedPosts)
                        });
                        break;
                        
            }
        }
    }, [option])

    const handleDelete = async(id: number) => {
        const post = posts.find(data=> data.id === id)
        if(post?.author?.name === props.loggedinUser?.name){ 
            fetch(`/api/post/${id}`, {method: 'DELETE'})
            .then(res =>{
                const newPosts = posts.filter(data => data.id != id)
                setPosts(newPosts)
            }
            )
        }
    }

    return (
        <div className="flex-grow">
            {props.loggedinUser && 
                <div className="bg-card-2 w-full h-12 rounded-lg">
                    <div className="flex flex-row space-x-6 md:space-x-3 lg:space-x-8 items-center px-2 pt-3 text-sm">
                        {options.map((data, key) => {
                            const active = key === option ? true : false
                            return (
                                <div className={`flex flex-row h-9 cursor-pointer border-transparent border-b-2 p-0 hover:border-blue-600 hover:text-white ${active ? 'border-blue-600 text-white' : 'text-gray-500'}`} key={key}>
                                    <p className='' onClick={() => setOption(key)}>{data.name}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }

            <div className="h-12 w-full mt-4">
                <div className="flex flex-row space-x-4 items-center px-2 md:px-0">
                    <div className="flex flex-row border space-x-2 border-gray-800 rounded-3xl p-1.5 items-center px-2.5 text-gray-500 cursor-pointer hover:text-white hover:bg-blue-600">
                            <Image src="/assets/valorant.svg" width="24" height="24" alt="game" className="rounded-full" />
                        <p className="hidden md:block truncate ">Valorant</p>
                    </div>
                    <div className="flex flex-row border space-x-2 border-gray-800 rounded-3xl p-1.5 items-center px-2.5 text-gray-500 cursor-pointer hover:text-white hover:bg-blue-600">
                        <Image src="/assets/league.svg" width="24" height="24" alt="game" className="rounded-full" />
                        <p className="hidden md:block truncate ">League of Legends</p>
                    </div>
                    <div className="flex flex-row border space-x-2 border-gray-800 rounded-3xl p-1.5 items-center px-2.5 text-gray-500 cursor-pointer hover:text-white hover:bg-blue-600">
                        <Image src="/assets/rocket-league.svg" width="24" height="24" alt="game" className="rounded-full" />
                        <p className="hidden md:block truncate ">Rocket League</p>
                    </div>
                    <div className="flex flex-row border space-x-2 border-gray-800 rounded-3xl p-1.5 items-center px-2.5 text-gray-500 cursor-pointer hover:text-white hover:bg-blue-600">
                        <Image src="/assets/apex.svg" width="24" height="24" alt="game" className="rounded-full" />
                        <p className="hidden md:block truncate ">Apex Legends</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-left xl:flex-row xl:space-x-6 xl:flex-wrap items-center">
                {posts.map((data, key) => {
                    return ( 
                    <Card post={data} key={key} loggedinUser={props.loggedinUser} handleDelete={handleDelete} option={option} />
                    )
                })}
            </div>
        </div>
    )
}

export default Main