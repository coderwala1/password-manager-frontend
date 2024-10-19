import MyButton from "@/components/form/my-button";
import { TailwindColor } from "@/config/color.config";
import { useGlobalModalStoreShowClose } from "@/hooks/global-modal.store";
import { IAllPassword } from "@/services/password/password.dto";
import { EncryptDecryptUtil } from "@/utils/encrypt-decrypt.util";
import Helper from "@/utils/Helper";
import { Feather } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { usePasswordController } from "../password/password.controller";

type PrivateStackParamList = {
  EditPasswordScreen: { param: string };
};

type NavigationProps = NativeStackNavigationProp<PrivateStackParamList>;

export default function SinglePassCard({ item }: { item: IAllPassword }) {
  const { deletePassword } = usePasswordController();
  const { showModal, closeModal } = useGlobalModalStoreShowClose();
  const navigation = useNavigation<NavigationProps>();

  const decryptPass = async () => {
    return await EncryptDecryptUtil.decryptPass(item.password);
  };

  return (
    <TouchableOpacity
      onPress={async () => {
        const pass = await decryptPass();
        showModal({
          displayType: "modal",
          visible: true,
          title: "Password Details",
          description: "",
          onClose: closeModal,
          customImage: (
            <MaterialCommunityIcons
              name="shield-star"
              size={45}
              color={TailwindColor.primary[500]}
            />
          ),
          showCloseIcon: true,
          children: (
            <View>
              <Text className="text-lg text-gray-300">Title: {item.title}</Text>
              <Text className="text-lg text-gray-300">
                Username: {item.username || "N/A"}
              </Text>
              <Text className="text-lg text-gray-300">
                Email: {item.email || "N/A"}
              </Text>
              <Text className="text-lg text-gray-300">
                Password: {pass || "N/A"}
              </Text>
              <View className="h-6"></View>
            </View>
          ),
          customButtons: (
            <View className="flex flex-row gap-6 justify-end">
              <MyButton
                title="Edit"
                onPress={() => {
                  navigation.navigate("EditPasswordScreen", {
                    param: item._id,
                  });

                  closeModal();
                }}
                variant="outline"
              />
              <MyButton
                title="Delete Password"
                onPress={() => {
                  deletePassword(item._id);
                  closeModal();
                }}
              />
            </View>
          ),
        });
      }}
    >
      <View className="flex flex-row justify-between items-center my-3">
        <View className="flex flex-row gap-4 items-center flex-1">
          <MaterialCommunityIcons
            name="shield-star"
            size={45}
            style={{
              color: Helper.randomColor() || TailwindColor.primary[500],
            }}
          />

          <View className="">
            <Text className="text-white font-bold text-base">{item.title}</Text>
            <Text className="text-white text-base font-light">
              {item.email}
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={async () => {
              await Clipboard.setStringAsync(item.password);
              Helper.Toast("Password Copied To Clipboard");
            }}
          >
            <Feather
              style={{ margin: 10 }}
              size={28}
              color={"white"}
              name="copy"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
