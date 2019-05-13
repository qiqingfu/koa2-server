const router = require('koa-router')()
const {loginIn} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')
router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
    const state = await loginIn(ctx.request.body)
    if (state.code) {
        const {username, realname} = state.data
        ctx.session.username = username
        ctx.session.realname = realname
        ctx.body = new SuccessModel(state.data, state.message)
    } else {
        ctx.body = new ErrorModel(state.message)
    }
})

module.exports = router
