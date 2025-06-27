import React from 'react'

const CameraSvg = ({width, height}: {width?: number, height?: number}) => {
  return (
    <svg width={width ? width.toString() : '32'} height={height ? height.toString() : '32'} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.3334 5.33334H12.6667L9.33341 9.33334H5.33341C4.62617 9.33334 3.94789 9.61429 3.4478 10.1144C2.9477 10.6145 2.66675 11.2928 2.66675 12V24C2.66675 24.7072 2.9477 25.3855 3.4478 25.8856C3.94789 26.3857 4.62617 26.6667 5.33341 26.6667H26.6667C27.374 26.6667 28.0523 26.3857 28.5524 25.8856C29.0525 25.3855 29.3334 24.7072 29.3334 24V12C29.3334 11.2928 29.0525 10.6145 28.5524 10.1144C28.0523 9.61429 27.374 9.33334 26.6667 9.33334H22.6667L19.3334 5.33334Z"
        stroke="#F472B6"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 21.3333C18.2091 21.3333 20 19.5425 20 17.3333C20 15.1242 18.2091 13.3333 16 13.3333C13.7909 13.3333 12 15.1242 12 17.3333C12 19.5425 13.7909 21.3333 16 21.3333Z"
        stroke="#F472B6"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CameraSvg
