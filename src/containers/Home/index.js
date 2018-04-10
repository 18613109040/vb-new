import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import SetTitle from 'components/SetTitle'
import {connect} from "react-redux";
import ContentView from 'components/ContentView'
import './index.less'
import {testGet,testPost,testPload} from 'actions/home'
import Dialog from 'components/Dialog'
import TabBar from 'components/TabBar'
import Iscroll  from 'components/Iscroll'
class Home extends React.Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentWillMount() {}
    componentDidMount() {
      console.dir(this)
        this.props.dispatch( testGet())
        testPost()
        testPload()
     
    }
    render() {
        return (
            <div className="home">
						<Link to="/test">test</Link>
						<Iscroll>
								{
								[3,2,2,2,2,1,2,2,2,2,2,2,2].map((item,index)=>
							<div className="test-div" key={index}>
																难道撒{index}
															</div>
									)
								}
								
						</Iscroll>
						
						 {/* <TabBar/> */}
                {/* <ContentView/> */}
                {/* <Dialog>
                    <div>sss</div>
                </Dialog> */}
               
            </div>

        )
    }
}

function mapStateToProps(state) {
    console.dir(state)
    return {
      
    }
}

export default connect(mapStateToProps)(SetTitle(Home, '首頁'))
