const router = require('koa-router')()
const {
    getList,
    getDetails,
    updateBlog,
    setNewBlog,
    deleteBlog
} = require('../controller/blog')
const {loginChecked} = require('../middleware/loginChecked')
const {ErrorModel, SuccessModel} = require('../model/resModel')


// Route paths can be prefixed at the router level
// 路由路径可以在路由级别前加前缀
router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
    const {author, keyword} = ctx.query
    const blogList = await getList(author, keyword)
    if (blogList) {
        ctx.body = new SuccessModel(blogList)
    } else {
        ctx.body = new ErrorModel(blogList)
    }
})

// 获取博客详情
router.get('/details', async (ctx, next) => {
    const {id} = ctx.query
    const blogDetails = await getDetails(id)
    console.log(blogDetails)
    if (blogDetails.length) {
        ctx.body = new SuccessModel(blogDetails)
    } else {
        ctx.body = new ErrorModel('没有博客信息')
    }
})

// 新建博客
router.post('/new', loginChecked, async (ctx, next) => {
    const author = ctx.session.username
    const {id} = await setNewBlog(ctx.request.body, author)
    if (id) {
        ctx.body = new SuccessModel(id, '新建博客成功')
    } else {
        ctx.body = new ErrorModel('新建博客失败')
    }
})

// 更新博客
router.put('/update', loginChecked, async (ctx, next) => {
    const author = ctx.session.username
    const {id} = ctx.query
    const updateResult = await updateBlog(id, ctx.request.body, author)
    if (updateResult.affectedRows > 0) {
        ctx.body = new SuccessModel('博客更新成功')
    } else {
        ctx.body = new ErrorModel('博客更新失败')
    }
})

// 删除博客
router.delete('/delete', loginChecked, async (ctx, next) => {
    const author = ctx.session.username
    const {id} = ctx.query
    const deleteResult = await deleteBlog(id, author)
    if (deleteResult.affectedRows > 0) {
        ctx.body = new SuccessModel('博客删除成功')
    } else {
        ctx.body = new ErrorModel('博客删除失败')
    }
})

module.exports = router
