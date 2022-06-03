import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import Dropzone from 'react-dropzone';
import ReactCrop, { Crop } from 'react-image-crop'
import { FaDiscord, 
        FaTwitter, 
        FaFacebookF, 
        FaTiktok, 
        FaInstagram, 
        FaTwitch
    } from "react-icons/fa"
import { Form, useFormik } from 'formik';

//Components
import Modal from '@/components/Modal'
import Loader from "@/components/Loader"
import Layout from '@/components/Layout'
import Button from "@/components/Button"

//Utils
import { getCroppedImage } from '@/utils/getCroppedImage'
import { objectURLToImage  } from '@/utils/objectURLToImage'
import { User } from '@/utils/types/user'

//Queries
import { getUserProfile } from '@/queries/User'
import Discord from 'next-auth/providers/discord';
import CustomDropzone from '@/components/Dropzone';

interface Props {
    user: User
}

interface FormValues {
    username: string,
    website: string,
    description: string,
    discord: string,
    twitch: string,
    twitter: string,
    instagram: string,
    tiktok: string,
    facebook: string
}

const Edit = (props: Props) => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false)

    const [ isBannerOpen, setIsBannerOpen ] = useState(false);
    const [ bannerImage, setBannerImage ] = useState(null)
    const [ bannerImageName, setBannerImageName ] = useState('')
    const [ bannerImageURL, setBannerImageURL ] = useState(props.user.bannerImage || '')
    const [ bannerCrop, setBannerCrop ] = useState<Crop>();

    const [ isProfileOpen, setIsProfileOpen ] = useState(false);
    const [ profileImage, setProfileImage ] = useState(null)
    const [ profileImageName, setProfileImageName ] = useState('')
    const [ profileImageURL, setProfileImageURL ] = useState(props.user.profileImage || '')
    const [ profileCrop, setProfileCrop ] = useState<Crop>();

    const acceptBannerFiles = (files: any[]) => {
        let file = null;
        if(files.length >0) file = files[0]
        if(file){
            setIsBannerOpen(true)
            setBannerImageName(file.name)
            setBannerImage(file)
            setBannerImageURL(URL.createObjectURL(file))
        }
    }

    const acceptProfileFiles = (files: any[]) => {
        let file = null;
        if(files.length >0) file = files[0]
        if(file){
            setIsBannerOpen(true)
            setBannerImageName(file.name)
            setBannerImage(file)
            setBannerImageURL(URL.createObjectURL(file))
        }
    }

    const handleEditProfile = async (values: FormValues) => {
        if(session){
            if(session.user?.name == props.user.username){
                setLoading(true)
                const data = new FormData()
                if(bannerImageURL != props.user.bannerImage && bannerImageURL.length >0){
                    let file = await objectURLToImage(bannerImageURL, bannerImageName)
                    console.log(file)
                    data.append('banner', file)
                }
                if(values.website && values.website.length > 0){
                    data.append('website', values.website);
                }
                if(values.description && values.description.length > 0) {  
                    data.append('about', values.description)
                }
                const requestOptions = {
                    method: 'POST',
                    body: data
                };
    
                fetch(`/api/user/${session.user?.name}`, requestOptions)
                .then(res => {
                    URL.revokeObjectURL(bannerImageURL)
                    router.push(`/user/${props.user.username}`).finally(() => setLoading(false))
                })
                .catch(err => {
                    console.log('error', err)
                    setLoading(false)
                    setError(err)
                })
            } else{   
                setError("You don't have permission to edit this profile")
            } 
        } else{
            setError("You're not logged in")
        }
    }

    const handleBannerImg = async () => {
        const image = await getCroppedImage(bannerImage, bannerCrop, bannerImageName)
        if(image){
            setBannerImageURL(image);
            setIsBannerOpen(false)
        }
    };

    const handleProfileImg = async () => {
        const image = await getCroppedImage(profileImage, profileCrop, profileImageName)
        if(image){
            setProfileImageURL(image);
            setIsProfileOpen(false)
        }
    };

    const handleCancel = () => {
        setError('')
        setLoading(false)

        setBannerImageName('')
        setIsBannerOpen(false);
        setBannerImageURL(props.user.bannerImage || '')
        setBannerImage(null)
    }

    const validate = async(values: FormValues) => {
        let errors = {
            discord: '',
            username:''
        };
        const regex = /^((?!(discordtag|everyone|here)#)((?!@|#|:|```).{2,32})#\d{4})/i;
    
        if (!regex.test(values.discord)) {
          errors.discord = "Invalid discord username format";
        }
    
        if (!values.username || values.username.length == 0) {
          errors.username = "username cannot be empty";
        } else if (values.username.length < 4) {
          errors.username = "username must be more than 4 characters";
        } else if(values.username.length > 15) {
            errors.username = "username can not be more than 15 characters";
        }

        const isUsernameAvailable = await fetch('/api/user/username/' + values.username)
        .then(
            (response) => {
                if (!response.ok) {
                    throw new Error(`response status code: ${response.status}`);
                }
    
                return response.json();
            }
        )
        .then(
            (res) => {
                if (res.isUsernameAvailable) {
                    return true
                }

                return false
            }
        )
        .catch(
            (error) => {
                console.error(error);
                throw new Error('Failed to check username.');
            }
        )

        if(!isUsernameAvailable) {
            errors.username = "username not available";
        }

        return errors;
    };

    const formik = useFormik({
            initialValues:{
                username: props.user.username || '',
                website: props.user.website || '',
                description: props.user.description || '',
                discord: props.user.socialMedia?.discord || '',
                twitch: props.user.socialMedia?.twitch || '',
                twitter: props.user.socialMedia?.twitter || '',
                instagram: props.user.socialMedia?.instagram || '',
                tiktok: props.user.socialMedia?.tiktok || '',
                facebook: props.user.socialMedia?.facebook || ''
            },
            validate,
            onSubmit: values => handleEditProfile(values),
            onReset: () => handleCancel()
    })

  return (
        <Layout>
            {props.user && session && props.user.username == session.user?.name && 
                <div className='bg-cardBlue-100 p-8 rounded-md w-full max-w-800'>
                    <form onReset={formik.handleReset} onSubmit={formik.handleSubmit}>
                        { 
                            bannerImageURL.length > 0 ?  

                            <CustomDropzone
                                handleAcceptedFiles={acceptBannerFiles}
                                placeholder={
                                    <Image src={bannerImageURL} alt='banner' height='288' width="768" className="rounded-md"  layout='responsive' objectFit='cover'/>
                                }
                            />
                            :
                            <CustomDropzone
                                handleAcceptedFiles={acceptProfileFiles}
                            />
                        }
                        <div className='mt-2 flex'>
                            <div className='rounded-full border-4 border-solid border-borderBlue bg-btnBlue h-20 w-20'>
                                <Image src={`${props.user.profileImage || props.user.user.image || "/assets/user.png"}`} alt="user" height="72" width="72"  className='rounded-full'/>
                            </div>
                            <div className="flex flex-col ml-4 w-9/12 sm:w-auto">
                                <span className='mb-4'>
                                    <input type='text' className="border-gray-500 border border-solid bg-bgBlue-200 w-full sm:w-96 p-1.5 rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500" placeholder="username" name="username" onChange={formik.handleChange} value={formik.values.username} />
                                    {
                                        formik.values.username.length > 0 && formik.values.username != props.user.username &&
                                        <p className='p-1 text-small text-red-500'>{formik.errors.username}</p>
                                    }
                                </span>
                                <input type='text' className="border-gray-500 border border-solid bg-bgBlue-200 w-full sm:w-96 p-1.5 rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500" placeholder="Website" name="website" onChange={formik.handleChange} value={formik.values.website}/>
                            </div>
                        </div>
                        <h1 className="uppercase my-2 text-base text-white mt-2 ml-2 mb-2">
                            About
                        </h1>
                        <textarea className="bg-bgBlue-200 w-full p-1.5 border-gray-500 border border-solid rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500" rows={3} placeholder="Something about yourself..." name="description" onChange={formik.handleChange} value={formik.values.description} />

                        <h1 className="uppercase my-2 text-base text-white mt-2 ml-2 mb-0.5">
                            Socials
                        </h1>
                        <div className='flex flex-wrap justify-between items-center'>
                            <div className='flex p-2 items-center w-full sm:w-auto'>
                                <FaDiscord className='text-white h-7 w-7 mr-2'/>
                                <span>
                                    <input 
                                        className='border-gray-500 border border-solid bg-bgBlue-200 w-96 sm:w-72 p-1 rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500' 
                                        placeholder="username#0000" 
                                        name="discord" 
                                        onChange={formik.handleChange} 
                                        value={formik.values.discord}
                                    />
                                    {
                                        formik.values.discord.length > 0 && formik.values.discord != props.user.socialMedia?.discord &&
                                        <p className='p-1 text-small text-red-500'>{formik.errors.discord}</p>
                                    }
                                </span>
                            </div>
                            <div className='flex p-2 items-center w-full sm:w-auto'>
                                <FaTwitch className='text-white h-7 w-7 mr-2'/>
                                <input 
                                    className='border-gray-500 border border-solid bg-bgBlue-200 w-96 sm:w-72 p-1 rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500' 
                                    placeholder="username" 
                                    name="twitch" 
                                    onChange={formik.handleChange} 
                                    value={formik.values.twitch}
                                />
                            </div>
                            <div className='flex p-2 items-center w-full sm:w-auto'>
                                <FaTwitter className='text-white h-7 w-7 mr-2'/>
                                <input 
                                    className='border-gray-500 border border-solid bg-bgBlue-200 w-96 sm:w-72 p-1 rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500' 
                                    placeholder="username" 
                                    name="twitter" 
                                    onChange={formik.handleChange} 
                                    value={formik.values.twitter}
                                />
                            </div>
                            <div className='flex p-2 items-center w-full sm:w-auto'>
                                <FaInstagram className='text-white h-7 w-7 mr-2'/>
                                <input 
                                    className='border-gray-500 border border-solid bg-bgBlue-200 w-96 sm:w-72 p-1 rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500' 
                                    placeholder="username" 
                                    name="instagram" 
                                    onChange={formik.handleChange} 
                                    value={formik.values.instagram}
                                />
                            </div>
                            <div className='flex p-2 items-center w-full sm:w-auto'>
                                <FaTiktok className='text-white h-7 w-7 mr-2'/>
                                <input 
                                    className='border-gray-500 border border-solid bg-bgBlue-200 w-96 sm:w-72 p-1 rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500' 
                                    placeholder="username" 
                                    name="tiktok" 
                                    onChange={formik.handleChange} 
                                    value={formik.values.tiktok}
                                />
                            </div>
                            <div className='flex p-2 items-center w-full sm:w-auto'>
                                <FaFacebookF className='text-white h-7 w-7 mr-2'/>
                                <input 
                                    className='border-gray-500 border border-solid bg-bgBlue-200 w-96 sm:w-72 p-1 rounded-lg caret-gray-500 text-gray-500 placeholder-gray-500' 
                                    placeholder="username" 
                                    name="facebook" 
                                    onChange={formik.handleChange} 
                                    value={formik.values.facebook}
                                />
                            </div>
                        </div>

                        {error.length !=0 &&
                            <p className="text-center mt-2 text-red-600">{error}</p>
                        }

                        <div className='flex mt-4'>
                            <button type='submit' className='button bg-btnBlue rounded-full py-1.5 px-4 w-auto text-md font-semibold text-white tracking-wide mr-4'>Update</button>
                            <button type="reset" className='rounded-full py-1 px-4 w-auto text-md text-gray-500 font-semibold border-2 border-solid border-gray-500 tracking-wide hover:text-white hover:border-white hover:-translate-y-0.5'>Cancel</button>
                        </div>
                    </form>
                </div>
            }
            <Modal isOpen={isBannerOpen} setIsOpen={setIsBannerOpen} title='' footer={<Button onClick={() => handleBannerImg()}>Submit</Button>}>
                <ReactCrop crop={bannerCrop} onChange={c => setBannerCrop(c)} aspect={8 / 3}>
                    <img src={bannerImageURL} onLoad={(e) => setBannerImage(e.currentTarget)} />
                </ReactCrop>
            </Modal>

            <Modal isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} title='' footer={<Button onClick={() => handleProfileImg()}>Submit</Button>}>
                <ReactCrop crop={profileCrop} onChange={c => setProfileCrop(c)} aspect={8 / 3}>
                    <img src={profileImageURL} onLoad={(e) => setProfileImage(e.currentTarget)} />
                </ReactCrop>
            </Modal>

            <Loader active={loading} text="updating..."/>

        </Layout>
  )
}

export const getServerSideProps = async ({ req, query }) => {
    const username = query.username;

    try{
        let user = await getUserProfile(username);

        user = JSON.parse(JSON.stringify(user))

        return {
            props: {
              user
            }
          }

    }catch(err){
        console.log('Error', err)
        return {
          props: {
            game: null,
            session: null
          }
        }
      }
}

export default Edit