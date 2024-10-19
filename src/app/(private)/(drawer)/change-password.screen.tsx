import MyButton from "@/components/form/my-button";
import MyInputWithRHF from "@/components/form/my-input";
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout";
import { usePasswordController } from "@/components/screen/password/password.controller";

import { TailwindColor } from "@/config/color.config";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

export default function ChangePasswordScreen() {
  const { passChangeControl, passChangeHandleSubmit, isPassChangeSubmitting } =
    usePasswordController();
  return (
    <MyScreenWrapperLayout className="px-4">
      <View className="h-6"></View>

      <View>
        <MyInputWithRHF
          type="password"
          control={passChangeControl}
          name="oldPass"
          label="Enter Old Password"
          inputMode="text"
          iconLeft={
            <Feather name="lock" size={17} color={TailwindColor.primary[50]} />
          }
        />
        <View className="h-4"></View>
        <MyInputWithRHF
          type="password"
          control={passChangeControl}
          name="newPass"
          label="Enter New Password"
          inputMode="text"
          iconLeft={
            <Feather name="lock" size={17} color={TailwindColor.primary[50]} />
          }
        />
        <View className="h-4"></View>
        <MyInputWithRHF
          type="password"
          control={passChangeControl}
          name="confirmPass"
          label="Confirm New Password"
          inputMode="text"
          iconLeft={
            <Feather name="lock" size={17} color={TailwindColor.primary[50]} />
          }
        />
        <View className="h-6"></View>

        <MyButton
          onPress={() => passChangeHandleSubmit()}
          title="Change Master Password"
          loading={isPassChangeSubmitting}
        />
      </View>
    </MyScreenWrapperLayout>
  );
}
