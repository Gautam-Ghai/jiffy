import React from 'react'
import { prisma } from "../../../lib/prisma";
import { getSession } from "next-auth/react"
import Profile from '@/components/Profile'
import Main from '@/components/Main'
import Layout from "@/components/Layout"
import { Post } from '@/utils/types/post'
import { Session } from "@/utils/types/session";
import router from 'next/router';

interface Props {
  posts: Post[],
  user: any,
  session: Session
} 

const User = (props: Props) => {
    return (
        <Layout>
          {props.user ? 
            <div className='mb-6'>
              <div className='flex flex-col mt-8 md:mx-8'>
                  <Profile user={props.user} /> 
                  <Main posts={props.posts} session={props.session}/>
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
        name: username,
      },
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      }
    })
    console.log(user)

    user = JSON.parse(JSON.stringify(user))

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
              name: true,
              image: true
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
      
      posts = JSON.parse(JSON.stringify(posts))
    }

      return {
        props: {
          posts,
          user,
          session
        }
      }
  }
  catch(err){
    return {
      props: {
        user: null,
        posts: null,
        session: null
      }
    }
  }
    
}