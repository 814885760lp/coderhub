const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config')

const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const md5password = require('../utils/password-handle')

const verifyLogin = async (ctx, next) => {
  // 获取用户名和密码
  const { name, password } = ctx.request.body

  // 用户名和密码不能为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断用户是否存在
  const result = await userService.getUserByName(name)
  const user = result[0]
  if (!user) {
    const error = new Error(errorTypes.USER_DOSE_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断密码是否正确
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
    return ctx.app.emit('error', error, ctx)
  }

  // user要在验证通过后赋值给ctx
  ctx.user = user

  await next()
}

const verifyAuth = async (ctx, next) => {
  console.log('用户授权验证的中间件')
  // 获取用户入参的token
  const authorization = ctx.request.headers.authorization // 获取token

  // 处理没有token的情况
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }

  const token = authorization.replace('Bearer ', '') // 截取出来真正的token6
  try {
    // 验证token
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    })
    ctx.user = result // verifyAuth为通用组件，将user存储起来，后面发布动态等中间件需要使用
    await next()
  } catch (err) {
    const error = errorTypes.UNAUTHORIZATION
    return new Error('error', error, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
}
