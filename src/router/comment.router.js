const Router = require('koa-router')
const { verifyAuth, verifyPerssion } = require('../middleware/auth.middleware')
const { create, reply, update, remove, getCommentsByMomentId } = require('../controller/comment.controller')

const commentRouter = new Router({
  prefix: '/comment',
})

commentRouter.post('/', verifyAuth, create) // 创建评论
commentRouter.post('/:commentId/reply', verifyAuth, reply) // 回复评论
commentRouter.patch('/:commentId', verifyAuth, verifyPerssion, update) // 更新评论
commentRouter.delete('/:commentId', verifyAuth, verifyPerssion, remove) //删除评论
commentRouter.get('/:momentId', getCommentsByMomentId) // 根据动态id获取评论列表

module.exports = commentRouter
