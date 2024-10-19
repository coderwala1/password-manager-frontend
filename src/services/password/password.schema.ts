import { ZodSimpleEmptyString, ZodSimpleString } from "@/utils/zod.util";
import { z } from "zod";

export const PasswordSchema = z.object({
  title: ZodSimpleString,
  url: ZodSimpleString.optional(),
  username: ZodSimpleString.optional(),
  email: ZodSimpleString.optional(),
  password: ZodSimpleString,
  isFav: z.boolean().default(false).optional(),
  category: z.array(z.string()).optional(),
  other: ZodSimpleString.optional(),
});

export type IPasswordSchema = z.infer<typeof PasswordSchema>;

export const PasswordUpdateSchema = z.object({
  id: ZodSimpleString,
  title: ZodSimpleEmptyString,
  url: ZodSimpleEmptyString,
  username: ZodSimpleEmptyString,
  email: ZodSimpleEmptyString,
  password: ZodSimpleEmptyString,
  isFav: z.boolean().default(false).optional(),
  category: z.array(z.string()).optional(),
  other: ZodSimpleEmptyString,
});

export type IPasswordUpdateSchema = z.infer<typeof PasswordUpdateSchema>;
