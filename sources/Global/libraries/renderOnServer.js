import React from 'react';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';
import { renderToStaticMarkup } from 'react-dom/server';

import { WithStylesContext, Html } from '../components';

function renderHtml(store, renderProps) {
	/* eslint no-underscore-dangle: ["error", { "allow": ["_getCss"] }] */
	const css = new Set();
	const content = renderToStaticMarkup(
		<Provider store={store}>
			<WithStylesContext
				onInsertCss={(...styles) => {
					styles.forEach(style => css.add(style._getCss()));
				}}
			>
				<RouterContext {...renderProps} />
			</WithStylesContext>
		</Provider>
	);
	const styles = [...css].join('');
	const template = renderToStaticMarkup(
		<Html content={content} state={store.getState()} styles={styles} />
	);
	// return `<!doctype html>\n${template}`;
	return template;
}

function getNeeds(store, renderProps, token) {
	const needs = renderProps.components.reduce((prev, current) => {
		const result = current ? (current.needs || []).concat(prev) : prev;
		return result;
	}, []);
	const promises = needs.map(need =>
		store.dispatch(need(token, renderProps, store))
	);
	return Promise.all(promises);
}

function getPreNeed(store, renderProps, token) {
	let preNeed = null;
	let promise = null;
	renderProps.components.forEach(component => {
		if (component) {
			preNeed = component.preNeed;
		}
	});
	if (preNeed) {
		promise = store.dispatch(preNeed(token, renderProps));
	}
	return promise;
}

function getStateNeeds(store, renderProps) {
	let stateNeeds = null;
	const state = store.getState();
	renderProps.components.forEach(component => {
		if (component) {
			stateNeeds = component.stateNeeds;
		}
	});
	if (stateNeeds) {
		state.layout.isSimpleLayout = stateNeeds.isSimpleLayout;
	}
}

export default function renderOnServer(store, renderProps, token, res) {
	getStateNeeds(store, renderProps);
	const preNeed = getPreNeed(store, renderProps, token);
	if (preNeed) {
		preNeed.then(() => {
			getNeeds(store, renderProps, token)
				.then(() => renderHtml(store, renderProps))
				.then(html => res.status(200).send(html))
				.catch(err => res.status(500).send(err.message));
		});
	} else {
		getNeeds(store, renderProps, token, {})
			.then(() => renderHtml(store, renderProps))
			.then(html => res.status(200).send(html))
			.catch(err => res.status(500).send(err.message));
	}
}
