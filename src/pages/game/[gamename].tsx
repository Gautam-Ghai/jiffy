import React, { useState } from 'react'
import Image from "next/image"
import { getSession } from "next-auth/react"

//Components
import Layout from '@/components/Layout';
import Card from '@/components/Card'

//Utils
import { GameWithPosts } from '@/utils/types/game'
import { Session } from "@/utils/types/session";

//Queries
import { getGame } from '@/queries/Game';

interface Props {
    game: GameWithPosts,
    session: Session
}

const Game = (props: Props) => {
    const [posts, setPosts] = useState(props.game.posts || null)

    const handleDelete = async(id: number) => {
        const post = props.game.posts.find(data=> data.id === id)
        if(post?.author?.username === props.session?.user.name){ 
            fetch(`/api/post/${id}`, {method: 'DELETE'})
            .then(res =>{
                const newPosts = posts.filter(data => data.id != id)
                setPosts(newPosts)
            }
            )
        }
    }
  return (
    <Layout showNavbarMenu>
        <div className=''>
            <div className='relative'>
                <Image src={props.game.coverImage} width={1980} height={1080} /> 
            </div>
            <div className='flex flex-col md:flex-row sm:space-x-4 lg:space-x-8 sm:ml-4'>
                <div className='md:-mt-40 mt-10 bg-cardBlue-100 rounded-md p-8 w-full md:w-96 text-white h-auto md:h-96 z-50'>
                
                    <div className='flex items-center flex-wrap'>
                        <div className="h-20 w-20 pl-2 pt-2 border-2 border-borderBlue rounded-full z-10 bg-bgBlue-200 mr-4">
                            <Image 
                                src={`${props.game?.logoImage ? props.game.logoImage : "/assets/game.png"}`} 
                                height="60" 
                                width="60" 
                                className="rounded-full" 
                                alt="game" 
                            />
                        </div>
                        <h1 className='text-5xl'>{props.game.name}</h1>
                    </div>
                    
                    
                    <h2 className='text-base md:text-xl pt-2'><span className="text-gray-500">Genre: </span>{props.game.genre.replace(/_/g, ' ')}</h2>
                    <h2 className='text-base md:text-xl'><span className="text-gray-500">Date released: </span>{props.game.releaseDate}</h2>
                    <h2 className='text-base md:text-xl'><span className="text-gray-500">Total Posts: </span>{props.game?._count?.posts}</h2>
                </div>
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
        </div>
    </Layout>
  )
}

export const getServerSideProps = async ({ req, query }) => {
    
    const gamename = query.gamename;

    try{
        const session = await getSession({ req })
        let game = await getGame(gamename);

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
            game: null,
            session: null
          }
        }
      }

}

export default Game;