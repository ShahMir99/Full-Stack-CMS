import React from 'react'
import ColorForm from './components/ColorForm'
import Prisma from '@/lib/prisma-db'

const Color = async ({params}) => {

  const size = await Prisma.color.findFirst({
    where : {
      id : params.colorId
    }
  })

  return (
    <div className='flex flex-col space-y-5 bg-white shadow-md rounded-md p-5 pb-5'>
      <ColorForm initialData={size}/>
    </div>
  )
}

export default Color