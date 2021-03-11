const dotenv = require('dotenv')

dotenv.config() // 将.env文件中的变量注入到process.env中

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env // 从process.env中结构出需要的数据
