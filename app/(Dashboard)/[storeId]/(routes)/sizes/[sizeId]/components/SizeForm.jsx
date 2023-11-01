"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Heading from '@/components/ui/heading'
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"

const formSchema = z.object({
  name : z.string().min(2),
  value : z.string().min(1),
})

const SizeForm = ({initialData}) => {

  const [Loading , setLoading] = useState(false)

  const {toast} = useToast()
  const router = useRouter()
  const params = useParams()

  const title = initialData ? "Eidt size" : "Create size"
  const toastMessage = initialData ? "Size updated" : "Size created";
  const BtnAction = initialData ? "Save changes" : "Create";

  const form = useForm({
    resolver : zodResolver(formSchema),
    defaultValues : initialData || {
      name : "",
      value : ""
    }
  })

  const onsubmit = async (values) => {
    try {
      setLoading(true)
      if(initialData){
        await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, values)
      }else{
        await axios.post(`/api/${params.storeId}/sizes`, values)
      }
      router.refresh()
      router.push(`/${params.storeId}/sizes`)
      toast({
        variant : "success",
        title : toastMessage
      })
    } catch (err) {
      console.log(err);
      setLoading(false)
      toast({
        variant : "destructive",
        title : "Failed",
        description : "Something went Wronge"
      })
    }
  };

  return (
    <>
      <Heading title={title}/>
      <Separator className="bg-[#d4d4d4]"/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
          <FormField 
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Size name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="value"
            render={({field}) => (
              <FormItem>
                <FormLabel>Size value</FormLabel>
                <FormControl>
                  <Input placeholder="value" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={Loading}>
          {BtnAction}
        </Button>
        </form>
      </Form>
    </>
  )
}

export default SizeForm