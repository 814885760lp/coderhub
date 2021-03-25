const multer = require('koa-multer')
const { AVATAR_PATH } = require('../constants/file-path')

const avatarUpload = multer({
  dest: AVATAR_PATH, // 图片存储的文件夹
})

const avatarHandler = avatarUpload.single('avatar') // 上传单张图片以及图片字段

module.exports = {
  avatarHandler,
}
