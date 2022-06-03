import React from 'react'
import { prisma } from "../../../lib/prisma";
import { getSession } from "next-auth/react"
import Profile from '@/components/Profile'
import Main from '@/components/Main'
import Layout from "@/components/Layout"
import { Post } from '@/utils/types/post'
import { Session } from "@/utils/types/session";
import { Game } from '@/utils/types/game'
import { getUserProfile } from '@/queries/User';
import { getAllPostsFromUser } from '@/queries/Post';
import { getGames } from '@/queries/Game';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
interface Props {
  posts: Post[],
  user: any,
  session: Session,
  games: Game[]
} 

const User = (props: Props) => {
  const router = useRouter()
  const { username } = router.query

    return (
        <Layout showNavbarMenu>
          {props.user ? 
            <div className={`flex md:space-x-8 xl:space-x-16 ${props.posts.length > 0 ? 'flex-col md:flex-row' : 'flex-col justify-center items-center'} `}>
              <div className='w-auto flex justify-center'>
                <Profile user={props.user} /> 
              </div>
                {props.posts.length > 0 ?
                  <Main posts={props.posts} session={props.session} games={props.games} />
                  :
                  props.session && props.session.user.name === username ? (
                    <div className='flex flex-col items-center justify-center'>
                      <h1 className='text-center text-white font-semibold text-xl my-4'>No clips to show yet...</h1>
                      <Button onClick={() => router.push("/upload")}>Add a New Clip</Button>
                    </div>
                  ) 
                  :
                  <h1 className='text-center text-white font-semibold text-xl mt-4'>No clips to show yet...</h1>
                }
            </div>
            :
              <h1 className='text-white text-5xl font-bold font text-center mt-10'>User Not Found</h1>
          }
        </Layout>
    )
}

export default User;

export const getServerSideProps = async ({ req, query }) => { 

  const username = query.username;

  try{
    const session = await getSession({ req })

    var user = await getUserProfile(username);

    user = JSON.parse(JSON.stringify(user))
    let postsResult = null

    if(user){
      postsResult = await getAllPostsFromUser(username)
    }

    var games = await getGames();
    
    games = JSON.parse(JSON.stringify(games))
    
    const posts = JSON.parse(JSON.stringify(postsResult?.posts))
    console.log(posts)

    return {
      props: {
        posts,
        user,
        session,
        games
      }
    }
  }catch(err){
    console.log('error: ',err)
    return {
      props: {
        user: null,
        posts: null,
        session: null,
        games: null
      }
    }
  }
    
}