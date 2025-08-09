import Fuse, { FuseResult } from "fuse.js";
import { ref } from "vue";
import type { TasksSelector } from "@/store";
import {
  completeSmartProject,
  TaskStatus,
  useListProjectsStore,
  useTasksStore,
} from "@/store";

interface SearchTaskItem {
  id: string;
  title: string;
  desc: string;
  done: boolean;
  from: TasksSelector | undefined;
}

const filteredTasks = ref<FuseResult<SearchTaskItem>[]>([]);
const fuse = new Fuse([] as SearchTaskItem[], {
  keys: ["title", "desc"],
});

export function useSearchTasks() {
  const tasksStore = useTasksStore();
  const projectsStore = useListProjectsStore();
  async function searchTasks(input: string) {
    const tasks = await tasksStore.findAllTasksNotRemoved();

    const fuseTasks = tasks.map((task) => {
      const done = task.status === TaskStatus.COMPLETED;
      const from = done
        ? completeSmartProject
        : projectsStore.findProject(task.projectId);
      return {
        id: task.id,
        title: task.title,
        desc: task.content,
        done,
        from,
      };
    });
    fuse.setCollection(fuseTasks);

    filteredTasks.value = fuse.search(input);
  }

  function resetSearchTasks() {
    filteredTasks.value = [];
  }

  return {
    filteredTasks,
    searchTasks,
    resetSearchTasks,
  };
}
