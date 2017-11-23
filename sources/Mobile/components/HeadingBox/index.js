import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './heading-box.css';

const HeadingBox = ({ link }) => (
	<div className="test">
		<span>{link}</span>
	</div>
);

HeadingBox.propTypes = {
	link: PropTypes.string
};

export default withStyles(s)(HeadingBox);
