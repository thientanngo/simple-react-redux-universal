import React, { Children } from 'react';
import PropTypes from 'prop-types';

class WithStylesContext extends React.Component {
	getChildContext() {
		return { insertCss: this.props.onInsertCss };
	}

	render() {
		return Children.only(this.props.children);
	}
}

WithStylesContext.childContextTypes = {
	insertCss: PropTypes.func.isRequired
};

WithStylesContext.propTypes = {
	children: PropTypes.element.isRequired,
	onInsertCss: PropTypes.func.isRequired
};

export default WithStylesContext;
