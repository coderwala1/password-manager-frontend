import { RouteConstant } from "@/constants/route.constant"
import { useUserStore } from "@/hooks/user.store"
// import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer"
import { Redirect, Slot } from "expo-router"
import React from "react"
import { SafeAreaView, Text } from "react-native"

export default function PrivateLayout() {
    // todo: check if user is not logged in. redirect to login.screen
    const user = useUserStore(s => s.user)

    if (!user) {
        return <Redirect href={RouteConstant.AUTH_NAV.LOGIN_SCREEN} />
    }

    if (user) {
        return <Slot />
    }

    return (
        <SafeAreaView className="flex-1 justify-center items-center">
            <Text>Please Verify</Text>
        </SafeAreaView>
    )
}
