import { z } from 'zod'
import { Store } from '../stores/types'

export type Banner = {
  id: string
  image: string
  link: string
  enabled: boolean
  //Relations
  store: Store
  storeId: string
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}

export type BannerSchema = z.infer<typeof BannerFormSchema>


export const BannerFormSchema = z.object({
  link: z.string().min(10,{
    message: "El link debe tener al menos 10 caracteres"
  }),
  image: z.instanceof(File,{
    message: "La imagen es requerida"
  }),
  storeId: z.string()
  
});