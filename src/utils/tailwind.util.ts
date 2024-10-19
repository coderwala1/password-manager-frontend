import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const TailwindUtil = {
    cn: (...inputs: ClassValue[]) => {
        return twMerge(clsx(inputs))
    },
}
