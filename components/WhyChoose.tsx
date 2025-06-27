import React from 'react'
import WhyChooseCards from './WhyChooseCards'
import LightningSvg from '@/public/LightningSvg'
import PinkStar from '@/public/PinkStar'
import DownloadSvg from '@/public/DownloadSvg'


const WhyChoose = () => {
  return ( 
    <div className='w-full p-10 flex flex-col justify-center items-center gap-5 backdrop-blur-lg bg-white/10'>
      <h1 className='text-4xl'>Why Choose Cartoonify</h1>
      <h3 className='text-xl opacity-70'>Discover the magic of AI-powered photo transformation</h3>
      <div className='flex w-full gap-5 items-center justify-center'>
        <WhyChooseCards
            title={'Lightning Fast'}
            details1={'Convert your photos in seconds with our'}
            details2={'advanced AI technology'}
            Icon={LightningSvg}
        />
        <WhyChooseCards
            title={'High Quality'}
            details1={'Get stunning cartoon results that preserve all'}
            details2={'the important details'}
            Icon={PinkStar}
        />
        <WhyChooseCards
            title={'Easy Download'}
            details1={'Download your cartoon images in high'}
            details2={'resolution instantly'}
            Icon={DownloadSvg}
        />
      </div>
    </div>
  )
}

export default WhyChoose
