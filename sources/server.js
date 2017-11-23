import PrettyError from 'pretty-error';
import sourceMapSupport from 'source-map-support';

PrettyError.start();
sourceMapSupport.install({
	handleUncaughtExceptions: false,
	hookRequire: true,
	environment: 'node'
});

import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import { match } from 'react-router';

import {
	renderOnServer,
	getProxy,
	configureStore,
	fetchTokens,
	setTokensCookie
} from 'Global/libraries';
import { Routes } from 'Global/components';

const app = express()
	.use(cookieParser(__COOKIE_KEY__))
	.use(compress())
	.use(cors())
	.use(favicon('./public/favicon.ico'))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use('/public', express.static('public'))
	.use('/service-worker.js', express.static('public/service-worker.js'))
	.use('/api', getProxy)
	/* eslint-enable no-unused-vars */
	.use((req, res) => {
		match({
			location: req.url,
			routes: Routes
		}, (error, redirectionLocation, renderProps) => {
			if (error) {
				console.error('Router error:', error);
				res.status(500).send(error.message);
			} else if (redirectionLocation) {
				res.redirect(
					302,
					redirectionLocation.pathname + redirectionLocation.search
				);
			} else if (renderProps) {
				const store = configureStore();
				const accessToken = req.signedCookies.accessToken;
				const tokenType = req.signedCookies.tokenType;

				if (!accessToken || !tokenType) {
					fetchTokens().then(response => {
						const json = response.data;
						setTokensCookie(res, {
							accessToken: json.access_token,
							tokenType: json.token_type,
							expiresAt: json.expires_at
						});
						renderOnServer(
							store,
							renderProps, {
								accessToken: json.access_token,
								tokenType: json.token_type
							},
							res
						);
					});
				} else {
					renderOnServer(
						store,
						renderProps, {
							accessToken,
							tokenType
						},
						res
					);
				}
			} else {
				res.status(400).send('Not Found');
			}
		});
	});

app.listen(3000, error => {
	if (error) {
		console.error(error);
	} else {
		console.info('Web Server started at 3000');
	}
});
