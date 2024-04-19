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
import { useToast } from "@/components/ui/use-toast";
import { CircleX, DoorClosed, LoaderCircle } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const {
    handleSubmit: handleSubmitForm,
    register,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    data
  ) => {
    if (isAuthenticating) return;
    setIsAuthenticating(true);
    try {
      const signInRes = await signIn("credentials", {
        email: data.email,
        password:  data.password,
        redirect: false,
      });
      if (signInRes?.ok) {
        router.push("/");
      } else {
        toast({
          title: "Error",
          description: "Credenciales incorrectas",
          duration: 3000,
          action: <CircleX size={24} className="text-red-400" />,
        });
      }
    } catch (error) {
      console.error("Error al autenticar", error);
    } finally {
      setIsAuthenticating(false);
    }
  };
  return (
    <Card className="p-8 ">
      <form
        className="space-y-4"
        onSubmit={handleSubmitForm(onSubmit)}
      >
        <Input placeholder="Email" {...register("email")} />
        <Input
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isAuthenticating}
        >
          {isAuthenticating ? (
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
