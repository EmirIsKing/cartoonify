import React from 'react'
import ButtonStarSvg from '@/public/ButtonStarSvg'
import { Button } from './ui/button'
import Link from 'next/link'

const GetStarted = () => {
  return (
    <div className='w-full py-14 px-10 flex flex-col justify-center items-center gap-5 text-center'>
      <div className='w-[70%] flex flex-col gap-3 justify-center items-center'>
        <h1 className='text-[20px]'>Ready to Get Started?</h1>
        <h3 className='text-white/70 text-[16px]'>Join thousands of users who are already creating amazing cartoon art</h3>
        <Link href={'/sign-up'}>
          <Button className='bg-button rounded-full py-5 px-9 shadow gap-5 hover:cursor-pointer hover:opacity-80 active:scale-[0.97] transition-transform duration-100'>
            Start Your Free Trial
            <span>
                <ButtonStarSvg/>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default GetStarted
