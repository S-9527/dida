import type { INestApplication } from '@nestjs/common'
import type { TestingModule } from '@nestjs/testing'
import path from 'node:path'
import { Test } from '@nestjs/testing'
import cookieParser from 'cookie-parser'
import { config as loadEnv } from 'dotenv'
import request from 'supertest'
import { AppModule } from '../src/app/app.module'
import { appGlobalMiddleware } from '../src/core/useGlobal'

const repoRoot = path.resolve(__dirname, '../../..')
loadEnv({ path: path.join(repoRoot, '.env') })

describe('Auth guards (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.use(cookieParser())
    appGlobalMiddleware(app)
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('rejects unauthenticated requests to /tasks', async () => {
    const res = await request(app.getHttpServer()).get('/tasks')
    expect(res.status).toBe(401)
    expect(res.body.code).toBe(-1)
  })

  it('rejects unauthenticated requests to /projects', async () => {
    const res = await request(app.getHttpServer()).get('/projects')
    expect(res.status).toBe(401)
  })

  it('rejects unauthenticated requests to /users/me', async () => {
    const res = await request(app.getHttpServer()).get('/users/me')
    expect(res.status).toBe(401)
  })

  it('rejects a malformed Authorization scheme', async () => {
    const res = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', 'Basic not-a-jwt')
    expect(res.status).toBe(401)
  })

  it('returns the standard error envelope', async () => {
    const res = await request(app.getHttpServer()).get('/tasks')
    expect(res.body).toEqual(
      expect.objectContaining({
        code: -1,
        message: expect.any(String),
        data: {},
      }),
    )
  })

  it('accepts signup with a valid password confirmation', async () => {
    const username = `e2e_${Date.now()}`
    const res = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        username,
        password: 'password123',
        confirmPassword: 'password123',
      })
    expect(res.status).toBe(201)
    expect(res.body.data.user.username).toBe(username)
  })

  it('rejects signup when the two passwords differ', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        username: `e2e_${Date.now()}`,
        password: 'password123',
        confirmPassword: 'different123',
      })
    expect(res.body.message).toContain('两次输入的密码不一致')
  })

  it('rejects a task payload with an unknown property', async () => {
    const signup = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        username: `e2e_${Date.now()}`,
        password: 'password123',
        confirmPassword: 'password123',
      })
    const rawCookie = signup.headers['set-cookie']
    const cookie = Array.isArray(rawCookie) ? rawCookie.join('; ') : (rawCookie as string)

    const project = await request(app.getHttpServer())
      .post('/projects')
      .set('Cookie', cookie)
      .send({ name: 'e2e project' })
    const projectId = project.body.data.id

    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('Cookie', cookie)
      .send({ title: 't', projectId, hacked: 'nope' })
    expect(res.status).toBe(400)
    expect(res.body.message).toContain('should not exist')
  })
})
