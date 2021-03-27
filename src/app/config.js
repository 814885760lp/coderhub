const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

dotenv.config() // 将.env文件中的变量注入到process.env中

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env // 从process.env中结构出需要的数据

// 如果以下两个导出放在上面导出之前，会被新对象所覆盖，放在下面就是给新的对象添加属性
module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY