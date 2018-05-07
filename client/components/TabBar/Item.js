import React from 'react'
import PropTypes from 'prop-types';
import './index.less'
class TabBarItem extends React.PureComponent {
		static propTypes = {
			selected:PropTypes.bool,
			selectedColor:PropTypes.string,
			color:PropTypes.string,
			title:PropTypes.string,
			dot:PropTypes.bool,
			badge:PropTypes.bool,
			selectedIcon:PropTypes.oneOfType([PropTypes.element ,PropTypes.string]) ,
			icon:PropTypes.oneOfType([PropTypes.element ,PropTypes.string])

		};
		static defaultProps = {
			selected:false,
			selectedColor:'rgb(255, 219, 83)',
			color:'rgb(148, 148, 148)',
			title:"首页",
			dot:false,
			badge:false,
			selectedIcon:"http://testxws.sibumbg.com/resources/client/images/35nXHFWYgg.png",
			icon:"http://testxws.sibumbg.com/resources/client/images/3BVdfCFikk.png"

		};
		constructor(props) {
				super(props)
        this.state = {}
    }
		renderIcon = () => {
			const {
				dot,
				badge,
				selected,
				selectedIcon,
				icon,
				title
			} = this.props;
			const iconRes = selected ? selectedIcon : icon;
			const iconDom = React.isValidElement(iconRes) ? (
				iconRes
			) : (
				<img
					className="image"
					src={iconRes}
					alt={title}
				/>
			);
			if (badge) {
				return (
					<span className="tab-badge">
						{iconDom}
						<sup className="badge-text">{badge}</sup>
					</span>
				);
			}
			if (dot) {
				return (
					<span  className="tab-dot">
						{iconDom}
						<sup className="badge-dot"></sup>
					</span>
				);
			}
			return iconDom;
		}
    render() {
				const {selected,selectedColor,color,title} = this.props;
        return (
            <div className="tab-bar-item">
							<div>
								{this.renderIcon()}
							</div>
							<div className="title" style={{color:selected?selectedColor:color}}>
								{title}
							</div>
            </div>
        )
    }
}
export default TabBarItem