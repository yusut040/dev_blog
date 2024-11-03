import React from 'react'
import Navbar from './Navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div className='Navbar'>
      <Navbar />
        {children}
    </div>
  )
}

export default Layout