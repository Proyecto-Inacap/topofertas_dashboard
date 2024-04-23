"use client";
import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Control } from "react-hook-form";

type InputType = "text" | "password" | "email" | "number";
interface InputFormProps {
  control: Control<any>;
  label: string;
  placeholder?: string;
  inputName: string;
  description?: string;
  type?: InputType
}

const InputForm: React.FC<InputFormProps> = ({
  control,
  label,
  placeholder,
  inputName,
  description,
  type = "text",
}) => {
  return (
    <FormField
      control={control}
      name={inputName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} placeholder={placeholder} type={type}/>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputForm;
