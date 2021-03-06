const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, PUBLIC_KEY } = require('../app/config')
class AuthController {
  async login(ctx, next) {
    // 获取数据
    const { id, name } = ctx.user

    // token验证
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256',
    })

    // 返回数据
    ctx.body = { id, name, token }
  }

  async success(ctx, next) {
    ctx.body = '授权成功'
  }
}

module.exports = new AuthController()
