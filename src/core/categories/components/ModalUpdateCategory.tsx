"use client";
import InputForm from "@/components/form/InputForm";
import Modal from "@/components/modals/Modal";
import { Form } from "@/components/ui/form";
import { useToast } from '@/components/ui/use-toast';
import { useCategoryModal } from '@/store/categories/useCategoryModal';
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categoryApi } from '../api/categoryApi';

const formSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: "El nombre es requerido",
  }).min(3, "El nombre debe tener al menos 3 caracteres"),
});

interface Props {
  handleMutate: () => void;
}

const defaultValues = {
  id: '',
  name: '',
}

const ModalUpdateCategory = ({ handleMutate }: Props) => {
  const { updateIsOpen, setUpdateIsOpen } = useCategoryModal();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const { formState: { isSubmitting }, reset } = form;

  const { toast } = useToast();

  const handleOnSubmit = async ({ id, ...data }: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    const toaster = toast({
      toastType: 'loading',
      description: 'Actualizando categoría...',
    })
    try {
      const response = await categoryApi.update(id, data);

      if (response.status !== 200) { throw new Error('Error al actualizar categoría') }
      handleMutate();
      setUpdateIsOpen(null);
      // reset(defaultValues);
      toaster.update({
        toastType: 'success',
        description: 'Categoría actualizada correctamente',
      })
    } catch (error: any) {
      toaster.update({
        toastType: 'error',
        description: error?.response?.data?.message || 'Error al actualizar categoría',
      })
    }
  };

  useEffect(() => {
    if (updateIsOpen) {
      reset(updateIsOpen);
    }
  }, [updateIsOpen, reset])

  return (
    <Modal
      title="Actualizar Categoría"
      isOpen={updateIsOpen !== null}
      setIsOpen={() => setUpdateIsOpen(null)}
      buttonLabel="Actualizar"
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

export default ModalUpdateCategory;
