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
import { Control } from "react-hook-form";
import { Textarea } from '../ui/textarea';

interface TextAreaFormProps {
  control: Control<any>;
  label: string;
  placeholder?: string;
  inputName: string;
  description?: string;
}
const TextAreaForm: React.FC<TextAreaFormProps> = ({
  control,
  label,
  placeholder,
  inputName,
  description,
}) => {
  return (
    <FormField
      control={control}
      name={inputName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              className='resize-none'
              placeholder={placeholder}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextAreaForm;
