"use client";
import InputForm from "@/components/form/InputForm";
import Modal from "@/components/modals/Modal";
import { Form } from "@/components/ui/form";
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categoryApi } from '../api/categoryApi';
import { useCreateModal } from "@/store/useCreateModal";

const formSchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido",
  }).min(3, "El nombre debe tener al menos 3 caracteres"),
});

interface Props {
  handleMutate: () => void;
}

const defaultValues = {
  name: '',
}

const ModalCreateCategory = ({ handleMutate }: Props) => {
  const { createIsOpen, setCreateIsOpen } = useCreateModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const { formState: { isSubmitting }, reset } = form;

  const { toast } = useToast();

  const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    const toaster = toast({
      toastType: 'loading',
      description: 'Creando categoría...',
    })
    try {
      const response = await categoryApi.create(data);

      if (response.status !== 200) { throw new Error('Error al crear categoría') }
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
      title="Crear Categoría"
      isOpen={createIsOpen}
      setIsOpen={setCreateIsOpen}
      buttonLabel="Crear"
      onConfirm={form.handleSubmit(handleOnSubmit)}
      isDisabled={isSubmitting}
    >
      <Form {...form}>
        <form>
          <InputForm
            control={form.control}
            label="Nombre"
            inputName="name"
          />
        </form>
      </Form>
    </Modal>
  );
};

export default ModalCreateCategory;
