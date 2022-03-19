import Card from '@/components/Card';
import Layout from '@/components/Layout';
import Profile from '@/components/Profile';
import React, { useEffect, useState } from 'react';
import { prisma } from "../../../lib/prisma";
import { Post } from "@/utils/types/post"
import { getSession } from 'next-auth/react';
import { Session } from '@/utils/types/session';

import Comment from "@/components/Comment"
import CommentInput from '@/components/CommentInput'

interface Props {
    post: Post,
    session: Session,
    comments: any
}

const SinglePost = (props: Props) => {
    const [ comments, setComments ] = useState(props.comments)


  return (
      <Layout>
          {props.post ?
            <div className='mb-6'>
                <Card post={props.post} session={props.session} disableComment setParentComments={setComments} parentComments={comments}/>
                <div className='mx-4'>
                {comments && comments.map((comment, key) => {
                    return(
                        <div key={key} className=''>
                            <Comment comment={comment.content} date={comment.createdAt} username={comment.author.name} image={comment.author.image} />
                            <hr className='border border-solid border-bgBlue-200 my-1'/>
                        </div>
                    )
                })}
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
        let post = await prisma.post.findUnique({
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

        let comments = await prisma.comment.findMany({
            select: {
                content: true,
                createdAt: true,
                authorId: true,
                author:{
                    select:{
                        name: true,
                        image: true,
                        profileImage: true,
                    }
                }
            },
            where: {
                postId: id
            },
            orderBy:{
                createdAt: 'desc'
            }
        })

        comments = JSON.parse(JSON.stringify(comments))

        return {
            props: {
                session,
                post,
                comments
            }
          }
        
    }catch(err){
        console.log('Error', err)
        return {
            props: {
                session: null,
                post: null,
                comments: null
            }
        }
    }
}