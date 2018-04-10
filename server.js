
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.dev')
const errorOverlayMiddleware = require('react-error-overlay/middleware')
const proxy = require('http-proxy-middleware')
const options = {
    contentBase: '/',
    hot: true, //开启热部署 使用'webpack/hot/dev-server'
    compress: false,
    historyApiFallback: true,
    watchOptions: {
        ignored: /node_modules/
    },
    stats: {
        modules: false,
        chunks: false,
        colors: true
    },
    setup(app) {
        app.use(errorOverlayMiddleware())
        if (process.env.NODE_ENV != "production") {
            app.use('/api/*', proxy({
                target: 'http://testxws.sibumbg.com',
                secure: false,
                changeOrigin: true,
                pathRewrite: {'^/api': '/'}
            }))
            app.use('/hd/*', proxy({
                target: 'http://testxws.sibumbg.com',
                secure: false,
                changeOrigin: true,
                pathRewrite: {'^/hd': '/hd/'}
            }))
        }
    }
};

const compiler = webpack(config);
 //WebpackDevServer.addDevServerEntrypoints(config, options);
const server = new WebpackDevServer(compiler, options);
server.listen(8001, 'localhost', () => {
    console.log('dev server listening on port 8001');
});
