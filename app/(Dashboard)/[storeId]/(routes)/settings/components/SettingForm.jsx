"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(1),
});

const SettingForm = ({ initialData }) => {
  const [Loading, setLoading] = useState(false);
  const [checked , setChecked] = useState(false)
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onsubmit = async (data) => {
    try {
      setLoading(true);
      await axios.patch(`/api/store/${params.storeId}`, data);
      toast({
        variant : "success",
        title: "Store Updated Successfully",
      });
      router.refresh();
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/store/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast({
        variant : "success",
        title: "Store Deleted Successfully",
      });
    } catch (err) {
      console.log(err)
      setLoading(false);
      toast({
        variant : "destructive",
        title: "Store Deletion Failed",
        description: "Delete all signboards first",
      });
    }
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-md space-y-4 p-5 pb-10">
        <div className="flex items-center justify-between">
          <Heading
            title="Settings"
          />
        </div>

        <Separator className="bg-[#d4d4d4]" />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="space-y-6 w-full"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
            </div>
            <Button type="submit" disabled={Loading}>
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
      <div className="bg-white shadow-md rounded-md mt-4 space-y-4 p-5 pb-10 flex flex-col">
        <h3 className="text-2xl font-semibold">Delete</h3>
        <div className="flex items-center flex-row gap-4">
         <Checkbox checked={checked} onCheckedChange={() => setChecked((preVal) => !preVal)}/>
         <p className="font-medium text-[#616161]">I confirm to Delete my account</p>
        </div>
        <div>
          <Button variant="destructive" className="uppercase" disabled={!checked} onClick={onDelete}>
            Delete my Account
          </Button>
        </div>
      </div>
    </>
  );
};

export default SettingForm;
