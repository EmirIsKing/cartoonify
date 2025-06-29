import React from 'react'

const MoreDetails = () => {
  return (
    <div className='w-full p-10 flex justify-center items-center backdrop-blur-lg bg-white/10'>
      <div className='w-[60%] flex justify-between items-center max-md:flex-col gap-6'>
        <div className='flex flex-col justify-center items-center'>
            <h3 className='font-semibold text-2xl'>500K+</h3>
            <h1 className='text-white/70'>Photos Converted</h1>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <h3 className='font-semibold text-2xl'>50K+</h3>
            <h1 className='text-white/70'>Happy Users</h1>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <h3 className='font-semibold text-2xl'>99.9%</h3>
            <h1 className='text-white/70'>Uptime</h1>
        </div>
      </div>
    </div>
  )
}

export default MoreDetails
