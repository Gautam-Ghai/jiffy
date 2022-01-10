import React, { createContext  } from 'react'

import Navbar from "../Navbar"
import Footer from '../Footer';


interface Props {
    children: any
}

const Layout = ( props: Props ) => {
    return (
        <>
            <Navbar />
            {props.children}
            <div className='block sm:hidden'>
                <Footer />
            </div>
        </>
    )
}

export default Layout