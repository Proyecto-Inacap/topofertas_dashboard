"use client";
import InputForm from "@/components/form/InputForm";
import Modal from "@/components/modals/Modal";
import { Form } from "@/components/ui/form";
import { useUserModal } from "@/store/users/useUserModal";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string({
    message: "Ingrese un email",
  }).min(6).email("El email debe ser válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const ModalCreateUser = () => {
  const { isOpen, setIsOpen } = useUserModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleOnSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Modal
      title="Crear Usuario"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      buttonLabel="Crear"
      onConfirm={form.handleSubmit(handleOnSubmit)}
    >
      <Form {...form}>
        <form>
          <InputForm
            control={form.control}
            label="Email"
            inputName="email"
          />
        </form>
      </Form>
    </Modal>
  );
};

export default ModalCreateUser;
