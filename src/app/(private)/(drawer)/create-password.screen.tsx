import MyButton from "@/components/form/my-button";
import MyInputWithRHF from "@/components/form/my-input";
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout";
import { useCategoryController } from "@/components/screen/category/category.controller";
import { usePasswordController } from "@/components/screen/password/password.controller";
import { TailwindColor } from "@/config/color.config";
import { RouteConstant } from "@/constants/route.constant";
import Entypo from "@expo/vector-icons/Entypo";
import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import React from "react";
import { Controller } from "react-hook-form";
import { Switch, Text, View } from "react-native";

export default function CreatePasswordScreen() {
  const { control, handleSubmit, isSubmitting } = usePasswordController();
  const { categories } = useCategoryController();

  return (
    <MyScreenWrapperLayout className="p-4">
      <View>
        <View className="h-4"></View>
        <MyInputWithRHF
          control={control}
          name="title"
          label="Enter Password Title"
          iconLeft={
            <Entypo name="leaf" size={16} color={TailwindColor.primary[100]} />
          }
        />

        <View className="h-4"></View>
        <MyInputWithRHF
          control={control}
          name="url"
          label="Enter Site URL"
          iconLeft={
            <Entypo name="link" size={16} color={TailwindColor.primary[100]} />
          }
        />

        <View className="h-4"></View>
        <MyInputWithRHF
          control={control}
          name="username"
          label="Enter Site Username"
          iconLeft={
            <Entypo name="user" size={16} color={TailwindColor.primary[100]} />
          }
        />

        <View className="h-4"></View>
        <MyInputWithRHF
          control={control}
          name="email"
          label="Enter Email"
          inputMode="email"
          iconLeft={
            <Entypo name="email" size={16} color={TailwindColor.primary[100]} />
          }
        />

        <View className="h-4"></View>
        <MyInputWithRHF
          control={control}
          name="password"
          label="Enter Site Password / PIN"
          iconLeft={
            <Entypo name="lock" size={16} color={TailwindColor.primary[100]} />
          }
        />

        <View className="h-4"></View>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-gray-400 text-lg">Add to Favourite</Text>
          <Controller
            control={control}
            name="isFav"
            render={({ field: { onChange, value } }) => {
              return (
                <Switch
                  onValueChange={(newValue) => {
                    onChange(newValue);
                  }}
                  value={value}
                  thumbColor="#fff"
                  trackColor={{ false: "#767577", true: "#6763D5" }}
                />
              );
            }}
          />
        </View>

        <View className="h-4"></View>
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <>
              <View
                style={{
                  borderColor: "#fff",
                  borderWidth: 1,
                  borderRadius: 5,
                  overflow: "hidden",
                }}
              >
                <Picker
                  selectedValue={value?.[0] || ""} // Ensure selectedValue is the first value in array
                  onValueChange={(itemValue) => {
                    onChange([itemValue]);
                  }}
                  mode="dropdown"
                  style={{
                    color: TailwindColor.gray[400],
                  }}
                  dropdownIconColor={TailwindColor.gray[400]}
                >
                  <Picker.Item label="Select a Category" value="" />
                  {categories?.data.map((category) => (
                    <Picker.Item
                      key={category._id}
                      label={category.title}
                      value={category._id}
                    />
                  ))}
                </Picker>
              </View>
            </>
          )}
        />

        <View className="h-4"></View>
        <MyInputWithRHF
          control={control}
          name="other"
          label="Other Important Information"
          iconLeft={
            <Entypo
              name="credit-card"
              size={16}
              color={TailwindColor.primary[100]}
            />
          }
        />
      </View>
      <View className="h-4"></View>
      <MyButton
        onPress={() => {
          handleSubmit();
        }}
        title="Create New"
        loading={isSubmitting}
      />

      <View className="h-6"></View>
      <Link
        href={RouteConstant.HOME_NAV.CREATE_CATEGORY}
        className="text-white underline text-center"
      >
        Don't have Category? Create New Now
      </Link>
      <View className="h-20"></View>
    </MyScreenWrapperLayout>
  );
}
