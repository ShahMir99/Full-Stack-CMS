import React from 'react'
import MainNav from './MainNav'
import { UserButton, auth } from '@clerk/nextjs'
import Prisma from '@/lib/prisma-db'

const Navbar = async ({params}) => {

  const {userId} = auth()

  const store = await Prisma.store.findFirst({
    where : {
      userId
    }
  })

  return (
    <div className='h-16 flex items-center px-5 w-full bg-white rounded-md shadow-md mb-4'>
      <h3 className='text-3xl font-bold'>{store?.name}</h3>
      <MainNav className="mx-6"/>
      <h2 className='ml-auto'>
        <UserButton afterSignOutUrl='/'/>
      </h2>
    </div>
  )
}

export default Navbar