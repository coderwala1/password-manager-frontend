import { TailwindUtil } from "@/utils/tailwind.util"
import React from "react"
import { Platform, SafeAreaView, ScrollView, View, ViewProps } from "react-native"

interface IMyScreenWrapper extends ViewProps {
    children: React.ReactNode
    disableSafeAreaView?: boolean
    scrollView?: boolean
}

export default function MyScreenWrapperLayout({
    children,
    className,
    disableSafeAreaView = false,
    scrollView = false,
    ...others
}: IMyScreenWrapper) {
    if (disableSafeAreaView) {
        return (
            <>
                {scrollView ? (
                    <ScrollView contentContainerClassName="flex-1" showsVerticalScrollIndicator={false}>
                        <View
                            className={TailwindUtil.cn(
                                `flex-1  ${Platform.OS === "web" ? "w-[420px] mx-auto" : ""}`,
                                className
                            )}
                            {...others}>
                            {children}
                        </View>
                    </ScrollView>
                ) : (
                    <View
                        className={TailwindUtil.cn(
                            `flex-1 ${Platform.OS === "web" ? "w-[420px] mx-auto justify-center" : ""}`,
                            className
                        )}
                        {...others}>
                        {children}
                    </View>
                )}
            </>
        )
    }
    return (
        <SafeAreaView className={`bg-gray-900 flex-1`}>
            {scrollView ? (
                <ScrollView
                    contentContainerClassName={TailwindUtil.cn(
                        `bg-gray-900 ${Platform.OS === "web" ? "w-[420px] mx-auto" : ""} `,
                        className
                    )}>
                    {children}
                </ScrollView>
            ) : (
                <View
                    className={TailwindUtil.cn(
                        `flex-1 bg-gray-900 ${Platform.OS === "web" ? "w-[420px] mx-auto" : ""}`,
                        className
                    )}
                    {...others}>
                    {children}
                </View>
            )}
        </SafeAreaView>
    )
}
