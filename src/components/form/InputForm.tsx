'use client'
import React from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Control } from "react-hook-form";

interface InputFormProps {
    control: Control<any>;
    label: string;
    placeholder?: string;
    inputName: string;
    description?: string;
}

const InputForm : React.FC<InputFormProps> = ({ control,label,placeholder,inputName,description }) => {
  return (
    <FormField
      control={control}
      name={inputName}
      render={({ field,formState:{errors} }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
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

export default InputForm;
