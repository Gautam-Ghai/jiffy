import React from 'react'
import { getSession } from "next-auth/react"

//Components
import Main from '@/components/Main'
import Layout from '@/components/Layout';
import Sidebar from '@/components/Sidebar';
import RecomendedUsers from '@/components/RecomendedUsers';

//Utils
import { Post } from '@/utils/types/post'
import { Game } from '@/utils/types/game'
import { Session } from "@/utils/types/session";
import { User } from '@/utils/types/user';

//Queries
import { getAllPosts } from "@/queries/Post/index"
import { getRecomendedUsers  } from "@/queries/User/index"
import { getGames  } from "@/queries/Game/index"
interface Props {
    posts: Post[],
    session: Session,
    games: Game[],
    recomendedUsers: User[]
} 

const Home = (props: Props) => {
  return (
    <Layout showInfo>
      <div className='flex flex-row lg:space-x-8 xl:space-x-16'>
        <Main posts={props.posts} session={props.session} showMenu games={props.games} />
        <div className='hidden xl:block'>
          {props.recomendedUsers && 
            <RecomendedUsers recomendedUsers={props.recomendedUsers} session={props.session} />
          }
        </div>
      </div>
    </Layout>
  )
}

export default Home;

export const getServerSideProps = async ({ req }) => {
  try{
    const session = await getSession({ req })

    let games = await getGames();

    let posts = await getAllPosts();

    console.log('session in home', session)
    
    posts = JSON.parse(JSON.stringify(posts))
    games = JSON.parse(JSON.stringify(games))

    let recomendedUsers: any

    if(session){
      const userProfile: any = session.user
      recomendedUsers = await getRecomendedUsers(userProfile.name);

      if(recomendedUsers){
      recomendedUsers = JSON.parse(JSON.stringify(recomendedUsers))
      }
    
    } else {
      recomendedUsers = await getRecomendedUsers();

      if(recomendedUsers){
      recomendedUsers = JSON.parse(JSON.stringify(recomendedUsers))
      }
    }

    return {
      props: {
        posts,
        session,
        games,
        recomendedUsers
      }
    }
  } catch(err){
    console.log('Error', err)
    return {
      props: {
        posts: []
      }
    }
  }
}