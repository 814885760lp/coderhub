const connection = require('../app/database')

const sqlFragment = `
  SELECT 
    m.id id, 
    m.content content, 
    m.createAt createTime, 
    m.updateAt updateTime, 
    JSON_OBJECT('id', u.id, 'name', u.name) author
  FROM moment m LEFT JOIN user u ON m.user_id = u.id
`

class MomentService {
  async create(content, userId) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?)`
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }

  async detail(commentId) {
    const statement = `${sqlFragment} WHERE m.id = ?`
    const [result] = await connection.execute(statement, [commentId])
    return result[0]
  }

  async list(offset, size) {
    const statement = `${sqlFragment} LIMIT ?, ?`
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }
}

module.exports = new MomentService()