import { IModal } from "@/components/common/my-modal"
import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"

interface IGlobalModalStore {
    modal: IModal
    // * actions
    showModal: (modal: IModal) => void
    closeModal: () => void
}

const useGlobalModalStore = createWithEqualityFn<IGlobalModalStore>()(set => {
    return {
        modal: {
            visible: false,
            title: "",
            description: "",
            onClose: () => {},
        },
        // * actions
        showModal: (modal: IModal) => {
            set(old => ({ ...old, modal }))
        },
        closeModal: () => {
            set(old => ({
                ...old,
                modal: {
                    visible: false,
                    title: "",
                    description: "",
                    onClose: () => {},
                },
            }))
        },
    }
}, shallow)

export const useGlobalModal = () => {
    return useGlobalModalStore(state => state.modal)
}

export const useGlobalModalStoreShowClose = () => {
    const showModal = useGlobalModalStore(state => state.showModal)
    const closeModal = useGlobalModalStore(state => state.closeModal)
    return {
        showModal,
        closeModal,
    }
}
