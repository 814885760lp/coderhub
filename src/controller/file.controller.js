const fileService = require('../service/file.service.js')

class FileController {
  async uploadAvatar(ctx, next) {
    // 获取图片信息和用户信息
    const { filename, mimetype, size } = ctx.req.file
    const { id } = ctx.user

    const result = await fileService.uploadAvatar(filename, mimetype, size, id)
    ctx.body = result
  }
}

module.exports = new FileController()
