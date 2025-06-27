import React from 'react'
import Logo from '@/components/Logo'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

const Page = () => {
  return (
    <div className='w-full h-full'>
        <div className='absolute w-full h-full pointer-events-none'>
            <div className='bg-[#F472B633] rounded-full w-20 h-20 blur-sm relative top-[80px] left-[40px]'></div>
            <div className='bg-[#C084FC33] rounded-full w-32 h-32 blur-sm relative top-[160px] left-[1232px]'></div>
            <div className='bg-[#60A5FA33] rounded-full w-16 h-16 blur-sm relative top-[120px] left-[360px]'></div>
        </div>
        <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
            <Logo/>
            <div className='flex flex-col rounded-md bg-white/9 border gap-5 border-gray-300/30 p-9 justify-center items-center'>
                <div className='flex flex-col justify-center gap-3 items-center'>
                    <h1 className='font-bold text-5xl'>Welcome Back</h1>
                    <h3>Sign into your account to start converting photos</h3>
                </div>
                <div className='flex w-full flex-col justify-center gap-3 items-center'>
                    <div className='grid w-full items-center gap-3'>
                        <Label htmlFor="email" className='font-bold'>Email</Label>
                        <Input type="email" id="email" className='bg-white/20 text-white h-10 placeholder:text-white'/>
                    </div>
                    <div className='grid w-full items-center gap-3'>
                        <Label htmlFor="password" className='font-bold'>Password</Label>
                        <Input type="password" id="password" className='bg-white/20 h-10 text-white placeholder:text-white'/>
                    </div>
                </div>
                <div className='w-full justify-between flex'>
                    <div className='flex items-center justify-center gap-2'>
                        <Checkbox id='rememberme'/>
                        <Label>Remember me</Label>
                    </div>
                    <a>Forgot Password</a>
                </div>
                <Button className='bg-button rounded-md w-full py-5 px-9 shadow gap-5 hover:cursor-pointer'>
                    Sign In
                </Button>
                <span className='font-bold text-xs'>Don't have an account? <a href='/sign-up' className='text-pink-400'>Sign Up</a></span>
            </div>
            
        </div>
    </div>
  )
}

export default Page
