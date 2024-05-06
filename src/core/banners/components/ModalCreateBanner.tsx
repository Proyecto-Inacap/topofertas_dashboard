"use client";
import InputForm from "@/components/form/InputForm";
import Modal from "@/components/modals/Modal";
import { Form } from "@/components/ui/form";
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateModal } from "@/store/useCreateModal";
import FileInputForm from "@/components/form/FileInputForm";
import { BannerFormSchema, BannerSchema } from "../types";
import { bannerApi } from "../api/bannerApi";
import SelectForm from "@/components/form/SelectForm";
import { useStores } from "@/core/stores/hooks/useStores";


interface Props {
  handleMutate: () => void;
}


const ModalCreateBanner = ({ handleMutate }: Props) => {
  const { createIsOpen, setCreateIsOpen } = useCreateModal();
  const { stores } = useStores({ enabled: true });

  const form = useForm<BannerSchema>({
    resolver: zodResolver(BannerFormSchema),
    defaultValues: {
      link: '',
      image: undefined,
    }
  });

  const { formState: { isSubmitting,errors }, reset } = form;
  const { toast } = useToast();

  const handleOnSubmit = async (data: BannerSchema) => {
    if (isSubmitting) return;
    const toaster = toast({
      toastType: 'loading',
      description: 'Creando categoría...',
    })
    try {
      const formData = new FormData();
      formData.append('link', data.link);
      formData.append('image', data.image as File);
      const response = await bannerApi.create(formData);

      if (response.status !== 200) { throw new Error('Error al crear categoría') }
      handleMutate();
      setCreateIsOpen(false);
      reset();
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
      title="Crear Banner"
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
            label="Link de redirección"
            inputName="link"
          />
          <FileInputForm
            control={form.control}
            label="Logo"
            inputName="image"
          />
           <SelectForm
            control={form.control}
            label="Tienda"
            inputName="storeId"
            placeholder="Seleccione una tienda"
            options={
              stores?.map((store) => ({
                value: store.id,
                label: store.name,
              })) || []
            }
          />
        </form>
      </Form>
    </Modal>
  );
};

export default ModalCreateBanner;
