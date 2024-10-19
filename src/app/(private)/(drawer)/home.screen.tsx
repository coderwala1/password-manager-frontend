import MyLoading from "@/components/common/my-loading";
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout";
import { useCategoryController } from "@/components/screen/category/category.controller";
import SinglePassCard from "@/components/screen/home/password-single-card";
import { usePasswordController } from "@/components/screen/password/password.controller";
import { IAllPassword } from "@/services/password/password.dto";
import React, { useEffect, useState } from "react";
import { Animated, FlatList, Text, TouchableOpacity } from "react-native";

type ItemData = {
  _id: string;
  title: string;
};

export default function HomeScreen() {
  const scrollY = new Animated.Value(0);

  const [cat, setCat] = useState<ItemData[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const { categories, isCategoriesLoading } = useCategoryController();
  const { passwords, isPasswordsLoading } = usePasswordController();

  const categoriesData = categories?.data.map((item) => {
    return {
      _id: item._id,
      title: item.title,
    };
  }) as ItemData[];

  useEffect(() => {
    if (categoriesData?.length > 0) {
      setCat([
        {
          _id: "all_cat",
          title: "All",
        },
        ...categoriesData,
      ]);
      setSelectedId("all_cat");
    }
  }, [categories]);

  const renderCategory = ({ item }: { item: ItemData }) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedId(item._id)}
        className={`mr-2 py-2 px-5 rounded-full ${
          item._id === selectedId ? "bg-primary-600" : "bg-gray-500"
        }`}
      >
        <Text className="text-primary-50 text-lg">{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const filteredPasswords =
    selectedId === "all_cat"
      ? passwords?.data
      : passwords?.data.filter((item: IAllPassword) =>
          selectedId ? item.category.includes(selectedId) : false
        );

  const renderPasswordCard = ({ item }: { item: IAllPassword }) => {
    return <SinglePassCard item={item} />;
  };

  if (isCategoriesLoading || isPasswordsLoading) {
    return <MyLoading />;
  }

  return (
    <MyScreenWrapperLayout className="px-4 flex-none">
      <FlatList
        horizontal={true}
        data={cat as ItemData[]}
        renderItem={renderCategory}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <Text className="text-primary-50 bg-gray-500 py-2 px-4 rounded-full">
            No category
          </Text>
        }
        showsHorizontalScrollIndicator={false}
        className="pt-3"
      />

      <FlatList
        data={filteredPasswords}
        renderItem={renderPasswordCard}
        ListEmptyComponent={
          <Text className="text-primary-50 p-10 text-center">
            No Password Found In this Category!
          </Text>
        }
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          let yValue = e.nativeEvent.contentOffset.y;
          scrollY.setValue(yValue);
        }}
        className="py-4"
      />
    </MyScreenWrapperLayout>
  );
}
