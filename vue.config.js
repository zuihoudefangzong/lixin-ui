const path = require('path')

// 增加别名alias
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('var', path.join(__dirname, './styles/_var.scss'))
  }
}