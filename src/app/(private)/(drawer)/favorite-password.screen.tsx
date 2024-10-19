import MyLoading from "@/components/common/my-loading";
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout";
import SinglePassCard from "@/components/screen/home/password-single-card";
import { usePasswordController } from "@/components/screen/password/password.controller";
import { IAllPassword } from "@/services/password/password.dto";
import React from "react";
import { Animated, FlatList, Text } from "react-native";

export default function FavoritePasswordScreen() {
  const scrollY = new Animated.Value(0);
  const { allFav, isAllFavLoading } = usePasswordController();

  const renderPasswordCard = ({ item }: { item: IAllPassword }) => {
    return <SinglePassCard item={item} />;
  };

  if (isAllFavLoading) {
    return <MyLoading />;
  }
  return (
    <MyScreenWrapperLayout className="px-4 flex-none">
      <FlatList
        data={allFav}
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
