"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { useStoreModal } from "@/hooks/use-store-hook";
import Modal from "../ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1)
});

const StoreModal = () => {
  const [Loading , setLoading] = useState(false)
  const isOpen = useStoreModal((state) => state.isOpen);
  const onClose = useStoreModal((state) => state.onClose);

  const {toast} = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onsubmit = async (value) => {
      try{
        setLoading(true)
        const {data} = await axios.post(`/api/store`,value)
        console.log(data)
        window.location.assign(`/${data.id}`)
        toast({
          variant : "success",
          title : "Store created successfully"
        })
      }catch(err){
        console.log(err)
        setLoading(false)
        toast({
          variant : "destructive",
          title : "Store creation failed",
          description : "something went wronge"
  
        })
      }
  };
  
  return (
    <Modal
      title="Please Create a Store"
      description="You have currently no store exist"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-4 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Store name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="pt-6 w-full flex items-center justify-end">
              <Button type="submit" disabled={Loading}>Create</Button>
              </div> 
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
