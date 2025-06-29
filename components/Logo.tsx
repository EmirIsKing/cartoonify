import React from 'react'
import CameraSvg from '@/public/CameraSvg'

const Logo = () => {
  return (
    <a href='/' className='flex gap-2 justify-center items-center'>
        <CameraSvg/>
        <span className='max-md:hidden'>Cartoonify</span>
    </a>
  )
}

export default Logo
