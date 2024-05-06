"use client";
import InputForm from "@/components/form/InputForm";
import SelectForm from "@/components/form/SelectForm";
import Modal from "@/components/modals/Modal";
import { Form } from "@/components/ui/form";
import { useUserRoles } from "@/core/userRoles/hooks/useUserRoles";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userApi } from "../api/userApi";
import { useToast } from '@/components/ui/use-toast';
import { useCreateModal } from "@/store/useCreateModal";

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
  // gender: z.string(),
  userRoleId: z.string(),
});

interface ModalCreateUserProps {
  handleMutate: () => void;
}

const defaultValues = {
  username: "",
  email: "",
  password: "",
  // gender: "",
  userRoleId: "",
}

const ModalCreateUser: React.FC<ModalCreateUserProps> = ({
  handleMutate,
}) => {
  const { createIsOpen,setCreateIsOpen } = useCreateModal();
  const { toast } = useToast();
  const { userRoles } = useUserRoles();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });
  const { formState: { isSubmitting }, reset } = form;

  const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    const toaster = toast({
      toastType: 'loading',
      description: 'Creando usuario...',
    })
    try {
      const response = await userApi.create(data);
      if (response.status !== 200) { throw new Error('Error al crear usuario') }
      handleMutate();
      setCreateIsOpen(false);
      reset(defaultValues);
      toaster.update({
        toastType: 'success',
        description: 'Categoría creada correctamente',
      })
    } catch (error: any) {
      toaster.update({
        toastType: 'error',
        description: error?.response?.data?.message || 'Error al crear categoría',
      })
    }
  };

  return (
    <Modal
      title="Crear Usuario"
      isOpen={createIsOpen}
      setIsOpen={setCreateIsOpen}
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
          {/* <SelectForm
            control={form.control}
            label="Género"
            inputName="gender"
            placeholder="Seleccione un género"
            options={[
              { value: "Hombre", label: "Hombre" },
              { value: "Mujer", label: "Mujer" },
              { value: "Otro", label: "Otro" },
            ]}
          /> */}
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
