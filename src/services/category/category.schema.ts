import { ZodSimpleString } from "@/utils/zod.util"
import { z } from "zod"

export const CategorySchema = z.object({
    name: ZodSimpleString,
})
export type ICategorySchema = z.infer<typeof CategorySchema>
