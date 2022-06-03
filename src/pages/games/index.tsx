import React from 'react'
import Layout from '@/components/Layout'
import { getAllGames } from '@/queries/Game'
import { GameCard as GameCardType } from '@/utils/types/game'
import GameCard from '@/components/GameCard'

interface Props {
    games: GameCardType[]
}

const Games = (props: Props) => {
  return (
    <Layout>
        { props.games ? 
            <div className='flex flex-col sm:flex-row flex-wrap' >
                {props.games.map((game, key) => 
                    <div key={key} className="p-0 sm:p-4 pb-4">
                        <GameCard game={game} />
                    </div>
                )}
            </div> 
        :
        <div className='bg-cardBlue-100 rounded-md w-full p-4 sm:p-8 mx-4'>
            <h1 className='text-white text-5xl font-bold font text-center mt-10'>No game found!</h1>
        </div>
        }
    </Layout>
  )
}

export const getServerSideProps = async ({ req }) => {
    try{

        const result = await getAllGames();
        const games = JSON.parse(JSON.stringify(result))

        console.log('games', games)
  
        return {
        props: {
            games
        }
        }
    } catch(err){
      console.log('Error', err)
      return {
        props: {
          games: null
        }
      }
    }
  }

export default Games
