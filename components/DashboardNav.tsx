'use client'
import React, {useState} from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import Loader from './Loader'


const DashboardNav = () => {

    const router = useRouter();
    const [loading, setloading] = useState(false)

    const handleClick = async () => {
        setloading(true)
        const {error} = await supabase.auth.signOut()
        setloading(false)
        if (error) {
           localStorage.clear();
           sessionStorage.clear();
           router.push('/sign-in')
        } else {
            router.push('/sign-in')
        }
    }


  return (
    <div className='w-full flex top-0 justify-end items-center p-3'>
      <Button 
        onClick={handleClick} 
        className='bg-red-500 hover:bg-red-500/80 active:scale-[0.97] transition-transform duration-100 hover:cursor-pointer'>
            {loading ? <Loader size={20}/>: "Log Out"}
        </Button>
    </div>
  )
}

export default DashboardNav
