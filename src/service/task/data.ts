import { TaskState } from "./task";

export const fetchData = {
    projects: [
        {
            name: "快捷",
            tasks: [
                {
                    title: "吃饭",
                    content: "## 吃饭 \n 吃什么好呢",
                    state: TaskState.ACTIVE,
                    id: crypto.randomUUID()
                },
                {
                    title: "睡觉",
                    content: "## 睡觉 \n 早睡早起 身体好",
                    state: TaskState.ACTIVE,
                    id: crypto.randomUUID()
                },
                {
                    title: "写代码",
                    content: "## 写代码 \n 日常写码2个点",
                    state: TaskState.COMPLETED,
                    id: crypto.randomUUID()
                },
            ],
        },
        {
            name: "集草器",
            tasks: [
                {
                    title: "哈哈哈",
                    content: "hahaha",
                    state: TaskState.ACTIVE,
                    id: crypto.randomUUID()
                },
                {
                    title: "嘿嘿嘿",
                    content: "heiheihei",
                    state: TaskState.ACTIVE,
                    id: crypto.randomUUID()
                },
            ],
        },
    ],
    completed: {
        name: '已完成',
        tasks: [
            {
                title: '完成1',
                content: '',
                id: crypto.randomUUID(),
                previousProjectName: '快捷',
            },
            {
                title: '完成2',
                content: '',
                id: crypto.randomUUID(),
                previousProjectName: '快捷',
            },
        ],
    },
    trash: {
        name: "垃圾桶",
        tasks: [
            {
                title: "我是被删除的 task",
                content: "",
                state: TaskState.REMOVED,
                id: crypto.randomUUID()
            },
        ],
    },
};