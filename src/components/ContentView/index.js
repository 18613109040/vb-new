import React from 'react';
import PropTypes from 'prop-types'
import SetTitle from 'components/SetTitle'
import MeScroll from 'mescroll.js'
import './index.less'
class Header extends React.Component {
    static propTypes = {
        actionEvent: PropTypes.func,
        filterConditions: PropTypes.array
    };
    static defaultProps = {
        actionEvent: () => {},
        filterConditions: [
            {
                name: "综合",
                selected: true,
                downname: "comprehensive",
                upname: "comprehensive",
                up: true,
                down: false
            }, {
                name: "销量优先",
                selected: false,
                downname: "cost",
                upname: "cost",
                up: false,
                down: false
            }, {
                name: "价格",
                selected: false,
                downname: "descPrice",
                upname: "ascPrice",
                up: false,
                down: false
            }
        ]
    };
    constructor(props) {
        super(props)
        this.state = {}

    }
    componentDidMount() {

        var mescroll = new MeScroll("mescroll", {
            down: {
                use:true
            },
            up: {
                use:true
            }
        });
    }
    renderFilterBar() {
        let {filterConditions} = this.props;
        return (
            <div className="filter-bar">
                {
                    filterConditions.map((item,id)=>
                        <div className="meun" key={id}>
                            <div className={item.selected?'select':''}>{item.name}</div>
                            {
                               item.downname==item.upname?"":<div>
                               <div className={item.up?'iconfont icon-top box select':'iconfont icon-top box'}></div>
                               <div className={item.down?'iconfont icon-down box select':'iconfont icon-down box'}></div>
                           </div>
                            }
                            
                        </div>
                    )
                }
            </div>
        )
    }
    renderContent(){
        return(
            <div id="mescroll" className="mescroll"> 
                {
                    [1,2,3,4,5,6,7,8,9,0,9,9,9,9,99,9,9,9,9,9].map((item,id)=>
                        <div style={{padding:"20px"}} key={id}>sss</div>
                    )
                }
            </div>  
        )
    }
    render() {
        return (
            <div>
                {this.renderFilterBar()}
                {this.renderContent()}
            </div>

        )
    }
}

export default Header