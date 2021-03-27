const connection = require('../app/database')

const sqlFragment = `
  SELECT 
    m.id id, 
    m.content content, 
    m.createAt createTime, 
    m.updateAt updateTime, 
    JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author
  FROM moment m LEFT JOIN user u ON m.user_id = u.id
`

class MomentService {
  async create(content, userId) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?)`
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }

  async detail(momentId) {
    // 获取动态详情时同时获取评论列表，有两种方案
    // 方案一: detail方法如下，新增一个单独的获取评论列表的接口
    // const statement = `${sqlFragment} WHERE m.id = ?`
    // 方案二：同时获取动态详情和评论列表
    const statement = `  
      SELECT 
        m.id id, 
        m.content content, 
        m.createAt createTime, 
        m.updateAt updateTime, 
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
		    JSON_ARRAYAGG(
          JSON_OBJECT(
		        'id', c.id, 
		        'content', c.content, 
		        'commentId', c.comment_id, 
		        'createTime', c.createAt, 
		        'updateTime', c.updateAt,
		        'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url)
          )
        ) comments,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename)) 
					FROM file WHERE m.id = file.moment_id) images
      FROM moment m 
	    LEFT JOIN user u ON u.id = m.user_id
	    LEFT JOIN comment c ON c.moment_id = m.id
	    LEFT JOIN user cu ON cu.id = c.user_id
	    WHERE m.id = ?
    `
    const [result] = await connection.execute(statement, [momentId])
    return result[0]
  }

  async list(limit, offset) {
    const statement = `
      SELECT 
        m.id id, 
        m.content content, 
        m.createAt createTime, 
        m.updateAt updateTime, 
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCounts
      FROM moment m 
      LEFT JOIN user u ON m.user_id = u.id
      LIMIT ?, ?
    `
    // 如果sql仅使用LIMIT,那么这里offset在前，limit在后
    const [result] = await connection.execute(statement, [offset, limit])
    return result
  }

  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?`
    const [result] = await connection.execute(statement, [content, momentId])
    return result
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?`
    const [result] = await connection.execute(statement, [momentId])
    return result
  }

  async hasLabel(momentId, lableId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? && label_id = ?`
    const [result] = await connection.execute(statement, [momentId, lableId])
    return result.length !== 0
  }

  async addLabels(momentId, lableId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?)`
    const [result] = await connection.execute(statement, [momentId, lableId])
    return result
  }
}

module.exports = new MomentService()
