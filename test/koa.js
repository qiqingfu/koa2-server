// koa2中间件原理
const http = require('http')

/**
 * 组合中间件, 参数接受一个中间件列表数组
 * 返回一个闭包函数, 且执行后接受一个 ctx上下文对象
 * 执行一个 dispatch函数, 根据传入的下标挨个执行 middlewareList列表中的中间件
 * 开始执行中间件, return 一个 Promise.resolve, 在里面执行中间件
 * 第一个参数为上下文对象, 第二个参数为第二个中间件函数
 */

function compose(middlewareList) {
    return function (ctx) {
        function dispatch(i) {
            const fn = middlewareList[i]
            try {
                return Promise.resolve(
                    fn(ctx, dispatch.bind(null, i+1))
                )
            } catch (err) {
                return Promise.reject(err)
            }
        }
        return dispatch(0)
    }
}

class Koa {
    constructor() {
        this.middlewareList = []
    }

    // 注册中间件
    use(middleware) {
        this.middlewareList.push(middleware)

        // 可链式调用
        return this
    }

    /**
     * 根据请求对象和响应对象,混合一个上下文对象
     * @param {object} req 
     * @param {object} res 
     */
    blendContext(req, res) {
        const ctx = {
            req,
            res
        }
        ctx.query = req.query
        return ctx
    }

    handlerResponse(ctx, fn) {
        return fn(ctx)
    }

    callback() {
        const fn = compose(this.middlewareList)
        return (req, res) => {
            const ctx = this.blendContext(req, res)
            this.handlerResponse(ctx, fn)
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

module.exports = Koa