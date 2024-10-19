import MyButton from "@/components/form/my-button";
import MyInputWithRHF from "@/components/form/my-input";
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout";
import { useCategoryController } from "@/components/screen/category/category.controller";
import { usePasswordController } from "@/components/screen/password/password.controller";
import { TailwindColor } from "@/config/color.config";
import { RouteConstant } from "@/constants/route.constant";
import { EncryptDecryptUtil } from "@/utils/encrypt-decrypt.util";
import Entypo from "@expo/vector-icons/Entypo";
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import { Link, router } from "expo-router";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Switch, Text, TouchableOpacity, View } from "react-native";

export default function EditPasswordScreen() {
  const {
    updateControl,
    updateHandleSubmit,
    isUpdateSubmitting,
    setValue,
    passwords,
    isPasswordsLoading,
  } = usePasswordController();
  const { categories } = useCategoryController();
  const route = useRoute();
  const params = route.params as { param: string };
  const { param: id } = params;

  const password = passwords?.data.find((item) => item._id === id);

  useEffect(() => {
    const settingDefaultValues = async () => {
      if (password) {
        const decryptPass = await EncryptDecryptUtil.decryptPass(
          password.password as string
        );

        setValue("id", id);
        setValue("title", password.title || "");
        setValue("url", password.url || "");
        setValue("username", password.username || "");
        setValue("email", password.email || "");
        setValue("password", decryptPass || "");
        setValue("isFav", password.is_fav || false);
        setValue("category", password.category || []);
        setValue("other", password.other || "");
      }
    };

    settingDefaultValues();
  }, [password, setValue, id]);

  if (isPasswordsLoading) {
    return <Text>Loading...</Text>;
  }

  if (!password) {
    return <Text>Password not found</Text>;
  }

  return (
    <MyScreenWrapperLayout className="p-4">
      <View className="flex flex-row items-center pt-14 pb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Entypo name="chevron-left" size={24} color={TailwindColor.white} />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold text-center flex-1">
          Update Password
        </Text>
      </View>
      <View>
        <View className="h-4"></View>
        <MyInputWithRHF
          control={updateControl}
          name="title"
          label="Enter Password Title"
          iconLeft={
            <Entypo name="leaf" size={16} color={TailwindColor.primary[100]} />
          }
        />

        <View className="h-4"></View>
        <MyInputWithRHF
          control={updateControl}
          name="url"
          label="Enter Site URL"
          iconLeft={
            <Entypo name="link" size={16} color={TailwindColor.primary[100]} />
          }
        />

        <View className="h-4"></View>
        <MyInputWithRHF
          control={updateControl}
          name="username"
          label="Enter Site Username"
          iconLeft={
            <Entypo name="user" size={16} color={TailwindColor.primary[100]} />
          }
        />

        <View className="h-4"></View>
        <MyInputWithRHF
          control={updateControl}
          name="email"
          label="Enter Email"
          inputMode="email"
          iconLeft={
            <Entypo name="email" size={16} color={TailwindColor.primary[100]} />
          }
        />

        <View className="h-4"></View>
        <MyInputWithRHF
          control={updateControl}
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
            control={updateControl}
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
          control={updateControl}
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
          control={updateControl}
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
        onPress={async () => {
          await updateHandleSubmit();
          router.back();
        }}
        title="Update"
        loading={isUpdateSubmitting}
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
