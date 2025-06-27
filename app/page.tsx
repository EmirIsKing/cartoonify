'use client'
import React from 'react'
import LandingNav from '@/components/LandingNav'
import Hero from '@/components/Hero'
import WhyChoose from '@/components/WhyChoose'
import HowItWorks from '@/components/HowItWorks'
import MoreDetails from '@/components/MoreDetails'
import GetStarted from '@/components/GetStarted'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div className='flex flex-col'>
      <section className=''>
        <LandingNav/>
      </section>
      <section className=''>
        <Hero/>
      </section>
      <section>
        <WhyChoose/>
      </section>
      <section id='how-it-works'>
        <HowItWorks/>
      </section>
      <section>
        <MoreDetails/>
      </section>
      <section>
        <GetStarted/>
      </section>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default page
