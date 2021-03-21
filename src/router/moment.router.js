const Router = require('koa-router')
const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels
} = require('../controller/moment.controller')
const { verifyAuth, verifyPerssion } = require('../middleware/auth.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')
const momentRouter = new Router({
  prefix: '/moment',
})

momentRouter.post('/', verifyAuth, create) // 发布动态
momentRouter.get('/', list) // 获取动态列表，无需登录
momentRouter.get('/:momentId', detail) // 获取动态详情，无需登录
momentRouter.patch('/:momentId', verifyAuth, verifyPerssion, update) // 修改动态
momentRouter.delete('/:momentId', verifyAuth, verifyPerssion, remove) // 删除动态
momentRouter.post('/:momentId', verifyAuth, verifyPerssion, verifyLabelExists, addLabels) // 给动态添加标签

module.exports = momentRouter
