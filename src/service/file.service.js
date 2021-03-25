const connection = require('../app/database')

class FileService {
  async uploadAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)`
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
    return result
  }

  async getUserAvatarById(userId) {
    const statement = `SELECT * from avatar WHERE user_id = ?`
    const [result] = await connection.execute(statement, [userId])
    return result[0]
  }
}

module.exports = new FileService()