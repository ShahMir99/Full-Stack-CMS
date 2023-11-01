"use client"

import StoreModal from "@/components/modal/StoreModal"
import { useEffect, useState } from "react"

const StoreModalProvider = () => {

    const [isMounted , SetisMounted] = useState(false)
    useEffect(() => {
            SetisMounted(true)
    },[])

    if(!isMounted) {
        return null
    }

  return (
    <StoreModal />
  )
}

export default StoreModalProvider