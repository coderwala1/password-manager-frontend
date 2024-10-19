import MyLoading from "@/components/common/my-loading";
import MyButton from "@/components/form/my-button";
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout";
import { useCategoryController } from "@/components/screen/category/category.controller";
import { TailwindColor } from "@/config/color.config";
import { useGlobalModalStoreShowClose } from "@/hooks/global-modal.store";
import { ICategories } from "@/services/category/category.dto";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function CategoriesScreen() {
  const { showModal, closeModal } = useGlobalModalStoreShowClose();
  const { categories, isCategoriesLoading, deleteCategory } =
    useCategoryController();

  const renderCategory = ({ item }: { item: ICategories }) => {
    const onDelete = () => {
      showModal({
        displayType: "modal",
        visible: true,
        title: "Delete Category",
        description: "Are you sure you want to delete this category?",
        onClose: closeModal,
        customImage: <MaterialIcons name="delete" size={40} />,

        customButtons: (
          <View className="flex flex-row gap-6 justify-center mt-8">
            <MyButton
              title="Cancel"
              onPress={() => closeModal()}
              variant="outline"
            />
            <MyButton
              title="Delete"
              onPress={async () => {
                await deleteCategory(item._id);
                closeModal();
              }}
              variant="danger"
            />
          </View>
        ),
      });
    };

    return (
      <TouchableOpacity className="flex flex-row justify-between">
        <Text className="text-primary-50 py-2 text-lg">{item?.title}</Text>
        <MaterialIcons
          size={25}
          name="delete-outline"
          color={TailwindColor.primary[50]}
          onPress={onDelete}
        />
      </TouchableOpacity>
    );
  };

  if (isCategoriesLoading) {
    return <MyLoading />;
  }
  return (
    <MyScreenWrapperLayout className="px-4">
      <FlatList
        data={categories?.data}
        renderItem={renderCategory}
        ListEmptyComponent={
          <Text className="text-primary-50 p-10 text-center">
            No Cateogy Found!
          </Text>
        }
        keyExtractor={(item) => String(item._id)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      />
    </MyScreenWrapperLayout>
  );
}
