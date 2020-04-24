const port = 7070
const title = '最佳实践'
const path = require('path')

function resolve(dir){
  return path.join(__dirname,dir)
}

module.exports={
  devServer:{
    port
  },
  configureWebpack:{
    name:title
  },
  chainWebpack(config){
    config.module.rule('svg').exclude.add(resolve('src/icons'));
    // 添加svg-sprite-loader
    config.module.rule('icons')
      .test(/\.svg$/)//设置test
      .include.add(resolve('src/icons'))//加入include
      .end()//使用end回退出数组
      .use('svg-sprite-loader')//添加loader选项
      .loader('svg-sprite-loader')//切换上下文到loader
      .options({symbolId:'icon-[name]'})//指定选项
      .end()
  }
}
