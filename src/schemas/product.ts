import * as z from "zod"

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.string().min(1, "Price is required"),
  quantity: z.string().min(1, "Quantity is required"),
})

export type ProductFormValues = z.infer<typeof productSchema>