import Card from '@/components/Card';
import Layout from '@/components/Layout';
import Profile from '@/components/Profile';
import React from 'react';
import { prisma } from "../../../lib/prisma";
import { Post } from "@/utils/types/post"
import { getSession } from 'next-auth/react';
import { Session } from '@/utils/types/session';

interface Props {
    post: Post,
    session: Session
}

const SinglePost = (props: Props) => {
  return (
      <Layout>
          {props.post ?
            <div className='mb-6'>
                <div className='flex flex-row md:space-x-8 lg:space-x-16 mt-8 md:mx-8'>
                    <div>
                        <Profile user={props.post.author} session={props.session} /> 
                    </div>
                    <Card post={props.post} session={props.session} />
                </div>
            </div>
            :
            <h1 className='text-white text-5xl font-bold font text-center mt-10'>Post Not Found</h1>
          }
      </Layout>
  );
}

export default SinglePost

export const getServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req })
    const postId = query.postId;
    const id = parseInt(postId);

    try{
        var post = await prisma.post.findUnique({
            include: {
                author: {
                    include: {
                        _count: {
                            select: {
                                posts: true
                            }
                        }
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
                id: id
            }
        });

        post = JSON.parse(JSON.stringify(post))

        return {
            props: {
                session,
                post
            }
          }
        
    }catch(err){
        console.log('Error', err)
        return {
            props: {
                session: null,
                post: null
            }
        }
    }
}