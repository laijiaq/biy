const path = require('path');
const defaultSetting = require('./src/setting')
const name = defaultSetting.title;
module.exports = {
  devServer: {
      port: '8088',
      open: false,
      proxy: {                                   
          '/api': {
              target: process.env.VUE_APP_BASE_API,
              changeOrigin: true,
              pathRewrite: {
                  '^/api': ''
              }
          },
          '/php/index.php':{
            target: process.env.VUE_APP_BASE_API,
            changeOrigin: true,
            pathRewrite:{
              '^/php/index.php':''
            }
          }
      }
  },
  transpileDependencies: true,
  configureWebpack: {
    // 在webpack的名称字段中提供应用程序的标题，以便可以在index.html中对其进行访问以注入正确的标题。
        name: name,

    },

}
