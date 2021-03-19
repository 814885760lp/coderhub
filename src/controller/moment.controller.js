const momentService = require('../service/moment.service')

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
    const {momentId} = ctx.params
    // 查询数据库
    const result = await momentService.detail(momentId)
    // 返回数据
    ctx.body = result
  }

  async list(ctx, next) {
    // 获取查询参数偏移量和查询条数
    const { offset, size } = ctx.query
    // 查询数据库
    const result = await momentService.list(offset, size)
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
}

module.exports = new MomentController()
