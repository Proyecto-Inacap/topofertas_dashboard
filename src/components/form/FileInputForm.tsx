'use client'
import React from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Control, ControllerRenderProps } from "react-hook-form";

interface FileInputFormProps {
  control: Control<any>;
  label: string;
  placeholder?: string;
  inputName: string;
  description?: string;
}

const FileInputForm: React.FC<FileInputFormProps> = ({ control, label, placeholder, inputName, description }) => {

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<any, string>) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    field.onChange(file);
  }

  return (
    <FormField
      control={control}
      name={inputName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={'file'} accept="image/png, image/gif, image/jpeg" onChange={(e) => handleOnChange(e, field)} />
          </FormControl>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileInputForm;
