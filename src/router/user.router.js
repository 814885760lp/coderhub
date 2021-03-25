const Router = require('koa-router')
const { create, getUserAvatar } = require('../controller/user.controller')
const { verifyAuth } = require('../middleware/auth.middleware')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/users' })


userRouter.post('/', verifyUser, handlePassword, create) // 创建用户
userRouter.get('/:userId/avatar', getUserAvatar)

module.exports = userRouter
