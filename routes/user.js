const router = require('koa-router')()
router.prefix('/api/user')

router.post('/login', (ctx, next) => {
    const {username, password} = ctx.request.body
    const {method} = ctx
    ctx.body = {
        method,
        username,
        password,
        msg: '这是登陆的接口'
    }
})

module.exports = router