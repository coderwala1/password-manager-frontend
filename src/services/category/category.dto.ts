import { DateString } from "@/types/common.type"

// create category
export interface ICreateCategoryDto {
    title: string
}

// get categories
export interface ICategories {
    _id: string
    title: string
    user: string
    created_at: DateString
    __v: number
}
