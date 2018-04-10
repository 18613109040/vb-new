const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
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
module.exports = merge(common, {
    devtool: 'inline-source-map',
    entry: {
        app: [
            'react-hot-loader/patch',  //不刷新界面更新 'react-hot-loader/patch'
            `webpack-dev-server/client?http://localhost:8001`,
             'webpack/hot/only-dev-server',//'webpack/hot/only-dev-server',
            './src/index.js'
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [{
            test: /\.(less|css)$/,
            use: [
                'style-loader', // 编译后用什么loader来提取css文件
               
                    'css-loader', // 指需要什么样的loader去编译文件
                    {
                        loader: 'postcss-loader',
                        options: postcssOpts
                    },
                    {
                        loader: 'less-loader', options: {modifyVars: {"@hd": "2px", "@brand-primary": "#FAC34C"}}
                    }
                ]
        }]
    }
})
