import { TailwindColor } from "@/config/color.config"
import { Feather } from "@expo/vector-icons"
import React from "react"
import { Text, View } from "react-native"

export default function ErrorMessage({ error }: { error: string }) {
    return (
        <View className="flex-row items-center justify-end mt-1 mx-2">
            <Feather name="info" size={16} color={TailwindColor.error} />
            <Text className="text-error mr-2"> {error || "Mandatory field"}</Text>
        </View>
    )
}
