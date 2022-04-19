import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Button from "../Button"
import Link from 'next/link'

import { useSession, signIn, signOut } from "next-auth/react"

import { AiOutlineCompass, AiOutlineSearch, AiOutlineFolderOpen } from "react-icons/ai"
import { HiOutlineUserGroup } from "react-icons/hi"
import { MdOutlineVideoLibrary } from "react-icons/md"
import { IoGameControllerOutline, IoNotificationsOutline } from "react-icons/io5"
import Modal from '../Modal'
import DropdownMenu from "../DropdownMenu"
import {useDropzone} from 'react-dropzone';
import { FaLess, FaTrashAlt } from "react-icons/fa"
import { useRouter } from 'next/router'
import AuthModal from '../AuthModal'

interface Props {
}

const Navbar = (props: Props) => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [ isOpen, setIsOpen ] = useState(false)
    const [ isEditOpen, setIsEditOpen ] = useState(false)
    const [ userDetails, setUserDetails ] = useState(null)
    const [ website, setWebsite ] = useState('');
    const [ about, setAbout ] = useState('');
    const [ files, setFiles ] = useState([]);
    const [ error, setError ] = useState('');
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        maxFiles:1,
        accept: 'image/jpeg, image/png, image/svg+xml',
        onDrop: acceptedFiles => {
          setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })));
        }
    });

    useEffect(() => {
        if(session && isEditOpen){
            fetch(`/api/user/${session.user?.name}`)
            .then(async(res) => {
                let json = await res.json();
                return json
            })
            .then(result =>{
                setUserDetails(result)
                setWebsite(result.website)
                setAbout(result.description)
            });
        }

        if(isEditOpen === false){
            setFiles([])
            setWebsite('')
            setAbout('')
        }
    }, [isEditOpen])

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
      }, [files]);

    const handleEditProfile = () => {
        if(session && isEditOpen){
            console.log('clicked')
            const data = new FormData()
            if(files && files.length > 0){
                data.append('banner', files[0]);
            }
            if(website && website.length > 0){
                data.append('website', website);
            }
            if(about && about.length > 0) {  
                data.append('about', about)
            }
            const requestOptions = {
                method: 'POST',
                body: data
            };

            fetch(`/api/user/${session.user?.name}`, requestOptions)
            .then(res => {
                setIsEditOpen(false)
                router.replace(router.asPath)
            })
            .catch(err => {
                console.log(err)
                setError(err)
            })
        }
    }

    const postOptions =[
        {
            name: 'View Profile',
            function: () => router.push(`/user/${session?.user?.name}`)
        },
        {
            name: 'Edit Profile',
            function: () => setIsEditOpen(true)
        },
        {
            name: 'Sign Out',
            function: signOut
        },
    ]

    return (
        <header className="bg-cardBlue-100 h-12 w-full relative">
            <div className="flex flex-row justify-between pt-1.5 md:justify-evenly mx-4 md:mx-0">
                <div className='-mt-2'>
                    <Image src="/assets/logo_2.png" height={60} width={120} />
                </div>
                <div className="hidden md:block">
                    <div className="flex flex-row space-x-6 items-center">
                        <Link href="/" passHref> 
                            <div className="flex flex-row space-x-2 mt-1 h-10 cursor-pointer border-transparent border-b-4 p-0  text-gray-500 hover:border-btnBlue hover:text-white">
                                <IoGameControllerOutline className="h-6 w-6" />
                                <p className='hidden lg:block'>Home</p>
                            </div>
                        </Link>
                        <div className="flex flex-row space-x-1 mt-1 h-10 cursor-pointer border-transparent border-b-4 p-0  text-gray-500 hover:border-btnBlue hover:text-white">
                            <AiOutlineCompass className="h-6 w-6" />
                            <p className='hidden lg:block'>Explore</p>
                        </div>
                        <div className="flex flex-row space-x-1 mt-1 h-10 cursor-pointer border-transparent border-b-4 p-0  text-gray-500 hover:border-btnBlue hover:text-white">
                            <HiOutlineUserGroup className="h-6 w-6" />
                            <p className='hidden lg:block'>Communities</p>
                        </div>
                        {session && 
                            <Link href="/upload" passHref> 
                                <div className="flex flex-row space-x-1 mt-1 h-10 cursor-pointer border-transparent border-b-4 p-0  text-gray-500 hover:border-btnBlue hover:text-white">
                                    <MdOutlineVideoLibrary className="h-6 w-6" />
                                    <p className='hidden lg:block'>Upload Clips</p>
                                </div>
                            </Link>
                        }
                    </div>
                </div>
                <div className="hidden md:block">
                    <form className="relative">    
                        <input placeholder='Search' className="input-color w-56 p-1.5 pl-10 border-none rounded-2xl caret-gray-500 text-gray-500 placeholder-gray-500" />
                        <AiOutlineSearch className="absolute top-1.5 left-2 h-6 w-6 text-gray-500" />
                    </form>
                </div>
                    {session ? (
                        <div className='flex flex-row mt-1 space-x-4'>
                            <IoNotificationsOutline className="h-6 w-6 text-gray-500 hover:text-white cursor-pointer"/>
                            <DropdownMenu options={postOptions}>
                                <div className="h-8 w-8 cursor-pointer bg-btnBlue rounded-full border-borderBlue border-2 -mt-0.5">
                                    <Image src={session.user?.profileImage || session.user?.image || "/assets/avatar.png" }alt="image" height="28" width="28" className="rounded-full" layout='responsive'/>
                                </div>
                            </DropdownMenu>
                        </div>  
                    ) : (
                        <div className='flex flex-row space-x-1 lg:space-x-4 mt-0.5'>
                            <Button onClick={() => setIsOpen(true)}>
                                SignIn
                            </Button>
                        </div>
                    )}
            </div>
            
            <AuthModal isOpen={isOpen} setIsOpen={setIsOpen}/>

            <Modal 
                isOpen={isEditOpen} 
                setIsOpen={setIsEditOpen} 
                title='Edit Profile' 
                titleClassName="text-center" 
                footer={
                    <Button onClick={handleEditProfile} className="mr-4">
                        Submit
                    </Button>
                }
            >
                {userDetails && 
                    <>
                        {userDetails.bannerImage ? 
                            (
                                <div  className="relative">
                                    <div className="mt-2">
                                        <Image src={userDetails.bannerImage} alt='banner' height='192' width="576" className="rounded-t-md"/>
                                    </div>
                                    <FaTrashAlt onClick={() => setFiles([])} className='text-red-600 h-6 w-auto absolute top-4 right-4 hover:transform hover:rotate-12 cursor-pointer'>
                                    Delete
                                    </FaTrashAlt>
                                </div>
                            )
                           : 
                            (
                                files.length !=0 ? files.map((file, key) => 
                                    <div key={key} className="relative">
                                        <div className="mt-2">
                                            <Image src={file.preview} alt='banner' height='192' width="576" className="rounded-t-md"/>
                                        </div>
                                        <FaTrashAlt onClick={() => setFiles([])} className='text-red-600 h-6 w-auto absolute top-4 right-4 hover:transform hover:rotate-12 cursor-pointer'>
                                        Delete
                                        </FaTrashAlt>
                                    </div>
                                ) : (
                                    <div {...getRootProps({ className: 'dropzone' })} className="card py-16 w-full text-gray-500 border rounded-t-md border-gray-500 border-dashed text-center mt-2 cursor-pointer">
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                )
                            )
                        }
                        <div className='flex mt-2'>
                            <div className='rounded-full border-4 border-solid border-borderBlue bg-btnBlue h-16 w-16'>
                                <Image src={`${userDetails.profileImage || userDetails.image || "/assets/user.png"}`} alt="user" height="64" width="64"  className='rounded-full'/>
                            </div>
                            <div className="flex flex-col ml-4">
                                <p className="text-gray-500 text-lg font-semibold text-left">{userDetails.name}</p>
                                <input type='text' className="bg-bgBlue-200 w-auto sm:w-96 p-1.5 border-none rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500" placeholder="Website" onChange={(e) => setWebsite(e.target.value)} value={website}/>
                            </div>
                        </div>
                        <h1 className="uppercase my-2 text-base text-white mt-2 ml-2 mb-0.5">
                            About
                        </h1>
                        <textarea className="bg-bgBlue-200 w-full p-1.5 border-none rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500" rows={3} placeholder="Something about yourself..." onChange={(e) => setAbout(e.target.value)} value={about} />
                        {error.length !=0 &&
                            <p className="text-center mt-2 text-red-600">{error}</p>
                        }
                    </>
                }
            </Modal>
        </header>
    )
}

export default Navbar