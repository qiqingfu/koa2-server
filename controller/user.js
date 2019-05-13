// 主要处理用户登陆相关的数据
const {exec, escape} = require('../db/mysql')

const loginIn = async data => {
    let {username, password} = data
    username = escape(username)
    password = escape(password)
    if (!username) {
        return {
            code: 0,
            message: '用户名不能为空'
        }
    }
    if (!password) {
        return {
            code: 0,
            message: '密码不能为空'
        }
    }
    const sql = `select username,realname from users where username=${username} and password=${password}`
    const userInfoResult = await exec(sql)
    if (userInfoResult[0]) {
        return {
            code: 1,
            message: '登陆成功!',
            data: userInfoResult[0]
        }
    } else {
        return {
            code: 0,
            message: '用户名或密码不正确',
        }
    }
}

module.exports = {
    loginIn
}