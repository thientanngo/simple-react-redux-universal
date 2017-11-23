import React from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';

/* eslint-disable camelcase */
function Html({ content, state, styles }) {
	const head = Helmet.rewind();

	return (
		<html className="no-js" lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				{head.base.toComponent()}
				{head.title.toComponent()}
				{head.meta.toComponent()}
				{head.link.toComponent()}
				{head.script.toComponent()}
				<meta name="viewport" content="width=1270" />
				<style dangerouslySetInnerHTML={{ __html: styles }} />
				<script async src="/public/dist/modernizr.js" />
			</head>
			<body>
				<div id="root" className="root" dangerouslySetInnerHTML={{ __html: content }} />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)};`
					}}
				/>
				<script src={`/public/dist/vendor.js?hash=${__webpack_hash__}`} />
				<script src={`/public/dist/client.js?hash=${__webpack_hash__}`} />
			</body>
		</html>
	);
}

Html.propTypes = {
	content: PropTypes.string.isRequired,
	state: PropTypes.object.isRequired,
	styles: PropTypes.string.isRequired
};

export default Html;
