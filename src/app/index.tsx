import { RouteConstant } from "@/constants/route.constant"
import { Redirect } from "expo-router"

export default function Index() {
    return <Redirect href={RouteConstant.AUTH_NAV.LOGIN_SCREEN} />
}
