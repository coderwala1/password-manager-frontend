import MyButton from "@/components/form/my-button"
import MyInputWithRHF from "@/components/form/my-input"
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout"
import { useCategoryController } from "@/components/screen/category/category.controller"
import { TailwindColor } from "@/config/color.config"
import { Entypo } from "@expo/vector-icons"
import React from "react"
import { View } from "react-native"

export default function CreateCategoryScreen() {
    const { control, handleSubmit, isSubmitting, categories } = useCategoryController()
    console.log(categories)

    return (
        <MyScreenWrapperLayout className="px-4 justify-center">
            <View>
                <MyInputWithRHF
                    control={control}
                    name="name"
                    label="Enter category name"
                    inputMode="text"
                    iconLeft={<Entypo name="attachment" size={24} color={TailwindColor.primary[50]} />}
                />

                <View className="h-4"></View>
                <MyButton onPress={() => handleSubmit()} title="Create category" loading={isSubmitting} />
            </View>
        </MyScreenWrapperLayout>
    )
}
