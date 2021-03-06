/**
 * 设置微信title
 */
import React from 'react'
function SetTitle(WrapperComponent, title) {
	return class SetDocumentTitle extends React.PureComponent {
		constructor(props) {
			super(props)
			this.state = {
				title: title
			}
		}
		componentWillMount() {
			this.setTitle()
		}
		componentWillReceiveProps() {
			this.setTitle()
		}
		setTitle() {
			const { title } = this.state
			document.title = title
		}
		render() {
			return <WrapperComponent {...this.props} />
		}
	}
}
export default SetTitle