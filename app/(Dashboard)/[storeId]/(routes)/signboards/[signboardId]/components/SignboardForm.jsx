"use client";

import * as z from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUploader from "@/components/ui/ImageUploader";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";


const formSchema = z.object({
  lable : z.string().min(1),
  imageUrl : z.string()
})

const SignboardForm = ({ initialData }) => {

  const [ Loading , setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()
  const {toast} = useToast()

  const title = initialData ? "Edit Signboard" : "Create Signboard";
  const toastMessage = initialData ? "Signboard updated" : "Signboard created";
  const BtnAction = initialData ? "Save changes" : "Create";

  const form = useForm({
    resolver : zodResolver(formSchema),
    defaultValues : initialData || {
      lable : "",
      imageUrl : ""
    }
  })

  const onsubmit = async (data) => {
    try {
      setLoading(true);
      if(initialData){
        await axios.patch(`/api/${params.storeId}/signboards/${params.signboardId}`, data);
      }else{
        await axios.post(`/api/${params.storeId}/signboards`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/signboards`)
      toast({
        variant : "success",
        title : toastMessage,
      })
    } catch (err) {
      console.log(err)
      setLoading(false);
      toast({
        variant : "destructive",
        title: "Something went wronge",
      });
    }
  };


  return (
    <>
      <Heading title={title} />
      <Separator className="bg-[#d4d4d4]"/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="w-full space-y-8">
          <FormField 
            control={form.control}
            name="imageUrl"
            render={({field}) => (
              <FormItem>
                <FormLabel>Image for Signboard</FormLabel>
                <FormControl>
                  <ImageUploader 
                    value={field.value ? [field.value] : []}
                    disabled={Loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
              <FormField 
                control={form.control}
                name="lable"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input placeholder="label" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
          <Button type="submit" disabled={Loading} className="ml-auto">
            {BtnAction}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignboardForm;
