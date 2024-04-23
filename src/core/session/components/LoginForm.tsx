"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  email: z.string().email("El email debe ser válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    handleSubmit: handleSubmitForm,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    if (isSubmitting || isSubmitSuccessful) return;
    try {
      const signInRes = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (signInRes?.ok) {
        router.push("/");
      } else {
        toast({
          toastType: "error",
          description: "Credenciales inválidas",
        });
      }
    } catch (error) {
      console.error("Error al autenticar", error);
      toast({ toastType: "error", description: "Error al autenticar" });
    }
  };
  return (
    <Card className="p-8 max-w-sm w-full">
      <form className="space-y-4" onSubmit={handleSubmitForm(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Input placeholder="Email" {...register("email")} />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting || isSubmitSuccessful}>
          {isSubmitting || isSubmitSuccessful ? (
            <LoaderCircle size={24} className="animate-spin" />
          ) : (
            <span>Iniciar sesión</span>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;
