const fs = require('fs')

const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const { AVATAR_PATH } = require('../constants/file-path')

class UserController {
  async create(ctx, next) {
    // 获取数据
    const user = ctx.request.body

    // 操作数据库创建用户
    const result = await userService.create(user)

    // 返回数据
    ctx.response.body = result
  }

  async getUserAvatar(ctx, next) {
    const { userId } = ctx.params
    const avatarInfo = await fileService.getUserAvatarById(userId)
    ctx.response.set('content-type', avatarInfo.mimetype) // 设置类型，否则图片无法打开，在浏览器中会直接下载文件
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}

module.exports = new UserController()
