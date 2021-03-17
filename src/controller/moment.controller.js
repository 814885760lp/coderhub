const momentService = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    // 获取动态
    const { content } = ctx.request.body
    const { id } = ctx.user
    // 插入动态数据到数据库
    const result = await momentService.create(content, id)
    // 返回数据
    ctx.body = result
  }

  async detail(ctx, next) {
    // 获取查询参数id
    const commentId = ctx.params.id
    // 查询数据库
    const result = await momentService.detail(commentId)
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
}

module.exports = new MomentController()
