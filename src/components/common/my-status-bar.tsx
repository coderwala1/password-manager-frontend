import { TailwindColor } from "@/config/color.config"
import { useColorScheme } from "nativewind"
import React from "react"
import { StatusBar } from "react-native"

export default function MyStatusBar() {
    const { colorScheme } = useColorScheme()

    return <StatusBar barStyle={"light-content"} backgroundColor={TailwindColor.gray[900]} />
}
