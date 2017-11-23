import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { HeadingBox } from 'Mobile/components';

import s from './homepage.css';

const HomePage = () => (
	<div className={s.root}>
		<span>Home</span>
		<HeadingBox link="abcd" />
	</div>
);

export default withStyles(s)(HomePage);
