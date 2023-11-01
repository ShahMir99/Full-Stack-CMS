import React from 'react'
import ColorClient from './components/ColorClient';
import Prisma from '@/lib/prisma-db';
import { format } from 'date-fns';

export const metadata = {
  title: "Colors",
};

const Colors = async ({params}) => {

  const sizes = await Prisma.color.findMany({
    where : {
      storeId : params.storeId
    },
    orderBy : {
      createdAt : "desc"
    }
  })

  const formattedColors = sizes.map((item) => ({
    id : item.id,
    name : item.name,
    value : item.value,
    createdAt : format(item.createdAt , "MMMM do,yyyy")
  }))


  return (
    <div className='space-y-4 flex-1'>
      <ColorClient  data={formattedColors}/>
    </div>
  )
}

export default Colors