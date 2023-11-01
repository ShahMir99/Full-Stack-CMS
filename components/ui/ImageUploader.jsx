"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

const ImageUploader = ({ value, disabled, onChange, onRemove }) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = (result) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="flex items-center gap-x-6 my-6">
        {value?.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="absolute z-10 top-2 right-2">
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onRemove(url)}
                type="button"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill src={url} alt="" className="object-cover" />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="u5ffgtkh">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <div>
              {value?.length > 0 ? (
                <Button
                  type="button"
                  disabled={disabled}
                  variant="secondary"
                  onClick={onClick}
                  className="w-[200px]"
                >
                  <ImagePlus className="w-4 h-4" />
                  Upload Image
                </Button>
              ) : (
                <div
                  type="button"
                  onClick={onClick}
                  className="flex items-center justify-center gap-2 cursor-pointer h-[200px] w-[200px] border-2 border-dotted border-[#747474]"
                >
                  <ImagePlus className="w-4 h-4" />
                  Upload Image
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploader;
