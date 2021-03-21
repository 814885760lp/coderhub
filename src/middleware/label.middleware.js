const labelService = require('../service/label.service')

// 验证标签是否已经存在的中间件，首先验证标签是否存在，如果不存在则在标签数据表中创建此标签
const verifyLabelExists = async (ctx, next) => {
  // 获取入参中的标签数组
  const { labels } = ctx.request.body
  // 新建一个空数组用户存放标签数据对象
  const newLabelList = []
  // 遍历标签数组，每次生成一个包含name，id的标签数据对象，并push到空数组中
  for (let name of labels) {
    let label = { name }
    // 查询数组中每一个标签，是否已经存在于标签数据表中
    const labelResult = await labelService.getLabelByName(name)
    if (!labelResult) {
      // 如果不存在，就创建这个标签到数据表中
      const result = await labelService.create(name)
      label.id = result.insertId
    } else {
      // 如果存在，就获取标签数据
      label.id = labelResult.id
    }
    // 将标签对象数据放进数组中
    newLabelList.push(label)
  }
  // 存储这个标签数据数组，后面中间件需要使用这个标签数组
  ctx.labels = newLabelList

  await next()
}

module.exports = {
  verifyLabelExists,
}
