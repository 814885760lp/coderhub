const fs = require('fs')
const momentService = require('../service/moment.service')
const fileService = require('../service/file.service')
const { PICTURE_PATH } = require('../constants/file-path')

class MomentController {
  async create(ctx, next) {
    // 获取动态
    const { content } = ctx.request.body
    const userId = ctx.user.id
    // 插入动态数据到数据库
    const result = await momentService.create(content, userId)
    // 返回数据
    ctx.body = result
  }

  async detail(ctx, next) {
    // 获取查询参数id
    const { momentId } = ctx.params
    // 查询数据库
    const result = await momentService.detail(momentId)
    // 返回数据
    ctx.body = result
  }

  async list(ctx, next) {
    // 获取查询参数偏移量和查询条数
    const { limit, offset } = ctx.query
    // 查询数据库
    const result = await momentService.list(limit, offset)
    // 返回数据
    ctx.body = result
  }

  async update(ctx, next) {
    const { content } = ctx.request.body
    const { momentId } = ctx.params
    const result = await momentService.update(content, momentId)
    ctx.body = result
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentService.remove(momentId)
    ctx.body = result
  }

  async addLabels(ctx, next) {
    // 获取标签数组
    const { labels } = ctx
    // 获取动态id
    const { momentId } = ctx.params
    for (let lable of labels) {
      // 查询当前动态是否已经绑定了标签，如果没有绑定，则绑定起来
      const isExists = await momentService.hasLabel(momentId, lable.id)
      if (!isExists) {
        await momentService.addLabels(momentId, lable.id)
      }
    }

    ctx.body = '标签添加成功'
  }

  async getMomentPicture(ctx, next) {
    try {
      let { filename } = ctx.params
      const pictureInfo = await fileService.getMomentPictureByFilename(filename)
      const { type } = ctx.query

      const types = ['small', 'middle', 'large']
      if (types.some((item) => item === type)) {
        filename = filename + '-' + type
      }

      ctx.response.set('content-type', pictureInfo.mimetype) // 设置类型，否则图片无法打开，在浏览器中会直接下载文件
      ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new MomentController()
