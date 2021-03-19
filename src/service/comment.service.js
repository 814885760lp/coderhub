const connection = require('../app/database')

class CommentService {
  async create(momentId, content, userId) {
    const statement = `INSERT INTO comment (moment_id, content, user_id) VALUES (?, ?, ?)`
    const [result] = await connection.execute(statement, [
      momentId,
      content,
      userId,
    ])
    return result
  }

  async reply(momentId, commentId, content, userId) {
    const statement = `INSERT INTO comment (moment_id, comment_id, content, user_id) VALUES (?, ?, ?, ?)`
    const [result] = await connection.execute(statement, [
      momentId,
      commentId,
      content,
      userId,
    ])
    return result
  }

  async update(content, commentId) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?`
    const [result] = await connection.execute(statement, [content, commentId])
    return result
  }

  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?`
    const [result] = await connection.execute(statement, [commentId])
    return result
  }
}

module.exports = new CommentService()
