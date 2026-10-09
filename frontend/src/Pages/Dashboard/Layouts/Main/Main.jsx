import React from 'react'
import './Main.css'
import Topbar from '../Topbar/Topbar'
import { Outlet } from 'react-router-dom'
const Main = () => {
    return (
        <div className='main' >
            <Topbar />
            <Outlet />
        </div>
    )
}

export default Main