import React from 'react'
import PropTypes from 'prop-types';
import './index.less'
import Item from './Item'
class TabBar extends React.PureComponent {
		static propTypes = {
			tabs:PropTypes.array
		};
		static defaultProps = {
			tabs:[
				{
					selected:true,
					selectedColor:'rgb(255, 219, 83)',
					color:'rgb(148, 148, 148)',
					title:"首页",
					dot:true,
					badge:false,
					selectedIcon:"http://testxws.sibumbg.com/resources/client/images/35nXHFWYgg.png",
					icon:"http://testxws.sibumbg.com/resources/client/images/3BVdfCFikk.png"
				},{
					selected:false,
					selectedColor:'rgb(255, 219, 83)',
					color:'rgb(148, 148, 148)',
					title:"首页",
					dot:false,
					badge:1,
					selectedIcon:"http://testxws.sibumbg.com/resources/client/images/35nXHFWYgg.png",
					icon:"http://testxws.sibumbg.com/resources/client/images/3BVdfCFikk.png"
				},{
					selected:false,
					selectedColor:'rgb(255, 219, 83)',
					color:'rgb(148, 148, 148)',
					title:"首页",
					dot:false,
					badge:false,
					selectedIcon:"http://testxws.sibumbg.com/resources/client/images/35nXHFWYgg.png",
					icon:"http://testxws.sibumbg.com/resources/client/images/3BVdfCFikk.png"
				},{
					selected:false,
					selectedColor:'rgb(255, 219, 83)',
					color:'rgb(148, 148, 148)',
					title:"首页",
					dot:false,
					badge:false,
					selectedIcon:"http://testxws.sibumbg.com/resources/client/images/35nXHFWYgg.png",
					icon:"http://testxws.sibumbg.com/resources/client/images/3BVdfCFikk.png"
				}
			]
		};
		constructor(props) {
				super(props)
        this.state = {}
    }		
    render() {
				const {tabs} = this.props;
        return (
            <div className="tab-bar">
							{
								tabs.map((item,id)=>(
									<div className="tab-bar-bar" key={id}>
										<Item {...item}/>
									</div>
								))
							}
            </div>
        )
    }
}
export default TabBar