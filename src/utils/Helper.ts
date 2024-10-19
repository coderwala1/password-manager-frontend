import CryptoES from "crypto-es"
import { Platform, ToastAndroid } from "react-native"

const Helper = {
    randomColor: () => {
        const colors = [
            "#CD5C5C",
            "#FFA07A",
            "#40E0D0",
            "#ffcc33",
            "#9FE2BF",
            "#6495ED",
            "#808000",
            "#9f8b80",
            "#2baabf",
        ]
        const max = colors.length
        const random = Math.round(Math.random() * max)
        return colors[random]
    },
    Toast: (msg: string) => {
        if (Platform.OS === "android") {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else if (Platform.OS === "ios") {
            // AlertIOS.alert(msg);
        } else {
            alert(msg)
        }
    }, //Toast
    getMasterPassHash: (master_pass: string) => {
        const hash = CryptoES.SHA256(master_pass).toString()
        return hash
    },
}

export default Helper
