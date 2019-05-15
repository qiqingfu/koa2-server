const Koa = require('./koa')
const app = new Koa()

const testPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 2000)
    })
}

app.use(async (ctx, next) => {
    console.log(1)
    await testPromise()
    next()
})

app.use(async (ctx, next) => {
    console.log(2)
})

app.listen(3000)