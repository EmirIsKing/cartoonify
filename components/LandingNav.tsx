import React from 'react'
import CameraSvg from '@/public/CameraSvg'
import { Button } from './ui/button'
import Link from 'next/link'

const LandingNav = () => {
  return (
    <div className='w-full sticky px-20 flex justify-between items-center bg-white/10 h-20 border-b border-gray-300/30'>
      <div className='flex gap-2 justify-center items-center'>
        <CameraSvg/>
        Cartoonify
      </div>
      <div className='flex gap-4 justify-center items-center'>
        <Link href={'#'}>Features</Link>
        <Link href='#how-it-works'>How it Works</Link>
        <Link href='/sign-in'>Sign In</Link>
        <Link href={'/sign-in'} className='hover:cursor-pointer'>
          <Button className='p-5 rounded-full bg-button hover:cursor-pointer'>Get Started</Button>
        </Link>
      </div>
    </div>
  )
}

export default LandingNav
