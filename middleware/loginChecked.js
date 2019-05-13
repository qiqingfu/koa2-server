const loginChecked = async (ctx, next) => {
    if (ctx.session.username) {
        await next()
        return
    }
    ctx.body = {
        errno: 1,
        msg: '当前未登陆'
    }
}

module.exports = {
    loginChecked
}