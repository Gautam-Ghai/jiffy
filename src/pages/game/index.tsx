import React from 'react'

import Layout from '@/components/Layout';
import Image from "next/image"

interface Props {

}

const Game = (props: Props) => {
  return (
    <Layout>
        <div className='container max-w-1200'>
            <div className='relative'>
                <video poster="/assets/valorant_video_poster.jpg" loop autoPlay>
                    <source src="/assets/valorant_video.mp4" type='video/mp4'/>
                </video>
                <div className='absolute top-1/2 md:top-2/3 left-4 sm:left-10 w-32 sm:w-auto'>
                    <Image src="/assets/valorant_profile_image.jpg" width={216} height={384} />
                </div>
            </div>
            <div className='ml-40 sm:ml-72 mt-4 text-white'>
                    <h1 className='text-3xl sm:text-5xl'>Valorant</h1>
                    <h2 className='text-base sm:text-xl'><span className="text-gray-500">Genre: </span>FPS</h2>
                    <h2 className='text-base sm:text-xl'><span className="text-gray-500">Date released: </span>2nd December, 2020</h2>
                    <h2 className='text-base sm:text-xl'><span className="text-gray-500">Total Posts: </span>2316</h2>
            </div>
        </div>
    </Layout>
  )
}

// export const getServerSideProps = async ({ req }) => {

// }

export default Game;