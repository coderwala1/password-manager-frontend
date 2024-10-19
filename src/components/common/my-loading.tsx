import { TailwindColor } from "@/config/color.config"
import React from "react"
import { ActivityIndicator, Text, View } from "react-native"
import MyScreenWrapperLayout from "../layout/my-screen-wrapper.layout"

export default function MyLoading({ size = 30 }: { size?: number }) {
    return (
        <MyScreenWrapperLayout className="justify-center items-center">
            <View className="flex flex-row gap-2 items-center">
                <ActivityIndicator color={TailwindColor.primary[500]} size={size} />
                <Text className="text-primary-50 text-lg">loading...</Text>
            </View>
        </MyScreenWrapperLayout>
    )
}
