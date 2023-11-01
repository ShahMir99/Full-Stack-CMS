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
  name: z.string().min(1),
  value: z.string().min(4).regex(/^#/, {
    message : "String must be a valid hex code"
  }),
})

const ColorForm = ({initialData}) => {
  const [loading , setLoading] = useState(false)

  const {toast} = useToast()
  const router = useRouter()
  const params = useParams()

  const title = initialData ? "Eidt color" : "Create color"
  const toastMessage = initialData ? "color updated" : "color created";
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
        await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, values)
      }else{
        await axios.post(`/api/${params.storeId}/colors`, values)
      }
      router.refresh()
      router.push(`/${params.storeId}/colors`)
      toast({
        variant : "success",
        title : toastMessage,
      })
    } catch (err) {
      setLoading(false)
      console.log(err);
      toast({
        variant : "destructive",
        title : "Failed",
        description : "Something went wronge"
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
                <FormLabel>color name</FormLabel>
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
                <FormLabel>color value</FormLabel>
                <FormControl>
                <div className='flex flex-row items-center gap-5'>
                  <Input placeholder="value" {...field}/>
                  <div>
                  <div className="border p-4 rounded-full" style={{backgroundColor : field.value}}></div>
                  </div>
                </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {BtnAction}
        </Button>
        </form>
      </Form>
    </>
  )
}

export default ColorForm