import { Ref, ref } from "vue"

export function useTaskListInput() {
    const inputRef: Ref<HTMLInputElement | null> = ref(null)

    function onFocus() {
        inputRef.value!.focus()
    }

    return {
        inputRef,
        onFocus,
    }
}