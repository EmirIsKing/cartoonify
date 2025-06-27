import React from 'react'
import LightningSvg from '@/public/LightningSvg'

const WhyChooseCards = ({title, details1, details2, Icon}) => {
  return (
    <div className='p-7 bg-white/5 rounded-md border border-gray-50/40 drop-shadow-md flex flex-col justify-center items-center gap-3'>
        <Icon/>
      <h2 className='text-2xl'>{title}</h2>
      <h3 className='text-center text-[16px] leading-7 opacity-70'>{details1}<br/>{details2}</h3>
    </div>
  )
}

export default WhyChooseCards
