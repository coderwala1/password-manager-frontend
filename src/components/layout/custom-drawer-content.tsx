import { TailwindColor } from "@/config/color.config";
import { ImageConstant } from "@/constants/image.constant";
import { useUserStore } from "@/hooks/user.store";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Text, View } from "react-native";
import { MyImage } from "../common/my-image";
import { useLoginController } from "../screen/login/login.controller";

export const CustomDrawerContent = (props: any) => {
  const { logoutUser } = useLoginController();
  const { user } = useUserStore();

  return (
    <View className="flex-1">
      <DrawerContentScrollView {...props}>
        <View className="pt-10 pb-4 px-6">
          <View className="w-20 h-20 p-5 bg-gray-50 rounded-[96px]">
            <MyImage source={ImageConstant.APP_ICON} />
          </View>
          <View className="h-4" />
          <Text className="text-gray-300 italic">{user?.email}</Text>
        </View>

        <DrawerItemList {...props} />

        <DrawerItem
          icon={() => (
            <Ionicons
              name="log-out-outline"
              color={TailwindColor.primary[50]}
              size={24}
            />
          )}
          label={"Logout"}
          onPress={() => logoutUser()}
          labelStyle={{ color: TailwindColor.primary[50], marginLeft: -15 }}
        />
      </DrawerContentScrollView>
    </View>
  );
};
