<template>
  <NTree
      v-model:selected-keys="projectSelectedStatusStore.selectedKey"
      :default-expanded-keys="defaultExpandedKeys"
      block-line
      expand-on-click
      :data="data"
      :node-props="nodeProps"
      @update:expanded-keys="onExpandedKey"
      @update:selected-keys="changeSelectedKey"
  />
  <ProjectCreatedView ref="projectViewRef" />
</template>

<script setup lang="ts">
import { useProjectSelectedStatusStore, useTaskStore } from '@/store'
import { NTree, TreeOption } from 'naive-ui'
import { h, onMounted, ref, watchEffect } from 'vue'
import ProjectCreatedView from "@/components/task/ProjectCreatedView.vue";
import 'vue3-emoji-picker/css'
import {findProjectByName} from "@/service/task/project.ts";
import {Icon} from "@iconify/vue";
import {Tag} from "@/service/task";
import {findTagByName} from "@/service/task/tag.ts";
import ContextMenu, {MenuItem} from "@imengyu/vue3-context-menu";
import { tagCreateViewDialog } from "@/components/task/TagCreateView";
import { tagRemoveAlert } from "@/components/task/TagRemoveAlert";

enum TreeRootKeys {
  PROJECT = 100,
  TAG = 200,
}

const { projectViewRef } = useCreateProjectButton()

function useCreateProjectButton() {
  const projectViewRef = ref()
  return {
    projectViewRef,
  }
}

const createRootNodeSuffix = (onclick: (e: Event) => void) => {
  return () => h(Icon, {
    icon: 'ic:baseline-plus',
    width: '20',
    class: 'invisible rounded-1 hover:bg-gray-2',
    onclick,
  })
}

const createTagLeafPrefix = () => {
  return () => h(Icon, {
    icon: 'carbon:tag',
    width: '14',
  })
}

const createOperateNodeBtn = (items: MenuItem[]) => {
  return h(Icon, {
    class: 'invisible',
    icon: 'mdi:dots-horizontal',
    width: '20',
    onclick(e: MouseEvent) {
      e.preventDefault()
      ContextMenu.showContextMenu({
        x: e.x,
        y: e.y,
        items,
      })
    },
  })
}

const createTagLeafSuffix = (tag: Tag) => {
  return () => h('div', { class: 'flex flex-row items-center' },
      [
        h(Icon, {
          icon: 'carbon:circle-solid',
          width: '8',
          color: tag.color,
          class: 'mx-2',
        }),
        createOperateNodeBtn([
          {
            label: 'edit',
            onClick: () => tagCreateViewDialog({ tag }),
          },
          {
            label: 'remove',
            onClick: () => {
              tagRemoveAlert({
                tagName: tag.name,
              }).then((action: any) => {
                // eslint-disable-next-line no-console
                console.log(action)
                if (action === 'confirm')
                  taskStore.deleteTag(tag.id)
              })
            },
          },
        ]),
      ],
  )
}

const generateTagChildrenNode = (tags: Tag[]) => {
  if (!tags.length) {
    return [
      {
        label: '以标签的维度展示不同清单的任务。在添加任务时输入“#”可快速选择标签',
        placeholder: true,
      },
    ]
  }
  return tags.map((tag, index) => ({
    key: TreeRootKeys.TAG + index + 1,
    label: tag.name,
    color: tag.color,
    prefix: createTagLeafPrefix(),
    suffix: createTagLeafSuffix(tag),
    isLeaf: true,
  }))
}

const projectSelectedStatusStore = useProjectSelectedStatusStore()
const taskStore = useTaskStore()

const defaultExpandedKeys = ref<TreeRootKeys[]>([])

const treeProjectChildren = ref<TreeOption[]>([])

const treeTagChildren = ref<TreeOption[]>([])

watchEffect(() => {
  treeProjectChildren.value = taskStore.projectNames.map((projectName, index) => ({
    key: TreeRootKeys.PROJECT + index + 1,
    label: projectName,
    isLeaf: true,
  }))

  treeTagChildren.value = generateTagChildrenNode(taskStore.tags)
})

onMounted(() => {
  defaultExpandedKeys.value = [...new Set([
    ...(taskStore.projectNames.length ? [] : [TreeRootKeys.PROJECT]),
    ...(taskStore.tags.length ? [] : [TreeRootKeys.TAG]),
    ...projectSelectedStatusStore.listDefaultSelectedKey,
  ])]
})

const data = ref<any[]>([
  {
    key: TreeRootKeys.PROJECT,
    label: '清单',
    checkboxDisabled: false,
    isLeaf: false,
    children: treeProjectChildren,
    suffix: createRootNodeSuffix((e: Event) => {
      projectViewRef.value.toggleShowModal()
      e.stopPropagation()
    }),
  },
  {
    key: TreeRootKeys.TAG,
    label: '标签',
    checkboxDisabled: false,
    isLeaf: false,
    children: treeTagChildren,
    suffix: createRootNodeSuffix((e: Event) => {
      e.stopPropagation()
      tagCreateViewDialog().then(() => {
        // eslint-disable-next-line no-console
        console.log('done')
      })
    }),
  },
])
const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onClick() {
      if (option.key === TreeRootKeys.PROJECT || option.key === TreeRootKeys.TAG) return
      if (option.key! < 200) {
        const project = findProjectByName(option.label)
        if (project) {
          taskStore.selectProject(project)
        }
      }

      const tag = findTagByName(option.label)
      if (tag) {
        taskStore.selectCategory(tag)
      }
    },
    class: option.placeholder ? 'placeholder' : '',
  }
}

const changeSelectedKey = (key: number[]) => {
  if (key[0] === TreeRootKeys.PROJECT) {
    projectSelectedStatusStore.changePreSelectKey(projectSelectedStatusStore.selectedKey)
  }

  projectSelectedStatusStore.changeSelectedKey(key)
}

const onExpandedKey = (key: number[]) => {
  if (key.includes(TreeRootKeys.PROJECT)) {
    projectSelectedStatusStore.changeSelectedKey(projectSelectedStatusStore.preSelectKey)
  }
}
</script>

<style>
.n-tree.n-tree--block-line .n-tree-node:not(.n-tree-node--disabled).n-tree-node--pending {
  background-color: transparent;
}
.n-tree.n-tree--block-line .n-tree-node:not(.n-tree-node--disabled).n-tree-node--selected {
  background-color: var(--n-node-color-active)
}

.n-tree-node-wrapper .placeholder .n-tree-node-indent {
  display: none;
}

.n-tree-node-wrapper .placeholder .n-tree-node-switcher {
  display: none;
}

.n-tree-node-wrapper .placeholder {
  pointer-events: none;
  padding: 6px 8px;
  margin: 0 8px 0 20px;
  background-color: rgb(25, 25, 25, 0.03);
  border-radius: 4px;
}

.n-tree-node-wrapper .placeholder .n-tree-node-content__text {
  color: rgb(25, 25, 25, 0.4);
  font-size: 12px;
}

.dark .n-tree-node-wrapper .placeholder {
  background-color: rgb(59,59,59, 1);
}

.dark .placeholder .n-tree-node-content__text {
  color: rgba(156,163,175,0.5);
}

.n-tree.n-tree--block-line .n-tree-node:not(.n-tree-node--disabled):hover .iconify {
  visibility: visible;
}
</style>
