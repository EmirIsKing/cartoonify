'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Cartoonify from '@/components/Cartoonify'
import Loader from '@/components/Loader'
import DashboardNav from '@/components/DashboardNav'

const Page = () => {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      const userSession:any = data.session
      setSession(userSession)

      if (!userSession) {
        router.push('/sign-in')
      } else {
        setLoading(false)
      }
    }

    getSession()
  }, [router])

  if (loading) return <div className='w-full h-screen flex justify-center items-center'><Loader/></div>

  return (
    <>
    <DashboardNav/>
      <Cartoonify />
    </>
  )
}

export default Page
