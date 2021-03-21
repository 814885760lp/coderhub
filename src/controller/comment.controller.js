const commentService = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body
    const userId = ctx.user.id
    const result = await commentService.create(momentId, content, userId)
    ctx.body = result
  }

  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body
    const { commentId } = ctx.params
    const userId = ctx.user.id
    const result = await commentService.reply(
      momentId,
      commentId,
      content,
      userId
    )
    ctx.body = result
  }

  async update(ctx, next) {
    const { content } = ctx.request.body
    const { commentId } = ctx.params
    const result = await commentService.update(content, commentId)
    ctx.body = result
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params
    const result = await commentService.remove(commentId)
    ctx.body = result
  }

  async getCommentsByMomentId(ctx, next) {
    const { momentId } = ctx.request.params
    const result = await commentService.getCommentsByMomentId(momentId)
    ctx.body = result
  }
}

module.exports = new CommentController()
