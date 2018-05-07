import React from 'react';
import PropTypes from 'prop-types'
class Home extends React.Component{
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props){
        super(props)
        this.state={

        }
    }
    back=()=>{
        console.dir(this)
    }
    render(){
        return (<div onClick={this.back}>
                
                TEST 
        </div>)
    }
}

export default Home