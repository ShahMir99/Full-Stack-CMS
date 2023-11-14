"use client"

import { Button } from './ui/button'
import { ArrowUp } from 'lucide-react'

const YealySection = () => {

  return (
    <div className="bg-card w-full p-7 rounded-md shadow-md flex flex-col gap-y-5">
        <div>
          <h4 className="font-semibold text-black pb-2 tracking-wider">
            Profile Report
          </h4>
          <Button className="rounded-full h-8 uppercase font-[600] tracking-wider bg-[#fff6e2] text-[#ffc23d] shadow-none hover:bg-primary">
            Year 2023
          </Button>
        </div>
        <div>
          <div className="flex gap-2 text-[#8bd663] text-sm">
            <ArrowUp className="h-4 w-4 font-lg" />
            <p className="tracking-wide">34.2 %</p>
          </div>
          <h3 className="text-2xl font-[600] tracking-wider mt-2">
          $ 84,686k
          </h3>
        </div>
      </div>
  )
}

export default YealySection