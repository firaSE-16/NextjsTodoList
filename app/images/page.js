import React from 'react'
import img6 from '../../assets/img6.jpg'
import Image from 'next/image'

const page = () => {
  return (
    <div>
        we will show the image here 
    <Image src={img6} alt=''/>
    </div>
  )
}

export default page