const Router = require('koa-router')
const {
  create,
  detail,
  list,
  update,
  remove
} = require('../controller/moment.controller')
const { verifyAuth, verifyPerssion } = require('../middleware/auth.middleware')

const momentRouter = new Router({
  prefix: '/moment',
})

momentRouter.post('/', verifyAuth, create)
momentRouter.get('/', list) // 无需登录
momentRouter.get('/:momentId', detail) // 无需登录
momentRouter.patch('/:momentId', verifyAuth, verifyPerssion, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPerssion, remove)

module.exports = momentRouter
