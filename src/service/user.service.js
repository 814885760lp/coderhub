const connection = require('../app/database')

class UserService {
  async create(users) {
    const { user, password } = users
    const statement = `INSERT INTO users (name, password) VALUES (?, ?)`
    const result = await connection.execute(statement, [user, password])
    return result
  }
}

module.exports = new UserService()
