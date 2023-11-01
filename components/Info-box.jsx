import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

const InfoBox = () => {
  return (
    <div className="col-span-full lg:col-span-8 bg-white rounded-md shadow-md">
    <div className="flex items-end justify-between overflow-hidden flex-col-reverse lg:flex-row">
      <div className=" basis-[60%] flex-col space-y-8 p-6">
        <h3 className="text-xl font-bold text-[#696cff]">Congratulations Shahmir! 🎉</h3>
        <p className="text-md font-[500] text-[#979191]">
          You have done 72% 🤩 more sales today. Check your new raising
          badge in your profile.
        </p>
        <Button>View badge</Button>
      </div>
      <div className="basis-[40%] relative flex w-full items-end justify-center mt-10">
        <Image 
          src="https://sneat-vuetify-admin-template.vercel.app/assets/illustration-john-light-0061869a.png"
          alt=""
          width={200}
          height={200}
        />
      </div>
    </div>
  </div>
  )
}

export default InfoBox