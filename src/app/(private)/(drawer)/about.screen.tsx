import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout";
import React from "react";
import { Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <MyScreenWrapperLayout scrollView className="">
      <View className="h-20"></View>
      <Text className="text-body text-center text-gray-200 text-2xl">
        This is About page
      </Text>
      <View className="h-20"></View>
    </MyScreenWrapperLayout>
  );
}
