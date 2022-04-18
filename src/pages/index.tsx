import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { getSession } from "next-auth/react"

//Components
import Profile from '@/components/Profile'
import Main from '@/components/Main'
import Layout from '@/components/Layout';
import Sidebar from '@/components/Sidebar';

//Utils
import { prisma } from "../../lib/prisma";
import { Post } from '@/utils/types/post'
import { Game } from '@/utils/types/game'
import { Session } from "@/utils/types/session";

//Queries
import { getAllPosts } from "@/queries/Post/index"
import { getUserProfile  } from "@/queries/User/index"
import { getGames  } from "@/queries/Game/index"
interface Props {
    posts: Post[],
    user: any,
    session: Session,
    games: Game[]
} 

const Home = (props: Props) => {
  const router = useRouter();
  return (
    <Layout>
      <div className='container flex flex-row lg:space-x-8 xl:space-x-16 mt-8'>
        <div>
          {props.session ?
            <Profile user={props.user} session={props.session} /> 
            :
            <Sidebar />
          }
        </div>
        <Main posts={props.posts} session={props.session} showMenu games={props.games} />
        <div className='hidden xl:block'>
          {props.session ?
            <Profile user={props.user} session={props.session} /> 
            :
            <Sidebar />
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

    var games = await getGames();

    var posts = await getAllPosts();

    console.log('session in home', session)
    
    posts = JSON.parse(JSON.stringify(posts))
    games = JSON.parse(JSON.stringify(games))

    var user: any

    if(session){
      console.log(posts)
      console.log('session in home', session)
      const userProfile: any = session.user
      user = await getUserProfile(userProfile.name);

      if(user){
        user = JSON.parse(JSON.stringify(user))
        console.log('user', user)
      }
    } else {
      user = {error: "Some error"}
    }

    return {
      props: {
        posts,
        user,
        session,
        games
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