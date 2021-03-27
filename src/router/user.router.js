const Router = require('koa-router')
const { create, getUserAvatar } = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/users' })


userRouter.post('/', verifyUser, handlePassword, create) // 创建用户
userRouter.get('/:userId/avatar', getUserAvatar) // 获取用户头像

module.exports = userRouter
