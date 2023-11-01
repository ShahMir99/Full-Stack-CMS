import React from 'react'
import SizeForm from './components/SizeForm'
import Prisma from '@/lib/prisma-db'

const Size = async ({params}) => {

  const size = await Prisma.size.findFirst({
    where : {
      id : params.sizeId
    }
  })

  return (
    <div className='flex flex-col space-y-5 bg-white shadow-md rounded-md p-5 pb-5'>
      <SizeForm initialData={size}/>
    </div>
  )
}

export default Size