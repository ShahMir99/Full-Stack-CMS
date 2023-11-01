"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";
import { SelectValue } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1),
  signboardId: z.string(),
});

const CategoryForm = ({ initialData, signboards }) => {
  
  const [Loading, setLoading] = useState(false);
  const params = useParams()
  const router = useRouter()
  const {toast} = useToast()


  const title = initialData ? "Edit category" : "Create category";
  const toastData = initialData ? "Category updated" : "Category created";
  const btnAction = initialData ? "Save changes" : "Create";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      signboardId: "",
    },
  });

  const onsubmit = async (values) => {
    try {
      setLoading(true)
      if(initialData){
        await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, values)
      }else{
        await axios.post(`/api/${params.storeId}/categories`, values)
      }
      router.refresh()
      router.push(`/${params.storeId}/categories`)
      toast({
        variant : "success",
        title : toastData,
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
    <div className="bg-white p-5 flex flex-col space-y-5 shadow-md rounded-md">
      <Heading title={title} />
      <Separator className="bg-[#d4d4d4]" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="w-full space-y-8 "
        >
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="signboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Signboard</FormLabel>
                  <Select
                    disabled={Loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a signboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {signboards.map((signboard) => (
                        <SelectItem
                          className="hover:bg-blue-50"
                          key={signboard.id}
                          value={signboard.id}
                        >
                          {signboard.lable}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={Loading} className="ml-auto">
            {btnAction}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
