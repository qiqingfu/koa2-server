const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const index = require('./routes/index')
const users = require('./routes/users')
const blog = require('./routes/blog')
const user = require('./routes/user')

// error handler
onerror(app)

// middlewares
// 用来处理 postData请求的数据格式
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())

// 记录日志
app.use(logger())

// 指定静态目录
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
// 记录请求耗时
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 设置签名的 cookie密匙
app.keys = ['qf-koa-server']

// 解析 session
app.use(session({
  // 会话的 cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    overwrite: true,
    signed: true
  },

  // 会话存储实例
  store: redisStore({
    all: '127.0.0.1:6379'
  })
}))

// routes
// Returns separate middleware for responding to OPTIONS requests with an Allow header containing the allowed methods, as well as responding with 405 Method Not Allowed and 501 Not Implemented as appropriate.
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
