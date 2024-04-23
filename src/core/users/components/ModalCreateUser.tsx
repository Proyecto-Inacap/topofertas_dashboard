"use client";
import InputForm from "@/components/form/InputForm";
import SelectForm from "@/components/form/SelectForm";
import Modal from "@/components/modals/Modal";
import { Form } from "@/components/ui/form";
import { useUserRoles } from "@/core/userRoles/hooks/useUserRoles";
import { useUserModal } from "@/store/users/useUserModal";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userApi } from "../api/userApi";

const formSchema = z.object({
  username: z
    .string()
    .min(6, "El username debe tener al menos 6 caracteres"),
  email: z
    .string()
    .min(6, "El email debe tener al menos 6 caracteres")
    .email("El email no es válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  gender: z.string(),
  userRoleId: z.string(),
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
    defaultValues: {
      username: "",
      email: "",
      password: "",
      gender: "",
        userRoleId: "",
    },
  });
  const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
    // TODO: crear toast y cosas validaciones
    try {
      const response = await userApi.create(data);
      if (response) {
        handleMutate();
        setIsOpen(false);
      }
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
          <InputForm
            control={form.control}
            label="Contraseña"
            inputName="password"
            placeholder="Ingrese un email"
            type="password"
          />
          <SelectForm
            control={form.control}
            label="Género"
            inputName="gender"
            placeholder="Seleccione un género"
            options={[
              { value: "0", label: "Hombre" },
              { value: "1", label: "Mujer" },
              { value: "2", label: "Otro" },
            ]}
          />
          <SelectForm
            control={form.control}
            label="Rol"
            inputName="userRoleId"
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
