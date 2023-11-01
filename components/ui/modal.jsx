"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"

const Modal = ({
    title,
    description,
    isOpen,
    onClose,
    children
}) => {

    const onChange = (isOpen) => {
        if(!isOpen){
            onClose()
        }
    }   

  return (
    <Dialog open={isOpen} onOpenChange={onChange} >
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div>{children}</div>
        </DialogContent>
    </Dialog>   
  )
}

export default Modal