import { Image, ImageResizeMode, ImageSourcePropType, Platform } from "react-native"

export const MyImage = ({
    source,
    resizeMode = "contain",
}: {
    source: ImageSourcePropType
    resizeMode?: ImageResizeMode
}) => {
    return (
        <Image
            source={source}
            style={{
                width: Platform.OS === "web" ? "100%" : "100%",
                height: Platform.OS === "web" ? "100%" : "100%",
            }}
            resizeMode={resizeMode}
        />
    )
}
