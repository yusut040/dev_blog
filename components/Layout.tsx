import React from 'react'
import Navbar from './Navbar/Navbar';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='Navbar'>
      <Navbar />
        {children}
    </div>
  )
}

export default Layout