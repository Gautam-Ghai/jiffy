import React, { useState, useEffect } from 'react'

import { getSession, signIn, signOut } from "next-auth/react"
import { Session } from "@/utils/types/session";

import Navbar from 'components/Navbar';
import {useDropzone} from 'react-dropzone';
import Video from "@/components/Video"
import Button from '@/components/Button';
import { useRouter } from 'next/router'
import Layout from "@/components/Layout"


interface Props {
    session: Session
} 

const Upload = (props : Props) => {
  const router = useRouter()
  const [ files, setFiles ] = useState([]);
  const [ title, setTitle ] = useState('');
  const [ error, setError ] = useState('');
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        maxFiles:1,
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
      data.append('game', 'Valorant')
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
          <div className="flex flex-col justify-center items-center mt-8 mx-2">
            <input type='text' className="w-96 p-1.5 border-none rounded-lg caret-gray-600 text-gray-600 placeholder-gray-600" placeholder="Title" onChange={(e) => handleChange(e)} value={title}/>
            {files.length !=0 ? files.map((file, key) => (
              <>
                <div className="card mt-2"  key={key}>
                  <Video src={`${file.preview}`} blob={true} />
                </div>
                <Button onClick={() => setFiles([])} className='bg-red-600 border-none drop-shadow-md mt-2' variant>
                  Delete
                </Button>
              </>
            )) : (
              <div {...getRootProps({ className: 'dropzone' })} className="text-gray-600 border rounded-lg border-gray-600 border-dashed w-full md:w-3/5 py-48 text-center mt-2 cursor-pointer">
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

      return {
        props: {
          session
        }
      }
    } catch(err){
      console.log('Error', err)
    }
  }

export default Upload;
