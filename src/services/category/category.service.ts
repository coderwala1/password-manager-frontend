import { IResponse } from "@/types/response.type";
import { ApiService } from "../api.service";
import { ICategories, ICreateCategoryDto } from "./category.dto";
import { ICategorySchema } from "./category.schema";

export const CategoryService = {
  createCategory: async (schema: ICategorySchema) => {
    const dto: ICreateCategoryDto = {
      title: schema.name,
    };
    const { data } = await ApiService.post<IResponse>(`/pass/create-cat`, dto);
    return data;
  },

  getAllCategory: async () => {
    const { data } = await ApiService.get<IResponse<ICategories[]>>(
      `/pass/get-all-cat`
    );
    return data;
  },

  deleteCategory: async (id: string) => {
    const { data } = await ApiService.delete<IResponse>(`/pass/del-cat/${id}`);
    return data;
  },
};
