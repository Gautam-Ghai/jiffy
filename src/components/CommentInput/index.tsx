import React, { useState } from 'react'

import { AiOutlineSend } from 'react-icons/ai'
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
    id?: number,
    username?: string,
    setParentComment?: (e: string) => void
}

export default function CommentInput(props: Props) {
    const [ comment, setComment ] = useState('')
    const [ error, setError ] = useState('')

    const handleChange = (e) => {
        setComment(e.target.value)
    }

    const handleSubmit = () =>{
        if(props.username){  
            if(comment.length != 0 && props.username.length != 0){
                const data = new FormData();
                data.append('comment', comment);
                data.append('name', props.username)
                const requestOptions = {
                    method: 'POST',
                    body: data
                };

                fetch(`/api/comment/${props.id}`, requestOptions)
                .then(res => {
                    props.setParentComment && props.setParentComment(comment)
                    setComment('')
                    setError('')
                })
                .catch(err => {
                    console.log(err)
                    setError(err.data)
                })
            } else {
                setError("comment can't be empty")
            }
        }else {
            setError("unauthorized")
        }
    }

    return (
        <div className=''>
            <form className='flex flex-row items-center justify-start'>
                <TextareaAutosize className="bg-card-2 w-11/12 px-2 py-1.5 border-none rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500 resize-none max-h-96" placeholder="comment" onChange={(e) => handleChange(e)} value={comment} rows={1}/>
                <AiOutlineSend className='ml-2 text-white cursor-pointer hover:text-blue-500' onClick={() => handleSubmit()}/>
            </form>
            {error.length != 0 && 
                <p className='text-xs text-red-500 my-2'>{error}</p>
            }
        </div>
    )
}
