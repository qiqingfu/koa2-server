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

module.exports = router