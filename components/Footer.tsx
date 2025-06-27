import React from 'react'
import CameraSvg from '@/public/CameraSvg'

const Footer = () => {
  return (
    <div className='w-full px-20 flex justify-between items-center bg-white/10 h-20 border-t border-gray-300/30'>
      <div className='flex gap-2 justify-center items-center'>
        <CameraSvg/>
        Cartoonify
      </div>
      <div className='flex gap-4 justify-center items-center'>
        <h3 className='text-white/40'>© 2024 Cartoonify. All rights reserved.</h3>
      </div>
    </div>
  )
}

export default Footer
