import { QUERY_KEYS, queryClient } from "@/config/query.config";
import {
  CategorySchema,
  ICategorySchema,
} from "@/services/category/category.schema";
import { CategoryService } from "@/services/category/category.service";
import { ErrorUtil } from "@/utils/error.util";
import Helper from "@/utils/Helper";
import { RnUtils } from "@/utils/rn.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import * as WebBrowser from "expo-web-browser";
import { useForm } from "react-hook-form";
import { Platform } from "react-native";
import { ALERT_TYPE } from "react-native-alert-notification";

WebBrowser.maybeCompleteAuthSession();

export const useCategoryController = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ICategorySchema>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const createCategory = async (input: ICategorySchema) => {
    try {
      await CategoryService.createCategory(input);
      reset();
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CATEGORY],
          type: "all",
        }),
      ]);
      Platform.OS !== "web" ? Helper.Toast("Category Created") : "";
    } catch (error) {
      console.error("login with email:onSubmit:->", error);
      const message = ErrorUtil.getErrorMessage(error as Error).message;
      RnUtils.toast(message, "", ALERT_TYPE.DANGER);
    }
  };

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_CATEGORY],
    queryFn: () => CategoryService.getAllCategory(),
  });

  const deleteCategory = async (id: string) => {
    try {
      await CategoryService.deleteCategory(id);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CATEGORY],
          type: "all",
        }),
      ]);
      Platform.OS !== "web" ? Helper.Toast("Category Deleted") : "";
    } catch (error) {
      console.error("delete category:->", error);
      const message = ErrorUtil.getErrorMessage(error as Error).message;
      RnUtils.toast(message, "", ALERT_TYPE.DANGER);
    }
  };

  return {
    control,
    isSubmitting,
    handleSubmit: handleSubmit(createCategory),
    categories,
    isCategoriesLoading,
    deleteCategory,
  };
};
