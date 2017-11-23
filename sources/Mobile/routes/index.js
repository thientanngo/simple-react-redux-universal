import React from 'react';
import { Route } from 'react-router';

import {
	HomeContainer,
} from 'Mobile/containers';

export default (
	<Route>
		<Route path="/" component={HomeContainer} />
	</Route>
);
