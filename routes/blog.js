const router = require('koa-router')()

// Route paths can be prefixed at the router level
// 路由路径可以在路由级别前加前缀
router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
    const {query, ip} = ctx
    // response json
    ctx.body = {
        error: 0,
        query,
        ip,
        msg: '获取博客列表接口'
    }
})

router.get('/session-test', (ctx, next) => {
    if (ctx.session.viewCount == null) {
        ctx.session.viewCount = 0
    }
    ctx.session.viewCount++
    ctx.body = {
        errno: 0,
        count: ctx.session.viewCount
    }
})

module.exports = router