"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  actualPrice: z.coerce.number().min(1),
  stock: z.coerce.number().min(1).default(1),
  description: z.string().min(1),
  categoryId: z.string().min(1),
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

const ProductForm = ({ initialData, categories, sizes, colors }) => {
  const [Loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const title = initialData ? "Update Product" : "Create Product";
  const toastMessage = initialData ? "Product updated" : "Product created";
  const BtnAction = initialData ? "Save changes" : "Publish product";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      images: [],
      price: 0,
      actualPrice: 0,
      stock: 0,
      description: "",
      categoryId: "",
      colorId: "",
      sizeId: "",
      isFeatured: false,
      isArchived: false,
    },
  });

  const onsubmit = async (value) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          value
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, value);
      }
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast({
        variant: "success",
        title: toastMessage,
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Something went wronge",
      });
    }
  };

  return (
    <>
      <Heading title={title} />
      <Separator className="bg-[#d4d4d4]" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images for Product</FormLabel>
                <FormControl>
                  <ImageUploader
                    value={field.value?.map((image) => image.url)}
                    disabled={Loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 pb-12" >
          <div className="lg:col-span-3 md:col-span-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            <div className="lg:col-span-3 md:col-span-2"> 
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Textarea 
                      className="h-[130px]"
                      placeholder="Write something here about your product..." 
                      {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input placeholder="1000 PKR" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="actualPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Actual Price</FormLabel>
                  <FormControl>
                    <Input placeholder="500 PKR" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Stock</FormLabel>
                  <FormControl>
                    <Input placeholder="20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    disabled={Loading}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select a Category"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {categories?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                          className="hover:bg-blue-50"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    disabled={Loading}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select a Size"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {sizes?.map((size) => (
                        <SelectItem
                          key={size.id}
                          value={size.id}
                          className="hover:bg-blue-50"
                        >
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    disabled={Loading}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select a Color"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {colors?.map((color) => (
                        <SelectItem
                          key={color.id}
                          value={color.id}
                          className="hover:bg-blue-50"
                        >
                          <div className="w-full flex items-center gap-3">
                            <div
                              className="w-6 h-6 rounded-full border"
                              style={{ backgroundColor: color.value }}
                            />
                            {color.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                  </FormControl>
                  <FormControl>
                  <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                      This product will appear on home page
                      </FormDescription>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                  </FormControl>
                  <FormControl>
                  <div className="space-y-1 leading-none">
                      <FormLabel>Archived</FormLabel>
                      <FormDescription>
                      This product will not appear anywhere in store
                      </FormDescription>
                    </div>
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

export default ProductForm;
