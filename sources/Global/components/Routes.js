import React from 'react';
import { Route } from 'react-router';

import LayoutContainer from 'Layout/containers';
import MobileRoutes from 'Mobile/routes';

export default (
	<Route>
		<Route component={LayoutContainer}>{MobileRoutes}</Route>
	</Route>
);
