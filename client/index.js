import React from 'react'
import ReactDOM ,{hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import {HashRouter,BrowserRouter } from 'react-router-dom'
import {AppContainer }from 'react-hot-loader'
import App from './App'
import configureStore from './store/configureStore'
const FastClick = require('fastclick')
//解决移动端300毫秒延迟
FastClick.attach(document.body)
const store = configureStore()
const render = Component =>
    ReactDOM.hydrate(
        <AppContainer>
            <Provider store={store}>
                <BrowserRouter>
                    <Component />
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )
render(App)
if(module.hot) {
    module.hot.accept('./App', () => {
        const NextRootContainer = require('./App').default
        render(NextRootContainer)
    })
}

