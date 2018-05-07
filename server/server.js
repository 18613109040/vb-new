// 处理css
import csshook from 'css-modules-require-hook/preset';
// 处理图片
import assethook from 'asset-require-hook';
assethook({
    extensions: ['png', 'jpg']
});
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const path = require('path');
app.use(cookieParser());
app.use(bodyParser.json());

/**
 * 插入react代码 进行服务端改造
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
    createStore,
    applyMiddleware,
    compose
} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// 引入antd css
import 'antd-mobile/dist/antd-mobile.css';
// 引入renderToString
import { renderToString, renderToNodeStream } from 'react-dom/server';
// 服务端是没有BrowserRouter 所以用StaticRouter
import { StaticRouter } from "react-router-dom";
// 引入reducer
import reducers from "../client/reducers/index";
// 引入前端路由
import Routers from '../client/App';
// 引入css 和 js
import buildPath from '../build/asset-manifest.json';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
));



// 映射到build后的路径
//设置build以后的文件路径 项目上线用
app.use((req, res, next) => {
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next()
    }
    
    res.write(`<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="theme-color" content="#000000">
            <title>${urlObj[req.url]}</title>
            <link rel="stylesheet" type="text/css" href="/${buildPath['main.css']}">
            <meta name="keywords" content="seo、seo、seo、seo，搜到我吧!">
            <meta name="description" content="${urlObj[req.url]}">
            <meta name="author" content="你的大名">
        </head>
        <body>
            <noscript>
            You need to enable JavaScript to run this app.
            </noscript>
            <div id="root">`)
    const context = {}
    const frontComponents = renderToNodeStream(
        (<Provider store={store}>
            <StaticRouter
                location={req.url}
                context={context}>
                <Routers />
            </StaticRouter>
        </Provider>)
    )
    // 推送的前端
    // end表示节点流还没有结束
    frontComponents.pipe(res, { end: false })
    // 监听事件结束后 把剩下的流推过去
    frontComponents.on('end', _ => {
        res.write(`</div>
                        <script src="/${buildPath['main.js']}"></script>
                    </body>
                </html>`)
        res.end()
    })
})
app.use('/', express.static(path.resolve('build')))

app.listen("9000", function () {
    console.log("open Browser http://localhost:9000");
});
