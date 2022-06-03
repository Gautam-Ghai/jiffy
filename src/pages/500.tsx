import React from 'react'
import Layout from "@/components/Layout"

import Lottie from 'react-lottie';
import * as animationData from '@/utils/404.json'


const Custom500 = () => {

    const options ={
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <Layout>
            <div>
            <h1 className='text-btnBlue fredoka-font text-5xl text-center mt-10'>500 - Server Error</h1>
                <Lottie options={options}
                    height={400}
                    width={400}
                />
            </div>
        </Layout>
    )
}

export default Custom500;