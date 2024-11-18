import React from 'react'

const page = ({params}) => {
  return (
    <div>
        <h1>POST: {params.post}</h1>
    </div>
  )
}

export default page