const Router = require('koa-router')
const { verifyAuth } = require('../middleware/auth.middleware')
const {
  avatarHandler,
  pictureHandler,
  pictureResize,
} = require('../middleware/file.middleware')
const { uploadAvatar, uploadPicture } = require('../controller/file.controller')

const fileRouter = new Router({
  prefix: '/upload',
})

fileRouter.post('/avatar', verifyAuth, avatarHandler, uploadAvatar)
fileRouter.post(
  '/pictures',
  verifyAuth,
  pictureHandler,
  pictureResize,
  uploadPicture
)

module.exports = fileRouter
