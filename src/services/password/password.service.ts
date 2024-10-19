import { IResponse } from "@/types/response.type";
import { EncryptDecryptUtil } from "@/utils/encrypt-decrypt.util";
import { ApiService } from "../api.service";
import { IAllPassword } from "./password.dto";
import { IPasswordSchema, IPasswordUpdateSchema } from "./password.schema";

export const PasswordService = {
  getAllPassword: async () => {
    const { data } = await ApiService.get<IResponse<IAllPassword[]>>(
      `/pass/get-all/`
    );
    return data;
  },
  deletePassword: async (id: string) => {
    const { data } = await ApiService.delete<IResponse>(`/pass/${id}`);
    return data;
  },
  createPassword: async (schema: IPasswordSchema) => {
    const dto = {
      title: schema.title,
      url: schema.url,
      username: schema.username,
      email: schema.email,
      password: await EncryptDecryptUtil.encryptPass(schema.password),
      is_fav: schema.isFav,
      category: schema.category,
      other: schema.other,
    };
    const { data } = await ApiService.post<IResponse<IAllPassword>>(
      `/pass/create/`,
      dto
    );
    return data.data;
  },
  updatePassword: async (schema: IPasswordUpdateSchema) => {
    const dto = {
      title: schema.title,
      url: schema.url,
      username: schema.username,
      email: schema.email,
      password: await EncryptDecryptUtil.encryptPass(schema.password),
      is_fav: schema.isFav,
      category: schema.category,
      other: schema.other,
    };

    const { data } = await ApiService.put<IResponse<IAllPassword>>(
      `/pass/${schema.id}`,
      dto
    );
    return data.data;
  },
  getAllFav: async () => {
    const { data } = await ApiService.get<IResponse<IAllPassword[]>>(
      `/pass/get-all-fav/`
    );
    return data.data;
  },
};
