import React, { useState } from 'react';
import { getSession } from 'next-auth/react';

//Components
import Card from '@/components/Card';
import Layout from '@/components/Layout';
import Comment from "@/components/Comment"

//Utils
import { Post } from "@/utils/types/post"
import { Session } from '@/utils/types/session';
import { Comment as CommentInterface } from "@/utils/types/comment"

//Queries
import { getSpecificPost } from '@/queries/Post';
import { getAllComments } from '@/queries/Comment';

interface Props {
    post: Post,
    session: Session,
    comments: CommentInterface[]
}

const SinglePost = (props: Props) => {
    const [ comments, setComments ] = useState(props.comments)


  return (
      <Layout>
          {props.post ?
            <div className='mb-6'>
                <Card 
                    post={props.post} 
                    session={props.session} 
                    disableComment 
                    disablePostClick 
                    setParentComments={setComments} 
                    parentComments={comments}
                />
                <div className='mx-4'>
                {comments && comments.map((comment, key) => {
                    return(
                        <div key={key} className=''>
                            <Comment 
                                comment={comment.content} 
                                date={comment.createdAt} 
                                username={comment.author?.username} 
                                profileImage={comment.author?.profileImage || comment.author?.user?.image} 
                            />
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
    const postId = query.postId;
    const id = parseInt(postId);

    try{
        const session = await getSession({ req })

        let post = await getSpecificPost(id);

        post = JSON.parse(JSON.stringify(post))

        let comments = await getAllComments(id)

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