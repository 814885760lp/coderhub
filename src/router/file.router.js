const Router = require('koa-router')
const { verifyAuth } = require('../middleware/auth.middleware')
const { avatarHandler } = require('../middleware/file.middleware')
const { uploadAvatar } = require('../controller/file.controller')

const fileRouter = new Router({
  prefix: '/upload',
})

fileRouter.post('/avatar', verifyAuth, avatarHandler, uploadAvatar)

module.exports = fileRouter
