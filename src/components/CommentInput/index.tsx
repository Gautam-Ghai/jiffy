import React, { useState } from 'react'

import { AiOutlineSend } from 'react-icons/ai'

interface Props {
    id?: number
    username?: string
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
        <div className='w-full'>
            <form className='relative'>
                <input type='text' className="mt-2 bg-card-2 w-full pl-2 py-1.5 pr-10 border-none rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500" placeholder="comment" onChange={(e) => handleChange(e)} value={comment} />
                <AiOutlineSend className='absolute right-2 top-5 text-white cursor-pointer hover:text-blue-500' onClick={() => handleSubmit()}/>
            </form>
            {error.length != 0 && 
                <p className='text-xs text-red-500 my-2'>{error}</p>
            }
        </div>
    )
}
