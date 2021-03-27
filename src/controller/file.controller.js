const fileService = require('../service/file.service.js')
const userService = require('../service/user.service.js')
const momentService = require('../service/moment.service.js')
const { APP_HOST, APP_PORT } = require('../app/config')
class FileController {
  async uploadAvatar(ctx, next) {
    // 获取图片信息和用户信息
    const { filename, mimetype, size } = ctx.req.file
    const { id } = ctx.user

    // 图片信息保存在avatar表中
    await fileService.uploadAvatar(filename, mimetype, size, id)

    // 图片地址保存在user表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    await userService.addUserAvatar(avatarUrl, id)

    ctx.body = '上传头像成功'
  }

  async uploadPicture(ctx, next) {
    // 获取图片信息和用户信息
    const { id } = ctx.user
    const { momentId } = ctx.query
    const files = ctx.req.files

    // 图片信息保存在file表中
    for (let file of files) {
      const { filename, mimetype, size } = file
      await fileService.uploadPicture(filename, mimetype, size, id, momentId)
    }
    
    ctx.body = '上传配图成功'
  }
}

module.exports = new FileController()
