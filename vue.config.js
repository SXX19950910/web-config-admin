const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  outputDir: '../dist',
  publicPath: isProd ? '//jk.www.huishoubao.com/config' : '/',
  devServer: {
    port: 8086
  }
}
