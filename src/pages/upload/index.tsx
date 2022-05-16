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

interface Props {
    session: Session,
    games: Game[]
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

    const handleCancel = () => {
      setFiles([]);
      setTitle('');
      setError('');
    }

    return (
        <Layout>
          {props.session ?
            <div className='bg-cardBlue-100 rounded-md w-full p-4 sm:p-8 mx-4'>
              <div className="w-full flex flex-col justify-center items-center min-h-full">
                <input type='text' className="my-2 border-gray-500 border border-solid bg-bgBlue-200 w-96 px-3 py-2 rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500" placeholder="Title" onChange={(e) => handleTitle(e)} value={title}/>
                <TextareaAutosize maxLength={1000} maxRows={15} minRows={3} className="my-2 bg-bgBlue-200 w-96 px-3 py-2 border-gray-500 border border-solid rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500" placeholder="Description" onChange={(e) => handleDescription(e)} value={description}/>
                <Dropdown data={props.games} selected={selected} setSelected={setSelected} />
                {files.length !=0 ? files.map((file, key) => (
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
                  <Button onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button variant onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          :
          <div>

          </div>
          }
          
          <Loader
            active={loading}
            text='uploading...'
          />
        </Layout>
    )
}

export const getServerSideProps = async ({ req, query }) => {
    const { edit } = query;

    const postID = parseInt(edit);

    try{
      const session = await getSession({ req })
      console.log("session in upload", session)

      // var post = await getSpecificPost(postID)
      var games = await getGames();
  

      return {
        props: {
          session,
          games
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
