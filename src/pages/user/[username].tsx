import React from 'react'
import { prisma } from "../../../lib/prisma";
import { getSession } from "next-auth/react"
import Profile from '@/components/Profile'
import Main from '@/components/Main'
import Layout from "@/components/Layout"
import { Post } from '@/utils/types/post'
import { Session } from "@/utils/types/session";
import { Game } from '@/utils/types/game'
interface Props {
  posts: Post[],
  user: any,
  session: Session,
  games: Game[]
} 

const User = (props: Props) => {
    return (
        <Layout>
          {props.user ? 
            <div className='mb-6'>
              <div className='flex flex-col mt-8 md:mx-8'>
                  <Profile user={props.user} page /> 
                  <Main posts={props.posts} session={props.session} games={props.games} />
              </div>
            </div>
            :
            <h1 className='text-white text-5xl font-bold font text-center mt-10'>User Not Found</h1>
          }
        </Layout>
    )
}

export default User;

export const getServerSideProps = async ({ req, query }) => { 
  try{
    const username = query.username;
    const session = await getSession({ req })

    var user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      }
    })
    console.log('here is the user', user)

    user = JSON.parse(JSON.stringify(user))
    console.log('here is the user again', user)
    var posts = null
    if(user){
      posts = await prisma.post.findMany({
        include: {
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
        where:{
          authorId: user.id
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    }
    var games = await prisma.game.findMany({
      select: {
        id: true,
        name: true,
        logoImage: true
      },
      orderBy:{
        id: 'asc'
      }
    })

    games = JSON.parse(JSON.stringify(games))
    
    posts = JSON.parse(JSON.stringify(posts))

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