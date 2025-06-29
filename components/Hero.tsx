import React from 'react'
import { Button } from './ui/button'
import ButtonStarSvg from '@/public/ButtonStarSvg'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className='relative'>
        <div className='flex flex-col gap-4 p-20 justify-center items-center max-md:p-5'>
            <h1 className='text-center text-7xl leading-tight max-md:text-5xl'>Transform Your Photos into <br/><span className='bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent'>Amazing Cartoons</span></h1>
            <h2 className='text-xl text-center font-normal text-white/90 max-md:text-sm'>Turn your ordinary photos into stunning cartoon masterpieces with our AI-powered <br/>converter. Fast, easy, and absolutely magical!</h2>
            <Link href={'/sign-in'}>
                <Button className='bg-button rounded-full py-5 px-9 shadow gap-5 hover:cursor-pointer hover:opacity-80 active:scale-[0.97] transition-transform duration-100'>
                    Start Converting Now
                    <span>
                        <ButtonStarSvg/>
                    </span>
                </Button>
            </Link>
        </div>
        <div className='absolute w-full h-full top-0 pointer-events-none'>
            <div className='bg-[#F472B633] rounded-full w-20 h-20 blur-sm relative top-[80px] left-[40px]'></div>
            <div className='bg-[#C084FC33] max-md:left-[250px] max-md:top-[120px] rounded-full w-32 h-32 blur-sm relative top-[160px] left-[1232px]'></div>
            <div className='bg-[#60A5FA33] rounded-full max-md:left-[240px] max-md:top-[150px] w-16 h-16 blur-sm relative top-[120px] left-[360px]'></div>
            
        </div>
    </div>
  )
}

export default Hero
