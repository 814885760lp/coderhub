const Router = require('koa-router')
const { login, success } = require('../controller/auth.controller')
const { verifyLogin, verifyAuth } = require('../middleware/auth.middleware')

const authRouter = new Router({ prefix: '' })

authRouter.post('/login', verifyLogin, login) // 登录
authRouter.get('/test', verifyAuth, success) // 测试授权的中间件

module.exports = authRouter
