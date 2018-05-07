'use strict';
import React from 'react'
import JRoll from './jroll'
import PropTypes from 'prop-types';
import objectAssign  from 'object-assign'
export default class Iscroll extends React.Component {
    static propTypes = {
        height:PropTypes.string,
        prefixCls:PropTypes.string,
        style:PropTypes.object,
        options:PropTypes.object,
        ID:PropTypes.string
    };
    static defaultProps = {
        height:"100vh",
        prefixCls:"my-iscroll",
        style:{
            background:'#fff'
        },
        options:{},
        ID:"wrappers"
    };
    constructor(props) {
        super(props)
        this.jroll = null
    }
    componentDidMount() {
        const {options} = this.props;
        let wrappers = this.props.ID 
        this.jroll = new JRoll(`#${wrappers}`,options)
        this.jroll.refresh()
        this.jroll.on('scrollEnd', (e) => {
            this.jroll.refresh()
        })
    }
    componentDidUpdate() {
        setTimeout(() =>  {
            if (!!this.jroll) {
                this.jroll.refresh()
            }
        }, 400)
    }
    componentWillUnmount() {
        this.jroll.destroy()
    }
    render() {
        
        let { height, maxHeight, bgColor,style ,prefixCls} = this.props;

        style =  objectAssign({},style,{height:height});
        
        return (
            <div
                id={this.props.ID}
                style={style}
                className={prefixCls}
            >
                <div
                    className="clearfix"
                    id="scroller"
                >
                    {this.props.children}
                </div>
            </div>
        )
    }
}