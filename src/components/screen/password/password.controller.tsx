import { QUERY_KEYS, queryClient } from "@/config/query.config";
import { KeyConstant } from "@/constants/key.constant";
import { RouteConstant } from "@/constants/route.constant";
import { IAllPassword } from "@/services/password/password.dto";
import {
  IPasswordSchema,
  IPasswordUpdateSchema,
  PasswordSchema,
  PasswordUpdateSchema,
} from "@/services/password/password.schema";
import { PasswordService } from "@/services/password/password.service";
import {
  ChangePasswordSchema,
  IChangePasswordSchema,
} from "@/services/user/user.schema";
import { UserService } from "@/services/user/user.service";
import { AsyncStorageUtil } from "@/utils/async-storage.util";
import { EncryptDecryptUtil } from "@/utils/encrypt-decrypt.util";
import { ErrorUtil } from "@/utils/error.util";
import Helper from "@/utils/Helper";
import { RnUtils } from "@/utils/rn.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { Platform } from "react-native";
import { ALERT_TYPE } from "react-native-alert-notification";

export const usePasswordController = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<IPasswordSchema>({
    resolver: zodResolver(PasswordSchema),
  });

  const { data: passwords, isLoading: isPasswordsLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PASSWORDS],
    queryFn: () => PasswordService.getAllPassword(),
  });

  const { data: allFav, isLoading: isAllFavLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_FAV_PASSWORDS],
    queryFn: () => PasswordService.getAllFav(),
  });

  const deletePassword = async (id: string) => {
    try {
      await PasswordService.deletePassword(id);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_ALL_PASSWORDS],
        }),
      ]);
      Platform.OS !== "web" ? Helper.Toast("Password Deleted") : "";
    } catch (error) {
      console.error("delete password:->", error);
      const message = ErrorUtil.getErrorMessage(error as Error).message;
      RnUtils.toast(message, "", ALERT_TYPE.DANGER);
    }
  };

  const {
    control: updateControl,
    handleSubmit: updateHandleSubmit,
    formState: { isSubmitting: isUpdateSubmitting },
    setValue,
  } = useForm<IPasswordUpdateSchema>({
    resolver: zodResolver(PasswordUpdateSchema),
  });

  const updatePassword = async (data: IPasswordUpdateSchema) => {
    try {
      await PasswordService.updatePassword(data);
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_ALL_PASSWORDS],
        }),
      ]);
      Platform.OS !== "web" ? Helper.Toast("Password Updated") : "";
    } catch (error) {
      console.error("update password:->", error);
      const message = ErrorUtil.getErrorMessage(error as Error).message;
      RnUtils.toast(message, "", ALERT_TYPE.DANGER);
    }
  };

  const {
    control: passChangeControl,
    handleSubmit: passChangeHandleSubmit,
    formState: { isSubmitting: isPassChangeSubmitting },
    reset: passChangeReset,
  } = useForm<IChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPass: "",
      newPass: "",
      confirmPass: "",
    },
  });

  const pass = passwords?.data as IAllPassword[];

  const changePassword = async (input: IChangePasswordSchema) => {
    try {
      const savedPass = await Promise.all(
        pass.map(async (item) => {
          const plainPass = await EncryptDecryptUtil.decryptPass(item.password);

          const reEncrypt = EncryptDecryptUtil.encryptPassWithHas(
            plainPass,
            EncryptDecryptUtil.getMasterPassHash(input.newPass)
          );

          const updatedItem = { ...item, password: reEncrypt };
          return updatedItem;
        })
      );

      const res = await UserService.changeMasterPass(input, savedPass);

      if (res.error) {
        console.error("change password:onSubmit:->", res.message);
        RnUtils.toast(res.message, "", ALERT_TYPE.DANGER);
      } else {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_ALL_PASSWORDS],
            type: "all",
          }),
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_ALL_FAV_PASSWORDS],
            type: "all",
          }),
        ]);
        await AsyncStorageUtil.setData(
          KeyConstant.AUTH_HASH_PASS,
          EncryptDecryptUtil.getMasterPassHash(input.newPass)
        );

        router.navigate(RouteConstant.HOME_NAV.HOME_SCREEN);
        RnUtils.toast("Master Password Changed", "", ALERT_TYPE.SUCCESS);
        reset();
      }
    } catch (error) {
      console.error("change password:onSubmit:->", error);
      const message = ErrorUtil.getErrorMessage(error as Error).message;
      RnUtils.toast(message, "", ALERT_TYPE.DANGER);
    }
  };

  const onSubmit = async (data: IPasswordSchema) => {
    try {
      await PasswordService.createPassword(data);
      reset();
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_ALL_PASSWORDS],
        }),
      ]);
      Platform.OS !== "web" ? Helper.Toast("Password Created") : "";
    } catch (error) {
      console.error("create password on submit:->", error);
      const message = ErrorUtil.getErrorMessage(error as Error).message;
      RnUtils.toast(message, "", ALERT_TYPE.DANGER);
    }
  };

  return {
    passwords,
    isPasswordsLoading,
    deletePassword,
    control,
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting,
    updateControl,
    updateHandleSubmit: updateHandleSubmit(updatePassword),
    isUpdateSubmitting,
    setValue,
    allFav,
    isAllFavLoading,
    changePassword,
    passChangeControl,
    passChangeHandleSubmit: passChangeHandleSubmit(changePassword),
    isPassChangeSubmitting,
  };
};
