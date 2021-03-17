const fs = require('fs')

// 动态加载所有路由，这样就不用一个个的去手动加载了
const useRoutes = function() {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return
    const router = require(`./${file}`)
    this.use(router.routes())
    this.use(router.allowedMethods())
  })
}

module.exports = useRoutes
