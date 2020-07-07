// 时间戳保证不会版本重复
const Timestamp = new Date().getTime();

module.exports = {
  //不打包map文件
  productionSourceMap: false,
  configureWebpack: { // webpack 配置
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
      chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
    },
  },
  publicPath:
    //生产环境的时候，也就是npm run build，静态文件的引用路径是/m
    process.env.NODE_ENV === "production" ? "/m" : "/",
  devServer: {
    proxy: {
      '/myapi': {
        target: process.env.VUE_APP_API_URL_TARGET, //API服务器的地址
        ws: true,  //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/myapi': ''
        }
      }
    },
  }
};
