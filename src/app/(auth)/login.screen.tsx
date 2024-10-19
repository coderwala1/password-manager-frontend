import { MyImage } from "@/components/common/my-image";
import MyButton from "@/components/form/my-button";
import MyInputWithRHF from "@/components/form/my-input";
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout";
import { useLoginController } from "@/components/screen/login/login.controller";
import { TailwindColor } from "@/config/color.config";
import { ImageConstant } from "@/constants/image.constant";
import { RouteConstant } from "@/constants/route.constant";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function LoginScreen() {
  const { control, handleSubmit, isSubmitting } = useLoginController();

  return (
    <MyScreenWrapperLayout className="p-4 justify-center">
      <View className="w-28 h-28 mx-auto">
        <MyImage source={ImageConstant.LOGIN} resizeMode="contain" />
      </View>

      <View className="h-6"></View>
      <Text className="text-body text-center text-white font-bold text-3xl">
        Hey, Login Now
      </Text>

      <View className="h-2"></View>

      <View>
        <View className="h-4"></View>
        <MyInputWithRHF
          control={control}
          name="email"
          label="Enter your email"
          inputMode="email"
          iconLeft={
            <Entypo name="email" size={16} color={TailwindColor.primary[100]} />
          }
        />

        <View className="h-4"></View>
        <MyInputWithRHF
          type="password"
          control={control}
          name="password"
          label="Enter your password"
          iconLeft={
            <Feather name="lock" size={16} color={TailwindColor.primary[100]} />
          }
        />

        <View className="h-4"></View>
        <MyButton
          onPress={() => handleSubmit()}
          title="Login Now"
          loading={isSubmitting}
        />

        <View className="h-6"></View>
        <Link
          href={RouteConstant.AUTH_NAV.SIGNUP_SCREEN}
          className="text-white underline text-center"
        >
          Don't have account? Create Now
        </Link>
      </View>
      <View className="h-20"></View>
    </MyScreenWrapperLayout>
  );
}
