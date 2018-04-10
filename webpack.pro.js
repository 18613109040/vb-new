const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
//这里我们使用webpack-bundle-analyzer来分析 Webpack 生成的包体组成并且以可视化的方式反馈给开发者
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const argv = require('yargs').argv
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const cssnano = require('cssnano');
const postcssOpts = {
    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
    plugins: () => [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
        }),
        pxtorem({rootValue: 100, propWhiteList: []})
    ],
    cssnano
};

let plugins =  [

    new webpack.LoaderOptionsPlugin({
        minimize: true, //加载器是否要切换到优化模式
        debug: false //加载器是否为 debug 模式
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    }),
    new UglifyJSPlugin()
]
if (!!argv.json) {
    plugins.push(
        new BundleAnalyzerPlugin({
            generateStatsFile: true
        })
    )
}

module.exports = merge(common, {
    devtool: 'source-map',
    entry: {
        app: ['./src/index']
    },
    plugins,
    module: {
        rules: [{
            test: /\.(less|css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader', // 编译后用什么loader来提取css文件
                use: [
                    'css-loader', // 指需要什么样的loader去编译文件
                    {
                        loader: 'postcss-loader',
                        options: postcssOpts
                    },
                    {
                        loader: 'less-loader', options: {modifyVars: {"@hd": "2px", "@brand-primary": "#FAC34C"}}
                    }]
            })
        }]
    }
})
