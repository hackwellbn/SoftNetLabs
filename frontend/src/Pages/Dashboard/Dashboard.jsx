import React from 'react'
import Main from './Layouts/Main/Main'
import Sidebar from './Layouts/Sidebar/Sidebar'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className='dashboard content-wrap'>
      <Sidebar />
      <Main />
    </div>
  )
}

export default Dashboard