import React, { useState, useEffect } from 'react'
import { getSession } from "next-auth/react"
import {useDropzone} from 'react-dropzone';
import { useRouter } from 'next/router'
import { FaTrashAlt } from "react-icons/fa"
import Loader from '@/components/Loader';
import TextareaAutosize from 'react-textarea-autosize';

//Components
import Video from "@/components/Video"
import Button from '@/components/Button';
import Layout from "@/components/Layout"
import Dropdown from "@/components/Dropdown"

//Utils
import { Session } from "@/utils/types/session";
import { Game } from '@/utils/types/game'

//Queries
import { getGames } from '@/queries/Game';
import { getSpecificPost } from '@/queries/Post';
import { Post } from '@/utils/types/post';
import Alert from '@/components/Alert/Index';

interface Props {
    session: Session,
    games: Game[],
    post: Post,
    isAllowedtoEdit: true,
    isEditing: boolean
} 

const Upload = (props : Props) => {
  const router = useRouter()
  const [ duration, setDuration ] = useState(0)
  const [ files, setFiles ] = useState([]);
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false)
  const [ selected, setSelected ] = useState(props.games[0])
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        multiple: false,
        maxFiles:1,
        maxSize: 15728640,
        accept: 'video/mp4, video/x-ms-wmv, video/quicktime',
        onDrop: acceptedFiles => {
          setFiles(acceptedFiles.map(file => {
            const url = URL.createObjectURL(file)
            var media = new Audio(url);
            media.onloadedmetadata = function(){
              setDuration(media.duration) // this would give duration of the video/audio file
            };
            return (
              Object.assign(file, {
                preview: url
              })
            )
        }));
        }
    });

    useEffect(() => {
      if(props.isAllowedtoEdit){
        if(props.post){
          setTitle(props.post.title || '')
          setDescription(props.post.description || '')
          setSelected(props.post.game || props.games[0])
          setFiles([props.post.url])
        }
      }
    }, [])

    useEffect(() => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => {
        setDuration(0)
        return(
          URL.revokeObjectURL(file.preview)
          )
      })
    }, [files]);

    const handleTitle = (e) => {
      setTitle(e.target.value)
    }

    const handleDescription = (e) => {
      setDescription(e.target.value)
    }

    const handleSubmit = () => {
      if(title.length === 0) return (
        setError("title can't be empty")
      );

      if(files.length === 0) return (
        setError("insert a clip")
      )

      const data = new FormData()
      data.append('video', files[0]);
      data.append('title', title);

      if(description.length != 0) data.append('description', description);
      
      data.append('name', props.session.user.name)
      data.append('game', selected.name)
      const requestOptions = {
        method: 'POST',
        body: data
      };
      setLoading(true)

      fetch("/api/post", requestOptions)
      .then(res => {
        router.push('/').finally(() => 
        setLoading(false))
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        setError(err)
      })
    }

    const handleUpdate = () => {
      if(title.length === 0) return (
        setError("title can't be empty")
      );

      const data = new FormData()
      data.append('title', title);
      if(description.length != 0) data.append('description', description);
      data.append('game', selected.name)
      const requestOptions = {
        method: 'PUT',
        body: data
      };
      setLoading(true)

      fetch(`/api/post/${props.post.id}`, requestOptions)
      .then(res => {
        router.push('/').finally(() => 
        setLoading(false))
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        setError(err)
      })

    }

    const handleCancel = () => {
      setFiles([]);
      setTitle('');
      setDescription('');
      setError('');
      setSelected(props.games[0])

      {props.isEditing && router.push('/upload')}
    }

    return (
        <Layout>
          {props.session ?
            props.isEditing && !props.isAllowedtoEdit ?
              <div className='bg-cardBlue-100 rounded-md w-full p-4 sm:p-8 mx-4'>
                <h1 className='text-white text-5xl font-bold font text-center mt-10'>You're not allowed to edit this post</h1>
              </div>
              :
            <div className='bg-cardBlue-100 rounded-md w-full p-4 sm:p-8 mx-4'>
              <div className="w-full flex flex-col justify-center items-center min-h-full">

                <input type='text' className="my-2 border-gray-500 border border-solid bg-bgBlue-200 w-full md:w-10/12 px-3 py-2 rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500 focus:text-white" placeholder="Title" onChange={(e) => handleTitle(e)} value={title} maxLength={120}/>

                <TextareaAutosize maxLength={1000} maxRows={15} minRows={5} className="my-2 bg-bgBlue-200 w-full md:w-10/12 px-3 py-2 border-gray-500 border border-solid rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500 focus:text-white" placeholder="Description" onChange={(e) => handleDescription(e)} value={description}/>
                
                <Dropdown data={props.games} selected={selected} setSelected={setSelected} />
                
                { props.isEditing ?
                  <Video src={files[0]} />
                  :
                  files.length !=0 ? files.map((file, key) => (
                    <div key={key} className="relative">
                      <div className="card mt-2">
                        <Video src={`${file.preview}`} />
                      </div>
                      <FaTrashAlt onClick={() => setFiles([])} className='text-red-600 h-8 w-auto absolute top-4 right-4 hover:transform hover:rotate-12 cursor-pointer'>
                        Delete
                      </FaTrashAlt>
                    </div>
                  )) : (
                    <div {...getRootProps({ className: 'dropzone' })} className="card w-full md:w-10/12 text-gray-500 border rounded-lg border-gray-500 border-dashed py-48 text-center mt-2 cursor-pointer">
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                  )
                }
                <p className='text-gray-500'>{duration !=0 && `Duration: ${duration} sec`}</p>
                {error.length !=0 &&
                  <p className="text-center mt-2 text-red-600">{error}</p>
                }
                <div className="flex flex-row space-x-2 mt-4">
                  {props.isEditing ?
                    props.isAllowedtoEdit && 
                      <Button onClick={handleUpdate}>
                        Update
                      </Button>
                  :
                    <Button onClick={handleSubmit}>
                      Submit
                    </Button>
                  }
                  <Button variant onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          :
            <div className='bg-cardBlue-100 rounded-md w-full p-4 sm:p-8 mx-4'>
              <h1 className='text-white text-5xl font-bold font text-center mt-10'>You're not logged in</h1>
            </div>
          }
          
          <Loader
            active={loading}
            text={`${props.isEditing ? 'updating...' : 'uploading...'}`}
          /> 
          <Alert alertText={error} />
        </Layout>
    )
}

export const getServerSideProps = async ({ req, query }) => {
    const { edit } = query;
    let postID = null;
    let isEditing = false

    if(typeof edit == "string" && edit.length > 0)  {
      isEditing = true
      postID = parseInt(edit);
    }

    try{
      const session = await getSession({ req })
      console.log("session in upload", session)

      let post = null;
      let isAllowedtoEdit = false;

      if(postID) {
        post = await getSpecificPost(postID)
        post = JSON.parse(JSON.stringify(post))
      }

      if(post){
        if(post.author.username === session?.user?.name) isAllowedtoEdit = true
      }

      var games = await getGames();
  

      return {
        props: {
          session,
          games,
          post,
          isEditing,
          isAllowedtoEdit
        }
      }
    } catch(err){
      console.log('Error', err)
      return {
        props: {
          session: null,
          games: null
        }
      }
    }
  }

export default Upload;
