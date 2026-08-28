import path from 'node:path'
import * as bcrypt from 'bcrypt'
import { config as loadEnv } from 'dotenv'
import { createPrismaClient } from '../src/client'

const repoRoot = path.resolve(__dirname, '../../..')
loadEnv({ path: path.join(repoRoot, '.env') })

const SALT_ROUNDS = 10

const seedUser = {
  username: 'demo',
  password: 'dida123',
}

const seedProjects = [
  { name: '工作', tasks: [
    { title: '整理本周工作周报', content: '# 周报要点\n\n- 完成任务拆解\n- 跟进项目进度\n- 编写技术文档' },
    { title: '代码评审与优化', content: '- [ ] 审查 PR #12\n- [ ] 优化慢查询\n- [x] 修复边界 bug', status: 'COMPLETED' },
    { title: '准备技术分享会', content: '分享主题：前端性能优化实战\n\n1. 加载性能\n2. 渲染性能\n3. 网络优化' },
  ]},
  { name: '生活', tasks: [
    { title: '买菜做饭', content: '清单：\n\n- 西红柿\n- 鸡蛋\n- 牛奶\n- 水果' },
    { title: '安排周末健身计划', content: '周一 胸肌\n周三 背\n周五 腿\n周日 有氧' },
    { title: '阅读计划', content: '本月目标读完 3 本书\n\n1. 《设计模式》\n2. 《架构整洁之道》\n3. 《代码整洁之道》', status: 'COMPLETED' },
    { title: '清理旧文件', content: '整理桌面与文档目录' },
  ]},
  { name: '学习', tasks: [
    { title: '学习 Prisma 进阶', content: '# Prisma 学习笔记\n\n- 关系建模\n- 聚合查询\n- 事务处理' },
    { title: '深入 NestJS 架构', content: '- 模块化\n- 依赖注入\n- 守卫与拦截器\n- 管道校验' },
    { title: 'Vue3 组合式函数实践', content: '封装可复用的业务逻辑' },
    { title: '学习 TypeScript 类型体操', content: '泛型、条件类型、映射类型' },
  ]},
]

async function main() {
  const prisma = createPrismaClient()

  try {
    const password = await bcrypt.hash(seedUser.password, SALT_ROUNDS)

    let user = await prisma.user.findUnique({ where: { username: seedUser.username } })
    if (!user) {
      user = await prisma.user.create({
        data: { username: seedUser.username, password },
      })
      console.log(`Created user "${seedUser.username}"`)
    }
    else {
      await prisma.user.update({
        where: { id: user.id },
        data: { password },
      })
      console.log(`Reset password for user "${seedUser.username}"`)
    }

    for (const projectDef of seedProjects) {
      let project = await prisma.project.findFirst({
        where: { name: projectDef.name, userId: user.id },
      })
      if (!project) {
        project = await prisma.project.create({
          data: { name: projectDef.name, userId: user.id },
        })
        console.log(`Created project "${projectDef.name}"`)
      }

      const existingTasks = await prisma.task.findMany({
        where: { projectId: project.id },
      })

      for (const taskDef of projectDef.tasks) {
        const existingTask = existingTasks.find(t => t.title === taskDef.title)
        if (existingTask)
          continue

        await prisma.task.create({
          data: {
            title: taskDef.title,
            content: taskDef.content ?? '',
            status: (taskDef.status ?? 'ACTIVE') as 'ACTIVE',
            projectId: project.id,
            userId: user.id,
          },
        })
        console.log(`  Created task "${taskDef.title}"`)
      }
    }

    console.log('Seed data created successfully.')
  }
  finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
