import { z } from "zod";

const fileSchema = z.instanceof(File).refine(file => file.size > 0, {
    message: 'A file must be uploaded'
})
export const createProductSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(10, {
        message: 'Description must be at least 10 characters'
    }),
    price: z.number().min(100, 'Price must be at least $1.00'),
    type: z.string().min(1, 'Type is required'),
    brand: z.string().min(1, 'Brand is required'),
    quantityInStock: z.number().min(1, 'Quantity must be at least 1'),
    pictureUrl: z.string().optional(),
    file: fileSchema.optional()
}).refine((data) => data.pictureUrl || data.file, {
    message: 'Please provide an image',
    path: ['file']
})

export type CreateProductSchema = z.infer<typeof createProductSchema>;