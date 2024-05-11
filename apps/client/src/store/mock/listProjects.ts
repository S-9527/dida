import { vi } from 'vitest'
import type { ListProject } from '@/store'
import { TasksSelectorType } from "@/store";

export const useListProjectsStore = vi.fn(() => {
    return {
        findProject(): ListProject {
            return {
                id: '1',
                name: '集草器',
                type: TasksSelectorType.listProject,
            }
        },
    }
})
