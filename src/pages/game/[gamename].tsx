import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { prisma } from "../../../lib/prisma";
import Profile from '@/components/Profile'
import Main from '@/components/Main'
import { Post } from '@/utils/types/post'
import { Game } from '@/utils/types/game'
import { Session } from "@/utils/types/session";
import Layout from '@/components/Layout';
import Image from "next/image"
import { getSession } from "next-auth/react"
import Card from '@/components/Card'

interface Props {
    game: any[],
    session: Session
}

const Game = (props: Props) => {
    const [posts, setPosts] = useState(props.game.posts || null)

    const handleDelete = async(id: number) => {
        const post = props.game.posts.find(data=> data.id === id)
        if(post?.author?.name === props.session?.user.name){ 
            fetch(`/api/post/${id}`, {method: 'DELETE'})
            .then(res =>{
                const newPosts = posts.filter(data => data.id != id)
                setPosts(newPosts)
            }
            )
        }
    }
  return (
    <Layout>
        <div className='container max-w-1200'>
            <div className='relative'>
                <Image src={props.game.coverImage} width={1980} height={1080} />
                <div className='absolute top-3/4 md:top-2/3 left-4 sm:left-10 w-32 sm:w-auto'>
                    <Image src={props.game.profileImage} width={216} height={384} />
                </div>
            </div>
            <div className='ml-40 sm:ml-72 mt-4 text-white'>
                    <h1 className='text-3xl sm:text-5xl'>{props.game.name}</h1>
                    <h2 className='text-base sm:text-xl'><span className="text-gray-500">Genre: </span>{props.game.genre}</h2>
                    <h2 className='text-base sm:text-xl'><span className="text-gray-500">Date released: </span>{props.game.releaseDate}</h2>
                    <h2 className='text-base sm:text-xl'><span className="text-gray-500">Total Posts: </span>{props.game._count.posts}</h2>
            </div>
            <div className='mb-10 sm:mb-40 md:mb-16 lg:mb-10' />
            {posts ? 
                <div className="flex flex-col justify-left items-center">
                    {posts.map((data, key) => {
                        return ( 
                        <Card post={data} key={key} session={props.session} handleDelete={handleDelete} />
                        )
                    })}
                </div>
            : 
                <h1 className='text-3xl sm:text-5xl'>No games yet!!!</h1>
            }
        </div>
    </Layout>
  )
}

export const getServerSideProps = async ({ req, query }) => {
    try{
        const gamename = query.gamename;
        const session = await getSession({ req })
        var game = await prisma.game.findUnique({
            include: {
                _count: {
                    select:{
                        posts: true
                    }
                },
                posts:{
                    include:
                    {
                        author: {
                          select: {
                            name: true,
                            image: true,
                            profileImage: true,
                          }
                        },
                        game:{
                          select:{
                            id: true,
                            name: true,
                            logoImage: true
                          }
                        },
                        likedBy:{
                          select: {
                            name: true
                          }
                        },
                        savedBy:{
                          select: {
                            name: true
                          }
                        },
                        _count: {
                          select:{
                            likedBy: true,
                            comments: true
                          }
                        }
                    },
                    take: 10
                }
            },
            where: {
                name: gamename
            }
        })

        game = JSON.parse(JSON.stringify(game))

        return {
            props: {
              game,
              session
            }
          }

    }catch(err){
        console.log('Error', err)
        return {
          props: {
            posts: []
          }
        }
      }

}

export default Game;