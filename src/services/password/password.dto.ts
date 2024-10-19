import { DateString } from "@/types/common.type"

export interface IAllPassword {
    _id: string
    url: string
    email: string
    username: string
    other: string
    is_fav: boolean
    category: string[]
    title: string
    password: string
    user: string
    created_at: DateString
    __v: number
}
