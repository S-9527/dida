<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NPopover,
} from 'naive-ui'
import { computed, ref } from 'vue'
import EmojiPicker from 'vue3-emoji-picker'
import { useListProjectsStore } from '@/store'
import { useProjectCreatedView } from './projectCreatedView'
import 'vue3-emoji-picker/css'

const props = defineProps({
  show: { type: Boolean },
})
const emits = defineEmits([
  'update:show',
  'close',
  'closed',
  'cancel',
  'confirm',
])
const inputElement = ref<HTMLInputElement>()
const projectsStore = useListProjectsStore()

const {
  cleanupInput,
  emojiValue,
  formRules,
  formValue,
  getDefaultEmojiConfig,
  handleMouseLeave,
  handleMouseOver,
  handleSelectEmoji,
  handleUpdateShow,
  isHover,
  isSavable,
  isShowPopover,
} = useProjectCreatedView(inputElement)

const { EMOJI_STATIC_TEXTS, EMOJI_GROUPS_NAMES } = getDefaultEmojiConfig()
type Actions = 'close' | 'cancel' | 'confirm'
const isShowModal = computed({
  get() {
    return props.show
  },
  set(val) {
    emits('update:show', val)
  },
})
function handleActions(action: Actions) {
  emits(action)
  cleanupInput()
  isShowModal.value = false
  emits('closed')
}

function handleSave() {
  let projectName = formValue.value.projectName
  emojiValue.value && (projectName = emojiValue.value + projectName)
  projectsStore.createProject(projectName)
  handleActions('confirm')
}
</script>

<template>
  <NModal
    v-model:show="isShowModal"
    transform-origin="center"
    :mask-closable="!isSavable"
    @esc="handleActions('close')"
    @close="handleActions('close')"
  >
    <div
      class="w-[min(520px,calc(100vw-32px))] overflow-hidden border border-line rounded-xl bg-panel shadow-elev-3"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-center justify-between border-b border-line px-20px py-16px"
      >
        <h2 class="text-16px font-semibold">
          添加清单
        </h2>
        <button class="icon-btn" aria-label="关闭" @click="handleActions('close')">
          <Icon icon="carbon-close" width="16" />
        </button>
      </div>

      <div
        class="p-20px"
        @mouseover="handleMouseOver"
        @mouseleave="handleMouseLeave"
      >
        <NForm :model="formValue" :rules="formRules" label-placement="top">
          <NFormItem path="projectName" label="名称" class="mb-0">
            <NInput
              ref="inputElement"
              v-model:value="formValue.projectName"
              placeholder="名称"
            >
              <template #prefix>
                <NPopover
                  v-if="isHover"
                  placement="bottom"
                  trigger="click"
                  :show="isShowPopover"
                  :show-arrow="false"
                  @update:show="handleUpdateShow"
                >
                  <template #trigger>
                    <NButton text @click="isShowPopover = !isShowPopover">
                      <template #icon>
                        <span v-if="emojiValue">{{ emojiValue }}</span>
                        <Icon v-else icon="fa-solid:smile-wink" />
                      </template>
                    </NButton>
                  </template>
                  <EmojiPicker
                    picker-type="inputValue"
                    :native="true"
                    :static-texts="EMOJI_STATIC_TEXTS"
                    :group-names="EMOJI_GROUPS_NAMES"
                    @select="handleSelectEmoji"
                  />
                </NPopover>
                <NButton v-else text>
                  <template #icon>
                    <Icon icon="ic:outline-menu" />
                  </template>
                </NButton>
              </template>
            </NInput>
          </NFormItem>
        </NForm>
      </div>

      <div
        class="flex items-center justify-end gap-10px border-t border-line bg-inset px-20px py-12px"
      >
        <NButton class="h-30px rounded-lg px-12px" @click="handleActions('cancel')">
          关闭
        </NButton>
        <NButton
          type="primary"
          class="h-30px rounded-lg px-12px"
          :disabled="!isSavable"
          @click="handleSave"
        >
          保存
        </NButton>
      </div>
    </div>
  </NModal>
</template>
