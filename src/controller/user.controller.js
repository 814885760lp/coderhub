const service = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    // 获取数据
    const user = ctx.request.body

    // 操作数据库创建用户
    const result = await service.create(user)

    // 返回数据
    ctx.response.body = result
  }
}

module.exports = new UserController()