import React, { createContext  } from 'react'

import Navbar from "../Navbar"
import Footer from '../Footer';
import Sidebar from '../Sidebar';


interface Props {
    showInfo?: boolean
    children: any
    showNavbarMenu?: boolean
}

const Layout = ( props: Props ) => {
    return (
        <>
            <Navbar showNavbarMenu={props.showNavbarMenu} />
            <div className='flex flex-row justify-center items-center'>
                <div className='max-w-7xl w-full'>
                    <div className="w-full flex flex-row justify-center sm:space-x-4 lg:space-x-8 xl:space-x-16 mt-8">
                        {!props.showNavbarMenu && <Sidebar showInfo={props.showInfo} />}
                        {props.children}
                    </div>
                </div>
            </div>
            <div className='block sm:hidden'>
                <Footer />
            </div>
        </>
    )
}

export default Layout