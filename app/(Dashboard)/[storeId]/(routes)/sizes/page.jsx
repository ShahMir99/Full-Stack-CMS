import React from 'react'
import SizeClient from './components/SizeClient';
import Prisma from '@/lib/prisma-db';
import { format } from 'date-fns';

export const metadata = {
  title: "Sizes",
};

const Sizes = async ({params}) => {

  const sizes = await Prisma.size.findMany({
    where : {
      storeId : params.storeId
    },
    orderBy : {
      createdAt : "desc"
    }
  })

  const formattedSizes = sizes.map((item) => ({
    id : item.id,
    name : item.name,
    value : item.value,
    createdAt : format(item.createdAt , "MMMM do,yyyy")
  }))


  return (
    <div className='space-y-4 flex-1'>
      <SizeClient  data={formattedSizes}/>
    </div>
  )
}

export default Sizes