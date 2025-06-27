import React from 'react'

const HowItWorks = () => {
  return (
    <div className='w-full p-10 flex flex-col justify-center items-center gap-3 text-center'>
      <h1 className='text-center text-2xl'>How It Works</h1>
      <h3 className='text-center'>Three simple steps to cartoon magic.</h3>
      <div className='w-full flex justify-center items-center gap-5'>
            <div className="flex justify-center items-center flex-col gap-2 p-7">
                <div className="bg-[linear-gradient(90deg,rgba(236,72,153,1)_0%,rgba(147,51,234,1)_100%)] text-white font-semibold flex items-center justify-center rounded-full w-10 h-10">
                    1
                </div>
                <h2 className="text-[20px] font-medium">Upload Photo</h2>
                <h3 className="text-[16px] opacity-70 text-center">Choose any photo from your device</h3>
            </div>

            <div className="flex justify-center items-center flex-col gap-2 p-7">
                <div className="bg-[linear-gradient(90deg,rgba(168,85,247,1)_0%,rgba(37,99,235,1)_100%)] text-white font-semibold flex items-center justify-center rounded-full w-10 h-10">
                    2
                </div>
                <h2 className="text-[20px] font-medium">AI Magic</h2>
                <h3 className="text-[16px] opacity-70 text-center">Our AI transforms it into a cartoon</h3>
            </div>
            <div className="flex justify-center items-center flex-col gap-2 p-7">
                <div className="bg-[linear-gradient(90deg,rgba(59,130,246,1)_0%,rgba(22,163,74,1)_100%)] text-white font-semibold flex items-center justify-center rounded-full w-10 h-10">
                    3
                </div>
                <h2 className="text-[20px] font-medium">Download</h2>
                <h3 className="text-[16px] opacity-70 text-center">Save your amazing cartoon image</h3>
            </div>
      </div>
    </div>
  )
}

export default HowItWorks
