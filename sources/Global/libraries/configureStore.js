import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { layout } from 'Layout/reducers';

const reducers = combineReducers({
	layout,
	routing: routerReducer
});

function promiseMiddleware() {
	return next => action => {
		const { promise, type, ...rest } = action;
		if (!promise) return next(action);

		const SUCCESS = type;
		const REQUEST = `${type}_REQUEST`;
		const FAILURE = `${type}_FAILURE`;
		next({ ...rest, type: REQUEST });

		return promise
			.then(res => {
				next({ ...rest, res, type: SUCCESS });
				return true;
			})
			.catch(error => {
				next({ ...rest, error, type: FAILURE });
				console.log(error);
				return false;
			});
	};
}

const middleware = [thunk, promiseMiddleware];
if (process.env.NODE_ENV !== 'production' && __CLIENT__) {
	middleware.push(logger());
}

export default function configureStore(preloadedState = {}) {
	const store = createStore(
		reducers,
		preloadedState,
		applyMiddleware(...middleware)
	);
	return store;
}
