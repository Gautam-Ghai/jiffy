import React from 'react'
import { prisma } from "../../../lib/prisma";
import { getSession } from "next-auth/react"
import Profile from '@/components/Profile'
import Main from '@/components/Main'
import Layout from "@/components/Layout"
import { Post } from '@/utils/types/post'
import { Session } from "@/utils/types/session";

interface Props {
  posts: Post[],
  user: any,
  session: Session
} 

const User = (props: Props) => {
    return (
        <Layout>
            <div className='mb-6'>
                <div className='flex flex-row md:space-x-8 lg:space-x-16 mt-8 md:mx-8'>
                    <Profile user={props.user} /> 
                    <Main posts={props.posts} loggedinUser={props.session?.user}/>
                </div>
            </div>
        </Layout>
    )
}

export default User;

export const getServerSideProps = async ({ req, query }) => { 
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

    user = JSON.parse(JSON.stringify(user))
    
    var posts = await prisma.post.findMany({
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

      return {
        props: {
          posts,
          user,
          session
        }
      }
    
}