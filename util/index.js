// 写入生产环境的日志
const path = require('path')
const fs = require('fs')

const filePath = path.join(__dirname, '../log/access.txt')

function writeProdAssertStream() {
	return fs.createWriteStream(filePath, {
		flags: 'a'
	})
}

module.exports = {
	writeProdAssertStream
}
