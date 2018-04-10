import React from 'react';
import {Switch, Route} from 'react-router';
import Home from 'containers/Home/index'
import Test from 'containers/Test/index'

class Routers extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div className="app-base">
            <Switch>
                <Route component={Home} exact path="/"/>
                <Route component={Test} path="/test"/>
            </Switch>
        </div>
      );
    }
  }
  
  export default Routers;