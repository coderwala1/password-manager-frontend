import React from "react"
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native"

interface IHeader {
    goBack: () => void
}

export default function Header({ goBack }: IHeader) {
    return (
        <View>
            <StatusBar translucent backgroundColor="transparent" barStyle={"light-content"} />
            <View className="flex-row justify-between items-center bg-primary-700 p-4">
                <TouchableOpacity onPress={() => goBack()}>
                    <Image
                        source={{
                            uri: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/boy-1024.png",
                        }}
                        className="w-9 h-9 rounded-3xl"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => null}>
                    {/* <Image source={ImageConstant.IC_NOTIFICATION} className="w-9 h-9 rounded-3xl" /> */}
                    <Text>🔔</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
