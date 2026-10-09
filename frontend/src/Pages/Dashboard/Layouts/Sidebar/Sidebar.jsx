import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='sidebar'>
        <div className="sidebar-container">
            <ul>
                <li><Link to={'account'}><span><img src="/home.svg" alt="" />Accounts</span></Link></li>
                <li><Link to={'services'}><span><img src="/services.svg" alt="" />Services</span></Link></li>
                <li><Link to={'access-control'}><span><img src="/key.svg" alt="" />Access Control</span></Link></li>
                <li><Link to={'your-info'}><span><img src="/person.svg" alt="" />Your Info</span></Link></li>
                <li><Link to={'privacy'}><span><img src="/fingerprint.svg" alt="" />Privacy</span></Link></li>
                <li><Link to={'my-wallet'}><span><img src="/wallet.svg" alt="" />My Wallet</span></Link></li>
                <li><Link to={'post-orders'}><span><img src="/shopping.svg" alt="" />Past Orders</span></Link></li>
            </ul>
        </div>
        </div>
    )
}

export default Sidebar