const connection = require('../app/database')

class UserService {
  // 创建用户
  async create(user) {
    const { name, password } = user
    const statement = `INSERT INTO user (name, password) VALUES (?, ?)`
    const result = await connection.execute(statement, [name, password])
    return result[0]
  }

  // 根据name查询用户
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?`
    const result = await connection.execute(statement, [name])
    return result[0]
  }
}

module.exports = new UserService()
