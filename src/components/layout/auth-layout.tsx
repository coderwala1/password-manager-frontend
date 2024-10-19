import { KeyConstant } from "@/constants/key.constant"
import { useUserStore } from "@/hooks/user.store"
import { ICurrentUser } from "@/services/user/user.dto"
import { UserService } from "@/services/user/user.service"
import { AsyncStorageUtil } from "@/utils/async-storage.util"
import { PropsWithChildren, useEffect, useState } from "react"
import MyLoading from "../common/my-loading"

export default function AuthWrapper({ children }: PropsWithChildren) {
    const { setCurrentUser, logout, user } = useUserStore()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await UserService.getLoggedInUser()
                console.log(data)

                //clear async storage if false
                if (!data) {
                    await AsyncStorageUtil.removeData(KeyConstant.LOGGED_IN_USER)
                }

                const res = await AsyncStorageUtil.getData<{ state: { loading: boolean; user: ICurrentUser } }>(
                    KeyConstant.LOGGED_IN_USER
                )

                setCurrentUser(res?.state.user as ICurrentUser)
                setLoading(false)
            } catch (error) {
                console.log(error)
                logout()
                setLoading(false)
            }
        }

        fetchData()
    }, [setCurrentUser, logout])
    if (isLoading) {
        return <MyLoading />
    }
    return <>{children}</>
}
