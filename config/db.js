/**
 * 数据库链接环境配置
 */
const env = process.env.NODE_ENV

let MYSQL_CONFIG
let REDIS_CONFIG

if (env === 'dev') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        port: 3306,
        charset: 'utf8_general_ci',
        password: '123456',
        database: 'myblog',
        connectTimeout: 6000,
    }

    // redis配置
    REDIS_CONFIG = {
        host: '127.0.0.1',
        port: 6379
    }
}

// 链接线上
if (env === 'prod') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        port: 3306,
        charset: 'utf8_general_ci',
        password: '123456',
        database: 'myblog',
        connectTimeout: 6000,
    }

    REDIS_CONFIG = {
        host: '127.0.0.1',
        port: 6379
    }
}

module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
}