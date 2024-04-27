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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface InputFormProps {
  control: Control<any>;
  label: string;
  placeholder: string;
  inputName: string;
  description?: string;
  options: { value: string; label: string }[];
}

const SelectForm: React.FC<InputFormProps> = ({
  control,
  label,
  placeholder,
  inputName,
  description,
  options
}) => {
  return (
    <FormField
      control={control}
      name={inputName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent >
                <SelectGroup>
                  {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectForm;
