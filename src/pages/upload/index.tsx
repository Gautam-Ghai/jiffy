import React, { useState, useEffect } from 'react'
import { getSession } from "next-auth/react"
import {useDropzone} from 'react-dropzone';
import { useRouter } from 'next/router'
import { FaLessThanEqual, FaTrashAlt } from "react-icons/fa"

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

interface Props {
    session: Session,
    games: Game[]
} 

const Upload = (props : Props) => {
  const router = useRouter()
  const [ files, setFiles ] = useState([]);
  const [ title, setTitle ] = useState('');
  const [ error, setError ] = useState('');
  const [ selected, setSelected ] = useState(props.games[0])
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        multiple: false,
        maxFiles:1,
        maxSize: 15728640,
        accept: 'video/mp4, video/x-ms-wmv, video/quicktime',
        onDrop: acceptedFiles => {
          setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })));
        }
    });

    useEffect(() => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const handleChange = (e) => {
      setTitle(e.target.value)
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
      data.append('name', props.session.user.name)
      data.append('game', selected.name)
      const requestOptions = {
        method: 'POST',
        body: data
      };

      fetch("/api/post", requestOptions)
      .then(res => {
        router.push('/')
      })
      .catch(err => {
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
          <div className="w-11/12 sm:w-9/12 md:w-7/12 lg:w-4/12 flex flex-col justify-center items-center mt-8 mx-2">
            <input type='text' className="bg-bgBlue-200 w-96 p-1.5 border-none rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500" placeholder="Title" onChange={(e) => handleChange(e)} value={title}/>
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
              <div {...getRootProps({ className: 'dropzone' })} className="card w-full text-gray-500 border rounded-lg border-gray-500 border-dashed py-48 text-center mt-2 cursor-pointer">
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            )
            }
            {error.length !=0 &&
              <p className="text-center mt-2 text-red-600">{error}</p>
            }
            <div className="flex flex-row space-x-2 mt-2">
              <Button onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </Layout>
    )
}

export const getServerSideProps = async ({ req }) => {
    try{
      const session = await getSession({ req })
      console.log("session in upload", session)

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
