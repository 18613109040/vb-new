import React from 'react'
import {Route} from 'react-router-dom'
import lazyLoadComponent from 'lazy-load-component'
import {Switch} from 'react-router'
import Home from 'containers/Home/index'
import ReactChildrenMap from 'components/ReactChildrenMap'
import Test from 'containers/Test/index'
import 'assets/style/app.less'
// import Routers from './routes'
//const Test = lazyLoadComponent(() => import(/* webpackChunkName: "search" */ './containers/Test/index'))
const App= () => {
    return (
        <ReactChildrenMap>
            <Route
                component={Home}
                exact
                path="/"
            />
            <Route
                    component={Test}
                    path="/test"
            />

        </ReactChildrenMap>
    )
}
export default App;
