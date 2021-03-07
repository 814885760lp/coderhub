const server = require('./app/index')
require('./app/database')

const config = require('./app/config')


server.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功`)
})
