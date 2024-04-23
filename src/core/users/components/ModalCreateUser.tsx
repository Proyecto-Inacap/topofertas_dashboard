"use client";
import InputForm from "@/components/form/InputForm";
import SelectForm from "@/components/form/SelectForm";
import Modal from "@/components/modals/Modal";
import { Form } from "@/components/ui/form";
import { useCategories } from "@/core/categories/hooks/useCategories";
import { useUserRoles } from "@/core/userRoles/hooks/useUserRoles";
import { useUserModal } from "@/store/users/useUserModal";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userApi } from "../api/userApi";

const formSchema = z.object({
  username: z
    .string({
      message: "Ingrese un email",
    })
    .min(6)
    .email("El email debe ser válido"),
  email: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  gender: z.string(),
  role: z.string(),
});

interface ModalCreateUserProps {
  handleMutate: () => void;
}

const ModalCreateUser: React.FC<ModalCreateUserProps> = ({
  handleMutate,
}) => {
  const { isOpen, setIsOpen } = useUserModal();

  const { userRoles } = useUserRoles();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    try {
      const response = await userApi.create(data);
    } catch (error) {
      console.error(error);
    }
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
            label="Username"
            inputName="username"
            placeholder="Ingrese un username"
          />
          <InputForm
            control={form.control}
            label="Email"
            inputName="email"
            placeholder="Ingrese un email"
          />
          <SelectForm
            control={form.control}
            label="Género"
            inputName="genero"
            placeholder="Seleccione un género"
            options={[
              { value: "0", label: "Hombre" },
              { value: "1", label: "Mujer" },
              { value: "2", label: "Otro" },
            ]}
          />
          <SelectForm
            control={form.control}
            label="Género"
            inputName="genero"
            placeholder="Seleccione un género"
            options={
              userRoles?.map((role) => ({
                value: role.id,
                label: role.label,
              })) || []
            }
          />
        </form>
      </Form>
    </Modal>
  );
};

export default ModalCreateUser;
