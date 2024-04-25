"use client";
import InputForm from "@/components/form/InputForm";
import Modal from "@/components/modals/Modal";
import { Form } from "@/components/ui/form";
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useStoreModal } from '@/store/stores/useStoreModal';
import { storeApi } from '../api/storeApi';
import FileInputForm from '@/components/form/FileInputForm';
import axios from 'axios';

const formSchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido",
  }).min(3, "El nombre debe tener al menos 3 caracteres"),
  logoImage: z.instanceof(File),
});

interface Props {
  handleMutate: () => void;
}

const ModalCreateStore = ({handleMutate}:Props) => {
  const { isOpen, setIsOpen } = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      logoImage: undefined,
    }
  });

  const {formState:{ isSubmitting }, reset} = form;

  const {toast} = useToast();

  const handleOnSubmit = async(data: z.infer<typeof formSchema>) => {
    if(isSubmitting) return;
    const toaster = toast({
      toastType: 'loading',
      description: 'Creando tienda...',
    })
   try {
    const formData = new FormData();
    formData.append('file', data.logoImage);
    formData.append('cloud_name', 'dxzsxrzy4');
    formData.append('upload_preset', 'stores-logos');
    const res = await axios.post(`https://api.cloudinary.com/v1_1/dxzsxrzy4/auto/upload`, formData)
    if(res.status !== 200) throw new Error('Error al subir la imagen')
    const response = await storeApi.create({
      name: data.name,
      logoImage: res.data.secure_url
    });

    if(response.status !== 200) {
      throw new Error('Error al crear la tienda')
    }
    handleMutate();
    setIsOpen(false);
    reset({
      name: '',
      logoImage: undefined,
    });
    toaster.update({
      toastType: 'success',
      description: 'Tienda creada correctamente',
    })
   } catch (error) {
    toaster.update({
      toastType: 'error',
      description: 'Error al crear la tienda',
    })
   }
  };

  return (
    <Modal
      title="Crear Tienda"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      buttonLabel="Crear"
      onConfirm={form.handleSubmit(handleOnSubmit)}
      isDisabled={ isSubmitting}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <InputForm
            control={form.control}
            label="Nombre"
            inputName="name"
          />
          <FileInputForm
            control={form.control}
            label="Logo"
            inputName="logoImage"
          />
        </form>
      </Form>
    </Modal>
  );
};

export default ModalCreateStore;
