import React from 'react'
import PropTypes from 'prop-types'
import warning from 'fbjs/lib/warning'
function warningFunc(children) {
    if (typeof children !== 'object') {
        warning(false, '你可能传入空元素，请传入react组件或者是DOM节点，children：%s')
        return false
    }
    return true
}
export default class ReactChildrenMap extends React.PureComponent {
    render() {
        if (warningFunc(this.props.children)) {
            return React.Children.map(this.props.children, children => children)
        }
    }
}
ReactChildrenMap.propTypes = {
    children: PropTypes.array
}