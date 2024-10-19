import { KeyConstant } from "@/constants/key.constant";
import { useUserStore } from "@/hooks/user.store";
import {
  ISignUpWithEmailSchema,
  SignUpWithEmailSchema,
} from "@/services/user/user.schema";
import { UserService } from "@/services/user/user.service";
import { AsyncStorageUtil } from "@/utils/async-storage.util";
import { ErrorUtil } from "@/utils/error.util";
import Helper from "@/utils/Helper";
import { RnUtils } from "@/utils/rn.util";
import { zodResolver } from "@hookform/resolvers/zod";
import * as WebBrowser from "expo-web-browser";
import { useForm } from "react-hook-form";
import { ALERT_TYPE } from "react-native-alert-notification";

WebBrowser.maybeCompleteAuthSession();

export function useSignUpController() {
  const setCurrentUser = useUserStore((s) => s.setCurrentUser);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ISignUpWithEmailSchema>({
    resolver: zodResolver(SignUpWithEmailSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (input: ISignUpWithEmailSchema) => {
    try {
      const userResponse = await UserService.signUp(input);
      console.log(userResponse);

      if (userResponse.error) {
        const message = ErrorUtil.getErrorMessage(userResponse as any).message;
        RnUtils.toast(message, "", ALERT_TYPE.DANGER);
        return;
      }

      if (userResponse.data.email) {
        await AsyncStorageUtil.setData(
          KeyConstant.LOGGED_IN_USER,
          userResponse
        );
        await AsyncStorageUtil.setData(
          KeyConstant.AUTH_HASH_PASS,
          Helper.getMasterPassHash(input.password)
        );
        await AsyncStorageUtil.setData(KeyConstant.AUTH_EMAIL, input.email);
        setCurrentUser(userResponse.data);
      }
      RnUtils.toast(
        "Success",
        "Account Created Successfully",
        ALERT_TYPE.SUCCESS
      );
    } catch (error) {
      console.error("login with email:onSubmit:->", error);
      const message = ErrorUtil.getErrorMessage(error as Error).message;
      RnUtils.toast(message, "", ALERT_TYPE.DANGER);
    }
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting,
  };
}
