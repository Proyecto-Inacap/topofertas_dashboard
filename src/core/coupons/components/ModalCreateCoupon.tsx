"use client";
import InputForm from "@/components/form/InputForm";
import Modal from "@/components/modals/Modal";
import { Form } from "@/components/ui/form";
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { couponApi } from '../api/couponApi';
import TextAreaForm from '@/components/form/TextAreaForm';
import { useStores } from '@/core/stores/hooks/useStores';
import ComboboxForm from '@/components/form/ComboboxForm';
import { useCreateModal } from "@/store/useCreateModal";
import SelectForm from "@/components/form/SelectForm";

const formSchema = z.object({
  code: z.string({
    required_error: "El nombre es requerido",
  }).min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string({
    required_error: "La descripción es requerida",
  }).min(3, "La descripción debe tener al menos 3 caracteres"),
  storeId: z.string({
    required_error: "La tienda es requerida",
  }),
});

interface Props {
  handleMutate: () => void;
}

const ModalCreateCoupon = ({ handleMutate }: Props) => {
  const { createIsOpen,setCreateIsOpen } = useCreateModal();
  const { stores } = useStores({ filters: { enabled: true } });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      description: '',
      storeId: '',
    }
  });

  const { formState: { isSubmitting }, reset } = form;

  const { toast } = useToast();

  const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    const toaster = toast({
      toastType: 'loading',
      description: 'Creando cupón...',
    })
    try {
      const response = await couponApi.create(data);

      if (response.status !== 200) {
        throw new Error('Error al crear la cupón')
      }
      handleMutate();
      setCreateIsOpen(false);
      reset({
        code: '',
        description: '',
        storeId: '',
      });
      toaster.update({
        toastType: 'success',
        description: 'cupón creado correctamente',
      })
    } catch (error) {
      toaster.update({
        toastType: 'error',
        description: 'Error al crear el cupón',
      })
    }
  };

  return (
    <Modal
      title="Crear Cupón"
      isOpen={createIsOpen}
      setIsOpen={setCreateIsOpen}
      buttonLabel="Crear"
      onConfirm={form.handleSubmit(handleOnSubmit)}
      isDisabled={isSubmitting}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <InputForm
            control={form.control}
            label="Código"
            inputName="code"
          />
          <TextAreaForm
            control={form.control}
            label="Descripción"
            inputName="description"
          />
          <SelectForm
            control={form.control}
            label="Tienda"
            inputName="storeId"
            placeholder="Seleccione una tienda"
            options={
              stores?.map(store => ({
                label: store.name,
                value: store.id,
              })) || []
            } />
        </form>
      </Form>
    </Modal>
  );
};

export default ModalCreateCoupon;
