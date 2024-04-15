import {TaskState} from "@/store/task/const.ts";
import { nanoid } from "nanoid";

export const fetchData = {
    projectList: [
        {
            name: "快捷",
            taskList: [
                {
                    title: "吃饭",
                    content: "## 吃饭 \n 吃什么好呢",
                    state: TaskState.ACTIVE,
                    id: nanoid()
                },
                {
                    title: "睡觉",
                    content: "## 睡觉 \n 早睡早起 身体好",
                    state: TaskState.ACTIVE,
                    id: nanoid()
                },
                {
                    title: "写代码",
                    content: "## 写代码 \n 日常写码2个点",
                    state: TaskState.COMPLETED,
                    id: nanoid()
                },
            ],
        },
        {
            name: "集草器",
            taskList: [
                {
                    title: "哈哈哈",
                    content: "hahaha",
                    state: TaskState.ACTIVE,
                    id: nanoid()
                },
                {
                    title: "嘿嘿嘿",
                    content: "heiheihei",
                    state: TaskState.ACTIVE,
                    id: nanoid()
                },
            ],
        },
    ],
    trash: {
        name: "垃圾桶",
        taskList: [
            {
                title: "我是被删除的 task",
                content: "",
                state: TaskState.REMOVED,
                id: nanoid()
            },
        ],
    },
};