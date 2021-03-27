const path = require('path');
const Jimp = require('jimp');
const multer = require('koa-multer')
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path')

const avatarUpload = multer({
  dest: AVATAR_PATH, // 图片存储的文件夹
})

const pictureUpload = multer({
  dest: PICTURE_PATH, // 图片存储的文件夹
})

const avatarHandler = avatarUpload.single('avatar') // 上传单张图片以及图片字段

const pictureHandler = pictureUpload.array('picture', 5) // 上传单张图片以及图片字段

const pictureResize = async (ctx, next) => {
  try {
    // 1.获取所有的图像信息
    const files = ctx.req.files

    // 2.对图像进行处理(sharp/jimp)
    for (let file of files) {
      const destPath = path.join(file.destination, file.filename)
      console.log(destPath)
      Jimp.read(file.path).then((image) => {
        image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
        image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
        image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
      })
    }

    await next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize,
}
