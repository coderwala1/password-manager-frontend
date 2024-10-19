import { z } from "zod";
import {
  ZodEmailString,
  ZodPasswordString,
  ZodSimpleString,
} from "../../utils/zod.util";

// * login
export const LoginWithEmailSchema = z
  .object({
    email: ZodEmailString,
    password: ZodPasswordString,
  })
  .strict();

export type ILoginWithEmailSchema = z.infer<typeof LoginWithEmailSchema>;

// * signup
export const SignUpWithEmailSchema = z
  .object({
    name: ZodSimpleString,
    email: ZodEmailString,
    password: ZodPasswordString,
  })
  .strict();

export type ISignUpWithEmailSchema = z.infer<typeof SignUpWithEmailSchema>;

export const ChangePasswordSchema = z
  .object({
    oldPass: ZodPasswordString,
    newPass: ZodPasswordString,
    confirmPass: ZodPasswordString,
  })
  .refine((data) => data.newPass === data.confirmPass, {
    message: "Password don't match!",
    path: ["confirmPass"],
  });
export type IChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;
