const errorTypes = require('../constants/error-types')

const errorHandler = (error, ctx) => {
  let message, status
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400 // Bad Request
      message = '用户名或者密码不能为空~'
      break

    case errorTypes.USER_ALREADY_EXISTS:
      status = 409 // conflict
      message = '用户名已经存在~'
      break

    case errorTypes.USER_DOSE_NOT_EXISTS:
      status = 400 // 参数错误
      message = '用户名不存在~'
      break

    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400 // 参数错误
      message = '您输入的密码是错误的~'
      break
      
    case errorTypes.WITHOUTPERSSION:
      status = 400 // 没有权限
      message = '您暂无操作权限~'
      break
    default:
      status = 404
      message = 'NOT FOUND'
  }

  ctx.status = status
  ctx.body = message
}

module.exports = errorHandler
