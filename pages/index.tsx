import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { prisma } from "../lib/prisma";
import Navbar from '../src/components/Navbar'
import Profile from '../src/components/Profile'
import Main from '../src/components/Main'
import Footer from '../src/components/Footer'
import { Post } from '../src/utils/types/post'
import { Session } from "../src/utils/types/session";

import { getSession, signIn, signOut } from "next-auth/react"

import Sidebar from '../src/components/Sidebar';
interface Props {
    posts: Post[],
    user: any,
    session: Session
} 

const Home = (props: Props) => {
  const router = useRouter();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [theData, setTheData] = useState(props.posts);

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [theData]);

  return (
    <div className='mb-6'>
      <Navbar session={props.session} signIn={signIn} signOut={signOut} />
      <div className='flex flex-row md:space-x-8 lg:space-x-16 mt-8 md:mx-8'>
        <div>
          {props.session ?
            <Profile user={props.user}/> 
            :
            <Sidebar />
          }
        </div>
        <Main posts={props.posts} loggedinUser={props.session?.user} refreshData={refreshData}/>
      </div>
      <div className='block sm:hidden'>
        <Footer />
      </div>
    </div>
  )
}

export default Home;

export const getServerSideProps = async ({ req }) => {
  try{
    const session = await getSession({ req })

    var posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    posts = JSON.parse(JSON.stringify(posts))

    var user: any

    if(session){
      console.log(session)
      const userProfile: any = session.user
      user = await prisma.user.findUnique({
        where: {
          name: userProfile.name
        }
      })

      if(user){
        user = JSON.parse(JSON.stringify(user))
      }
    } else {
      user = {error: "Some error"}
    }

    return {
      props: {
        posts,
        user,
        session
      }
    }
  } catch(err){
    console.log('Error', err)
  }
}