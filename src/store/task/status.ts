import { defineStore } from "pinia";
import { ref } from "vue";

export const useStatusStore = defineStore("status", () => {
    const selectedKey = ref<number[]>([101]);

    function setSelectedKey(key: number[]){
        selectedKey.value = key;
    }

    return {
        selectedKey,
        setSelectedKey
    }
})