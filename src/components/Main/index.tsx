import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import Card from '../Card'

import { Post } from '../../utils/types/post'
import { Session } from '@/utils/types/session'
import ConfirmModal from '../ConfirmModal'
import Loader from '../Loader'

interface Props {
    posts: Post[],
    session?: Session,
    showMenu?: boolean,
    games: {
        id: number,
        name: string,
        logoImage: string
    }[]
}

const options = [
    {
        id: 0,
        name: 'Latest'
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
    
    const [ loading, setLoading ] = useState(false)
    const [ option, setOption ] = useState(null)
    const [ posts, setPosts ] = useState(props.posts)

    useEffect(() =>{
        
        if(props.session){
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
                        fetch(`/api/likedPosts/${props.session?.user.name}`)
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
                        fetch(`/api/postsWithComment/${props.session?.user.name}`)
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
                        fetch(`/api/savedPosts/${props.session?.user.name}`)
                        .then(async(res) => {
                            let json = await res.json();
                            return json
                        })
                        .then(result =>{
                            const savedPosts = JSON.parse(result.data)
                            setPosts(savedPosts.savedPosts)
                        });
                        break;
                        
            }
        }
    }, [option])

    const handleDelete = async(id: number) => {
        setLoading(true)
        const post = posts.find(data=> data.id === id)
        if(post?.author?.username === props.session?.user.name){ 
            fetch(`/api/post/${id}`, {method: 'DELETE'})
            .then(res =>{
                const newPosts = posts.filter(data => data.id != id)
                setPosts(newPosts)
                setLoading(false)
            }
            )
            .catch(err =>{
                console.log(err)
                setLoading(false)
            })
        }
    }

    return (
        <div className="">
            {props.session && props.showMenu &&
                <div className="bg-bgBlue-200 h-12 rounded-lg">
                    <div className="flex flex-row space-x-6 md:space-x-3 lg:space-x-8 items-center px-2 pt-3 text-sm">
                        {options.map((data, key) => {
                            const active = key === option ? true : false
                            return (
                                <div className={`flex flex-row h-9 cursor-pointer border-transparent border-b-2 p-0 hover:border-btnBlue hover:text-white ${active ? 'border-btnBlue text-white' : 'text-gray-500'}`} key={key}>
                                    <p className='' onClick={() => setOption(key)}>{data.name}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }

            <div className="h-12 mt-4 mb-2">
                <div className="flex flex-row overflow-x-auto space-x-4 justify-start px-2 pb-2 md:px-0 max-w-768">
                    {props.games &&
                        props.games.map((game)=> {
                            return(
                            <div className="flex flex-row border space-x-2 border-gray-800 rounded-3xl p-1.5 items-center px-2.5 text-gray-500 cursor-pointer hover:text-white hover:bg-btnBlue" key={`game-${game.id}`}>
                                <Image src={game.logoImage} width="24" height="24" alt="game" className="rounded-full" />
                                <p className="hidden md:block truncate ">{game.name}</p>
                            </div>)
                        })
                    }
                </div>
            </div>
            <div className="flex flex-col justify-left items-center">
                {posts.map((data, key) => {
                    return ( 
                    <Card post={data} key={key} session={props.session} handleDelete={handleDelete} option={option} />
                    )
                })}
            </div>
            
            <Loader 
                active={loading}
                text='deleting...'
            />
        </div>
    )
}

export default Main