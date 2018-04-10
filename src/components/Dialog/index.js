import React from 'react';
import {createPortal} from 'react-dom';
import './index.less'
class Dialog extends React.Component {
  constructor(props) {
    super(props);
    const doc = window.document;
    this.node = doc.createElement('div');
    doc.body.appendChild(this.node);
  }
  render() {
    console.dir(this.props)
    return createPortal(
      <div className="dialog">
        <div className="mask"></div>
        <div className="content">{this.props.children}</div>
      </div>, 
      this.node
    );
  }

  componentWillUnmount() {
    window.document.body.removeChild(this.node);
  }
}
export default Dialog