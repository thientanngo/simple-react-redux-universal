import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Footer, Styles } from 'Layout/components';
import { HeaderContainer } from 'Layout/containers';

// import {
//   fetchCategories,
// } from 'Layout/actions/server';

// import { getSuggestions, hideHeaderOverlay } from 'Layout/actions/client';

import {
	setClientRendered
} from 'Layout/actions/common';

class LayoutContainer extends React.Component {
	// static needs = [
	//   fetchCategories,
	//   fetchMe,
	//   fetchBookBanner,
	//   fetchDigitalAccessoriesBanner
	// ];

	componentDidMount() {
		this.props.actions.setClientRendered();
	}

	componentWillReceiveProps() {
		const { showNavigation, isClientRendered } = this.props.state;
		const { toggleNavigation } = this.props.actions;
		if (showNavigation && isClientRendered) {
			toggleNavigation();
		}
	}

	render() {
		// const { router, location } = this.props;

		const {
			// showNavigation,
			// categories,
			// me,
			// suggestions,
			isClientRendered
			// isSimpleLayout,
			// showHeaderOverlay
		} = this.props.state;

		const {
			// toggleNavigation,
			setSimpleLayout
		} = this.props.actions;

		const children = React.cloneElement(this.props.children, {
			isClientRendered,
			setSimpleLayout
		});

		return (
			<div className="app-root">
				<Styles />

				<HeaderContainer location={this.props.location} />

				<main>{children}</main>

				<Footer />
			</div>
		);
	}
}

LayoutContainer.propTypes = {
	// router: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	children: PropTypes.object.isRequired,
	state: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	const {
		showNavigation,
		showSearchContent,
		categories,
		// me,
		// suggestions,
		isClientRendered,
		isSimpleLayout,
		showHeaderOverlay
	} = state.layout;

	return {
		state: {
			showNavigation,
			showSearchContent,
			categories,
			// me,
			// suggestions,
			isClientRendered,
			isSimpleLayout,
			showHeaderOverlay
		}
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(
			{
				setClientRendered
			},
			dispatch
		)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withRouter(LayoutContainer)
);
