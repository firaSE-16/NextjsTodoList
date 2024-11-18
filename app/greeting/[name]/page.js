import React from 'react'

const page = ({params}) => {
  return (
    <div>Nice to meet you.{params.name}</div>
  )
}

export default page