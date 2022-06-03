import { GameCard } from '@/utils/types/game'
import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import Button from '../Button'
import Link from 'next/link'

interface Props {
    game: GameCard
}

const GameCard = ( props: Props ) => {
    const { data: session, status } = useSession()
    
  return (
    <div className='card-body'>
        <div>
            <Image src={props.game.coverImage} width={480} height={270} objectFit='cover' className='rounded-md'/>
        </div>
        <div className='text-white'>
            <div className='p-4 flex items-center flex-wrap'>
                <div className="-mt-12 h-20 w-20 pl-2 pt-2 border-2 border-borderBlue rounded-full z-10 bg-bgBlue-200 mr-4">
                    <Image 
                        src={`${props.game?.logoImage ? props.game.logoImage : "/assets/game.png"}`} 
                        height="60" 
                        width="60" 
                        className="rounded-full" 
                        alt="game" 
                    />
                </div>
                <Link href={`/game/${props.game.name}`}>
                    <h1 className='text-3xl font-medium -mt-8 cursor-pointer hover:underline'>{props.game.name}</h1>
                </Link>
                
            </div>
            <div className="bg-cardBlue-200 flex flex-row justify-evenly h-16 pt-2.5 my-4 mt-0">
                <div className="flex flex-col items-center">
                    <p>{props.game?._count?.posts ? props.game?._count?.posts : 0}</p>
                    <p className='text-base text-gray-500'>Clips</p>
                </div>
                <div className="flex flex-col items-center">
                    <p>{props.game?._count?.userFollows ? props.game?._count?.userFollows : 0}</p>
                    <p className='text-base text-gray-500'>Followers</p>
                </div>
            </div>
                {session &&
                    <Button className='ml-4 mb-4'>
                        Follow
                    </Button>
                }
        </div>
    </div>
  )
}

export default GameCard;