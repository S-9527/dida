enum Sidebars {
    Theme = '主题',
    Smart = '智能清单',
}

interface SidebarItem {
    title: Sidebars
    name: string
    path: string
}

export const sidebars: SidebarItem[] = [
    {
        title: Sidebars.Theme,
        name: 'Theme',
        path: '/theme',
    },
    {
        title: Sidebars.Smart,
        name: 'Smart',
        path: '/smart',
    },
]