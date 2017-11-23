import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import { configureStore } from 'Global/libraries';
import { WithStylesContext, Routes } from 'Global/components';

/* eslint no-underscore-dangle: ["error", { "allow": ["_insertCss", "__INITIAL_STATE__"] }] */
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const component = (
	<Provider store={store}>
		<WithStylesContext onInsertCss={styles => styles._insertCss()}>
			<Router history={browserHistory}>{Routes}</Router>
		</WithStylesContext>
	</Provider>
);

ReactDOM.render(component, document.getElementById('root'));
