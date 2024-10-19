// logged in user global state with zustand store
import { KeyConstant } from "@/constants/key.constant"
import { ICurrentUser } from "@/services/user/user.dto"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createJSONStorage, persist } from "zustand/middleware"
import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"
import { AsyncStorageUtil } from "../utils/async-storage.util"

interface IUserStore {
    loading: boolean
    user?: ICurrentUser | null

    // * actions
    setCurrentUser: (user: ICurrentUser) => void
    logout: () => void
}

export const useUserStore = createWithEqualityFn<IUserStore>()(
    persist(
        set => {
            return {
                loading: true,
                user: undefined,
                // * actions
                setCurrentUser: (user: ICurrentUser) => {
                    set(old => ({ ...old, user: user, loading: false }))
                },

                logout: () => {
                    AsyncStorageUtil.removeData("tokens")
                    set(old => ({ ...old, user: undefined, loading: false }))
                },
            }
        },
        {
            name: KeyConstant.LOGGED_IN_USER,
            storage: createJSONStorage(() => AsyncStorage),
        }
    ),
    shallow
)
