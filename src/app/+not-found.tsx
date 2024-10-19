import MyButton from "@/components/form/my-button"
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout"
import { router } from "expo-router"
import React from "react"
import { Text, View } from "react-native"

export default function NotFoundScreen({}) {
    return (
        <MyScreenWrapperLayout className="justify-center">
            <View className="h-10"></View>
            <Text className="text-primary-500 text-[82px] font-bold text-center">404</Text>
            <Text className="text-white text-2xl text-center">Page Not Found</Text>

            <View className="h-6"></View>

            <View className="w-1/2 mx-auto">
                <MyButton title="Go Back" onPress={() => router.back()} />
            </View>
            <View className="h-20"></View>
        </MyScreenWrapperLayout>
    )
}
