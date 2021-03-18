const connection = require('../app/database')

class AuthService {
  async checkMomment(comment_id, user_id) {
    const statement = `SELECT * FROM moment WHERE id = ? && user_id = ?`
    const [result] = await connection.execute(statement, [comment_id, user_id])
    return result.length !== 0
  }
}

module.exports = new AuthService()
