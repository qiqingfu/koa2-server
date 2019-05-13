const mysql = require('mysql')
const {MYSQL_CONFIG} = require('../config/db')

const connection = mysql.createConnection(MYSQL_CONFIG)

// 建立数据库连接
connection.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return
    }
    console.log('connected as id ' + connection.threadId);
})

const exec = sql => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

module.exports = {
    exec,
    escape: mysql.escape
}