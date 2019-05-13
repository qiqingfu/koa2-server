/**
 * 主要根据传递的参数处理数据相关
 */

/**
 *
 * @param {string} author
 * @param {string} keyword
 * @return Object
 */
const {exec} = require("../db/mysql")
const xss = require("xss")

const getList = async (author, keyword) => {
	let sql = `select * from blogs where 1=1`
	if (author) {
		sql += ` and author='${author}'`
	}
	// 模糊查询关键字title
	if (keyword) {
		sql += ` and title like '%${keyword}%'`
	}
	sql += ` order by createtime desc`
	return await exec(sql)
}

/**
 *
 * @param {number} id
 * @return Object
 */
const getDetails = id => {
	const sql = `select * from blogs where id=${id}`
	return exec(sql)
}

/**
 *
 * @param {object} blogData
 * @param {string} author
 * @return Object
 */
const setNewBlog = async (blogData, author) => {
	let {title, content, createtime} = blogData
	title = xss(title)
	content = xss(content)
	const sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', ${createtime}, '${author}')`
	const insertData = await exec(sql)
	return {
		id: insertData.insertId
	}
}

/**
 *
 * @param {number} id
 * @param {object} blogData
 * @param author
 * @return Boolean
 */
const updateBlog = async (id, blogData, author) => {
	let {title, content} = blogData
	title = xss(title)
	content = xss(content)
	const sql = `update blogs set title='${title}', content='${content}' where id=${id} and author='${author}'`
	return await exec(sql)
}

/**
 *
 * @param {number} id
 * @return Boolean
 */
const deleteBlog = async (id, author) => {
	const sql = `delete from blogs where id=${id} and author='${author}'`
	return await exec(sql)
}

module.exports = {
	getList,
	getDetails,
	setNewBlog,
	updateBlog,
	deleteBlog
}
